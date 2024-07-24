import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { SnapshotValue } from "../../utils";
import { AreaChart } from "./AreaChart";
import classNames from "classnames";

export type ShowingInfoIn = "daily" | "weekly" | "monthly";

export interface MetricTilesTileProps {
  metric: string;
  segmentValue: string;
  showingInfoIn: ShowingInfoIn;
  infoOfLast: number;
  snapshotValues: SnapshotValue[];
}

export function MetricTilesTile({
  metric,
  segmentValue,
  showingInfoIn,
  infoOfLast,
  snapshotValues,
}: MetricTilesTileProps) {
  const tileRef = useRef<HTMLDivElement>(null);
  const [showRightBorder, setShowRightBorder] = useState(false);
  const [showTopBorder, setShowTopBorder] = useState(false);

  useLayoutEffect(() => {
    function setBorder() {
      if (tileRef.current) {
        let nextSibling = tileRef.current.nextSibling;
        if (nextSibling?.nodeName === "SPAN") {
          nextSibling = nextSibling.nextSibling;
        }

        let previousSibling = tileRef.current.previousSibling;
        if (previousSibling?.nodeName === "SPAN") {
          previousSibling = previousSibling.previousSibling;
        }

        if (
          nextSibling !== null &&
          tileRef.current.offsetLeft <
            (nextSibling as HTMLDivElement).offsetLeft
        ) {
          setShowRightBorder(true);
        } else {
          setShowRightBorder(false);
        }

        if (
          previousSibling !== null &&
          (previousSibling as HTMLDivElement).offsetLeft >=
            tileRef.current.offsetLeft
        ) {
          setShowTopBorder(true);
        } else {
          setShowTopBorder(false);
        }
      }
    }

    function handleResize() {
      setBorder();
    }

    setBorder();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const metricCount = useMemo(() => {
    switch (showingInfoIn) {
      case "daily":
        return `${infoOfLast}d`;
      case "weekly":
        return `${infoOfLast}w`;
      case "monthly":
        return `${infoOfLast}m`;
    }
  }, [showingInfoIn, infoOfLast]);

  return (
    <>
      <div
        className={classNames(
          "min-w-56 h-32 text-primaryText flex-1 font-work-sans flex flex-col",
          {
            "before:content-[''] before:block before:absolute before:-mt-4 before:calc-width before:border-solid before:border-darkGray before:border-t-[0.5px]":
              showTopBorder,
          }
        )}
        ref={tileRef}
      >
        <h2 className="font-medium text-sm h-10 mr-auto">
          {metric}, {segmentValue}
        </h2>

        <div className="flex flex-1 justify-between">
          <div className="flex flex-col gap-1 self-end">
            <p className="font-medium text-3xl">52.5K</p>
            <p className="font-normal text-sm flex items-center">
              <span className="material-symbols-rounded text-primary text-lg">
                arrow_upward_alt
              </span>
              3.5%
              <span className="text-darkGray flex items-center ml-1">
                <span className="material-symbols-rounded text-lg -mt-[2px]">
                  change_history
                </span>
                {metricCount}
              </span>
            </p>
          </div>

          <AreaChart className="flex-1 -mr-[14px]" values={snapshotValues} />
        </div>
      </div>

      {showRightBorder ? (
        <span className="block h-32 border-solid border-darkGray border-r-[0.5px]" />
      ) : null}
    </>
  );
}
