import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function useMyContests({ pageNumber }: { pageNumber: number }) {
  const [bookmarks, setBookmarks] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // 🔑

  const fetchContests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const backendURL = import.meta.env.DEV
        ? import.meta.env.VITE_DEV_BACKEND_URL
        : import.meta.env.VITE_PROD_BACKEND_URL;

      const response = await axios.get(
        `${backendURL}/user/bookmarks?page=${pageNumber}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setBookmarks(response.data.bookmarks);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch contests");
    } finally {
      setLoading(false);
    }
  }, [pageNumber]);

  useEffect(() => {
    fetchContests();
  }, [fetchContests, refreshKey]); 

  // expose a refresh trigger
  const refresh = () => setRefreshKey(prev => prev + 1);

  return { bookmarks, loading, error, refresh, setBookmarks };
}
