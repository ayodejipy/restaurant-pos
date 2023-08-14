<script setup lang="ts">
const { $toast } = useNuxtApp()

defineProps<{
    open: boolean
}>()

const isLoading = ref<boolean>(false)

const menuStore = useMenuStore()
const { bookedOrder } = storeToRefs(menuStore)

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
        const body = {
            name: form.value.name,
            image: form.value.image,
            description: form.value.description,
            category: form.value.category,
            price: form.value.price,
            quantity: form.value.quantity,
            available: form.value.quantity,
        }
        const { success } = await $fetch('/api/menu/add', { method: 'POST', body })
        if (success) {
            $toast.success('Menu added successfully...')
            // close modal
            modalType.value = null
        }
    } catch (error) {
        $toast.error('Oh no! We are unable to create your meal at this time.')
    } finally {
        isLoading.value = false
    }
}

const closeModal = () => {
    modalType.value = null
    menuStore.clearForm()
}

// onBeforeUnmount(() => console.log("onBeforeUnmount"))
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
                <p class="text-sm">{{ bookedOrder.customer_name }}</p>
            </div>
            <div class="w-full">
                <h4 class="font-semibold text-sm">Table</h4>
                <p class="text-sm">{{ `Table ${bookedOrder.table_number}` }}</p>
            </div>
            <div class="w-full">
                <h4 class="font-semibold text-sm">Order Details</h4>
                <div class="flex items-center text-sm">
                    <ul>
                        <li v-for="order in bookedOrder.items" :key="order.id">
                            {{ order.name }} - {{ order.price }} ({{ `${order.quantity}x` }})
                        </li>
                    </ul>
                </div>
            </div>

            <div class="w-full">
                <Field label="Status">
                    <AtomTheSelect v-model="bookedOrder.status" placeholder="Select status">
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

            <div class="mt-3 w-full space-y-2 md:w-64 md:mx-auto">
                <AtomTheButton
                    type="submit"
                    rounded="lg"
                    intent="default"
                    :loading="isLoading"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                    Submit
                </AtomTheButton>

                <AtomTheButton
                    intent="default"
                    :loading="isLoading"
                    class="w-full text-gray-400 font-normal"
                    @click="closeModal"
                >
                    Cancel
                </AtomTheButton>
            </div>
        </div>
    </AtomBaseModal>
</template>