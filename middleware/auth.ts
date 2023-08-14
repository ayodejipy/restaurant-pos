export default defineNuxtRouteMiddleware((to, from) => {
    // isAuthenticated() is an example method verifying if a user is authenticated
    // const userStore = useUserStore()
    // const { isAuthenticated } = storeToRefs(userStore)

    const user = useSupabaseUser()

    if (!user.value) {
        console.log('userr: ', user.value)

        return navigateTo({ path: '/login', query: { redirect: from.fullPath } })
    }
})
