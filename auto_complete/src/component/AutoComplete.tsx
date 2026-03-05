import React, { useState } from "react";
import SuggestionList from "./SuggestionList";

interface AutoCompletePropType {
  fetchData: (input: string) => Promise<Response>;
  staticData?: string[];
  onClick: (data: string) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  dataKey?: keyof Recipe;
  customLoader: React.ReactNode;
}
export type Recipe = {
  id: number;
  name: string;
};

export type RecipeResponse = {
  recipes: Recipe[];
};

const AutoComplete = ({
  onChange,
  placeholder,
  fetchData,
  customLoader,
  onClick,
  dataKey,
}: AutoCompletePropType) => {
  const [inputValue, setInputValue] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [suggestionList, setSuggestionList] = useState<Recipe[]>([]);

  // fetching data
  const fetchSuggestion = async (inputValue: string) => {
    setIsLoading(true);
    try {
      const res = await fetchData(inputValue);
      if (!res.ok) {
        throw new Error("failed to fetch Data");
      }
      const data: RecipeResponse = await res.json();
      setSuggestionList(data.recipes);
    } catch (error) {
      console.log(error);
      setError("failed to fetch suggestions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange(event);
    if (inputValue.length > 1) {
      fetchSuggestion(inputValue);
    } else {
      setSuggestionList([]);
    }
  };

  const handleOnClick = (data: string) => {
    setInputValue(data);
    onClick(data);
    setSuggestionList([]);
  };

  console.log(suggestionList);
  return (
    <div className="w-96 relative">
      <input
        className="border w-full focus:outline-none border-gray-200 rounded px-4 py-1 "
        value={inputValue}
        onChange={handleOnChnage}
        placeholder={placeholder}
      />

      {(suggestionList.length > 0 || isLoading || error) && (
        <ul className="absolute top-full mt-2 py-2 w-full max-h-96 overflow-y-auto left-0 rounded shadow border border-gray-100">
          {suggestionList.map((item) => {
            return (
              <SuggestionList
                onClick={handleOnClick}
                dataKey={dataKey}
                highlight={inputValue}
                suggestion={item}
              />
            );
          })}

          {isLoading && <span className="px-4">{customLoader}</span>}
          {error && (
            <p className="text-center text-sm font-medium text-red-600 py-2 ">
              {error}
            </p>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
