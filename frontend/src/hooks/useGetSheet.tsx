import axios from "axios";
import { useEffect, useState } from "react";

export default function UseGetSheet(
  sheet_name: string,
  sheet_limit: number = 10,
  sheet_tags: string[] = []
) {
  const [sheetData, setSheetData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSheetData = async () => {
    const backendURL = import.meta.env.DEV
      ? import.meta.env.VITE_DEV_BACKEND_URL
      : import.meta.env.VITE_PROD_BACKEND_URL;

    try {
      setLoading(true);
      // Encode each tag separately to handle spaces or special characters
      const encodedTags = sheet_tags.map(encodeURIComponent).join(",");
      const response = await axios.get(
        `${backendURL}/sheets/get_sheet/${sheet_name}?limit=${sheet_limit}&tags=${encodedTags}`
      );
      setSheetData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch sheet data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSheetData();
    // Use JSON.stringify(sheet_tags) so the effect runs only if content changes
    // const tags = ['array', 'binary search'];
    // Even if the tags stay the same, a new array like ['array', 'binary search'] is a
    // new reference every render, so React treats it as changed.
  }, [sheet_name, sheet_limit, JSON.stringify(sheet_tags)]);

  return { sheetData, loading, error };
}
