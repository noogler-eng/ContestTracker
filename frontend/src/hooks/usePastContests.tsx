import { useState, useEffect } from "react";
import axios from "axios";

export default function usePastContests({
  pageNumber,
}: {
  pageNumber: number;
}) {
  const [pastContests, setPastContests] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PROD_BACKEND_URL}/contests/past_contest?page=${pageNumber}`
      );
      console.log("response incomming", response.data.pastContests);
      setPastContests(response.data.pastContests);
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

  return { pastContests, loading, error };
}
