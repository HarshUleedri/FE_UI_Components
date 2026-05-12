import { useRef } from "react";
import type { Recipe } from "../component/AutoComplete";

interface CacheData {
  data: Recipe[];
  timestamp: number;
}

const getTimestamp = () => Math.floor(Date.now() / 1000);

const useCache = (key: string, expirationInSeconds: number) => {
  const refCache = useRef<Record<string, CacheData>>(
    JSON.parse(localStorage.getItem(key) || "{}"),
  );

  const setCache = (query: string, data: Recipe[]) => {
    const timestamp = getTimestamp();
    refCache.current[query] = { data, timestamp };
    localStorage.setItem(key, JSON.stringify(refCache.current));
  };

  const getCache = (query: string) => {
    const cachedData = refCache.current[query];
    if (cachedData) {
      const { data, timestamp } = cachedData;
      if (getTimestamp() - timestamp < expirationInSeconds) {
        return data;
      } else {
        delete refCache.current[query];
        localStorage.setItem(key, JSON.stringify(refCache.current));
      }
    }
    return null;
  };

  return { getCache, setCache };
};

export default useCache;
