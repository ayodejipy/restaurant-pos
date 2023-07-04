export interface IUser {
	id: string;
	username: string;
	full_name: string;
	email: string;
	avatar_url: string;
	updated_at: string;
	created_at: string;
}

export interface IUserData {
	data: IUser;
	success: boolean
}