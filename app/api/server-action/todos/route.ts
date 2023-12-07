import { createSupabaseServerClient } from "@/libs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createSupabaseServerClient();

        const todos = await supabase.from('todo').select('*');

        return NextResponse.json(todos, { status: 200 });
    } catch (err) {
        return new NextResponse('Internal Server Error!', { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const { title } = await req.json();
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
        .from('todo')
        .insert([
            { title: title },
        ])
        .select()
        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        return new NextResponse('Internal Server Error!', { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { title, id } = await req.json();
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
        .from('todo')
        .update({ title })
        .eq('id', id)
        .select()
        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        return new NextResponse('Internal Server Error!', { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        const supabase = await createSupabaseServerClient();

        const { data } = await supabase
        .from('todo')
        .delete()
        .eq('id', id)
        if (data) {
            return NextResponse.json({id: null}, { status: 200 });
        } else {
            return NextResponse.json({id: id}, { status: 200 });
        }
    } catch (err) {
        return new NextResponse('Internal Server Error!', { status: 500 })
    }
}
