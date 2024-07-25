import classNames from "classnames";

interface PlusIconProps {
  direction: "left" | "right";
  parentHasRightBorder?: boolean;
  parentHasLeftBorder?: boolean;
}

export function PlusIcon({
  direction,
  parentHasRightBorder,
  parentHasLeftBorder,
}: PlusIconProps) {
  return (
    <div
      className={classNames(
        "absolute w-5 h-5 rounded-full bg-primary hidden items-center justify-center top-1/2 -translate-y-1/2 z-10 plus-icon",
        {
          "left-0 ": direction === "left",
          "-translate-x-[175%]": direction === "left" && parentHasLeftBorder,
          "-translate-x-[120%]": direction === "left" && !parentHasLeftBorder,

          "right-0": direction === "right",
          "translate-x-[175%]": direction === "right" && parentHasRightBorder,
          "translate-x-[120%]": direction === "right" && !parentHasRightBorder,
        }
      )}
    >
      <span className="material-symbols-rounded text-white text-lg">add</span>
    </div>
  );
}
