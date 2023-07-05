import { IMenu } from "~/utils/types/Menu";

export const useMenuStore = defineStore('menus', () => {
	const form = ref<Partial<IMenu>>({
        id: "",
        name: "",
        image_url: "",
        description: "",
        category: "",
        price: "",
		is_available: true,
		updated_at: "",
		created_at: ""
    });

    function updateForm(body: IMenu) {
        form.value = { ...body };
    }

    
	return {
        form,
    };
})