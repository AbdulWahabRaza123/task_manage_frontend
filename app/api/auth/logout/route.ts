import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(req: Request, res: NextApiResponse) {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("task-user");
        return NextResponse.json({ res: "success" }, { status: 200 });
    } catch (e) {
        console.error("Error fetching user data:", e);
        return NextResponse.json({ res: "error" }, { status: 500 });
    }
}