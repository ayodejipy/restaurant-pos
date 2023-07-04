<script lang="ts" setup>
import { useUserStore } from '~/store/users'

definePageMeta({
    layout: "restaurant",
});

const store = useUserStore()
const { user } = storeToRefs(store)
</script>

<template>
    <section class="min-h-screen flex divide-x divide-gray-300 border-t border-gray-300">
        <div class="flex-1 bg-gray-50 p-6 overflow-hidden">
            <div class="flex items-center justify-between md:my-3">
                <h5 class="font-medium text-base leading-8">Order List</h5>
                <a href="#" class="text-sm text-gray-500">See All</a>
            </div>
            <div class="flex gap-6 pb-4 overflow-x-auto no-scrollbar">
                <RestaurantOrderCard v-for="n in 10" :key="n" />
            </div>
            
            <div class="mt-4">
                <RestaurantMenusTab />
            </div>
        </div>

        <div class="w-1/4 flex-shrink-0 p-6">
            <div>
                <h5 class="font-medium text-lg leading-8 md:my-3">Customer Information</h5>
                <RestaurantCustomerInformation />
            </div>
            <div class="py-3">
                <h5 class="font-medium text-lg leading-8">Order Details</h5>
                <div>
                    <RestaurantOrderItem />
                    <RestaurantOrderItem />
                    <RestaurantOrderItem />
                </div>
            </div>
            <div class="py-4 space-y-4">
                <h5 class="font-medium text-lg leading-8">Order Summary</h5>
                <div>
                    <RestaurantOrderSummary />
                </div>
            </div>
            <div class="py-4 space-y-4">
                <AtomTheButton rounded="lg" intent="default" class="w-full bg-blue-600 text-white font-medium">Process Transaction</AtomTheButton>
            </div>
        </div>
    </section>
</template>
