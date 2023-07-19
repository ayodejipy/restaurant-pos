<script setup lang="ts">
defineProps<{
	open: boolean
}>();

const menuStore = useMenuStore();
const { form } = storeToRefs(menuStore);

// modal store
const modalStore = useModalStore();
const { modalType } = storeToRefs(modalStore);

function submitForm() { }

</script>


<template>
	<AtomBaseModal size="lg" :is-open="open">
		<AtomTheButton @click="modalType = null" intent="default" class="absolute right-3 top-3 h-10 w-10 rounded-full transition-all hover:bg-slate-400 hover:text-white">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</AtomTheButton>

		<form @submit.prevent="submitForm" class="my-10 flex flex-col gap-2 px-4">
			<Field label="Name">
				<AtomInput v-model="form.name" type="text" placeholder="Enter meal name" />
			</Field>
			<Field label="Meal image">
				<AtomInput v-model="form.image_url" type="text" placeholder="Enter meal image" />
			</Field>
			<Field label="Meal description">
				<AtomTextarea v-model="form.image_url" placeholder="Enter short description about the meal" />
			</Field>
			<!-- <Field label="Select category">
				<AtomTheSelect v-model="form.category">
					<option v-for="category in categories" :value="category.sub">{{ category.title }}</option>
				</AtomTheSelect>
			</Field> -->
			<div class="flex gap-4">
				<div class="w-full">
					<Field label="Price">
						<AtomInput v-model="form.image_url" type="text" placeholder="Enter meal price" />
					</Field>
				</div>
				<div class="w-full">
					<Field label="Quantity">
						<AtomInput v-model="form.image_url" type="text" placeholder="Enter quantity" />
					</Field>
				</div>
			</div>

			<div class="mt-6">
                <AtomTheButton type="submit" rounded="lg" intent="default" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">Submit</AtomTheButton>
            </div>
		</form>
	</AtomBaseModal>
</template>