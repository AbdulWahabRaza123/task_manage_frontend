import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
interface InputProps {
  value: string;
  setValue: (value: string) => void;
  type: string;
  placeholder: string;
  className?: string;
  disabled?: boolean | undefined;
  icon?: string;
}
export const PrimaryInput = ({
  value,
  setValue,
  type,
  placeholder,
  className,
  disabled,
  icon,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled || undefined}
      autoFocus={false}
      autoComplete="off"
      className={cn(
        "py-[14px] rounded-[8px] border-[#F0F0F0] border-[1px] text-p2 bg-grayShade w-full outline-none",
        className,
        icon ? "ps-10 " : "px-4"
      )}
      value={value}
      onChange={(e: any) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const IconPrimaryInput = ({
  value,
  setValue,
  type,
  placeholder,
  className,
  disabled,
  icon,
}: InputProps) => {
  return (
    <>
      <div className="relative flex items-center gap-2 w-full">
        {icon && (
          <Image
            src={icon}
            alt="mail"
            width={18}
            height={18}
            className="object-cover aspect-square absolute left-[16px] top-[17px]"
          />
        )}
        <PrimaryInput
          placeholder={placeholder}
          setValue={setValue}
          type={type}
          value={value}
          className={className}
          disabled={disabled}
          icon={icon}
        />
      </div>
    </>
  );
};
interface PasswordInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  className?: string;
  disabled?: boolean | undefined;
  icon?: string;
}
export const PasswordPrimaryInput = ({
  value,
  setValue,
  placeholder,
  className,
  disabled,
  icon,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="relative flex items-center gap-2 w-full">
        <div className="absolute right-4 top-4 z-[10]">
          {showPassword ? (
            <>
              <Eye
                className="cursor-pointer text-primary"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            </>
          ) : (
            <>
              <EyeClosed
                className="cursor-pointer text-primary"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            </>
          )}
        </div>
        <IconPrimaryInput
          placeholder={placeholder}
          setValue={setValue}
          type={showPassword ? "text" : "password"}
          value={value}
          className={className}
          disabled={disabled}
          icon={icon}
        />
      </div>
    </>
  );
};
