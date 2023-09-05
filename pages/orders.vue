<script lang="ts" setup>
import type { Order } from '~/utils/types/Menu'

definePageMeta({
    layout: 'restaurant',
    middleware: ['auth'],
})

const modalStore = useModalStore()
const { modalType } = storeToRefs(modalStore)

const { formatted } = useCurrency()

const { data, pending, error } = await useFetch('/api/order')
const orders = ref<Order[] | null | undefined>(data.value?.data.data)
</script>

<template>
    <section class="min-h-screen flex flex-col items-start border-t border-gray-300">
        <div class="w-full max-w-7xl mx-auto space-y-6">
            <h3 class="text-3xl font-medium mt-8">Orders</h3>
            <div class="w-full grid grid-cols-3 gap-6 pb-4">
                <AtomTheCard
                    v-for="order in orders"
                    :key="order.customer_name"
                    rounded="xl"
                    shadow="lg"
                    class="bg-white p-4 min-w-[18rem] max-w-full"
                    role="button"
                >
                    <div class="flex items-start justify-between">
                        <div class="flex flex-col gap-1">
                            <h5 class="font-semibold text-base text-gray-600">
                                {{ order.customer_name }}
                            </h5>
                        </div>
                        <p class="text-xs text-gray-400 font-medium">#12532</p>
                    </div>
                    <div class="flex items-start justify-between">
                        <div class="flex flex-col gap-1">
                            <span class="inline-block text-xs text-gray-600">
                                {{ `Table ${order.table_number}` }}
                            </span>
                        </div>
                        <!-- <span
                            role="badge"
                            aria-label="meal progress"
                            class="mt-3 inline-flex rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-normal text-white"
                            :class="getColor(order.status)"
                        >
                            {{ getOrderStatus(order.status) }}
                        </span> -->
                    </div>
                    <div class="w-full space-y-3 my-5">
                        <div
                            v-for="menu in order.items"
                            :key="menu.id"
                            class="w-full flex justify-between items-center"
                        >
                            <div class="flex items-center gap-3">
                                <div class="flex w-8 h-8 flex-shrink-0 rounded-md overflow-clip">
                                    <img :src="menu.image" />
                                </div>
                                <h5
                                    aria-label="meal name"
                                    class="font-medium text-sm truncate text-gray-900 leading-tight"
                                >
                                    {{ menu.name }}
                                </h5>
                            </div>
                            <div class="relative text-blue-600 text-base font-semibold">
                                {{ formatted(menu.price) }}
                            </div>
                        </div>
                    </div>
                    <div
                        class="relative w-full flex flex-col gap-2 pt-2 border-t border-gray-300 before:absolute before:w-full before:"
                    >
                        <p
                            aria-label=""
                            class="flex justify-between font-medium text-sm text-gray-800"
                        >
                            Total
                            <span class="font-bold">
                                {{ formatted(order.subtotal) }}
                            </span>
                        </p>
                    </div>
                </AtomTheCard>
            </div>
        </div>
    </section>
</template>
