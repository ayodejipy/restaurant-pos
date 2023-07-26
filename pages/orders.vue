<script lang="ts" setup>
import type { IMenu, GroupedMenu, Order } from '~/utils/types/Menu'

definePageMeta({
    layout: 'restaurant',
})

const modalStore = useModalStore()
const { modalType } = storeToRefs(modalStore)

const { data, pending, error } = await useFetch('/api/menu')
const menus = ref<IMenu[] | null | undefined>(data.value?.data.data)
</script>

<template>
    <section class="min-h-screen flex items-start border-t border-gray-300">
        Order list page...
    </section>
</template>
