import { useLayoutEffect, useRef, useState } from "react";
import { SnapshotValue } from "../../utils";
import classNames from "classnames";
import { EditForm, ViewData } from "../index";

export type ShowingInfoIn = "daily" | "weekly" | "monthly";

export interface MetricTilesTileProps {
  metric: string;
  segmentValue: string;
  showingInfoIn: ShowingInfoIn;
  infoOfLast: number;
  snapshotValues: SnapshotValue[];
  showEditForm?: boolean;
}

export function MetricTilesTile({
  metric,
  segmentValue,
  showingInfoIn,
  infoOfLast,
  snapshotValues,
  showEditForm,
}: MetricTilesTileProps) {
  const [state, setState] = useState({
    showRightBorder: false,
    showTopBorder: false,
    componentWillHaveLeftBorder: false,
  });

  const tileRef = useRef<HTMLDivElement>(null);
  const { showRightBorder, showTopBorder, componentWillHaveLeftBorder } = state;

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

  return (
    <>
      <div
        ref={tileRef}
        className={classNames(
          "min-w-56 h-32 text-primaryText flex-1 font-work-sans",
          {
            "cursor-pointer [&:hover_.plus-icon]:flex": !showEditForm,
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
        {showEditForm ? (
          <EditForm>
            <EditForm.Dropdown>
              <EditForm.DropdownOption>One</EditForm.DropdownOption>
              <EditForm.DropdownOption>Two</EditForm.DropdownOption>

              <EditForm.DropdownOptionGroup>
                <EditForm.DropdownOption>Three</EditForm.DropdownOption>
                <EditForm.DropdownOption>Four</EditForm.DropdownOption>
              </EditForm.DropdownOptionGroup>
            </EditForm.Dropdown>

            <div className="flex justify-between items-center gap-4">
              <EditForm.Button type="cancel" />
              <EditForm.Button type="add" />
            </div>
          </EditForm>
        ) : (
          <ViewData
            metric={metric}
            segmentValue={segmentValue}
            showingInfoIn={showingInfoIn}
            infoOfLast={infoOfLast}
            snapshotValues={snapshotValues}
            parentHasLeftBorder={componentWillHaveLeftBorder}
            parentHasRightBorder={showRightBorder}
          />
        )}
      </div>

      {showRightBorder ? (
        <span className="block h-32 border-solid border-gray-800 border-r-[0.5px]" />
      ) : null}
    </>
  );
}
