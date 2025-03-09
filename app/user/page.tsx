"use client";
import { useAllTasks } from "@/actions/task-queries";
import { Spinner } from "@/components/ui/spinner";
import { AuthStatesContext } from "@/contexts/auth-context";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import dynamic from "next/dynamic";
import { Task } from "@/components/kandan-board/task-card";

const KanbanBoard = dynamic(
  () => import("../../components/kandan-board/kandan-board"),
  {
    ssr: false,
  }
);

const UserPage = () => {
  const { user, token, search } = AuthStatesContext();
  const [debouncedSearch] = useDebounce(search, 200);

  const {
    data: tasksData,
    isLoading,
    isRefetching,
  } = useAllTasks({
    userId: user?._id || "",
    token,
    title: debouncedSearch || "",
  });

  const [data, setData] = useState<Task[]>([]);
  const [triggerRender, setTriggerRender] = useState<number>(0);
  useEffect(() => {
    if (tasksData) {
      setData([...tasksData]);
      setTriggerRender(Date.now());
    }
  }, [tasksData]);

  if (isLoading || isRefetching) {
    return (
      <div className="flex items-center w-full h-screen justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <main>
      <KanbanBoard key={triggerRender} initialTasks={data} />
    </main>
  );
};

export default UserPage;
