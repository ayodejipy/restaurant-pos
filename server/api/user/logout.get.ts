// @ts-ignore
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = serverSupabaseClient(event) // connect to supabase client

    const data = await client.auth.signOut()

    console.log({ client })
    console.log({ data })

    return data
})
