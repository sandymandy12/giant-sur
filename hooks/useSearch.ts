import { useState, useEffect } from "react";

interface SearchResult {
  // The shape of your search result object
  message: string;
}

interface UseSearchResult {
  answer: any;
  loading: boolean;
  error: Error | null;
  search: (message: string) => Promise<void>;
}

const useSearch = (): UseSearchResult => {
  const apiUrl = "http://localhost:8001/openai/";
  const [answer, setAnswer] = useState("");
  // const [answer, setAnswer] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = async (message: string): Promise<void> => {
    setLoading(true);
    setError(null);

    console.log("[message]", message);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setAnswer(data.message);
      console.log("[answer]", data.message);
    } catch (e: any) {
      console.log("[error]", e.message);
      setError(e);
    }

    setLoading(false);
  };

  return { answer, loading, error, search };
};

export default useSearch;
