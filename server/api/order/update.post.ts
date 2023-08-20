import type { Order } from '../../../utils/types/Menu'
// @ts-ignore
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const order = (await readBody(event)) as Order
    const client = serverSupabaseClient(event) // connect to supabase client
    const user = await serverSupabaseUser(event) // get current user

    // update a existing order where id === order id
    const data = await client
        .from('orders')
        .update({
            status: order.status,
        })
        .eq('id', order.id)

    return {
        success: data.status === 204,
    }
})
