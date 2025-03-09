"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PrimaryButton } from "../buttons/primary-btn";
import { TextInput } from "../inputs/text-input";
import { Spinner } from "../spinner";
import { AuthStatesContext } from "@/contexts/auth-context";
import { useAllTasks } from "@/actions/task-queries";
import { toast } from "sonner";
import { client } from "@/lib/client";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Task } from "@/components/kandan-board/task-card";
import { UniqueIdentifier } from "@dnd-kit/core";
const statusOptions = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Completed",
    value: "completed",
  },
];
export const AddEditTaskDialog = ({
  open,
  setOpen,
  selectedTask,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  selectedTask?: Task;
}) => {
  const { user, token } = AuthStatesContext();
  const { data, isLoading, refetch } = useAllTasks({
    userId: user?._id || "",
    token,
    title: "",
  });
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const createTask = async () => {
    if (!title) {
      toast("please enter a title");
      return;
    }
    try {
      setLoading(true);
      const res = await client.post(
        "/tasks/create",
        {
          title: title,
          status: status,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      refetch();
      setOpen(false);
      toast("Task has been added successfully!");
    } catch (e) {
      console.log(e);
      toast("invalid error while task creation");
    } finally {
      setLoading(false);
    }
  };
  const editTask = async (id: UniqueIdentifier) => {
    if (!title) {
      toast("please enter a title");
      return;
    }
    try {
      setLoading(true);
      const res = await client.put(
        `/tasks/${id}`,
        {
          title: title,
          status: status,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      refetch();
      setOpen(false);
      toast("Task has been updated successfully!");
    } catch (e) {
      console.log(e);
      toast("invalid error while task creation");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.content);
      setStatus(
        selectedTask.columnId === "in-progress" ? "pending" : "completed"
      );
    }
  }, [selectedTask]);
  if (isLoading) {
    return (
      <>
        <div className="flex items-center w-full h-screen justify-center">
          <Spinner />
        </div>
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          bg-white border border-gray-300 rounded-2xl 
          w-[95vw] max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] 
          h-[85vh] sm:h-[80vh] 
          overflow-auto flex flex-col gap-6 
          p-4 sm:p-4 md:px-4 lg:px-10
        "
      >
        <DialogTitle className="text-h5 sm:text-xl font-bolder text-primary text-center mb-5 sm:mb-7">
          {selectedTask ? "Edit" : "Add"} Task
        </DialogTitle>

        {/* Product Type Selection */}
        <div className="bg-white rounded-md p-4 flex flex-col gap-4">
          <TextInput
            title="Task Title"
            type="text"
            value={title}
            setValue={setTitle}
            placeholder="Write a short title for your task"
            className="w-full"
          />
          <TextInput
            title="Select the status"
            type="select"
            value={status}
            setValue={setStatus}
            placeholder="Select the status"
            className="w-full"
            options={statusOptions}
          />

          <TextInput
            title="Service Description"
            type="textarea"
            value={description}
            setValue={setDescription}
            placeholder="Explain about your service in detail"
            className="w-full"
          />

          {/* Save Button */}
          <div className="flex justify-center mt-4 mb-8 sm:mb-16">
            <PrimaryButton
              loading={loading}
              onClick={() => {
                if (selectedTask) {
                  editTask(selectedTask.id);
                } else {
                  createTask();
                }
              }}
              className="h-[50px] w-full sm:w-auto"
            >
              Save Changes
            </PrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
