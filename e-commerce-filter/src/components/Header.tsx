import { Link } from "react-router-dom";
import { useFilter } from "../context/ShoppingCartContext";

const Header = () => {
  const {
    filterState: { searchQuery },
    filterDispatch,
    shoppingCartState: { cart },
  } = useFilter();

  return (
    <div className="flex items-center justify-between px-20 py-4 border-b border-gray-200">
      <Link className="text-lg font-bold cursor-pointer" to={"/"}>
        E-COM
      </Link>
      <div className="flex gap-8">
        <div>
          <input
            className="border text-normal border-gray-300 px-4 py-1 rounded"
            type="text"
            placeholder="Search.."
            value={searchQuery}
            onChange={(e) =>
              filterDispatch({ type: "SEARCH_QUERY", payload: e.target.value })
            }
          />
        </div>

        <button className="px-4 rounded py-1 bg-gray-500 text-white">
          <Link to={"/cart"}>
            Cart {cart.length > 0 && <span>{cart.length}</span>}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
