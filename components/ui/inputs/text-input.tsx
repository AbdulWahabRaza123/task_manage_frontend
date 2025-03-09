import React from "react";
import { IconPrimaryInput, PasswordPrimaryInput } from "./primary-input";
import { cn } from "@/lib/utils";
import { SelectInput } from "./select-input";
import { PrimaryTextArea } from "./primary-textarea";

export const TextInput = ({
  value,
  setValue,
  type,
  title,
  placeholder,
  className,
  disabled,
  containerClassName,
  options,
  icon,
}: {
  value: string;
  setValue: (value: string) => void;
  type: string;
  title: string;
  placeholder: string;
  className?: string;
  disabled?: boolean;
  containerClassName?: string;
  icon?: string;
  options?: {
    label: string;
    value: string;
  }[];
}) => {
  return (
    <div
      onClick={(e) => {
        e?.stopPropagation();
      }}
      className={cn(
        "flex flex-col items-start gap-1 w-full",
        containerClassName
      )}
    >
      <p className="text-tertiary font-bold">{title}</p>
      {type !== "password" && type !== "select" && type !== "textarea" && (
        <IconPrimaryInput
          value={value}
          setValue={setValue}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={className}
          icon={icon}
        />
      )}
      {type === "textarea" && (
        <PrimaryTextArea
          value={value}
          setValue={setValue}
          placeholder={placeholder}
          disabled={disabled}
          className={className}
        />
      )}
      {type === "select" && options && (
        <>
          <SelectInput
            options={options}
            setValue={setValue}
            value={value}
            className={className}
            placeholder={placeholder}
          />
        </>
      )}
      {type === "password" && (
        <>
          <PasswordPrimaryInput
            placeholder={placeholder}
            setValue={setValue}
            value={value}
            className={className}
            disabled={disabled}
            icon={icon}
          />
        </>
      )}
    </div>
  );
};
