import { useState, useEffect } from "react";
import { getRequest } from "@/utils/api";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAjax = async () => {
      setLoading(true);
      const { data = {} } = await getRequest(url);
      setData(data);
      setLoading(false);
    };
    fetchAjax();
  }, [url]);
  return [data, loading];
};
