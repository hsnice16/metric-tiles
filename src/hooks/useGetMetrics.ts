import { useEffect, useState } from "react";
import axios from "axios";
import { Metric } from "../types";

const METRICS_URL = "https://sundial-fe-interview.vercel.app/api/metrics";

export function useGetMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    (async function fetchMetrics() {
      try {
        const { data } = await axios.get(METRICS_URL);
        setMetrics(data.data);
      } catch (error) {
        console.error("metric-error", error);
      }
    })();
  }, []);

  return metrics;
}
