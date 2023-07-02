<script lang="ts" setup>
const categories = ref({
  Recent: [
    {
      id: 1,
      title: 'Does drinking coffee make you smarter?',
      date: '5h ago',
      commentCount: 5,
      shareCount: 2,
    },
    {
      id: 2,
      title: "So you've bought coffee... now what?",
      date: '2h ago',
      commentCount: 3,
      shareCount: 2,
    },
  ],
  Popular: [
    {
      id: 1,
      title: 'Is tech making coffee better or worse?',
      date: 'Jan 7',
      commentCount: 29,
      shareCount: 16,
    },
    {
      id: 2,
      title: 'The most innovative things happening in coffee',
      date: 'Mar 19',
      commentCount: 24,
      shareCount: 12,
    },
  ],
  Trending: [
    {
      id: 1,
      title: 'Ask Me Anything: 10 answers to your questions about coffee',
      date: '2d ago',
      commentCount: 9,
      shareCount: 5,
    },
    {
      id: 2,
      title: "The worst advice we've ever heard about coffee",
      date: '4d ago',
      commentCount: 1,
      shareCount: 2,
    },
  ],
})
</script>

<template>
  <div class="w-full max-w-full px-2 py-16 sm:px-0">
    <HeadlessTabGroup>
      <HeadlessTabList class="flex space-x-1 rounded-full bg-gray-200 p-1">
        <HeadlessTab
          v-for="category in Object.keys(categories)"
          as="template"
          :key="category"
          v-slot="{ selected }"
        >
          <button
			aria-label="category button"
		  	class="w-full rounded-full py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2"
            :class="[selected
                ? 'bg-white text-gray-800 shadow'
                : 'text-gray-400 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ category }}
          </button>
        </HeadlessTab>
      </HeadlessTabList>

      <HeadlessTabPanels class="mt-2">
		<div class="flex items-center justify-between md:my-3">
			<h5 class="font-medium text-base leading-8">Menu</h5>
			<a href="#" class="text-sm text-gray-400">Showing 30 Items</a>
		</div>

        <HeadlessTabPanel
          v-for="(posts, idx) in Object.values(categories)"
          :key="idx"
          :class="[
            'rounded-xl bg-white',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          ]"
        >
			<div class="flex md:gap-6">
				<RestaurantMenuItem v-for="n in 3" :key="n" />
			</div>
        </HeadlessTabPanel>
      </HeadlessTabPanels>
    </HeadlessTabGroup>
  </div>
</template>
