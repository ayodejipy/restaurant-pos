import { IMenu } from '../../../utils/types/Menu'
// @ts-ignore
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const name = getRouterParam(event, 'name')
    const body = (await readBody(event)) as IMenu

    const client = serverSupabaseClient(event) // connect to supabase client

    const { status } = await client.from('menu').update(body).eq('id', body.id)

    return {
        success: status === 204,
    }
})
