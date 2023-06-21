<script lang="ts" setup>
const open = ref<boolean>(false)
const toggleModal = () => open.value = !open.value
</script>

<template>
	<button @click="toggleModal" class="bg-black text-white rounded-sm px-4 py-2">Toggle modal</button>
	<AtomBaseModal :is-open="open" @close="toggleModal" size="lg" rounded="2xl">
		<div class="mt-2">
			<p class="text-sm text-gray-500">Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.</p>
		</div>

		<div class="mt-4">
			<button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" @click="toggleModal">Got it, thanks!</button>
		</div>
	</AtomBaseModal>
</template>