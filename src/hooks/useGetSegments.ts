import { useEffect, useState } from "react";
import axios from "axios";

const SEGMENTS_URL = "https://sundial-fe-interview.vercel.app/api/segments";

interface SegmentValue {
  segmentId: string;
  displayName: string;
}

export interface Segment {
  segmentKey: string;
  displayName: string;
  values: SegmentValue[];
}

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
