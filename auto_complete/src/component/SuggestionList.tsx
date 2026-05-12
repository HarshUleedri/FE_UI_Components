import type { Recipe } from "./AutoComplete";

interface SuggestionListPropType {
  highlight: string;
  onClick: (data: string) => void;
  suggestion: Recipe;
  dataKey?: keyof Recipe;
  selectedIndex: number;
  index: number;
}

const SuggestionList = ({
  suggestion,
  highlight,
  onClick,
  dataKey,
  selectedIndex,
  index,
}: SuggestionListPropType) => {
  const currentSuggestion = dataKey ? suggestion[dataKey] : suggestion.name;

  const highlightInputValue = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
      <span>
        {parts.map((text) => {
          return text.toLowerCase() === highlight.toLowerCase() ? (
            <b className="text-blue-400 font-bold ">{text}</b>
          ) : (
            text
          );
        })}
      </span>
    );
  };

  return (
    <li
      onClick={() => onClick(String(currentSuggestion))}
      className={`px-4 py-1 hover:bg-gray-100 text-base font-medium ${selectedIndex === index && "bg-gray-100"}`}
      id={`suggestion-${index}`}
      aria-selected={selectedIndex === index}
      key={index}
      role="option"
    >
      {highlightInputValue(String(currentSuggestion), highlight)}
    </li>
  );
};

export default SuggestionList;
