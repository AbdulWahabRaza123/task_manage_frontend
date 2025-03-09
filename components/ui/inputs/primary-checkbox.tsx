import { cn } from "@/lib/utils";
import React from "react";
interface InputProps {
  value: boolean;
  setValue?: (value: boolean) => void;
  className?: string;
  disabled?: boolean | undefined;
}
export const PrimaryCheckbox = ({
  value,
  setValue,
  className,
  disabled,
}: InputProps) => {
  return (
    <input
      disabled={disabled}
      type="checkbox"
      color="success"
      checked={value}
      className={cn(
        value ? "accent-primary" : "",
        "border-none outline-none w-5 h-5 rounded-md cursor-pointer",
        className
      )}
      onChange={(event) => {
        if (setValue) {
          setValue(event.target.checked);
        }
      }}
    />
  );
};
