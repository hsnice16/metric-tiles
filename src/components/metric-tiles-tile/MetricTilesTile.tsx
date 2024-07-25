import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { SnapshotValue } from "../../utils";
import classNames from "classnames";
import { AreaChart, PlusIcon } from "../index";

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

  const [state, setState] = useState({
    showRightBorder: false,
    showTopBorder: false,
    componentWillHaveLeftBorder: false,
  });

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

  const { showRightBorder, showTopBorder, componentWillHaveLeftBorder } = state;
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
          "min-w-56 h-32 text-primaryText flex-1 font-work-sans cursor-pointer [&:hover_.plus-icon]:flex",
          {
            "before:content-[''] before:block before:absolute before:-mt-4 before:calc-width before:border-solid before:border-darkGray before:border-t-[0.5px]":
              showTopBorder,
            "pr-6": showRightBorder,
            "pl-6": componentWillHaveLeftBorder,
            "pl-8": showRightBorder && !componentWillHaveLeftBorder,
            "pr-8": !showRightBorder && componentWillHaveLeftBorder,
            "px-8": !showRightBorder && !componentWillHaveLeftBorder,
          }
        )}
        ref={tileRef}
      >
        <div className="flex flex-col relative h-full w-full">
          <PlusIcon
            direction="left"
            parentHasLeftBorder={componentWillHaveLeftBorder}
          />

          <PlusIcon direction="right" parentHasRightBorder={showRightBorder} />

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
      </div>

      {showRightBorder ? (
        <span className="block h-32 border-solid border-darkGray border-r-[0.5px]" />
      ) : null}
    </>
  );
}
