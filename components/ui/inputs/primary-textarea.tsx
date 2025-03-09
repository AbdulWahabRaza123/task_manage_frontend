import { cn } from "@/lib/utils";
import React from "react";
interface InputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  className?: string;
  disabled?: boolean | undefined;
}
export const PrimaryTextArea = ({
  value,
  setValue,
  placeholder,
  className,
  disabled,
}: InputProps) => {
  return (
    <textarea
      placeholder={placeholder}
      disabled={disabled || undefined}
      autoFocus={false}
      rows={7}
      className={cn(
        "py-[14px] rounded-[8px] border-[#F0F0F0] border-[1px] text-p2 bg-grayShade w-full outline-none px-4",
        className
      )}
      value={value}
      onChange={(e: any) => {
        setValue(e.target.value);
      }}
    />
  );
};
