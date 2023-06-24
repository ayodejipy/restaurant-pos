<script lang="ts" setup>
type ChildLinks = {
	url: string;
	name: string;
}
type IProps = {
	isOpen: boolean;
	leftIcon: string;
	size: "xs" | "sm" | "md" | "lg";
    rounded: "sm" | "md" | "lg" | "xl" | "default";
	subMenus: ChildLinks[]
}

const props = withDefaults(defineProps<Partial<IProps>>(), {
	isOpen: false,
    leftIcon: "",
    size: "md",
    rounded: "md",
	activeClass: "active",
	subMenus: () => []
});

provide('options', props)

const emit = defineEmits<{
	click: [event: Event]
}>();

</script>

<template>
    <AtomTheButton v-bind="$attrs" intent="default" @click="emit('click', $event)">
		<slot />
	</AtomTheButton>
    <div class="pl-4" v-if="props.isOpen">
        <ul>
            <li class="relative afterline" v-for="sub in props.subMenus">
                <AtomTheLink :url="sub.url" class="trackline ml-4 text-gray-700 text-xs font-normal hover:bg-gray-100 hover:text-gray-700"> {{ sub.name }} </AtomTheLink>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.trackline {
    @apply before:w-3 before:h-2.5 before:absolute before:top-1.5 before:left-0 before:border-gray-800 before:border-l before:border-b;
}
.trackline::before {
    border-radius: 0 0 0 50%;
}
.afterline {
    @apply before:absolute before:h-8 before:w-px before:bg-gray-800 after:absolute after:h-2 after:w-px after:bg-gray-800 before:last-of-type:hidden after:last-of-type:hidden;
}
</style>
