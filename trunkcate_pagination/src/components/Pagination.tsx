import getPagination from "./getPagination";

interface PaginationPropType {
  products: {id: number,title:string,description: string,availabilityStatus: string,price: number, rating: number,tags:string[],images:string[]}[] 
  current : number | string,
  total: number
  onPageChange: ( value: number | string) => void
}

const Pagination = ({ current , total,onPageChange, products }:PaginationPropType) => {
  const pages = getPagination({total, current})
  
  return (
    <div className=" w-full flex items-center flex-col   ">
        {/* products */}
         <div className="text-xl mb-8 text-black grid grid-cols md:grid-cols-3 lg:grid-cols-4   gap-4">
          {
            products.length === 0 ? <p>No Product Found</p> : <>
            {
            products?.map((prod) => (
              <div className="shadow border border-gray-100 rounded-md space-y-2  px-4 py-2 " key={prod.id}>
                <div className="size-56 flex items-center jusity-center">
                  <img src={prod.images[0]} className="w-full h-full object-cover " />
                </div>
                <h3 className="text-lg font-semibold break-words">{prod.title}</h3>
                <p className="text-sm line-clamp-2 ">{prod.description}</p>
                <div className="flex gap-2 items-center">

               
                {
                  prod?.tags.map((tag,idx) => (
                    <span className="text-sm px-4 py-0.5  rounded-full border border-gray-300" key={idx}>{tag}</span>
                  ))
                }
                 </div>
                 <p> <span className="font-medium">Price : </span><span className="font-medium">$ {prod.price}</span> </p>
                 <div className="flex items-center  justify-between">
                  
                 <p className="text-sm"><span>Rating :</span> <span className="font-semibold">{prod.rating}⭐</span></p>
                 <p className="text-sm"> <span>Stock : </span> <span className={`${prod.availabilityStatus === "In Stock" ? "text-green-500 ": "text-red-500"} font-semibold`}>{prod.availabilityStatus}</span></p>
                 </div>
              </div>
            ))
          }</>
          
          
        }

         </div>
         {/* pagimation */}
  
          <div className="flex gap-2 items-center my-12">
            {
              pages.map((page,idx) => {
                return(
                page === "..." ? <span key={idx} className="text-lg px-2">. . .</span> : 
                <span onClick={() => onPageChange(page)} className={`px-2 py-1 cursor-pointer rounded border border-gray-200 text-lg font-normal hover:underline hover:bg-gray-50 ${page === current && "bg-gray-200 font-semibold"}  `}  key={idx}>{page}</span> )
              })
            }
          </div>
    </div>
  );
};

export default Pagination;