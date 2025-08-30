import { ContestType } from "@/types/contest_type";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UseGetContestById(contestId: string) {
  const [contest, setContest] = useState<ContestType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const backendURL = import.meta.env.DEV
    ? import.meta.env.VITE_DEV_BACKEND_URL
    : import.meta.env.VITE_PROD_BACKEND_URL;

  useEffect(() => {
    const fetchContest = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${backendURL}/contests/getContestById/${contestId}`
        );
        console.log("Contest data:", response.data);

        setContest(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch contest");
      } finally {
        setLoading(false);
      }
    };

    fetchContest();
  }, [contestId]);

  console.log("Contest data:", contest);

  return { contest, loading, error };
}
