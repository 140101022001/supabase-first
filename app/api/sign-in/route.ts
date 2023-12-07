import { createSupabaseServerClient } from "@/libs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        const supabase = await createSupabaseServerClient();

        const result = await supabase.auth.signInWithPassword({
            email,
            password
        })
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        return new NextResponse('Internal Server Error!', { status: 500 })
    }
}
