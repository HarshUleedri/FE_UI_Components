import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const InfintiteScroll = () => {
  const { lastItem, products, isLoading } = useInfiniteScroll();

  return (
    <>
      <div className="py-10 ">
        <h1 className="text-white text-center text-4xl font-semibold">
          Lazy loading Product List
        </h1>
      </div>
      <hr className="text-white pb-10 mx-20" />
      <div className="grid grid-cols-4 gap-8 pb-44  flex-wrap px-20 ">
        {products.map((item, idx, arr) => {
          const isLast = idx === arr.length - 1;

          return (
            <div
              key={idx}
              className={`${isLast ? "bg-green-500" : "bg-gray-100"} hover:bg-gray-300 w-full shrink-0 flex items-center flex-col  rounded-md p-2`}
              ref={isLast ? lastItem : null}
            >
              <img className="size-56" src={item.images[0]} alt={item.title} />
              <p className="text-lg break-all font-semibold">{item.title}</p>
            </div>
          );
        })}
      </div>
      {isLoading && (
        <div className="text-3xl text-white text-center">Loading ...</div>
      )}
    </>
  );
};

export default InfintiteScroll;
