export interface UserDetails {
    _id: string;
    name: string;
    email: string;
    password: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface LoginResponse {
    status: boolean;
    message: string;
    user: UserDetails;
    token: string;
    code: number;
}
