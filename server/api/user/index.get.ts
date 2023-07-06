// @ts-ignore
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = serverSupabaseClient(event); // connect to supabase client
	const user = await serverSupabaseUser(event) // get current user

	const { data, status } = await client.from('profiles').select('*')
	
	// edit object coming back to 
	const userObj = {
		...data[0],
        email: user.email,
        created_at: user.created_at
    };
	
	return {
		data: userObj,
		success: status === 200
	}
});
