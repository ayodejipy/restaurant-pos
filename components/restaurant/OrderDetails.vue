<script lang="ts" setup>
import type { IMenu, GroupedMenu } from '~/utils/types/Menu';

const menuStore = useMenuStore();
const { bookedOrder } = storeToRefs(menuStore);

</script>

<template>
    <div v-if="bookedOrder.items.length > 0">
		<RestaurantOrderItem v-for="order in bookedOrder.items" :key="order.id" :item="order" />
	</div>
	<div v-else class="w-full text-sm text-gray-700 italic my-3">
		Your list is currently empty. Meals you add will appear here.
	</div>
</template>
