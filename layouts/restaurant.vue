<script lang="ts" setup>
const modalStore = useModalStore()
const { modalType } = storeToRefs(modalStore)
</script>

<template>
    <div class="bg-white w-full min-h-screen hidden lg:block">
        <RestaurantTheHeader />
        <slot />

        <RestaurantAddMenuModal :open="modalType == 'add-menu'" />
    </div>
    <div class="bg-white w-full min-h-screen flex flex-col items-center justify-center font-semibold lg:hidden">
        The POS app only is not available on smaller devices...
    </div>
</template>
