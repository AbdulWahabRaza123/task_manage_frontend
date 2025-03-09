import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(req: Request, res: NextApiResponse) {
    try {
        const { user } = await req.json();
        const cookieStore = await cookies();
        cookieStore.set("task-user", JSON.stringify(user), { httpOnly: true });
        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ res: "error" }, { status: 500 });
    }
}