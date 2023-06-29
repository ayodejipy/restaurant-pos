<script lang="ts" setup>
definePageMeta({
    layout: "restaurant",
});
</script>

<template>
    <section class="min-h-screen flex divide-x divide-gray-300 border-t border-gray-300">
        <div class="flex-1 bg-gray-50 p-6">
            <div class="flex items-center justify-between md:my-3">
                <h5 class="font-normal text-base leading-8">Order List</h5>
                <a href="#" class="text-sm text-gray-500">See All</a>
            </div>
            <div class="flex">
                <RestaurantOrderCard />
            </div>
        </div>
        <div class="w-1/4 p-4">
            <div>
                <h5 class="font-normal text-base leading-8 md:my-3">Customer Information</h5>
                <RestaurantCustomerInformation />
            </div>
            <div>
                <h5 class="font-normal text-base leading-8 md:my-3">Order Details</h5>
            </div>
		</div>
    </section>
</template>
