import { cn } from "@/lib/utils";
import React from "react";
import { SpinnerBtn } from "../spinner-btn";
import { Button } from "../button";

interface BtnDetails {
  children: React.ReactNode;
  onClick?: (e?: any) => void;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const InfoButton = ({
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
        "bg-white flex text-h5 items-center justify-center outline-none text-black font-[600] py-4 px-4 max-w-fit border-none",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {loading && <SpinnerBtn />}
        <div>{children}</div>
      </div>
    </button>
  );
};
