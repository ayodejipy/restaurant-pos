<script lang="ts" setup>
import type { IMenu, GroupedMenu, Order } from '~/utils/types/Menu';

const modalStore = useModalStore();
const { modalType } = storeToRefs(modalStore);

const { data, pending, error } = await useFetch("/api/order");
const orders = ref<IMenu[] | null | undefined>(data.value?.data.data);


</script>

<template>
	<div class="flex-1 bg-gray-50 py-6 overflow-hidden">
		<div class="flex items-center justify-between md:my-3">
			<h5 class="font-medium text-base leading-8">Order List</h5>
			<a href="#" class="text-sm text-gray-500">See All</a>
		</div>
		<div class="flex gap-6 pb-4 overflow-x-auto no-scrollbar">
			<template v-if="pending">
				<div v-for="n in 5" :key="n" class="animate-pulse">
					<div class="bg-slate-200 w-60 h-28 flex items-start gap-4 p-3 rounded-lg">
						<div class="flex-1 space-y-4">
							<div class="bg-slate-300 w-28 h-4 rounded-lg"></div>
							<div class="bg-slate-300 w-20 h-4 rounded-lg"></div>
						</div>
						<div class="bg-slate-300 w-20 h-4 rounded-lg"></div>
					</div>
				</div>
			</template>
			<template v-else>
				<RestaurantOrderCard v-for="n in 10" :key="n" />
			</template>
		</div>
	</div>
</template>
