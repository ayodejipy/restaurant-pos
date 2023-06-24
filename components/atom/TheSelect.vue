<script lang="ts" setup>
interface IProps {
	id?: string;
    modelValue: string | number,
    required: boolean,
	invalid: boolean,
	ariaDescribedBy?: string,
	placeholder: string
}
const props = withDefaults(defineProps<Partial<IProps>>(), {
	required: false,
	invalid: false,
    ariaDescribedBy: '',
    placeholder: ""
});

const emits = defineEmits(["update:modelValue"]);

// inject the provided props here
const field = inject("field", props); 

function onChange(event: Event) {
    emits("update:modelValue", (event.target as HTMLSelectElement)?.value);
}
</script>

<template>
	<select 
		:id="field.id" 
		:name="field.id"
		:value="modelValue" 
		@input="onChange" 
		:class="['relative w-full px-4 border appearance-none text-gray-800 text-xs h-12', field.invalid ? 'border-red-500' : 'border-gray-400']"
	>
		<option value="" disabled selected>{{ field.placeholder }}</option>
		<slot></slot>
	</select>
</template>
