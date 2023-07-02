<script lang="ts" setup>
interface IProps {
	disabled: boolean,
}

const props = withDefaults(defineProps<Partial<IProps>>(), {
	disabled: false
});

const backgroundColor = computed<string>(() => props.disabled ? 'bg-gray-100 shadow-gray-100' : 'bg-white');

const itemCount = ref<number>(0);

const increaseItemCount = () => itemCount.value++;
const decreaseItemCount = () => itemCount.value ? itemCount.value : itemCount.value--;
</script>

<template>
    <AtomTheCard rounded="xl" shadow="lg" :class="[backgroundColor, 'p-4 min-w-[16rem] max-w-full']">
        <div class="w-full flex gap-4">
            <div class="flex w-28 h-28 lg:w-40 lg:h-40 flex-shrink-0 rounded-xl overflow-clip">
                <img src="https://img.freepik.com/free-photo/side-view-pilaf-with-stewed-beef-meat-plate_141793-5057.jpg?w=2000&t=st=1688158637~exp=1688159237~hmac=afd584a8c3d380ca23d781009f53de1ebf407d546eb9653734247334a3d55210" class="object-cover w-full h-full" alt="food picture" />
            </div>
            <div class="flex-1 flex flex-col justify-between">
                <div>
                    <h5 aria-label="meal name" class="font-medium text-lg text-gray-900 leading-tight">Crispy Dorey Sambal Matah</h5>
                    <p aria-label="meal description" class="text-gray-400 text-xs mt-2 leading-normal truncate-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur, hic! Quo excepturi error nihil, obcaecati recusandae corporis sint nisi molestias voluptates expedita. Quam recusandae iste similique delectus quod a aliquid!</p>
                </div>
                <span class="inline-block mt-6 text-xs text-gray-400" aria-label="available and sold items">12 Available <span class="font-semibold text-sm">&bull;</span> 6 Sold</span>
            </div>
        </div>
        <div class="mt-6 flex justify-between">
            <h5 aria-label="meal price" class="text-gray-800 text-2xl font-bold"><sup class="text-base font-semibold" :class="[props.disabled ? 'text-gray-400': 'text-blue-600' ]">$</sup>100.00</h5>
            <div class="flex gap-3">
                <AtomTheButton intent="default" :class="[props.disabled ? 'bg-gray-200 text-gray-300 cursor-not-allowed' : 'bg-gray-200 text-gray-800', 'w-10 h-10 rounded-full']" @click="decreaseItemCount" :disabled="itemCount == 0">
                    <Icon name="ic:outline-minus" />
                </AtomTheButton>
                <span :class="[props.disabled ? 'text-gray-400' : 'text-gray-600', 'inline-flex justify-center items-center w-14 font-semibold']">{{ itemCount }}</span>
                <AtomTheButton intent="default" :class="[props.disabled ? 'bg-gray-200 text-gray-300 cursor-not-allowed pointer-events-none' : 'bg-blue-600 text-white', 'w-10 h-10 rounded-full']" @click="increaseItemCount">
                    <Icon name="ic:baseline-plus" />
                </AtomTheButton>
            </div>
        </div>
    </AtomTheCard>
</template>
