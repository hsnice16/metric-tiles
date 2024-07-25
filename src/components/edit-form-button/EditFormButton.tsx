import classNames from "classnames";
import { EditFormButtonProps } from "../../types";

export function EditFormButton({
  type,
  onClick,
  isLoading,
  isDisabled,
}: EditFormButtonProps) {
  return (
    <button
      className={classNames("rounded-lg flex-1 px-1 py-1.5 font-medium", {
        "bg-primary text-white": type === "add",
        "bg-red-100 text-red-900": type === "cancel",
        "opacity-75 cursor-not-allowed": isDisabled,
      })}
      onClick={onClick}
    >
      {type === "add" && !isLoading ? "Add" : null}
      {type === "add" && isLoading ? "Adding..." : null}
      {type === "cancel" ? <span className="opacity-80">Cancel</span> : null}
    </button>
  );
}
