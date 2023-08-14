<script setup lang="ts">
definePageMeta({
    layout: 'restaurant',
    middleware: ['auth'],
})
</script>

<template>
    <RestaurantProfileInformation />
</template>
