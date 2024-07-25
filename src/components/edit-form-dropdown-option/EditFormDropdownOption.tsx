import classNames from "classnames";
import { EditFormDropdownOptionProps } from "../../types";

export function EditFormDropdownOption({
  children,
  isLast,
}: EditFormDropdownOptionProps) {
  return (
    <p
      className={classNames(
        "p-2 w-full hover:bg-gray-100 rounded-lg cursor-pointer",
        {
          "border-b-[0.5px] border-gray-100 border-solid": !isLast,
        }
      )}
    >
      {children}
    </p>
  );
}
