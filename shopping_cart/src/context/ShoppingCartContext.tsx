import React, { createContext, useContext, useReducer } from "react";
import { filterReducer, type FilterContextType } from "../utils/filterReducer";

const shoppingCartContext = createContext<{
  filterState: FilterContextType;
  filterDispatch: React.Dispatch<any>;
} | null>(null);



const ShoppingCartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    sortBy: null,
    searchQuery: "",
    rating: 0,
    inStock: "In Stock",
  });
  

  return (
    <shoppingCartContext.Provider value={{ filterState, filterDispatch }}>
      {children}
    </shoppingCartContext.Provider>
  );
};

export default ShoppingCartContextProvider;

export const useFilter = () => {
  const context = useContext(shoppingCartContext);
  if (!context) {
    throw new Error("use useFilter inside shopping cart provider");
  }
  return context;
};
