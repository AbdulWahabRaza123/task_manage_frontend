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

export const OutlineButton = ({
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
        "flex items-center bg-white text-primary text-p2 justify-center cursor-pointer border-[1px] border-primary font-[600] h-[48px] lg:w-full rounded-[10px] hover:opacity-[0.8]",
        className
      )}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && <SpinnerBtn />}
        <div>{children}</div>
      </div>
    </Button>
  );
};
