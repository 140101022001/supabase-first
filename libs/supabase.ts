import { createSupabaseServerClient } from "./server";

export const getAllTodo = async () => {
    try {
        const supabase = await createSupabaseServerClient();
        const todos = await supabase.from('todo').select('*');
        return todos.data
    } catch (err) {
        console.log(err);
    }
}
export const insertTodo = async (title: string): Promise<string> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from('todo')
        .insert([
            { title: title },
        ])
        .select()
    return JSON.stringify(data)
}

export const editTodo = async (id: string, title: string) => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from('todo')
        .update({ title })
        .eq('id', id)
        .select()
    return data
}

export const deleteTodo = async (id: string) => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from('todo')
        .delete()
        .eq('id', id)
    if (!data) {
        return id
    } else {
        return error
    }
}
