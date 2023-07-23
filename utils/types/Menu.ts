export interface IMenu {
	id: string | number;
	name: string;
	image: string;
	description: string;
	category: string;
	price: number;
	quantity: number;
	sold: string;
	available: string;
	is_soldout: boolean;
	updated_at: string;
	created_at: string;
	user_id: string;
}

export type Category = 'appetizer' | 'main_course' | 'dessert' | 'beverage'

export type GroupedMenu = {
	// [key in Category]: IMenu[];
	[key: string]: IMenu[];
}

export type modalTypes = 'add-menu' | 'edit-menu' | 'details'

// export interface IUserData {
// 	data: IUser;
// 	success: boolean
// }