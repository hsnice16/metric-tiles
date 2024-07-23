import { useEffect, useMemo, useState } from "react";
import { Metric } from "./useGetMetrics";
import { Segment } from "./useGetSegments";
import { fetchSnapshot, SnapshotData } from "../utils";

type UseInitialDataParams = {
  metrics: Metric[];
  segments: Segment[];
};

export function useInitialData({ metrics, segments }: UseInitialDataParams) {
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<SnapshotData>();

  const dailyActiveUsersMetric = useMemo(() => {
    return metrics.find((metric) => metric.id === "daily-active-users");
  }, [metrics]);

  const indiaCountrySegment = useMemo(() => {
    const countrySegment = segments.find(
      (segment) => segment.segmentKey === "country"
    );
    const indiaCountrySegmentValue = countrySegment?.values.find(
      (value) => value.segmentId === "india"
    );

    return {
      segmentKey: countrySegment?.segmentKey,
      segmentId: indiaCountrySegmentValue?.segmentId,
      displayName: indiaCountrySegmentValue?.displayName,
    };
  }, [segments]);

  useEffect(() => {
    (async function () {
      const data = await fetchSnapshot({
        metric: dailyActiveUsersMetric?.id ?? "",
        segmentKey: indiaCountrySegment?.segmentKey ?? "",
        segmentId: indiaCountrySegment?.segmentId ?? "",
      });

      setIsLoading(false);
      setInitialData(data as SnapshotData);
    })();
  }, [
    dailyActiveUsersMetric?.id,
    indiaCountrySegment?.segmentId,
    indiaCountrySegment?.segmentKey,
  ]);

  return {
    isLoading,
    initialData,
  };
}
