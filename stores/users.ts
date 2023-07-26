import type { IUser } from '~/utils/types/User'

export const useUserStore = defineStore('user', () => {
    const user = ref<Partial<IUser>>({
        id: '',
        username: '',
        full_name: '',
        email: '',
        avatar_url: '',
        updated_at: '',
        created_at: '',
    })
    const isAuthenticated = computed<boolean>(() => !!Object.values(user.value))

    return {
        user,
        isAuthenticated,
    }
})
