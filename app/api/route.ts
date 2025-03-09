import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
export async function GET(req: Request, res: NextApiResponse) {
    return NextResponse.json({ message: "Hello Task" }, { status: 200 });
}