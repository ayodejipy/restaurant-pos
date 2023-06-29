<script lang="ts" setup>
interface IProps {
	id?: string;
    modelValue: string | number,
    required: boolean,
	invalid: boolean,
	ariaDescribedBy?: string,
	placeholder: string
}
const props = withDefaults(defineProps<Partial<IProps>>() , {
	required: false,
	invalid: false,
    ariaDescribedBy: '',
    placeholder: ""
});


</script>

<template>
	<div class="relative cursor-pointer">
		<select
			class="relative w-full px-4 border appearance-none text-gray-800 text-xs h-12 border-gray-400"
		>
			<option value="" disabled selected>Select Item</option>
			<option value="1">One Item</option>
			<option value="2">Two Item</option>
			<option value="3">Three Item </option>
		</select>
		<span class="inline-block absolute top-50 transform translate-y-1/2 right-2">
			<Icon name="ic:outline-keyboard-arrow-down" size="1.2em" class="text-gray-400" />
		</span>
	</div>
</template>
