// @ts-ignore
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const client = serverSupabaseClient(event); // connect to supabase client
	const user = await serverSupabaseUser(event) // get current user

	// prepare object to be sent
	const menuBody = {
		...body,
		user_id: user.id
	};
	// create new menu
	const { status } = await client.from('menu').insert(menuBody);
	// console.log(status, statusText);
	// console.log({ data })

	return {
		success: status === 201,
	}
});
