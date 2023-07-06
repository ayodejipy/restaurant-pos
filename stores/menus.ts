import { IMenu } from "~/utils/types/Menu";

export const useMenuStore = defineStore('menus', () => {
	const form = ref<Partial<IMenu>>({
        id: "",
        name: "",
        image_url: "",
        description: "",
        category: "",
		price: "",
		quantity: "",
		sold: "",
		available: "",
		is_soldout: true,
		updated_at: "",
		created_at: "",
		user_id: "",
    });

    function updateForm(body: IMenu) {
        form.value = { ...body };
    }

    
	return {
        form,
    };
})