// @ts-ignore
import { serverSupabaseClient, serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = serverSupabaseServiceRole(event)

    const { status, error } = await client.from('profiles').update(body).eq('id', body.id)

    return {
        success: status == 204,
        error,
    }
})
