<script lang="ts" setup>
import type { GroupedMenu } from '~/utils/types/Menu'
import { Categories } from '~/utils/enums'

const props = defineProps<{
    categories: GroupedMenu
}>()

const getCatergory = (category: string) => Categories[category.toUpperCase()]
</script>

<template>
    <div class="w-full max-w-full px-2 py-16 sm:px-0">
        <HeadlessTabGroup>
            <HeadlessTabList class="flex space-x-1 rounded-full bg-gray-200 p-1">
                <HeadlessTab
                    v-for="category in Object.keys(props.categories)"
                    :key="category"
                    v-slot="{ selected }"
                    as="template"
                >
                    <button
                        aria-label="category button"
                        class="w-full rounded-full py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2"
                        :class="[
                            selected
                                ? 'bg-white text-gray-800 shadow'
                                : 'text-gray-400 hover:bg-white/[0.12] hover:text-white',
                        ]"
                    >
                        {{ getCatergory(category) }}
                    </button>
                </HeadlessTab>
            </HeadlessTabList>

            <HeadlessTabPanels class="mt-2">
                <div class="flex items-center justify-between md:my-3">
                    <h5 class="font-medium text-base leading-8">Menu</h5>
                    <a href="#" class="text-sm text-gray-400">Showing 30 Items</a>
                </div>

                <HeadlessTabPanel
                    v-for="(menus, idx) in Object.values(props.categories)"
                    :key="idx"
                    :class="[
                        'rounded-xl bg-white',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    ]"
                >
                    <div class="flex md:gap-6">
                        <RestaurantMenuItem v-for="menu in menus" :key="menu.id" :menu="menu" />
                    </div>
                </HeadlessTabPanel>
            </HeadlessTabPanels>
        </HeadlessTabGroup>
    </div>
</template>
~/utils/enums
