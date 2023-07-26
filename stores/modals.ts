import type { modalTypes } from '~/utils/types/Menu'

export const useModalStore = defineStore('modals', () => {
    const modalType = ref<modalTypes | null>(null)

    return {
        modalType,
    }
})
