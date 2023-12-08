import { createBrowserClient } from "@supabase/ssr"
import { Github } from "lucide-react"

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

    const loginWithGoogle = () => {
        supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/api/server-action/callback`
            }
        })
    }
    return (
        <>
            <button className="mt-3 w-full bg-slate-400 py-3 px-2 rounded-md text-white"
                onClick={loginWithGithub}>
                <div className="flex w-full justify-center items-center">
                    <span>Login with GitHub</span>
                </div>
            </button>
            <button className="mt-3 w-full bg-slate-500 py-3 px-2 rounded-md text-white"
                onClick={loginWithGoogle}>
                    <div className="flex w-full justify-center items-center">
                        <span>Login with Google</span>
                    </div>
            </button>
        </>
    )
}

export default OAuth