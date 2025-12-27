import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";

const App = () => {
  const [currentPage, setCurrentPage] = useState<number | string>(1)
  const [products, setProducts] = useState<{limit: number; products: [] ; skip: number; total: number} |null >(null)

  const total = Math.ceil((products?.total || 0 ) / 10 )
  console.log(total)

  useEffect(() => {
    (async function () { 
      try {
        const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${+currentPage * 10 - 10 }&select=title,price,images,availabilityStatus,rating,tags,description`)
      const data = await res.json()
      console.log(data)
      setProducts(data)
      } catch (error) {
         console.log("something went wrong", error)
      }
    })()
  }, [currentPage])

  return (
    <>
    <header className="bg-gray-500 h-16 text-center flex items-center justify-center text-2xl mb-8 text-white ">
      Products
    </header>
    <main className="max-w-7xl mx-auto">
      <Pagination products={products?.products || []} current={currentPage} total={total} onPageChange={setCurrentPage} />
    </main>
    <footer className="bg-gray-500 h-32 text-center flex items-center justify-center text-2xl mt-8 text-white "> Footer</footer>
    </>
  );
};

export default App;