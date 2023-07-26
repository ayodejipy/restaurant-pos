<script lang="ts" setup>
import type { Order } from '~/utils/types/Menu'

const { data, pending, error } = await useFetch('/api/order')
const orders = ref<Order[] | null | undefined>(data.value?.data.data)

console.log({ orders })
</script>

<template>
    <div class="flex-1 bg-gray-50 py-6 overflow-hidden">
        <div class="flex items-center justify-between md:my-3">
            <h5 class="font-medium text-base leading-8">Order List</h5>
            <a href="#" class="text-sm text-gray-500">See All</a>
        </div>
        <!-- <template v-if="pending">
			<div v-for="n in 5" :key="n" class="animate-pulse">
				<div class="bg-slate-200 w-60 h-28 flex items-start gap-4 p-3 rounded-lg">
					<div class="flex-1 space-y-4">
						<div class="bg-slate-300 w-28 h-4 rounded-lg"></div>
						<div class="bg-slate-300 w-20 h-4 rounded-lg"></div>
					</div>
					<div class="bg-slate-300 w-20 h-4 rounded-lg"></div>
				</div>
			</div>
		</template> -->
        <div v-if="orders?.length == 0" class="text-sm font-medium">
            List is currently empty. Any order you process will be displayed here.
        </div>
        <div v-else class="flex gap-6 pb-4 overflow-x-auto no-scrollbar">
            <RestaurantOrderCard
                v-for="order in orders"
                :key="order.customer_name"
                :order="order"
            />
        </div>
    </div>
</template>
