import { IMenu } from "~/utils/types/Menu";

export const useMenuStore = defineStore('menus', () => {
	const form = ref<Partial<IMenu>>({
        id: "",
        name: "",
        image: "",
        description: "",
        category: "",
		price: "",
		quantity: "",
		sold: "",
		available: "",
		is_soldout: false,
		updated_at: "",
		created_at: "",
		user_id: "",
    });
    const orderMenu = ref<IMenu[]>([])

    function updateForm(body: IMenu) {
        form.value = { ...body };
    }
    
	return {
        form,
    };
})