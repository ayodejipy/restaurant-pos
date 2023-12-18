import { OrderItems } from '~/utils/types/Menu'

export default function useProcessOrder() {
    const { $toast } = useNuxtApp()
    const isLoading = ref<boolean>(false)

    const menuStore = useMenuStore()
    const { bookedOrder } = storeToRefs(menuStore)

    async function updateMenuAvailableCount({
        id = 0,
        quantity = 0,
        availableItemsLeft,
        sold = 0,
    }: Partial<OrderItems> & { availableItemsLeft: number }) {
        try {
            const body = {
                available: availableItemsLeft,
                sold: sold + quantity,
            }

            const { success } = await $fetch<{ success: boolean }>(`api/menu/${id}`, {
                method: 'PUT',
                body,
            })

            if (success) return success
        } catch (error) {
            throw new Error(`Unable to update menu available quantity: ${id}`)
        }
    }

    async function placeOrder(subTotal: number, calculateTax: number) {
        try {
            // isLoading.value = true
            const body = {
                ...bookedOrder.value,
                subtotal: subTotal,
                tax: calculateTax,
                status: 'waiting',
            }

            const { success } = await $fetch('/api/order/add', { method: 'POST', body })
            if (success) {
                $toast.success('Success: Order is been processed...')
                menuStore.clearBooked()
            }
        } catch (error) {
            $toast.error('Unable to process order, please try again soon.')
        } finally {
            isLoading.value = false
        }
    }

    return { isLoading, updateMenuAvailableCount, placeOrder }
}
