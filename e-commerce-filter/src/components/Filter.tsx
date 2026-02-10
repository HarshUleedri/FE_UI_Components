import { useFilter } from "../context/ShoppingCartContext";

export const Filter = () => {
  const {
    filterDispatch,
    filterState: { inStock, rating, sortBy },
  } = useFilter();
  return (
    <div>
      <h2 className="text-lg font-semibold">Filter</h2>
      <hr className="my-2 text-gray-200" />
      <span className="flex items-center justify-between">
        <label className="flex items-center justify-between" htmlFor="asc">
          Ascending
        </label>
        <input
          id="asc"
          type="radio"
          checked={sortBy === "asc" ? true : false}
          onChange={() => filterDispatch({ type: "SORT", payload: "asc" })}
        />
      </span>
      <span className="flex items-center justify-between">
        <label className="flex items-center justify-between" htmlFor="dsc">
          descending
        </label>
        <input
          id="dsc"
          type="radio"
          checked={sortBy === "dsc" ? true : false}
          onChange={() => filterDispatch({ type: "SORT", payload: "dsc" })}
        />
      </span>
      <hr className="my-2 text-gray-200" />
      <span className="flex items-center justify-between">
        <label className="flex items-center justify-between" htmlFor="stock">
          In Stock
        </label>
        <input
          id="stock"
          type="checkbox"
          checked={inStock === "In Stock" ? true : false}
          onChange={() =>
            filterDispatch({
              type: "SORT_BY_STOCK",
              payload: inStock === "In Stock" ? "Low Stock" : "In Stock",
            })
          }
        />
      </span>
      <hr className="my-2 text-gray-200" />
      <span className="flex items-center justify-between">
        <label className="flex items-center justify-between" htmlFor="rating">
          Sort By Rating ⭐
        </label>
        <input
          id="rating"
          type="number"
          min={1}
          max={5}
          step={1}
          value={rating}
          aria-label="Rating"
          className="w-12 border border-gray-300 rounded px-2"
          onChange={(e) =>
            filterDispatch({
              type: "SORT_BY_RATING",
              payload: e.target.value,
            })
          }
        />
      </span>
      <hr className="my-2 text-gray-200" />
      <span className="flex items-center justify-between">
        <button
          id="clear"
          type="button"
          className="w-full rounded text-center cursor-pointer py-2 text-white bg-gray-500"
          onClick={() => {
            filterDispatch({
              type: "CLEAR",
              payload: {
                sortBy: null,
                searchQuery: "",
                rating: 4,
                inStock: "In Stock",
              },
            });
            window.location.reload();
          }}
        >
          Clear
        </button>
      </span>
    </div>
  );
};
