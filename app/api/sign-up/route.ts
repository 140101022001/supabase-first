import { createSupabaseServerClient } from "@/libs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    const supabase = await createSupabaseServerClient();

    try {
        const result = await supabase.auth.signUp({
            email,
            password
        })

        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        return new NextResponse('Internal Server Error!', { status: 500 })
    }
}
