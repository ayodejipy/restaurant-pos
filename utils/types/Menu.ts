import type { statusTypes } from '~/utils/enums'

export interface IMenu {
    id: number
    name: string
    image: string
    description: string
    category: string
    price: number
    quantity: number
    sold: number
    available: number
    is_soldout: boolean
    updated_at: string
    created_at: string
    user_id: string
}

export type IMenuKeys = keyof IMenu

export interface OrderItems {
    id: number
    name: string
    image: string
    price: number
    quantity: number
    available: number
    sold: number
}

export type OrderItemsKey = keyof OrderItems
export interface Order {
    id?: number
    customer_name: string
    table_number: string
    items: OrderItems[]
    status: statusTypes
    subtotal: number
    tax: number
}

export type Category = 'appetizer' | 'main_course' | 'dessert' | 'beverage'

export type GroupedMenu = {
    // [key in Category]: IMenu[];
    [key: string]: IMenu[]
}

export type modalTypes = 'add-menu' | 'edit-order' | 'edit-menu' | 'details'
