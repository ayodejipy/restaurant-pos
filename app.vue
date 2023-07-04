<script lang="ts" setup>
import type { IUserData } from './utils/types/User';

const store = useUserStore()
const { user } = storeToRefs(store)

async function getUser() {
    const { data, success } = await $fetch<IUserData>('/api/user', { method: "GET" })
    // if successful, update user state object
    if (success) user.value = data
}

onMounted(() => getUser())
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
