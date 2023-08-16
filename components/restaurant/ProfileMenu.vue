<script setup lang="ts">
const { $toast } = useNuxtApp()
const router = useRouter()

// useSupabaseAuthClient is not available on the nuxt module
const supabase = useSupabaseAuthClient()

async function handleLogout() {
    const { error } = await supabase.auth.signOut()
    if (error)
        return $toast.error(
            'Unable to sign you out at the moment, please contact site adminstrator.'
        )
    router.push('/login')
}
</script>

<template>
    <HeadlessMenu as="div" class="relative" role="menu" aria-label="user menu">
        <div>
            <HeadlessMenuButton class="flex w-full justify-center">
                <slot />
            </HeadlessMenuButton>
        </div>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <HeadlessMenuItems
                class="z-20 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
                <div class="px-1 py-1">
                    <HeadlessMenuItem v-slot="{ active }">
                        <button
                            :class="[
                                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                        >
                            Update profile
                        </button>
                    </HeadlessMenuItem>
                    <HeadlessMenuItem v-slot="{ active }">
                        <button
                            :class="[
                                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                        >
                            Duplicate
                        </button>
                    </HeadlessMenuItem>
                </div>
                <div class="px-1 py-1">
                    <HeadlessMenuItem v-slot="{ active }">
                        <button
                            class="group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-600"
                            @click="handleLogout"
                        >
                            <!-- <DeleteIcon :active="active" class="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" /> -->
                            Sign out
                        </button>
                    </HeadlessMenuItem>
                </div>
            </HeadlessMenuItems>
        </transition>
    </HeadlessMenu>
</template>
