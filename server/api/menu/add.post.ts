// @ts-ignore
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const client = serverSupabaseClient(event); // connect to supabase client
	const user = await serverSupabaseUser(event) // get current user

	// prepare object to be sent
	const menuBody = {
		...body,
		profile_id: user.id
	};

	// create menu
	const { data, status } = await client.from("menu").insert(menuBody);

	return {
		data,
		success: status === 200,
	}
});
