import { useState, useEffect } from "react";
import axios from "axios";

export default function useMyContests({ pageNumber }: { pageNumber: number }) {
  const [bookmarks, setBookmarks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PROD_BACKEND_URL}/user/bookmarks?page=${pageNumber}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("nook: ", bookmarks);
      setBookmarks(response.data.bookmarks);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch contests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, [pageNumber]);

  return { bookmarks, loading, error };
}
