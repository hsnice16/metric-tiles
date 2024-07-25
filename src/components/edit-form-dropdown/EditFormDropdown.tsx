import classNames from "classnames";
import { useState } from "react";
import { EditFormDropdownProps } from "../../types";

export function EditFormDropdown({
  notClickable,
  children,
  title,
}: EditFormDropdownProps) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      onClick={notClickable ? undefined : () => setShowOptions((prev) => !prev)}
      className={classNames(
        "font-work-sans bg-gray-100 flex justify-between items-center rounded-lg px-1 py-1.5 relative",
        { "cursor-pointer": !notClickable }
      )}
    >
      <p className="font-medium pl-2 pr-2 opacity-80">{title}</p>
      <span
        className={classNames(
          "transition-transform duration-700 material-symbols-rounded text-gray-800 text-lg",
          {
            "-rotate-180": showOptions,
            "-rotate-0": !showOptions,
          }
        )}
      >
        keyboard_arrow_down
      </span>

      {/* Options */}
      {!notClickable ? (
        <div
          className={classNames(
            "absolute transition-all duration-300 bg-white w-full top-11 left-0 shadow-md rounded-lg z-20 cursor-auto pointer-events-none border-[0.5px] border-solid border-gray-100 overflow-y-auto",
            {
              "opacity-100 [&_*]:opacity-100 [&_*]:pointer-events-auto max-h-80 p-2":
                showOptions,
              "opacity-0 [&_*]:opacity-0 [&_*]:pointer-events-none max-h-0 p-0":
                !showOptions,
            }
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
