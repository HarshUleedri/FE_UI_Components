import { useFilter } from "../../context/ShoppingCartContext";

const Cart = () => {
  const {
    shoppingCartState: { cart },
    shoppingCartDispatch,
  } = useFilter();

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
    <section className="mx-auto max-w-7xl  mt-6">
      <p className="text-2xl mb-8">
        Shopping Price $
        {cart.reduce((acc, crr) => {
          return acc + crr.price * crr.quantity;
        }, 0)}
      </p>
      <div className="space-y-8">
        {cart.map((prod) => {
          const inCart = cart.some((item) => item.id === prod.id);
          const productQuantityInCart = cart.find(
            (item) => item.id === prod.id,
          )?.quantity;
          return (
            <div
              className="shadow border flex gap-12 border-gray-100 rounded-md space-y-2  px-4 py-2 "
              key={prod.id}
            >
              <div className=" h-72 w-1/3 flex items-center jusity-center border border-gray-200 rounded-xl ">
                <img
                  src={prod.images[0]}
                  className="w-full h-full object-contain "
                />
              </div>
              <div className="flex flex-col gap-8">
                <div>
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
                </div>
                <div>
                  <div className="flex my-2 items-center justify-between ">
                    <p className="text-sm font-medium px-4 py-1 rounded-full bg-green-500 text-white">
                      Added in Cart
                    </p>
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
                          increaseQuantity(prod.id, productQuantityInCart || 1)
                        }
                        className="px-2  rounded bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Cart;
