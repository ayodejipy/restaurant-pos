// @ts-ignore
import { serverSupabaseClient, serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const body = readBody(event)
	const client = serverSupabaseServiceRole(event);

	const data = await client.from("profiles").insert(body, {
        returning: "minimal", // Don't return the value after inserting
	});
	
	console.log(data)

    return {
		data
	}
});
