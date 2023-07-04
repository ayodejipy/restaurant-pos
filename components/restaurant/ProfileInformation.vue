<script lang="ts" setup>
import type { IUser } from "~/utils/types/User";

const { $toast } = useNuxtApp()	

const store = useUserStore()
const { user, isAuthenticated } = storeToRefs(store)

const formFields = computed<IUser>(() => user.value as IUser)

async function updateProfile() {
	try {
		const body = {
			id: user.value.id,
			full_name: user.value.full_name,
			username: user.value.username,
		}
		const data = await $fetch('/api/user/update', { method: 'POST', body })
		console.log(data)
	} catch (error: any) {
		$toast.error("Unable to update profile. Please try again.")
	}
}
</script>

<template>
	<section class="border-t border-gray-300">
		<div class="h-40 md:h-44 bg-slate-800"></div>
		<div class="relative max-w-2xl mx-auto -mt-6">
			<div class="flex gap-4 items-end md:mb-10" v-if="isAuthenticated">
				<AtomTheAvatar class="border-2 border-white" size="lg" name="African man smiling" url="https://img.freepik.com/free-photo/close-up-portrait-dark-skinned-adult-man-with-thick-bristle-smiles-toothy-wears-big-optical-glasses-striped-jumper-glad-meet-friend_273609-38587.jpg?w=2000&t=st=1687988303~exp=1687988903~hmac=31692939773f6532f629fd91604bed4f7e9b36b0a4b552fa269be05548c766b0" />
				<div aria-label="user information">
					<h4 class="font-semibold text-xl mb-2">African Man</h4>
					<p aria-label="" class="flex gap-2 font-semibold text-sm text-gray-800">Email: <span class="font-medium">{{  user?.email }}</span></p>
					<p aria-label="" class="flex gap-2 font-semibold text-sm text-gray-800">Role: <span>Super admin <Icon name="carbon:badge" class="text-purple-700 font-bold ml-1" /></span></p>

				</div>
			</div>

			<div v-else class="flex gap-4 items-end md:mb-10 animate-pulse">
				<div class="bg-slate-400 w-28 h-28 rounded-full"></div>
				<div aria-label="user information" class="space-y-2">
					<div class="bg-slate-400 rounded w-36 h-4"></div>
					<div class="bg-slate-400 rounded w-52 h-4"></div>
					<div class="bg-slate-400 rounded w-52 h-4"></div>
				</div>
			</div>

			<div>
				<form @submit.prevent="updateProfile" class="w-full flex flex-col gap-2">
					<div>
						<Field label="Name">
							<AtomInput type="text" placeholder="Your Name" v-model="user.full_name"  rounded="md" class="placeholder:text-gray-500" />
						</Field>
					</div>
					<div>
						<Field label="Username">
							<AtomInput type="text" placeholder="Username" v-model="user.username"  rounded="md" class="placeholder:text-gray-500" />
						</Field>
					</div>
					<AtomTheButton type="submit" rounded="md" intent="default" class="bg-blue-600 hover:bg-blue-700 text-white font-medium mt-4">Update profile</AtomTheButton>
				</form>
			</div>
		</div>
	</section>
</template>