<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import type { ErrorObject } from '@vuelidate/core'
import { type IField, DEFAULT_VALUE } from '~/utils/types/Form'

const props = withDefaults(defineProps<Partial<IField>>(), {
    id: () => `field-${uuidv4()}`,
    label: '',
    required: false,
    help: '',
    errors: (): ErrorObject[] => [], // could be array of errors
})

const ariaDescribedBy = computed(() => (props.help ? `help--${uuidv4()}` : null))
// provide the props to any children of the field, set missing properties on input
provide(
    'field',
    computed(() => ({
        ...props,
        invalid: !!props.errors.length,
        ariaDescribedBy: ariaDescribedBy.value,
        placeholder: props.label,
    }))
)
</script>

<template>
    <AtomLabel v-if="props.label" :for="props.id">{{ props.label }}</AtomLabel>
    <!-- make input options flexible by using slot in here -->
    <slot />
    <AtomHelperMessage v-if="!!props.help">{{ props.help }}</AtomHelperMessage>
    <template v-if="props.errors.length">
        <AtomErrorText v-for="error in props.errors">{{ error.$message }}</AtomErrorText>
    </template>
</template>
