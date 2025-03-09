"use client";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { Edit2, GripVertical, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { ColumnId } from "./kandan-board";
import { useState } from "react";
import { AuthStatesContext } from "@/contexts/auth-context";
import { client } from "@/lib/client";
import { useAllTasks } from "@/actions/task-queries";
import { AddEditTaskDialog } from "../ui/dialogs/add-edit-task-dialog";

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  title: string;
  content: string;
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const { token, user } = AuthStatesContext();
  const { refetch } = useAllTasks({
    userId: user?._id || "",
    token,
    title: "",
  });
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });
  const handleDelete = async (id: UniqueIdentifier) => {
    if (!id) return;
    try {
      const res = await client.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refetch();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {selectedTask && (
        <AddEditTaskDialog
          open={openEdit}
          setOpen={setOpenEdit}
          selectedTask={selectedTask}
        />
      )}
      <Card
        ref={setNodeRef}
        style={style}
        className={variants({
          dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
        })}
      >
        <CardHeader className="px-3 py-3 space-between flex flex-row justify-between border-b-2 border-secondary relative">
          <div className="flex items-center gap-2">
            <Button
              variant={"ghost"}
              {...attributes}
              {...listeners}
              className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
            >
              <span className="sr-only">Move task</span>
              <GripVertical />
            </Button>
            <h1 className="text-h2 font-bolder line-clamp-1 text-ellipsis">
              {task.title}
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <Badge
              onClick={() => {
                setSelectedTask(task);
                setOpenEdit(true);
              }}
              variant={"outline"}
              className="p-2 rounded-full cursor-pointer font-semibold text-white bg-[var(--color-primary)]"
            >
              <Edit2 className="w-3 h-3" />
            </Badge>
            <Badge
              onClick={() => {
                handleDelete(task.id);
              }}
              variant={"outline"}
              className="p-2 rounded-full cursor-pointer font-semibold text-white bg-[var(--color-primary)]"
            >
              <Trash2 className="w-3 h-3" />
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
          {task.content}
        </CardContent>
      </Card>
    </>
  );
}
