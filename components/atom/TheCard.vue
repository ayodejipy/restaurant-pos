<script lang="ts" setup>
import { cva } from "class-variance-authority";

interface IProps {
	as: string | object;
	rounded: 'none' | 'sm' | 'md' | 'lg';
	shadow: 'none' | 'md' | 'lg' | 'xl';
	activeClass: string;
}

const props = withDefaults(defineProps<Partial<IProps>>(), {
	as: 'div',
	rounded: "md",
	shadow: "md",
	activeClass: 'active',
})

const cardClass = computed<string>(() => {
	return cva("w-full", {
		variants: {
			rounded: {
				none: "rounded-none",
				sm: "rounded-sm",
				md: "rounded-md",
				lg: "rounded-lg",
				xl: "rounded-xl",
			},
			shadow: {
				none: 'shadow-none',
				md: "shadow-md",
				lg: "shadow-lg",
                xl: "shadow-xl",
			}
		}
	})({ rounded: props.rounded, shadow: props.shadow })
})
</script>

<template>
	<component :is="props.as" aria-label="card" :class="cardClass" tabindex="0">
		<slot />
	</component>
</template>