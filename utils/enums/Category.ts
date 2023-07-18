interface ICategories {
	[key: string]: string
}

export const Categories: ICategories = {
	APPETIZER: 'Appetizer',
	MAIN_COURSE: 'Main course',
	DESSERT: 'Dessert',
	BEVERAGE: 'Beverage'
} as const