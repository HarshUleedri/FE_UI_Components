import { useEffect, useMemo, useState } from "react";
import PaginatedList from "../../components/PaginatedList";
import { Filter } from "../../components/Filter";
import { useFilter } from "../../context/ShoppingCartContext";

const Home = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<{
    limit: number;
    products: {
      id: number;
      title: string;
      description: string;
      availabilityStatus: string;
      price: number;
      rating: number;
      tags: string[];
      images: string[];
    }[];
    skip: number;
    total: number;
  } | null>(null);

  const {
    filterState: { inStock, rating, searchQuery, sortBy },
  } = useFilter();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products?limit=10&skip=${+currentPage * 10 - 10}&select=title,price,images,availabilityStatus,rating,tags,description`,
        );
        const data = await res.json();
        setData(data);

        if (!res.ok) {
          throw new Error("fetching data failed");
        }
      } catch (error: any) {
        console.log("api call failed", error.message);
      }
    })();
  }, [currentPage]);

  const filteredData = useMemo(() => {
    let products: {
      id: number;
      title: string;
      description: string;
      availabilityStatus: string;
      price: number;
      rating: number;
      tags: string[];
      images: string[];
    }[] = data?.products || [];

    if (searchQuery) {
      products = products.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (inStock === "In Stock") {
      products = products.filter(
        (item) => item.availabilityStatus !== "Out of Stock",
      );
    }
    if (rating) {
      products = products.filter((item) => {
        // console.log(item.rating);
        console.log(Math.floor(item.rating));
        // console.log(Math.floor(item.rating) === rating);

        return Math.ceil(item.rating) == rating;
      });
    }
    if (sortBy) {
      products = [...products].sort((a, b) => {
        return sortBy === "dsc" ? b.price - a.price : a.price - b.price;
      });
    }

    return products;
  }, [sortBy, currentPage, inStock, data, rating, searchQuery]);

  return (
    <div className="flex  gap-4">
      <div className="hidden lg:block max-w-72  w-full p-6 border-gray-200 border-r">
        <Filter />
      </div>

      <PaginatedList
        changeCurrentPage={setCurrentPage}
        currentPage={currentPage}
        productList={filteredData || []}
        total={data?.total || 0}
      />
    </div>
  );
};

export default Home;
