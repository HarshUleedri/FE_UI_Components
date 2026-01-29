import { useCallback, useEffect, useRef, useState } from "react";

interface ProductType {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export const useInfiniteScroll = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const abortRef = useRef<AbortController | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);

    abortRef.current?.abort();
    abortRef.current = new AbortController();
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${page * 10}&select=title,price,images`,
        {
          signal: abortRef.current.signal,
        },
      );

      if (!res.ok) throw new Error("fetching failed");

      const data = await res.json();
      console.log(data);

      setProducts(data.products);
      setTotalItems(data.total);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    () => abortRef.current?.abort();
  }, []);

  const lastItem = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;

      observerRef.current?.disconnect();

      observerRef.current = new IntersectionObserver((enteries) => {
        if (enteries[0].isIntersecting && products.length < totalItems) {
          fetchProducts();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, totalItems],
  );
  
  return { lastItem, products, isLoading };
};
