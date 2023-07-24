// @ts-ignore
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const order = await readBody(event);
	const client = serverSupabaseClient(event); // connect to supabase client
	const user = await serverSupabaseUser(event) // get current user

	// prepare object to be sent
	const body = {
		...order,
		status: 'processing',
	};
	// create new menu
	const { status } = await client.from('orders').insert(body);
	// console.log(status, statusText);
	// console.log({ data })

	return {
		success: status === 201,
	}
});
