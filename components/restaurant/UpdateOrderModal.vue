<script setup lang="ts">
import type { Order } from '~/utils/types/Menu'

const { $toast } = useNuxtApp()

const props = defineProps<{
    open: boolean
    order: Order | null
}>()

const isLoading = ref<boolean>(false)
const { formatted } = useCurrency()

const menuStore = useMenuStore()
// const { bookedOrder } = storeToRefs(menuStore)

const item = computed(() => props.order as Order)

// modal store
const modalStore = useModalStore()
const { modalType } = storeToRefs(modalStore)

const statusTypes: { title: string; value: string }[] = [
    { title: 'Waiting', value: 'waiting' },
    { title: 'Ready', value: 'ready' },
    { title: 'Completed', value: 'completed' },
    { title: 'Canceled', value: 'canceled' },
]

async function submitForm() {
    try {
        isLoading.value = true
        const body = { ...item.value }
        const { success } = await $fetch('/api/order/update', { method: 'POST', body })
        if (success) {
            $toast.success(`ORDER ${item.value?.id} was successfully updated.`)
            // close modal
            closeModal()
        }
    } catch (error) {
        $toast.error(`Unable to update order for ${item.value?.customer_name} at this time.`)
    } finally {
        isLoading.value = false
    }
}

const closeModal = () => {
    modalType.value = null
    menuStore.clearForm()
}
</script>

<template>
    <AtomBaseModal size="lg" :is-open="open">
        <AtomTheButton
            intent="default"
            class="absolute right-3 top-3 h-10 w-10 rounded-full transition-all hover:bg-slate-400 hover:text-white"
            @click="closeModal"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </AtomTheButton>

        <div class="my-10 flex flex-col gap-4 px-4">
            <div class="w-full">
                <h4 class="font-semibold text-sm">Customer name</h4>
                <p class="text-sm">{{ item?.customer_name }}</p>
            </div>
            <div class="w-full">
                <h4 class="font-semibold text-sm">Table</h4>
                <p class="text-sm">{{ `Table ${item?.table_number}` }}</p>
            </div>
            <div class="w-full">
                <h4 class="font-semibold text-sm">Order Details</h4>
                <div class="flex items-center text-sm">
                    <ul>
                        <li v-for="list in item?.items" :key="list.id">
                            {{ `${list.quantity}x` }} {{ list.name }}
                            <span class="font-semibold"> {{ formatted(list.price) }} </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="w-full">
                <Field label="Status">
                    <AtomTheSelect v-model="item.status" placeholder="Select status">
                        <option
                            v-for="status in statusTypes"
                            :key="status.value"
                            :value="status.value"
                        >
                            {{ status.title }}
                        </option>
                    </AtomTheSelect>
                </Field>
            </div>

            <div class="mt-3 w-full space-y md:w-64 md:mx-auto">
                <AtomTheButton
                    type="submit"
                    rounded="lg"
                    intent="default"
                    :loading="isLoading"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    @click="submitForm"
                >
                    Submit
                </AtomTheButton>

                <AtomTheButton
                    intent="default"
                    class="w-full text-gray-300 font-normal"
                    @click="closeModal"
                >
                    Cancel
                </AtomTheButton>
            </div>
        </div>
    </AtomBaseModal>
</template>
