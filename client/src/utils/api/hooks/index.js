import { useState, useEffect } from "react";
import { getRequest } from "@/utils/api";

export const useGetRequest = (url, dependencies) => {
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
  }, [url, dependencies]);
  return [data, loading];
};

export const useBeers = params => {
  let url = "/api/beers";
  if (params) {
    const { search = "", page = 0 } = params;
    if (search) url = url.concat(`?search=${search}`);
    if (page) url = url.concat(`&page=${page}`);
  }
  return useGetRequest(url, JSON.stringify(params));
};
