import { useFilter } from "../context/ShoppingCartContext";
import { getpagination } from "../utils/getpagination";

interface PaginatedListPropType {
  productList: {
    id: number;
    title: string;
    description: string;
    availabilityStatus: string;
    price: number;
    rating: number;
    tags: string[];
    images: string[];
  }[];
  total: number;
  currentPage: number;
  changeCurrentPage: (data: number) => void;
}

const PaginatedList = ({
  productList,
  changeCurrentPage,
  currentPage,
  total,
}: PaginatedListPropType) => {
  const {
    shoppingCartState: { cart },
    shoppingCartDispatch,
  } = useFilter();

  const totalNumberOfPages: number = Math.ceil(total / 10);

  const range = getpagination(totalNumberOfPages, currentPage);

  const prevPage = () => {
    if (currentPage > 1) {
      changeCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalNumberOfPages) {
      changeCurrentPage(currentPage + 1);
    }
  };

  // add to cart function
  const addToCart = (data: {
    id: number;
    title: string;
    description: string;
    availabilityStatus: string;
    price: number;
    rating: number;
    tags: string[];
    images: string[];
  }) => {
    shoppingCartDispatch({ type: "ADD_PRODUCT", payload: data });
  };

  const increaseQuantity = (id: number, quantity: number) => {
    console.log(id, quantity);
    shoppingCartDispatch({
      type: "QUANTITY_PRODUCT",
      payload: { id, quantity: quantity + 1 },
    });
  };
  const removeQuantity = (id: number, quantity: number) => {
    if (quantity <= 1) {
      shoppingCartDispatch({
        type: "REMOVE_PRODUCT",
        payload: { id: id },
      });
    } else {
      shoppingCartDispatch({
        type: "QUANTITY_PRODUCT",
        payload: { id: id, quantity: quantity - 1 },
      });
    }
  };

  return (
    <div>
      {/* Product List */}
      <div className="text-xl mb-8 text-black grid grid-cols md:grid-cols-3 lg:grid-cols-4   gap-4">
        {productList.length === 0 ? (
          <p>No Product Found</p>
        ) : (
          <>
            {productList?.map((prod) => {
              const inCart = cart.some((item) => item.id === prod.id);
              const productQuantityInCart = cart.find(
                (item) => item.id === prod.id,
              )?.quantity;

              return (
                <div
                  className="shadow border border-gray-100 rounded-md space-y-2  px-4 py-2 "
                  key={prod.id}
                >
                  <div className="size-56 flex items-center jusity-center">
                    <img
                      src={prod.images[0]}
                      className="w-full h-full object-cover "
                    />
                  </div>
                  <h3 className="text-lg font-semibold wrap-break-words">
                    {prod.title}
                  </h3>
                  <p className="text-sm line-clamp-2 ">{prod.description}</p>
                  <div className="flex gap-2 items-center">
                    {prod?.tags.map((tag, idx) => (
                      <span
                        className="text-sm px-4 py-0.5  rounded-full border border-gray-300"
                        key={idx}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p>
                    {" "}
                    <span className="font-medium">Price : </span>
                    <span className="font-medium">$ {prod.price}</span>{" "}
                  </p>
                  <div className="flex items-center  justify-between">
                    <p className="text-sm">
                      <span>Rating :</span>{" "}
                      <span className="font-semibold">
                        {Math.ceil(prod.rating)}⭐
                      </span>
                    </p>
                    <p className="text-sm">
                      {" "}
                      <span>Stock : </span>{" "}
                      <span
                        className={`${prod.availabilityStatus === "In Stock" ? "text-green-500 " : "text-red-500"} font-semibold`}
                      >
                        {prod.availabilityStatus}
                      </span>
                    </p>
                  </div>

                  {inCart ? (
                    <div className="flex my-2 items-center justify-between ">
                      <p className="text-sm font-medium px-4 py-1 rounded-full bg-green-500 text-white">Added in Cart</p>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() =>
                            removeQuantity(prod.id, productQuantityInCart || 1)
                          }
                          className="px-2  rounded bg-gray-200"
                        >
                          -
                        </button>
                        <span>{productQuantityInCart}</span>
                        <button
                          onClick={() =>
                            increaseQuantity(
                              prod.id,
                              productQuantityInCart || 1,
                            )
                          }
                          className="px-2  rounded bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(prod)}
                      className={`bg-amber-400 px-4 py-1 text-sm rounded w-full cursor-pointer text-white `}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* pagination */}
      <div className=" text-lg flex items-center">
        <button
          onClick={prevPage}
          className="px-2 py-1 border cursor-pointer  bg-black text-white"
        >{`<`}</button>
        <div>
          {range.map((n, idx) => {
            return n === "..." ? (
              <span className="px-2 py-1 border " key={idx}>
                ...
              </span>
            ) : (
              <span
                key={idx}
                className={`px-2 py-1 border cursor-pointer hover:bg-gray-200 hover:underline ${currentPage === n && "bg-gray-300"}`}
                onClick={() => changeCurrentPage(+n)}
              >
                {n}
              </span>
            );
          })}
        </div>
        <button
          onClick={nextPage}
          className="px-2 py-1 border cursor-pointer bg-black text-white"
        >{`>`}</button>
      </div>
    </div>
  );
};

export default PaginatedList;
