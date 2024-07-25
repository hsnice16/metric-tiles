import { useEffect, useState } from "react";
import axios from "axios";
import { Segment } from "../types";

const SEGMENTS_URL = "https://sundial-fe-interview.vercel.app/api/segments";

export function useGetSegments() {
  const [segments, setSegments] = useState<Segment[]>([]);

  useEffect(() => {
    (async function fetchSegments() {
      try {
        const { data } = await axios.get(SEGMENTS_URL);
        setSegments(data.data);
      } catch (error) {
        console.error("segment-error", error);
      }
    })();
  }, []);

  return segments;
}
