import { Task } from "@/components/kandan-board/task-card";
import { TaskDetails } from "@/interfaces/task-details";
import { client } from "@/lib/client";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useQuery } from "@tanstack/react-query";
const prepareData4Board = (data: TaskDetails[]) => {
    if (data) {
        const newData = data?.map((val) => {
            return {
                id: val._id as UniqueIdentifier,
                columnId:
                    val.status === "pending"
                        ? ("in-progress" as const)
                        : ("done" as const),
                title: val.title,
                content: val.description,
            };
        });
        return newData;
    }
    return [];
};
export function useAllTasks({ userId, token, title }: {
    userId: string;
    token: string;
    title?: string;
}) {
    return useQuery({
        enabled: Boolean(userId) && Boolean(token),
        queryKey: ["tasks", userId, title],
        queryFn: async () => {
            try {
                const res = await client.post(`/tasks`, { title }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = res?.data?.tasks || [];
                const initialTasks = await prepareData4Board(data);
                return initialTasks as Task[];
            } catch (e) {
                throw new Error("Invalid Error found");
            }
        },
    });
}