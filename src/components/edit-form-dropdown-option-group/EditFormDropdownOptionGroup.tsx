import { EditFormDropdownOptionGroupProps } from "../../types";

export function EditFormDropdownOptionGroup({
  children,
  title,
}: EditFormDropdownOptionGroupProps) {
  return (
    <>
      <p
        className="font-medium text-sm py-2 mx-1 pointer-events-none"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="!opacity-55">{title}</span>
      </p>
      <div className="ml-2">{children}</div>
    </>
  );
}
