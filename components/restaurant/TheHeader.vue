<script lang="ts" setup>
import { useModalStore } from '~/stores/modals'

const modalStore = useModalStore()
const { modalType } = storeToRefs(modalStore)

const menus = [
    { name: 'Dashboard', link: '/', icon: 'bxs:dashboard' },
    { name: 'Order Lists', link: '/orders', icon: 'ri:file-list-3-line' },
    { name: 'History', link: '/', icon: 'ic:outline-access-time' },
]
</script>

<template>
    <header class="flex items-center justify-between md:p-6">
        <div class="font-bold text-md tracking-tight">TheMenu</div>

        <div role="menu-items" class="flex items-center md:gap-4">
            <AtomTheLink
                v-for="menu in menus"
                :key="menu.name"
                :url="menu.link"
                :left-icon="menu.icon"
                class="text-gray-500 font-normal hover:text-blue-600"
            >
                {{ menu.name }}
            </AtomTheLink>
        </div>

        <div class="flex items-center gap-2">
            <AtomTheButton
                variant="default"
                intent="default"
                class="relative px-3 font-medium text-sm text-gray-500 border border-gray-300 rounded-lg hover:text-gray-800 lg:mr-3"
                @click="modalType = 'add-menu'"
            >
                <Icon name="ic:outline-add" size="1em" class="mr-2" />
                Add new meal
            </AtomTheButton>
            <div>
                <AtomTheButton
                    variant="default"
                    intent="default"
                    class="relative w-8 h-8 rounded-full border border-gray-300"
                >
                    <Icon name="mingcute:notification-fill" size="1em" />
                    <span
                        class="inline-block absolute top-2 right-2.5 w-1 h-1 rounded-full bg-orange-500"
                    ></span>
                </AtomTheButton>
            </div>
            <RestaurantProfileMenu>
                <AtomTheAvatar
                    name="African man smiling"
                    url="https://img.freepik.com/free-photo/close-up-portrait-dark-skinned-adult-man-with-thick-bristle-smiles-toothy-wears-big-optical-glasses-striped-jumper-glad-meet-friend_273609-38587.jpg?w=2000&t=st=1687988303~exp=1687988903~hmac=31692939773f6532f629fd91604bed4f7e9b36b0a4b552fa269be05548c766b0"
                />
            </RestaurantProfileMenu>

            <!-- <AtomTheAvatar name="African man smiling" url="https://img.freepik.com/free-photo/close-up-portrait-dark-skinned-adult-man-with-thick-bristle-smiles-toothy-wears-big-optical-glasses-striped-jumper-glad-meet-friend_273609-38587.jpg?w=2000&t=st=1687988303~exp=1687988903~hmac=31692939773f6532f629fd91604bed4f7e9b36b0a4b552fa269be05548c766b0" /> -->
        </div>
    </header>
</template>
