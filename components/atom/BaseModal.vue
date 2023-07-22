<script lang="ts" setup>
import { cva } from "class-variance-authority";

export interface IModalProps {
    isOpen: boolean;
    size: "md" | "lg" | "xl";
    rounded: "md" | "lg" | "xl" | "2xl";
}

const props = withDefaults(defineProps<Partial<IModalProps>>(), {
    isOpen: false,
    size: "md",
    rounded: "lg",
});

// modal store
const modalStore = useModalStore();
const { modalType } = storeToRefs(modalStore);

const emit = defineEmits(["close"]);

const containerClass = computed(() => {
    return cva("w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all", {
        variants: {
            size: {
                md: "max-w-md",
                lg: "max-w-lg",
                xl: "max-w-xl",
            },
            rounded: {
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                xl: "rounded-xl",
                "2xl": "rounded-2xl",
            },
        },
    })({ size: props.size, rounded: props.rounded });
});

const close = () => modalType.value = null
</script>

<template>
    <HeadlessTransitionRoot appear :show="props.isOpen" as="template">
        <HeadlessDialog as="div" @close="close" class="relative z-10">
            <HeadlessTransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </HeadlessTransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="relative flex min-h-full items-center justify-center p-4 text-center">
                    <HeadlessTransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                        <HeadlessDialogPanel :class="[containerClass]">
                            <!-- <HeadlessDialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900"> Payment successful </HeadlessDialogTitle> -->
                            <slot />
                        </HeadlessDialogPanel>
                    </HeadlessTransitionChild>
                </div>
            </div>
        </HeadlessDialog>
    </HeadlessTransitionRoot>
</template>
