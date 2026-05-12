import React, { useCallback, useEffect, useRef, useState } from "react";
import SuggestionList from "./SuggestionList";
import useCache from "../hooks/useCache";
import debounce from "lodash/debounce";

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

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const { getCache, setCache } = useCache("cache", 3600);

  const suggestionRef = useRef<HTMLUListElement | null>(null);

  // fetching data
  const fetchSuggestion = async (inputValue: string) => { 
    const cacheData = getCache(inputValue);
    if (cacheData) {
      setSuggestionList(cacheData);
    } else {
      setIsLoading(true);
      try {
        const res = await fetchData(inputValue);
        if (!res.ok) {
          throw new Error("failed to fetch Data");
        }
        const data: RecipeResponse = await res.json();
        setSuggestionList(data.recipes);
        setCache(inputValue, data.recipes);
      } catch (error) {
        console.log(error);
        setError("failed to fetch suggestions");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const debounceFetch = useCallback(debounce(fetchSuggestion, 300), []);

  const handleOnChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIndex(-1);
    setInputValue(event.target.value);
    onChange(event);
  };

  useEffect(() => {
    if (inputValue.length >= 1) {
      debounceFetch(inputValue);
    } else {
      setSuggestionList([]);
    }
  }, [inputValue]);
  const handleOnClick = (data: string) => {
    setInputValue(data);
    onClick(data);
    setSuggestionList([]);
  };

  const scrollIntoView = (index: number) => {
    if (suggestionRef.current) {
      const suggestionElements =
        suggestionRef.current.getElementsByTagName("li");
      if (suggestionElements) {
        console.log(suggestionElements[index]);
        suggestionElements[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex((prev) => {
          const newIndex = (prev + 1) % suggestionList.length;
          scrollIntoView(newIndex);
          return newIndex;
        });
        break;
      case "ArrowUp":
        setSelectedIndex((prev) => {
          const newIndex =
            (prev - 1 + suggestionList.length) % suggestionList.length;
          scrollIntoView(newIndex);
          return newIndex;
        });
        break;
      case "Enter":
        if (selectedIndex >= 0 && selectedIndex < suggestionList.length) {
          handleOnClick(suggestionList[selectedIndex].name);
        }
    }
  };

  // create state for tracking selected items
  // create function for handling onkeydown for changing the selected index on up and down arrow and enter key
  // create a function for updating the selected state

  console.log(suggestionList);

  return (
    <div className="w-96 relative">
      <input
        className="border w-full focus:outline-none border-gray-200 rounded px-4 py-1 "
        value={inputValue}
        onChange={handleOnChnage}
        placeholder={placeholder}
        onKeyDown={handleOnKeyDown}
        aria-autocomplete="list"
        aria-controls="suggestion-list"
        aria-activedescendant={`suggestion-${selectedIndex}`}
      />

      {suggestionList.length > 0 && !isLoading && (
        <ul
          ref={suggestionRef}
          role="listbox"
          className="suggestion-list absolute top-full mt-2 py-2 w-full max-h-96 overflow-y-auto left-0 rounded shadow border border-gray-100"
        >
          {suggestionList.map((item, index) => {
            return (
              <SuggestionList
                onClick={handleOnClick}
                dataKey={dataKey}
                highlight={inputValue}
                suggestion={item}
                selectedIndex={selectedIndex}
                index={index}
              />
            );
          })}
        </ul>
      )}
      {isLoading && (
        <span className="flex items-center justify-center py-4 ">
          {customLoader}
        </span>
      )}

      {error && (
        <p className="text-center text-sm font-medium text-red-600 py-2 ">
          {error}
        </p>
      )}
      {/* {inputValue.length > 0 && suggestionList.length === 0 && !isLoading && (
        <p className="text-center text-sm py-4">No Result</p>
      )} */}
    </div>
  );
};

export default AutoComplete;
