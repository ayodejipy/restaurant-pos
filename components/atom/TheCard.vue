<script lang="ts" setup>
import { cva } from "class-variance-authority";

interface IProps {
	as: string | object;
	rounded: 'sm' | 'md' | 'lg';
	shadow: 'md' | 'lg' | 'xl';
	activeClass: string;
}

const props = withDefaults(defineProps<Partial<IProps>>(), {
	as: 'div',
	rounded: "md",
	shadow: "md",
	activeClass: 'active',
})

const linkClasses = computed<string>(() => {
	return cva("w-full p-2 bg-white shadow", {
		variants: {
			rounded: {
				sm: "rounded-sm",
				md: "rounded-md",
				lg: "rounded-lg",
				xl: "rounded-xl",
			},
			shadow: {
				md: "drop-shadow-md",
				lg: "drop-shadow-lg",
                xl: "drop-shadow-xl",
			}
		}
	})({ rounded: props.rounded, shadow: props.shadow})
})
</script>

<template>
	<component :is="props.as" aria-label="card" :class="linkClasses">
		<slot />
	</component>
</template>