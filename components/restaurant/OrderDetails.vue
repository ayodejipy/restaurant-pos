<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import type { IMenu, GroupedMenu } from '~/utils/types/Menu'

const tables = [
    { id: 1, name: 'Table 1' },
    { id: 2, name: 'Table 2' },
    { id: 3, name: 'Table 3' },
    { id: 4, name: 'Table 4' },
    { id: 5, name: 'Table 5' },
]

const menuStore = useMenuStore()
const { bookedOrder } = storeToRefs(menuStore)

const { orderRules } = useValidator()
const { items, status, subtotal, tax, ...rest } = bookedOrder.value
const v$ = useVuelidate(orderRules, rest)
</script>

<template>
    <section class="w-full">
        <div>
            <h5 class="font-medium text-lg leading-8 md:my-3">Customer Information</h5>
            <div class="flex flex-col gap-3 pb-5 border-b border-gray-300">
                <Field :errors="v$.customer_name.$errors">
                    <AtomInput
                        v-model="bookedOrder.customer_name"
                        type="text"
                        placeholder="Customer Name"
                        class="placeholder:text-gray-500"
                        @blur="v$.customer_name.$touch"
                    />
                </Field>
                <Field :errors="v$.table_number.$errors">
                    <AtomTheSelect
                        v-model="bookedOrder.table_number"
                        placeholder="Select Table"
                        class="rounded-sm"
                        @blur="v$.table_number.$touch"
                    >
                        <option v-for="table in tables" :value="table.id">{{ table.name }}</option>
                    </AtomTheSelect>
                </Field>
            </div>
        </div>
        <div class="py-3">
            <h5 class="font-medium text-lg leading-8">Order Details</h5>

            <div v-if="bookedOrder.items.length > 0">
                <RestaurantOrderItem
                    v-for="order in bookedOrder.items"
                    :key="order.id"
                    :item="order"
                />
            </div>
            <div v-else class="w-full text-sm text-gray-700 italic my-3">
                Your list is currently empty. Meals you add will appear here.
            </div>
        </div>

        <div class="py-4 space-y-4">
            <h5 class="font-medium text-lg leading-8">Order Summary</h5>
            <div>
                <RestaurantOrderSummary />
            </div>
        </div>
    </section>
</template>
