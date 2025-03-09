"use client";
import { Bell, ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LogoutDialog } from "./dialogs/logout-confirmation";
const dropdownItems = [
  {
    label: "Log Out",
    icon: "/assets/nav/logout.svg",
    link: "#logout",
  },
];
export const Navbar = () => {
  const router = useRouter();
  const [openLogout, setOpenLogout] = useState(false);
  return (
    <>
      <LogoutDialog open={openLogout} setOpen={setOpenLogout} />
      <nav className="h-[100px] flex items-center justify-between p-4 bg-[var(--color-primary)]">
        <div className="flex items-center gap-2">
          <h1 className="text-white text-h2 font-bolder">Logo</h1>
        </div>
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute top-[0px] right-0 text-[12px] bg-white text-primary rounded-full w-[14px] h-[14px] flex items-center justify-center">
                  1
                </div>
                <Bell className="text-white w-[28px] h-[28px]" />
              </div>
              <div className="h-[40px] w-[1px] bg-white"></div>
              <div className="flex items-center gap-4 text-white text-p2 font-bolder">
                <p className="text-white">Ali Hassan</p>
                <Image
                  src="/assets/placeholders/profile.svg"
                  alt="profile"
                  className=""
                  width={50}
                  height={50}
                />
                <ChevronDown />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="bg-white">
            <div className="flex flex-col">
              {dropdownItems.map((val, index) => {
                return (
                  <div
                    onClick={() => {
                      if (val.link === "#logout") {
                        setOpenLogout(true);
                      } else {
                        router.push(val.link);
                      }
                    }}
                    key={val.label}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-400/10 py-2 px-4 rounded-md"
                  >
                    <Image
                      src={val.icon}
                      width={20}
                      height={20}
                      className="object-cover"
                      alt="logo"
                    />
                    <p
                      className={cn(
                        "",
                        index === dropdownItems.length - 1 ? "text-red-600" : ""
                      )}
                    >
                      {val.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </nav>
    </>
  );
};
