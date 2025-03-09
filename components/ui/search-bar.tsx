"use client";
import React, { useState } from "react";
import { OutlineButton } from "../ui/buttons/outline-btn";
import Image from "next/image";
import { IconButton } from "../ui/buttons/icon-btn";
import { IconPrimaryInput } from "../ui/inputs/primary-input";
import { AddEditTaskDialog } from "./dialogs/add-edit-task-dialog";
import { AuthStatesContext } from "@/contexts/auth-context";
export const Searchbar = () => {
  const { search, setSearch } = AuthStatesContext();
  const [openCreate, setOpenCreate] = useState(false);
  return (
    <>
      <AddEditTaskDialog open={openCreate} setOpen={setOpenCreate} />
      <section className="py-6 px-4 bg-white flex items-center justify-between w-full max-md:flex-col max-md:gap-6">
        <div className="w-[60%] flex items-center gap-4 max-md:w-full">
          <IconPrimaryInput
            value={search}
            setValue={setSearch}
            placeholder="Search..."
            type="search"
            className="font-bold"
            icon="/assets/icons/search.svg"
          />
          <IconButton onClick={() => {}} className="bg-[var(--color-primary)]">
            <Image
              src="/assets/icons/filter.svg"
              width={24}
              height={24}
              className="object-cover"
              alt="filter"
            />
          </IconButton>
        </div>
        <OutlineButton
          onClick={() => {
            setOpenCreate(true);
          }}
          loading={false}
          disabled={false}
          className="max-w-fit hover:bg-white"
        >
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/plus.svg"
              width={16}
              height={16}
              alt="plus"
              className="object-cover"
            />
            <p>Create New Task</p>
          </div>
        </OutlineButton>
      </section>
    </>
  );
};
