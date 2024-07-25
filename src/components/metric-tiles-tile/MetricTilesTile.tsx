import { useLayoutEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { EditData, ViewData } from "../index";
import { useMetricContext } from "../../hooks";
import { MetricTilesTileProps } from "../../types";

export function MetricTilesTile({ kpi }: MetricTilesTileProps) {
  const [state, setState] = useState({
    showRightBorder: false,
    showTopBorder: false,
    componentWillHaveLeftBorder: false,
  });

  const { metrics, segments } = useMetricContext();
  const tileRef = useRef<HTMLDivElement>(null);

  const { showRightBorder, showTopBorder, componentWillHaveLeftBorder } = state;
  const { _id, type, data } = kpi;

  useLayoutEffect(() => {
    function handleResize() {
      if (tileRef.current) {
        let showRightBorder = false;
        let showTopBorder = false;
        let componentWillHaveLeftBorder = false;

        let nextSibling = tileRef.current.nextSibling;
        let previousSibling = tileRef.current.previousSibling;
        const currentElementOffsetLeft = tileRef.current.offsetLeft;

        if (nextSibling?.nodeName === "SPAN") {
          nextSibling = nextSibling.nextSibling;
        }

        if (previousSibling?.nodeName === "SPAN") {
          previousSibling = previousSibling.previousSibling;
        }

        if (
          nextSibling !== null &&
          currentElementOffsetLeft < (nextSibling as HTMLDivElement).offsetLeft
        ) {
          showRightBorder = true;
        }

        if (previousSibling !== null) {
          const previousSiblingOffsetLeft = (previousSibling as HTMLDivElement)
            .offsetLeft;

          if (previousSiblingOffsetLeft >= currentElementOffsetLeft) {
            showTopBorder = true;
          }

          if (previousSiblingOffsetLeft < currentElementOffsetLeft) {
            componentWillHaveLeftBorder = true;
          }
        }

        setState({
          showRightBorder,
          showTopBorder,
          componentWillHaveLeftBorder,
        });
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const metric = useMemo(
    () => metrics.find((metric) => metric.id === data.metric),
    [data.metric, metrics]
  );

  const segmentValue = useMemo(() => {
    const segment = segments.find(
      (segment) => segment.segmentKey === data.segmentKey
    );

    return segment?.values.find((value) => value.segmentId === data.segmentId);
  }, [data.segmentId, data.segmentKey, segments]);

  return (
    <>
      <div
        ref={tileRef}
        className={classNames(
          "min-w-56 h-32 text-primaryText flex-1 font-work-sans",
          {
            "cursor-pointer [&:hover_.plus-icon]:flex": type !== "edit",
            "before:content-[''] before:block before:absolute before:-mt-4 before:calc-width before:border-solid before:border-gray-800 before:border-t-[0.5px]":
              showTopBorder,
            "pr-6": showRightBorder,
            "pl-6": componentWillHaveLeftBorder,
            "pl-7": showRightBorder && !componentWillHaveLeftBorder,
            "pr-7": !showRightBorder && componentWillHaveLeftBorder,
            "px-7": !showRightBorder && !componentWillHaveLeftBorder,
          }
        )}
      >
        {type === "edit" ? (
          <EditData
            activeMetricId={metric?.id}
            activeSegmentId={segmentValue?.segmentId}
          />
        ) : (
          <ViewData
            metric={metric?.displayName ?? ""}
            metricId={metric?.id}
            segmentValue={segmentValue?.displayName ?? ""}
            infoOfLast={data.values?.length}
            snapshotValues={data.values}
            parentHasLeftBorder={componentWillHaveLeftBorder}
            parentHasRightBorder={showRightBorder}
            kpiId={_id}
          />
        )}
      </div>

      {showRightBorder ? (
        <span className="block h-32 border-solid border-gray-800 border-r-[0.5px]" />
      ) : null}
    </>
  );
}
