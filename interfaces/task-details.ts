export interface TaskDetails {
    _id: string;
    title: string;
    description: string;
    status: "pending" | "completed";
    userId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
