import { IMenu } from '../../../utils/types/Menu'
// @ts-ignore
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const menuId = getRouterParam(event, 'id')
    const body = (await readBody(event)) as IMenu

    const client = serverSupabaseClient(event) // connect to supabase client

    console.log({ body, menuId })

    const { status } = await client.from('menu').update(body).eq('id', menuId)

    return {
        success: status === 204,
    }
})
