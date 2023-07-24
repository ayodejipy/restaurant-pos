<script lang="ts" setup>
import type { IMenu, OrderItems } from '~/utils/types/Menu';

const props = defineProps<{
    item: OrderItems
}>();

const { formatted } = useCurrency();

const menuStore = useMenuStore()
const { increaseOrderQuantity, decreaseOrderQuantity } = menuStore

</script>

<template>
    <AtomTheCard rounded="none" shadow="none" class="py-4 max-w-full border-b border-gray-300">
        <div class="w-full flex gap-4">
            <div class="flex w-24 h-24 flex-shrink-0 rounded-xl overflow-clip">
                <img :src="item.image" />
            </div>
            <div class="flex-1 flex flex-col justify-between">
                <div>
                    <h5 aria-label="meal name" class="font-medium text-lg text-gray-900 leading-tight">{{ item.name }}</h5>
                </div>
                <div class="mt-6 flex items-center justify-between">
                    <div class="flex gap-3">
                        <AtomTheButton intent="default" class="bg-gray-200 text-gray-800 w-8 h-8 rounded-full" @click="decreaseOrderQuantity(item)" :disabled="item.quantity == 0">
                            <Icon name="ic:outline-minus" />
                        </AtomTheButton>
                        <span class="inline-flex justify-center items-center w-8 font-semibold text-gray-60">{{ item.quantity }}</span>
                        <AtomTheButton intent="default" class="bg-blue-600 text-white w-8 h-8 rounded-full" @click="increaseOrderQuantity(item)" :disabled="item.quantity == item.available">
                            <Icon name="ic:baseline-plus" />
                        </AtomTheButton>
                    </div>
                    <p aria-label="meal price" class="text-gray-800 text-sm font-medium">{{ formatted(item.price) }}</p>
                </div>
            </div>
        </div>
    </AtomTheCard>
</template>
