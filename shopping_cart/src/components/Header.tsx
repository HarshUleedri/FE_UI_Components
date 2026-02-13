import { Link } from "react-router-dom";
import { useFilter } from "../context/ShoppingCartContext";

const Header = () => {
  const {
    filterState: { searchQuery },
    filterDispatch,
  } = useFilter();
  return (
    <div className="flex items-center justify-between px-20 py-4 border-b border-gray-200">
      <Link className="text-lg font-bold cursor-pointer" to={"/"}>
        E-COM
      </Link>

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
    </div>
  );
};

export default Header;
