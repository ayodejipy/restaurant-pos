import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useMenuStore } from './menus'
import { $resetPiniaStores } from './reset'
import { IMenu, IMenuKeys, Order, OrderItems } from '~/utils/types/Menu'

const DEFAULT_MENU: IMenu = {
    id: '',
    name: '',
    image: '',
    description: '',
    category: '',
    price: 0,
    quantity: 0,
    sold: 0,
    available: 0,
    is_soldout: false,
    updated_at: '',
    created_at: '',
    user_id: '',
}

const DEFAULT_ORDER: Order = {
    customer_name: '',
    table_number: '',
    items: [],
    status: '',
}
const DEFAULT_ORDER_DATA: Order = {
    customer_name: 'John Doe',
    table_number: 'table 212',
    items: [
        {
            id: 1,
            name: 'Nourished Salmon spiced riced',
            image: 'example.com/food.png',
            price: 25,
            quantity: 2,
            available: 30,
        },
        {
            id: 2,
            name: 'Nourished Salmon spiced riced',
            image: 'example.com/food.png',
            price: 35,
            quantity: 2,
            available: 10,
        },
    ],
    status: 'processing',
}

const DEFAULT_MENU_DATA: IMenu = {
    id: 1,
    name: 'Peppersoup',
    image: 'example.com/images/peppersoup.jpg',
    description: 'A spicy peppersoup',
    category: 'dessert',
    price: 15,
    quantity: 50,
    sold: 10,
    available: 40,
    is_soldout: false,
    updated_at: '2023-07-25',
    created_at: '2023-07-24',
    user_id: 'user-one',
}

describe('describe useMenuStore', () => {
    let store: ReturnType<typeof useMenuStore>

    beforeEach(() => {
        setActivePinia(createPinia())

        store = useMenuStore()
    })

    it('initializes an empty menu form', () => {
        expect(store.form).toEqual(DEFAULT_MENU)
    })

    it('initialize an empty booked order', () => {
        expect(store.bookedOrder).toEqual(DEFAULT_ORDER)
    })

    it('should prestore menu in form', () => {
        store.form = DEFAULT_MENU_DATA
        expect(store.form.id).toEqual(DEFAULT_MENU_DATA.id)
        expect(store.form.name).toEqual(DEFAULT_MENU_DATA.name)
        expect(store.form.description).toEqual(DEFAULT_MENU_DATA.description)
        expect(store.form.image).toEqual(DEFAULT_MENU_DATA.image)
        expect(store.form.price).toEqual(DEFAULT_MENU_DATA.price)
        expect(store.form.quantity).toEqual(DEFAULT_MENU_DATA.quantity)
        expect(store.form.sold).toEqual(DEFAULT_MENU_DATA.sold)
        expect(store.form.available).toEqual(DEFAULT_MENU_DATA.quantity - DEFAULT_MENU_DATA.sold)
    })

    it('should add item to booked order', () => {
        store.bookedOrder.customer_name = 'Harry Maguire'
        store.bookedOrder.table_number = 'Table 5'
        store.addToCart(DEFAULT_MENU_DATA)
        const order = store.bookedOrder
        expect(store.bookedOrder.customer_name).toEqual(order.customer_name)
        expect(store.bookedOrder.table_number).toEqual(order.table_number)
        expect(store.bookedOrder.items[0].id).toEqual(DEFAULT_MENU_DATA.id)
        expect(store.bookedOrder.status).toEqual(order.status)
    })

    it("should increase item's quantity", () => {
        const spy = vi.spyOn(store, 'increaseOrderQuantity')
        store.addToCart(DEFAULT_MENU_DATA)
        const items = store.bookedOrder.items
        store.increaseOrderQuantity(items[0])
        expect(spy).toHaveBeenCalled()
        expect(store.bookedOrder.items[0].quantity).toEqual(items[0].quantity++)
    })

    it("should decrease item's quantity", () => {
        const spy = vi.spyOn(store, 'decreaseOrderQuantity')
        store.addToCart(DEFAULT_MENU_DATA)
        const items = store.bookedOrder.items
        store.decreaseOrderQuantity({ ...items[0], quantity: 2 })
        expect(spy).toHaveBeenCalled()
        expect(store.bookedOrder.items[0].quantity).toEqual(items[0].quantity--)
    })

    it("should remove if item's quantity is zero", () => {
        const spy = vi.spyOn(store, 'decreaseOrderQuantity')
        store.addToCart(DEFAULT_MENU_DATA)
        const items = store.bookedOrder.items
        store.decreaseOrderQuantity(items[0])
        expect(spy).toHaveBeenCalled()
        expect(store.bookedOrder.items).toHaveLength(0)
    })

    afterEach(() => {
        $resetPiniaStores()
    })
})
