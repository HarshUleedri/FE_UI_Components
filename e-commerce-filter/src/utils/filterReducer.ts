type filterAction =
  | { type: "SORT"; payload: "asc" | "dsc" }
  | { type: "SORT_BY_RATING"; payload: number }
  | { type: "SORT_BY_STOCK"; payload: "In Stock" | "Low Stock" }
  | { type: "SEARCH_QUERY"; payload: string }
  | { type: "CLEAR"; payload: FilterContextType };

export interface FilterContextType {
  sortBy: "asc" | "dsc" | null;
  searchQuery: string;
  rating: number;
  inStock: string;
}

export const filterReducer = (
  state: FilterContextType,
  action: filterAction,
) => {
  switch (action.type) {
    case "SORT":
      return { ...state, sortBy: action.payload };
    case "SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SORT_BY_RATING":
      return { ...state, rating: action.payload };
    case "SORT_BY_STOCK":
      return { ...state, inStock: action.payload };
    case "CLEAR":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
