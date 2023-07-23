<script lang="ts" setup>
import { IMenu } from '~/utils/types/Menu';
const tax = ref<number>(10)

const { formatted } = useCurrency();

const menuStore = useMenuStore();
const { bookedOrder } = storeToRefs(menuStore);

const subTotal = computed(() => bookedOrder.value.menu_items.reduce((acc: number, meal: IMenu) => acc+= meal.buying * meal.price, 0))
const calculateTax = computed(() => (subTotal.value * tax.value) / 100 )

</script>

<template>
	<div class="w-full flex flex-col gap-6">
		<AtomTheCard rounded="xl" shadow="none" class="summary relative bg-gray-100 p-6 min-w-[16rem] max-w-full">
			<div class="w-full flex flex-col gap-2">
				<p aria-label="" class="flex justify-between font-normal text-sm text-gray-400">Subtotal <span class="font-medium text-gray-800">{{ formatted(subTotal) }}</span></p>
				<p aria-label="" class="flex justify-between font-normal text-sm text-gray-400">Tax(10%) <span class="font-medium text-gray-800">{{ formatted(calculateTax) }}</span></p>
			</div>
			<div class="line"></div>
		</AtomTheCard>
		<div class="py-4 space-y-4">
			<AtomTheButton rounded="lg" intent="default" class="w-full bg-blue-600 text-white font-medium">Process Transaction</AtomTheButton>
		</div>
	</div>
</template>

<style scoped>
.summary {
	@apply before:absolute before:bottom-0 before:left-0 before:bg-white before:w-4 before:h-4 after:absolute after:bottom-0 after:right-0 after:bg-white after:w-4 after:h-4 before:z-10 after:z-10
}

.summary::before {
	border-radius: 0 90% 0 0;
}
.summary::after {
	border-radius: 90% 0 0 0;
}

.line {
	position: absolute;
	inset-inline: 0;
	bottom: 0;
	width: 100%;
	height: 0.125rem;
	background: repeating-linear-gradient(
		to right,
		transparent,
		transparent 10px,
		#d1d5db 10px,
		#d1d5db 20px
	);
}

</style>