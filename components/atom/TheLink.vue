<script lang="ts" setup>
import { cva } from 'class-variance-authority'

interface IProps {
    url: string
    leftIcon: string
    size: 'sm' | 'md' | 'lg'
    rounded: 'sm' | 'md' | 'lg'
    activeClass: string
}

const props = withDefaults(defineProps<Partial<IProps>>(), {
    url: '/',
    leftIcon: '',
    size: 'md',
    rounded: 'md',
    activeClass: 'active',
})

const linkClasses = computed<string>(() => {
    return cva('nav-link flex items-center p-2', {
        variants: {
            rounded: {
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
            },
        },
    })({ rounded: props.rounded })
})
</script>

<template>
    <NuxtLink :to="props.url" :class="[linkClasses]" :active-class="activeClass">
        <Icon v-if="props.leftIcon" :name="props.leftIcon" size="1em" class="mr-2 fill-current" />
        <slot />
    </NuxtLink>
</template>

<style scoped>
.active {
    @apply before:absolute before:right-0 before:w-1 before:h-6 before:bg-current before:rounded-l;
}
</style>
