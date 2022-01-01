import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        return setResult(data);
      })
      .catch((err) => {
        setLoading(false);
        console.error(`Error trying to fetch ${url}: ${err}`);
      });
  }, [url]);

  return { result, loading };
};

export default useFetch;
