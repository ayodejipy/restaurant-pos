import { IMenu, IMenuKeys, Order, OrderItems } from "~/utils/types/Menu";

export const useMenuStore = defineStore('menus', () => {
	const form = ref<Partial<IMenu>>({
        id: "",
        name: "",
        image: "",
        description: "",
        category: "",
		price: 0,
		quantity: 0,
		sold: 0,
		available: 0,
		is_soldout: false,
		updated_at: "",
		created_at: "",
		user_id: "",
    });
    const bookedOrder = ref<Order>({
        customer_name: "",
        table_number: "",
        items: [],
        status: "",
    })

    function updateForm(body: IMenu) {
        form.value = { ...body };
    }

    function addToCart(payload: IMenu) {
        const cartKeys: IMenuKeys[] = ['name', 'id', 'price', 'image', 'quantity', 'available']
        // check if story exists
        const index = bookedOrder.value.items.findIndex((menu) => menu.id == payload.id);
        // if found, do not include menu again
        if (index >= 0) return;
        const item: OrderItems = {} as OrderItems
        // let key: IMenuKeys
        for (const key of cartKeys) {
            item[key] = payload[key];
        }
        // set quantity to zero
        item.quantity = 0
        // add a new one to the end of the list
        bookedOrder.value.items.push(item as OrderItems)
	}
    function increaseOrderQuantity(payload: OrderItems) {
        // check if story exists
        const index = bookedOrder.value.items.findIndex((menu) => menu.id == payload.id);
        bookedOrder.value.items[index].quantity++;
	}
    function decreaseOrderQuantity(payload: OrderItems) {
        // check if story exists
        const index = bookedOrder.value.items.findIndex((menu) => menu.id == payload.id);
        if (payload.quantity > 1) {
            // reduce the quantity
            bookedOrder.value.items[index].quantity--;
        } else {
            // remove the item from bookedOrder
            bookedOrder.value.items.splice(index, 1);
        }
	}
    
	return {
        form,
        bookedOrder,
        addToCart,
        increaseOrderQuantity,
        decreaseOrderQuantity
    };
})