import { createSupabaseServerClient } from "./server"

export const userSession = async () => {
    const supabase = await createSupabaseServerClient();
    return supabase.auth.getSession();
}