// @ts-ignore
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id // get the id
    const body = await readBody(event)
    const client = serverSupabaseClient(event) // connect to supabase client

    const { data, status } = await client.from('menu').update(body).eq('id', id)

    return {
        data,
        success: status === 200,
    }
})
