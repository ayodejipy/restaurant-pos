// @ts-ignore
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = serverSupabaseClient(event)

    // use supabase server composable to sign user up..
    const { data, error } = await client.auth.signInWithOtp({
        email: body.email,
        options: {
            emailRedirectTo: 'http://localhost:3000',
        },
    })

    return {
        data,
        error,
    }
})
