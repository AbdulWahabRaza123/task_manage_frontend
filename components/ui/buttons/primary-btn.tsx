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

export const PrimaryButton = ({
  children,
  onClick,
  className,
  loading = false,
  disabled = false,
}: BtnDetails) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "bg-[var(--color-primary)] cursor-pointer flex items-center justify-center text-p2 text-white font-[600] py-5 lg:w-full rounded-[10px] hover:opacity-[0.8]",
        className
      )}
    >
      {loading && <SpinnerBtn />}
      <div>{children}</div>
    </Button>
  );
};
