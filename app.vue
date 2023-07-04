<script lang="ts" setup>
const store = useUserStore()
const { user } = storeToRefs(store)

async function getUser() {
    const data = await $fetch('/api/user')
    const userObj = {
        id: data?.id,
        email: data?.email,
        created_at: data?.created_at,
        updated_at: data?.updated_at,
    }
    if (data) {
        // assign to state object
        user.value = {...userObj }
    }

}

onMounted(() => getUser())
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
