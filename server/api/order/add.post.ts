// @ts-ignore
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const order = await readBody(event);
	const client = serverSupabaseClient(event); // connect to supabase client
	const user = await serverSupabaseUser(event) // get current user
	
	// create new menu
	const data = await client.from('orders').insert(order);
	// console.log({ data })

	return {
		success: data.status === 201,
	}
});
