<script lang="ts" setup>
import { cva } from 'class-variance-authority'

type IButtonProps = {
    size: 'xs' | 'sm' | 'md' | 'lg'
    rounded: 'sm' | 'md' | 'lg' | 'xl' | 'default'
    intent: 'primary' | 'secondary' | 'default'
    leftIcon: string
    rightIcon: string
    loading: boolean
}

const props = withDefaults(defineProps<Partial<IButtonProps>>(), {
    size: 'md',
    intent: 'primary',
    rounded: 'default',
    leftIcon: '',
    rightIcon: '',
    loading: false,
})

// emit a click event to the parent component
const emit = defineEmits<{
    click: [event: Event]
}>()

const options = inject('options', props)

const buttonClasses = computed(() => {
    return cva('px-2 py-2.5 flex justify-center items-center disabled:cursor-not-allowed', {
        variants: {
            size: {
                xs: 'text-xs',
                sm: 'text-sm',
                md: 'text-base',
                lg: 'text-lg',
            },
            rounded: {
                default: 'rounded',
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
            },
            intent: {
                default: 'text-gray-800',
                primary: 'bg-amber-800 text-white',
                secondary: 'bg-gray-700 text-white',
            },
        },
    })({ size: props.size, intent: props.intent, rounded: props.rounded })
})

const isLoading = computed<boolean>(() => (options.loading ? options.loading : props.loading))

function onClick(event: Event) {
    emit('click', event)
}
</script>

<template>
    <button type="button" :class="[buttonClasses]" @click="onClick($event)">
        <Icon
            v-if="options.leftIcon && !isLoading"
            :name="options.leftIcon"
            size="1em"
            class="mr-2 fill-current"
        />

        <slot v-if="!isLoading" />

        <Icon
            v-if="options.rightIcon && !isLoading"
            :name="options.rightIcon"
            size="1em"
            class="ml-2 fill-current"
        />

        <svg
            v-if="isLoading"
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            ></circle>
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    </button>
</template>
