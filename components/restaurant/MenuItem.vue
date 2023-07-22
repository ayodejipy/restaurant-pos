<script lang="ts" setup>
import type { IMenu } from '~/utils/types/Menu';

const props = defineProps<{
    menu: IMenu
}>();

const isDisabled = computed<boolean>(() => props.menu.is_soldout);
const backgroundColor = computed<string>(() => isDisabled.value ? 'bg-gray-100 shadow-gray-100' : 'bg-white');

const itemCount = ref<number>(0);

const increaseItemCount = () => itemCount.value++;
const decreaseItemCount = () => itemCount.value ? itemCount.value : itemCount.value--;
</script>

<template>
    <AtomTheCard rounded="xl" shadow="lg" :class="[backgroundColor, 'p-4 min-w-[16rem] max-w-full']">
        <div class="w-full flex gap-4">
            <div class="flex w-28 h-28 lg:w-40 lg:h-40 flex-shrink-0 rounded-xl overflow-clip">
                <img :src="menu.image" />
            </div>
            <div class="flex-1 flex flex-col justify-between">
                <div>
                    <h5 aria-label="meal name" class="font-medium text-lg text-gray-900 leading-tight">{{ menu.name }}</h5>
                    <p aria-label="meal description" class="text-gray-400 text-xs mt-2 leading-normal truncate-text">{{ menu.description }}</p>
                </div>
                <span class="inline-block mt-6 text-xs text-gray-400" aria-label="available and sold items">{{ menu.available }} Available <span class="font-semibold text-sm">&bull;</span> {{ menu.sold }} Sold</span>
            </div>
        </div>
        <div class="mt-6 flex justify-between">
            <h5 aria-label="meal price" class="text-gray-800 text-2xl font-bold">
                <sup class="text-base font-semibold" :class="[isDisabled ? 'text-gray-400': 'text-blue-600' ]">$</sup>{{ menu.price }}
            </h5>
            <div class="flex gap-3">
                <AtomTheButton intent="default" :class="[isDisabled ? 'bg-gray-200 text-gray-300 cursor-not-allowed' : 'bg-gray-200 text-gray-800', 'w-10 h-10 rounded-full']" @click="decreaseItemCount" :disabled="itemCount == 0">
                    <Icon name="ic:outline-minus" class="inline-flex" />
                </AtomTheButton>
                <span :class="[isDisabled ? 'text-gray-400' : 'text-gray-600', 'inline-flex justify-center items-center w-14 font-semibold']">{{ itemCount }}</span>
                <AtomTheButton intent="default" :class="[isDisabled ? 'bg-gray-200 text-gray-300 cursor-not-allowed pointer-events-none' : 'bg-blue-600 text-white', 'w-10 h-10 rounded-full']" @click="increaseItemCount">
                    <Icon name="ic:baseline-plus" class="inline-flex" />
                </AtomTheButton>
            </div>
        </div>
    </AtomTheCard>
</template>
