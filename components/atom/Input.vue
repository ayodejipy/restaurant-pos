<script lang="ts" setup>
const emit = defineEmits(["update:modelValue"]);

interface InputProps {
	id?: string;
    modelValue: string | number,
    required: boolean,
	invalid: boolean,
	ariaDescribedBy?: string
}

const props = withDefaults(defineProps<Partial<InputProps>>(), {
	modelValue: "",
    required: false,
    invalid: false,
    ariaDescribedBy: ""
});

function onChange($event: Event) {
    emit("update:modelValue", ($event.target as HTMLSelectElement)?.value);
}
// inject the provided props here
const field = inject("field", props);
</script>

<template>
    <input 
		:id="field.id" 
		:name="field.id" 
		:value="modelValue" 
		:required="required" @input="onChange" 
		:class="['relative w-full p-3 text-gray-800 border  outline-0 text-xs leading-normal font-normal placeholder:focus:text-transparent placeholder:text-gray-600 bg-transparent focus:border-gray-500', field.invalid ? 'border-red-500' : 'border-gray-400']" />
</template>
