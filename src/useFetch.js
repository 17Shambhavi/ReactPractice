import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    setError("");
    setData(null);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong!");
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

export default useFetch;