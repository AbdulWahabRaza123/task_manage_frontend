import { cn } from "@/lib/utils";
import React from "react";

interface BtnDetails {
  children: React.ReactNode;
  onClick?: (e?: any) => void;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const IconButton = ({
  children,
  onClick,
  className,
  loading = false,
  disabled = false,
}: BtnDetails) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "flex items-center justify-center border-[1px] h-[52px] w-[52px] border-primaryGray/40 py-3 text-black font-[600] rounded-[10px] hover:opacity-[0.8]",
        className
      )}
    >
      <div>{children}</div>
    </button>
  );
};
