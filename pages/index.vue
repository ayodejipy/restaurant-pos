<script lang="ts" setup>
import type { IMenu, GroupedMenu, Order } from '~/utils/types/Menu'

definePageMeta({
    layout: 'restaurant',
})

// const store = useUserStore();
// const { user } = storeToRefs(store);

const modalStore = useModalStore()
const { modalType } = storeToRefs(modalStore)

const { data, pending, error } = await useFetch('/api/menu')
const menus = ref<IMenu[] | null | undefined>(data.value?.data.data)

// reducer function
const reducer = (groups: GroupedMenu, item: IMenu) => {
    const category = item.category
    // get group by its category, if it exists, return it otherwise return a group with an empty array
    const group = groups[category] || (groups[category] = [])
    group.push(item) // push item into the array
    return groups
}

const categorizeMenu = computed(() => menus.value?.reduce(reducer, {}) as unknown as GroupedMenu)
</script>

<template>
    <section class="min-h-screen flex items-start border-t border-gray-300">
        <div class="flex-1 bg-gray-50 p-6 overflow-hidden border-r border-gray-300">
            <RestaurantOrderLists />

            <div class="mt-4">
                <RestaurantMenusTab v-if="menus?.length" :categories="categorizeMenu" />
                <div v-else>Not available...</div>
            </div>
        </div>

        <div class="w-1/4 flex-shrink-0 p-6 sticky top-0">
            <RestaurantOrderDetails />
        </div>
    </section>
    <RestaurantAddMenuModal :open="modalType == 'add-menu'" />
</template>
