import { useState, useEffect } from "react";
import axios from "axios";

export default function useUpcommingContests() {
  const [upcomingContests, setUpcomingContests] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContests = async () => {
    setLoading(true);
    setError(null);
    try {
      const backendURL = import.meta.env.DEV
        ? import.meta.env.VITE_DEV_BACKEND_URL
        : import.meta.env.VITE_PROD_BACKEND_URL;
      const response = await axios.get(
        `${backendURL}/contests/upcomming_contest`
      );
      setUpcomingContests(response.data.upcomingContests);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch contests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  return { upcomingContests, loading, error };
}
