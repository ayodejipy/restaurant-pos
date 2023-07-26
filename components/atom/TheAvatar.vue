<script lang="ts" setup>
import { cva } from 'class-variance-authority'

interface IProps {
    url: string
    name: string
    initials: string
    size: 'sm' | 'base' | 'lg'
    shape: 'none' | 'square' | 'circle'
}

const props = withDefaults(defineProps<Partial<IProps>>(), {
    url: '/',
    size: 'sm',
    shape: 'circle',
})

const validImageUrl = ref<string | null>(null)

const fallback = computed<string>(() => props.initials || props.name?.charAt(0) || '?')

const avatarClasses = computed<string>(() => {
    return cva(
        'select-none inline-flex items-center justify-center font-bold text-slate-700 bg-slate-200 overflow-hidden',
        {
            variants: {
                size: {
                    sm: 'text-xs h-8 w-8',
                    base: 'text-xl h-12 w-12',
                    lg: 'text-5xl h-28 w-28',
                },
                shape: {
                    none: 'rounded-none',
                    square: 'rounded',
                    circle: 'rounded-full',
                },
            },
        }
    )({ size: props.size, shape: props.shape })
})

// auto check if image url is valid
watchEffect(() => {
    if (process.client) {
        const img = new Image()
        img.src = props.url
        img.decode()
            .then(() => (validImageUrl.value = props.url))
            .catch((e) => {
                validImageUrl.value = null
                throw e
            })
    }
})
</script>

<template>
    <ClientOnly>
        <span :title="props.name" :class="avatarClasses" v-bind="$attrs">
            <nuxt-img
                v-if="validImageUrl"
                class="w-full h-full object-cover"
                :src="validImageUrl"
                :alt="props.name"
            />
            <template v-else> {{ fallback }} </template>
        </span>
    </ClientOnly>
</template>
