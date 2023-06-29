<script lang="ts" setup>
import { cva } from "class-variance-authority";

interface IProps {
    id?: string;
    modelValue: string | number;
    required: boolean;
    invalid: boolean;
    ariaDescribedBy?: string;
    placeholder: string;
    rounded: "md" | "lg" | "xl";
}
const props = withDefaults(defineProps<Partial<IProps>>(), {
    required: false,
    invalid: false,
    ariaDescribedBy: "",
    placeholder: "",
    rounded: "xl",
});

const emits = defineEmits(["update:modelValue"]);

// inject the provided props here
const field = inject("field", props);

const showPlaceholder = computed<string>(() => !!field.placeholder ? field.placeholder : props.placeholder);

const Classes = computed(() => {
    return cva("relative w-full px-4 border appearance-none text-gray-400 text-xs h-12", {
        variants: {
            rounded: {
                md: "rounded-md",
                lg: "rounded-lg",
                xl: "rounded-xl",
            },
        },
    })({ rounded: props.rounded });
});

function onChange(event: Event) {
    emits("update:modelValue", (event.target as HTMLSelectElement)?.value);
}
</script>

<template>
    <div class="relative cursor-pointer">
        <select :id="field.id" :name="field.id" :value="modelValue" @input="onChange" :class="[Classes, field.invalid ? 'border-red-500' : 'border-gray-300']">
            <option value="" disabled selected>{{ showPlaceholder }}</option>
            <slot></slot>
        </select>
        <span class="inline-block absolute top-50 transform translate-y-1/2 right-2">
            <Icon name="ic:outline-keyboard-arrow-down" size="1.2em" class="text-gray-400" />
        </span>
    </div>
</template>
