import { ReactNode } from "react";

export interface EditFormDropdownOptionProps {
  children: ReactNode;
}

export function EditFormDropdownOption({
  children,
}: EditFormDropdownOptionProps) {
  return (
    <p className="p-2 w-full hover:bg-gray-100 rounded-lg cursor-pointer">
      {children}
    </p>
  );
}
