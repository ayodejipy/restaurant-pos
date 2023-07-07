export interface IMenu {
	id: string | number;
	name: string;
	image_url: string;
	description: string;
	category: string;
	price: string;
	quantity: string;
	sold: string;
	available: string;
	is_soldout: boolean;
	updated_at: string;
	created_at: string;
	user_id: string;
}

export type Category = 'appetizer' | 'main_course' | 'dessert' | 'beverage'

export type GroupedMenu = {
	[ key: string ]: IMenu[];
}

// export interface IUserData {
// 	data: IUser;
// 	success: boolean
// }