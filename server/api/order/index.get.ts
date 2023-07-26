// @ts-ignore
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = serverSupabaseClient(event) // connect to supabase client

    const data = await client.from('orders').select()

    console.log(data)

    return {
        data,
        success: data.status === 200,
    }
})
