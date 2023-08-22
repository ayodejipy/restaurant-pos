<script setup lang="ts">
import { modals } from '~/utils/enums'
import { IMenu } from '~/utils/types/Menu'

const { $toast } = useNuxtApp()

defineProps<{
    open: boolean
}>()

const isLoading = ref<boolean>(false)

const menuStore = useMenuStore()
const { form } = storeToRefs(menuStore)

// modal store
const modalStore = useModalStore()
const { modalType } = storeToRefs(modalStore)

const isEditModal = computed<boolean>(() => modalType.value === modals.editMenu)

const categories: { title: string; sub: string }[] = [
    { title: 'Appetizer', sub: 'appetizer' },
    { title: 'Main course', sub: 'main_course' },
    { title: 'dessert', sub: 'dessert' },
    { title: 'Beverage', sub: 'beverage' },
    { title: 'Other', sub: 'other' },
]

async function submitForm() {
    const operation = isEditModal.value ? 'updated' : 'added'
    try {
        isLoading.value = true
        const endpoint = isEditModal.value ? '/api/menu/update' : '/api/menu/add'
        const body: Partial<IMenu> = {
            name: form.value.name,
            image: form.value.image,
            description: form.value.description,
            category: form.value.category,
            price: form.value.price,
            quantity: form.value.quantity,
            available: form.value.quantity,
        }
        // add id to payload if user is editing
        if (isEditModal.value) {
            body.id = form.value.id
        }

        const { success } = await $fetch(endpoint, { method: 'POST', body })
        if (success) {
            $toast.success(`Menu ${operation} successfully...`)
            // close modal
            closeModal()
        }
    } catch (error) {
        $toast.error(`Oh no! We are unable to ${operation} your meal at this time.`)
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

        <form class="my-10 flex flex-col gap-2 px-4" @submit.prevent="submitForm">
            <Field label="Name">
                <AtomInput v-model="form.name" type="text" placeholder="Enter meal name" />
            </Field>
            <Field label="Meal image">
                <AtomInput v-model="form.image" type="text" placeholder="Enter meal image" />
            </Field>
            <Field label="Meal description">
                <AtomTextarea
                    v-model="form.description"
                    placeholder="Enter short description about the meal"
                />
            </Field>
            <Field label="Select category">
                <AtomTheSelect v-model="form.category" placeholder="Select category">
                    <option
                        v-for="category in categories"
                        :key="category.sub"
                        :value="category.sub"
                    >
                        {{ category.title }}
                    </option>
                </AtomTheSelect>
            </Field>
            <div class="flex gap-4">
                <div class="w-full">
                    <Field label="Price">
                        <AtomInput
                            v-model="form.price"
                            type="text"
                            placeholder="Enter meal price"
                        />
                    </Field>
                </div>
                <div class="w-full">
                    <Field label="Quantity">
                        <AtomInput
                            v-model="form.quantity"
                            type="text"
                            placeholder="Enter quantity"
                        />
                    </Field>
                </div>
            </div>

            <div class="mt-6">
                <AtomTheButton
                    type="submit"
                    rounded="lg"
                    intent="default"
                    :loading="isLoading"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >Submit</AtomTheButton
                >
            </div>
        </form>
    </AtomBaseModal>
</template>
