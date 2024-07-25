import { ReactNode } from "react";
import {
  EditFormButton,
  EditFormDropdown,
  EditFormDropdownOption,
  EditFormDropdownOptionGroup,
} from "../index";

interface EditFormProps {
  children: ReactNode;
}

export function EditForm({ children }: EditFormProps) {
  return (
    <form
      className="max-w-64 m-auto flex flex-col gap-2"
      onSubmit={(event) => event.preventDefault()}
    >
      {children}
    </form>
  );
}

EditForm.Button = EditFormButton;
EditForm.Dropdown = EditFormDropdown;
EditForm.DropdownOption = EditFormDropdownOption;
EditForm.DropdownOptionGroup = EditFormDropdownOptionGroup;
