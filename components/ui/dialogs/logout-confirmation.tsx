"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { PrimaryButton } from "../buttons/primary-btn";
import { AuthStatesContext } from "@/contexts/auth-context";
import { toast } from "sonner";
import { DialogTitle } from "@radix-ui/react-dialog";
export const LogoutDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  const router = useRouter();
  const { setUser } = AuthStatesContext();
  const [loading, setLoading] = useState(false);
  const clearCookies = async () => {
    try {
      await axios.get("/api/auth/logout");
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  const handleLogout = async () => {
    try {
      setLoading(true);
      const flag = await clearCookies();
      if (flag) {
        setUser(null);
        localStorage.clear();
        toast("Logout successful!");
        router.push("/");
      } else {
        toast("Logout unsuccessful!");
      }
    } catch (e) {
      console.log(e);
      toast("Invalid error!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white border-[1px] border-[#00f4ff] rounded-[20px] max-w-[700px] h-[60vh] overflow-auto flex flex-col items-center justify-center gap-7 p-5">
        <DialogTitle className="opacity-0"></DialogTitle>
        <div className="p-6 rounded-full bg-[var(--color-primary)]">
          <LogOut className="w-[80px] h-[80px] text-white" />
        </div>
        <h1 className="text-[20px] font-[700] text-center text-powers-gradient">
          Logout
        </h1>
        <p>Are you sure you want to logout?</p>

        <div className="flex flex-row items-center justify-center w-full gap-4">
          <PrimaryButton
            onClick={() => {
              handleLogout();
            }}
            loading={loading}
            className="w-[100px] h-[45px] bg-[var(--color-primary)] max-w-fit text-[16px] rounded-[9px] flex flex-row items-center justify-center"
          >
            <div>Logout</div>
          </PrimaryButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
