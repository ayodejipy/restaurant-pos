// @ts-ignore
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = serverSupabaseClient(event) // connect to supabase client
    const user = await serverSupabaseUser(event) // get current user

    // if user is not present, return
    if (!user) return false

    const { data, status } = await client.from('profiles').select('*')

    // append email to user
    const userObj = {
        ...data[0],
        email: user.email,
        created_at: user.created_at,
    }

    return {
        data: userObj,
        success: status === 200,
    }
})
