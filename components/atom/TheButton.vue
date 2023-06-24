<script lang="ts" setup>
import { cva } from "class-variance-authority";

type IButtonProps = {
    size: "xs" | "sm" | "md" | "lg";
    rounded: "sm" | "md" | "lg" | "xl" | "default";
    intent: "primary" | "secondary" | "default";
    leftIcon: string;
    rightIcon: string;
}

const props = withDefaults(defineProps<Partial<IButtonProps>>(), {
    size: "md",
    intent: "primary",
    rounded: "default",
    leftIcon: "",
    rightIcon: "",
});

// emit a click event to the parent component
const emit = defineEmits<{
    click: [event: Event];
}>();
function onClick(event: Event) {
    emit("click", event);
}

const buttonClasses = computed(() => {
    return cva("px-2 py-2.5 flex justify-center items-center", {
        variants: {
            size: {
                xs: "text-xs",
                sm: "text-sm",
                md: "text-base",
                lg: "text-lg",
            },
            rounded: {
				default: "rounded",
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                xl: "rounded-xl",
            },
            intent: {
                default: "text-gray-800",
                primary: "bg-amber-800 text-white",
                secondary: "bg-gray-700 text-white",
            },
        },
    })({ size: props.size, intent: props.intent, rounded: props.rounded});
});


const options = inject('options', props)
</script>

<template>
    <button type="button" :class="[buttonClasses]" @click="onClick($event)">
        <Icon v-if="options.leftIcon" :name="options.leftIcon" size="1em" class="mr-2 fill-current" />
        <slot />
        <Icon v-if="options.rightIcon" :name="options.rightIcon" size="1em" class="ml-2 fill-current" />
    </button>
</template>
