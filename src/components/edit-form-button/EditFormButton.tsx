import classNames from "classnames";

export interface EditFormButtonProps {
  type: "add" | "cancel";
}

export function EditFormButton({ type }: EditFormButtonProps) {
  return (
    <button
      className={classNames("rounded-lg flex-1 px-1 py-1.5 font-medium", {
        "bg-primary text-white": type === "add",
        "bg-red-100 text-red-900": type === "cancel",
      })}
    >
      {type === "add" ? "Add" : <span className="opacity-80">Cancel</span>}
    </button>
  );
}
