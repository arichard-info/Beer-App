import { useState, useEffect } from "react";
import { authGetRequest } from "./../index";

export const useGetRequest = url => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrl = async () => {
      setLoading(true);
      const { data = {} } = await authGetRequest(url);
      setData(data);
      setLoading(false);
    };
    fetchUrl();
  }, [url]);
  return [data, loading];
};
