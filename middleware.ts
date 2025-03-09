import { NextRequest, NextResponse } from "next/server";
const userRoutes = [
    "/user",
]
export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const cookies = req.cookies;
    const temp = cookies.get("task-user")?.value;
    const user = temp ? JSON?.parse(temp!) : null;
    if (!user) {
        if (userRoutes.includes(url.pathname)) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }
    if (user?.role === "user" && (url?.pathname === "/")) {
        return NextResponse.redirect(new URL("/user", req.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: [...userRoutes, "/"],
};