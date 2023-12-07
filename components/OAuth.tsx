import { createBrowserClient } from "@supabase/ssr"

const OAuth = () => {

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
    const loginWithGithub = () => {
        supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${location.origin}/api/server-action/callback`
            }
        })
    }
    return (
        <button className="mt-3 w-full bg-slate-500 py-3 px-2 rounded-md text-white"
            onClick={loginWithGithub}>Login with GitHub</button>
    )
}

export default OAuth