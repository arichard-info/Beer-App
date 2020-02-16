import { useState, useEffect } from "react";
import { authGetRequest } from "./../index";

export const useGetRequest = url => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrl = async () => {
    const { data = {} } = await authGetRequest(url);
    setData(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchUrl();
  }, [url]);
  return [data, loading];
};
