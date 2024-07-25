import { ReactNode } from "react";

export interface EditFormDropdownOptionGroupProps {
  children: ReactNode;
}

export function EditFormDropdownOptionGroup({
  children,
}: EditFormDropdownOptionGroupProps) {
  return (
    <>
      <p
        className="font-medium text-sm py-2 mx-1 pointer-events-none"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="!opacity-55">Group 1</span>
      </p>
      <div className="ml-2">{children}</div>
    </>
  );
}
