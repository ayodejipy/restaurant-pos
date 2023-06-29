<script lang="ts" setup>
import { cva } from 'class-variance-authority';

const emit = defineEmits(["update:modelValue"]);

interface InputProps {
	id?: string;
    modelValue: string | number,
    required: boolean,
	invalid: boolean,
	ariaDescribedBy?: string
	rounded: "md" | "lg" | "xl"
}

const props = withDefaults(defineProps<Partial<InputProps>>(), {
	modelValue: "",
    required: false,
    invalid: false,
	ariaDescribedBy: "",
	rounded: "xl"
});
// inject the provided props here
const field = inject("field", props);

const Classes = computed(() => {
    return cva("relative w-full p-3 text-gray-800 border  outline-0 text-xs leading-normal font-normal placeholder:focus:text-transparent placeholder:text-gray-400 bg-transparent focus:border-gray-500", {
        variants: {
            rounded: {
                md: "rounded-md",
                lg: "rounded-lg",
                xl: "rounded-xl",
            },
        },
    })({ rounded: props.rounded });
});

function onChange($event: Event) {
    emit("update:modelValue", ($event.target as HTMLSelectElement)?.value);
}
</script>

<template>
    <input 
		:id="field.id" 
		:name="field.id" 
		:value="modelValue" 
		:required="required" @input="onChange"
		:class="[Classes, field.invalid ? 'border-red-500' : 'border-gray-300']" />
</template>
