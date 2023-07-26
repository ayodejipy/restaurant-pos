interface DataTypes {
    [key: string]: string
}

export const Categories: DataTypes = {
    APPETIZER: 'Appetizer',
    MAIN_COURSE: 'Main course',
    DESSERT: 'Dessert',
    BEVERAGE: 'Beverage',
} as const

export const OrderStatus = {
    waiting: 'Waiting',
    ready: 'Ready to serve',
    completed: 'Completed',
    canceled: 'Canceled',
}
// type Direction = typeof OrderStatus[keyof typeof OrderStatus];

export type statusTypes = keyof typeof OrderStatus
