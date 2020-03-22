import { useState, useEffect } from "react";
import { getRequest } from "@/utils/api";

export const useGetRequest = url => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrl = async () => {
      setLoading(true);
      const { data = {} } = await getRequest(url);
      setData(data);
      setLoading(false);
    };
    fetchUrl();
  }, [url]);
  return [data, loading];
};

export const useBeers = (search = "", filters = {}) => {
  return useGetRequest("/api/beers");
};
