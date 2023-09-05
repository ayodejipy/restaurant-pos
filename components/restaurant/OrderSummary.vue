<script lang="ts" setup>
import { OrderItems } from '~/utils/types/Menu'

const props = defineProps<{
    isDisabled: boolean
}>()

const tax = ref<number>(10)

const { formatted } = useCurrency()
const { $toast } = useNuxtApp()

const menuStore = useMenuStore()
const { bookedOrder } = storeToRefs(menuStore)

const subTotal = computed(() =>
    bookedOrder.value.items.reduce(
        (acc: number, meal: OrderItems) => (acc += meal.quantity * meal.price),
        0
    )
)
const calculateTax = computed(() => Math.round((subTotal.value * tax.value) / 100))

const { isLoading, placeOrder, updateMenuAvailableCount } = processOrder()

async function updateAvailableMenu() {
    isLoading.value = true
    console.log('', bookedOrder.value.items)

    // subtract quantity bought from available. difference becomes sold
    const availableMenuItems = bookedOrder.value.items.map((menu) => {
        const { id, available, quantity, sold } = menu

        const availableItemsLeft = available - quantity

        console.log({ availableItemsLeft })

        return { id, quantity, availableItemsLeft, sold }
    })

    // make a request to update each menu's availability,
    await Promise.all(availableMenuItems.map((item) => updateMenuAvailableCount(item)))
        .then((response) => placeOrder(subTotal.value, calculateTax.value))
        .catch((error) => {
            throw new Error('Unable to compute available left count: ', error)
        })
}
</script>

<template>
    <div class="w-full flex flex-col gap-6">
        <AtomTheCard
            rounded="xl"
            shadow="none"
            class="summary relative bg-gray-100 p-6 min-w-[16rem] max-w-full"
        >
            <div class="w-full flex flex-col gap-2">
                <p aria-label="" class="flex justify-between font-normal text-sm text-gray-400">
                    Subtotal
                    <span class="font-medium text-gray-800">{{ formatted(subTotal) }}</span>
                </p>
                <p aria-label="" class="flex justify-between font-normal text-sm text-gray-400">
                    Tax(10%)
                    <span class="font-medium text-gray-800">{{ formatted(calculateTax) }}</span>
                </p>
            </div>
            <div class="line"></div>
        </AtomTheCard>
        <div class="py-4 space-y-4">
            <AtomTheButton
                :loading="isLoading"
                rounded="lg"
                intent="default"
                class="w-full bg-blue-600 text-white font-medium disabled:bg-blue-800 disabled:text-gray-300 disabled:cursor-not-allowed"
                :disabled="isDisabled"
                @click="updateAvailableMenu"
            >
                Process Transaction
            </AtomTheButton>
        </div>
    </div>
</template>

<style scoped>
.summary {
    @apply before:absolute before:bottom-0 before:left-0 before:bg-white before:w-4 before:h-4 after:absolute after:bottom-0 after:right-0 after:bg-white after:w-4 after:h-4 before:z-10 after:z-10;
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
