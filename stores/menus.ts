import { IMenu } from "~/utils/types/Menu";

export const useMenuStore = defineStore('menus', () => {
	const form = ref<Partial<IMenu>>({
        id: "",
        name: "",
        image: "",
        description: "",
        category: "",
		price: 0,
		quantity: 0,
		sold: "",
		available: "",
		is_soldout: false,
		updated_at: "",
		created_at: "",
		user_id: "",
    });
    const orderLists = ref<IMenu[]>([])

    function updateForm(body: IMenu) {
        form.value = { ...body };
    }

    function addToCart(payload: IMenu) {
        // check if story exists
        const index = orderLists.value.findIndex((menu) => menu.id == payload.id);
        // if found, do not include menu again
        if (index >= 0) return;
        
        // add a new one to the end of the list
        orderLists.value.push({ ...payload, quantity: 0 })
	}
    function increaseOrderQuantity(payload: IMenu) {
        // check if story exists
        const index = orderLists.value.findIndex((menu) => menu.id == payload.id);
        orderLists.value[index].quantity++;
	}
    function decreaseOrderQuantity(payload: IMenu) {
        // check if story exists
        const index = orderLists.value.findIndex((menu) => menu.id == payload.id);
        orderLists.value[index].quantity--;
	}
    
	return {
        form,
        orderLists,
        addToCart,
        increaseOrderQuantity,
        decreaseOrderQuantity
    };
})