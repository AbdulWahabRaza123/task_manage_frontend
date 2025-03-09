"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const SelectInput = ({
  options,
  value,
  setValue,
  className,
  disabled = false,
  placeholder,
}: {
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  setValue: (val: string) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}) => {
  return (
    <>
      <Select
        onValueChange={(value) => {
          if (disabled) {
            return;
          }
          setValue(value);
        }}
        value={value}
      >
        <SelectTrigger
          className={cn(
            "w-[350px] rounded-[10px] h-[47px] bg-[#E6E9EE] py-2",
            className
          )}
        >
          <SelectValue placeholder={placeholder || "Select a value"} />
        </SelectTrigger>
        <SelectContent className="bg-white max-h-[300px] overflow-auto z-[100000]">
          {options.map((val) => {
            return (
              <SelectItem
                key={val.label}
                value={val.value}
                className="bg-white cursor-pointer"
              >
                {val.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};
