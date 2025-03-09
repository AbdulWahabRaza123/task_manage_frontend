"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const sidebarMenuItems = [
  {
    label: "Task Management",
    icon: "/assets/sidebar/home.svg",
    link: "/user",
  },
];

export const SidebarMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <aside className="bg-white rounded-md py-6 flex flex-col w-full">
      {sidebarMenuItems.map((val) => (
        <div
          onClick={() => router.push(val.link)}
          key={val.label}
          className={cn(
            "flex items-center gap-4 py-3.5 px-6 sm:px-10 relative hover:opacity-[0.7] cursor-pointer",
            pathname === val.link
              ? "bg-[var(--color-gray-shade)]"
              : "hover:bg-[var(--color-gray-shade)]/40"
          )}
        >
          {pathname === val.link && (
            <div className="absolute left-0 bg-[var(--color-primary)] w-[10px] h-full" />
          )}
          <Image
            src={val.icon}
            width={18}
            height={18}
            alt={val.label}
            className="object-cover"
          />
          <p>{val.label}</p>
        </div>
      ))}
    </aside>
  );
};
