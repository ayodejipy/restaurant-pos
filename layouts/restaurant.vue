<script lang="ts" setup>
const modalStore = useModalStore()
const { modalType } = storeToRefs(modalStore)
</script>

<template>
    <div class="bg-white w-full min-h-screen">
        <RestaurantTheHeader />
        <slot />

        <RestaurantAddMenuModal :open="modalType == 'add-menu'" />
    </div>
</template>
