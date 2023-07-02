<script lang="ts" setup></script>

<template>
    <AtomTheCard rounded="xl" shadow="lg" class="bg-white p-4 min-w-[16rem] max-w-full">
        <div class="flex items-start justify-between">
            <div class="flex flex-col gap-1">
                <h5 class="font-semibold text-base text-gray-600">Vinicius Bayu</h5>
                <span class="inline-block text-xs text-gray-400">3 Items <span class="font-semibold text-sm">&bull;</span> Table 3</span>
            </div>
            <p class="text-xs text-gray-400 font-medium">#12532</p>
        </div>
        <span role="badge" aria-label="meal progress" class="mt-3 inline-flex rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-normal text-white"> Ready to serve </span>
    </AtomTheCard>
</template>
