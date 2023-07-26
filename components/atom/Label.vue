<script lang="ts" setup>
const props = defineProps<{
    for: string
    required?: boolean
}>()
</script>

<template>
    <label :for="props.for" class="block text-sm font-medium leading-6 text-gray-700">
        <slot />
    </label>
</template>
