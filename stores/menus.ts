import { IMenu, Order } from "~/utils/types/Menu";

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
		available: "",
		is_soldout: false,
		updated_at: "",
		created_at: "",
		user_id: "",
    });
    const bookedOrder = ref<Order>({
        customer_name: "",
        table_number: "",
        menu_items: []
    })

    function updateForm(body: IMenu) {
        form.value = { ...body };
    }

    function addToCart(payload: IMenu) {
        // check if story exists
        const index = bookedOrder.value.menu_items.findIndex((menu) => menu.id == payload.id);
        // if found, do not include menu again
        if (index >= 0) return;
        
        // add a new one to the end of the list
        bookedOrder.value.menu_items.push({ ...payload, buying: 0 })
	}
    function increaseOrderQuantity(payload: IMenu) {
        // check if story exists
        const index = bookedOrder.value.menu_items.findIndex((menu) => menu.id == payload.id);
        bookedOrder.value.menu_items[index].buying++;
	}
    function decreaseOrderQuantity(payload: IMenu) {
        // check if story exists
        const index = bookedOrder.value.menu_items.findIndex((menu) => menu.id == payload.id);
        bookedOrder.value.menu_items[index].buying--;
	}
    
	return {
        form,
        bookedOrder,
        addToCart,
        increaseOrderQuantity,
        decreaseOrderQuantity
    };
})