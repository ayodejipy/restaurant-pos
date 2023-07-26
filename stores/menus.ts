import { IMenu, OrderItemsKey, Order, OrderItems, IMenuKeys } from "~/utils/types/Menu";

const DEFAULT_BOOKED = {
    customer_name: "",
    table_number: "",
    items: [],
    status: "",
    subtotal: 0,
    tax: 0

}
export const useMenuStore = defineStore('menus', () => {
	const form = ref<Partial<IMenu>>({
        id: 0,
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
    const bookedOrder = ref<Order>(DEFAULT_BOOKED)

    function updateForm(body: IMenu) {
        form.value = { ...body };
    }

    function clearBooked() {
        bookedOrder.value = DEFAULT_BOOKED
    }

    function clearForm() {
        const numberKeys = ["price", "quantity", "sold", "available"]; // Keys to be excluded from clearing

        // Loop through each key in the form object
        let key: IMenuKeys
        for (const key in form.value) {
            // Set number/string for appropriate keys
            // @ts-ignore
            form.value[key] = numberKeys.includes(key) ? 0 : "";
        }
		form.value.is_soldout = false; // Set isAvailable to false
    }

    function addToCart(payload: IMenu) {
        // check if story exists
        const index = bookedOrder.value.items.findIndex((menu) => menu.id == payload.id);
        // if found, do not include menu again
        if (index >= 0) return;
        const { is_soldout, updated_at, created_at, user_id, description, sold, category, ...rest } = payload;
        const item: OrderItems = { ...rest, quantity: 1 }
        
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
        clearBooked,
        clearForm,
        increaseOrderQuantity,
        decreaseOrderQuantity
    };
})