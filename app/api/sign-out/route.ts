import { createSupabaseServerClient } from "@/libs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createSupabaseServerClient();

        const result = await supabase.auth.signOut()
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        return new NextResponse('Internal Server Error!', { status: 500 })
    }
}
