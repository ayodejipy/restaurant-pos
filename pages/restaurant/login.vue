<script lang="ts" setup>
definePageMeta({
    layout: false,
})
const supabase = useSupabaseClient()

const loading = ref<boolean>(false)
const email = ref<string>('')

// const handleLogin = async () => {
//     try {
//         loading.value = true
//         const { error } = await supabase.auth.signInWithOtp({ email: email.value })
//         if (error) throw error
//         alert('Check your email for the login link!')
//     } catch (error: any) {
//         alert(error.error_description || error.message)
//     } finally {
//         loading.value = false
//     }
// }
</script>

<template>
    <section class="min-h-screen flex">
        <div class="illustration"></div>
        <div class="flex-1 flex flex-col justify-center items-center p-10">
			<div class="max-w-lg space-y-6">
				<div>
					<h1 class="text-2xl font-bold leading-relaxed">
						Hey, hello 👋
					</h1>
					<p class="text-xs font-medium text-gray-800">
						Sign in via magic link with your email below. 
						<sup class="leading-tight tracking-tight">Powered by Supabase</sup>
					</p>
				</div>
				<form @submit.prevent="" class="w-full">
					<Field label="Enter your email">
						<AtomInput type="email" placeholder="Your email" rounded="md" />
					</Field>

					<AtomTheButton rounded="md" intent="default" class="w-full bg-blue-600 text-white font-medium mt-4">Login</AtomTheButton>
				</form>
			</div>
        </div>
    </section>
</template>

<style scoped>
.illustration {
	flex: 0 0 40%;
	max-width: 43%;
	background: linear-gradient(rgba(35, 101, 62, 0.25), rgba(33, 33, 33, 0.65)),
		url('https://images.unsplash.com/photo-1560624052-449f5ddf0c31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80')
			no-repeat;
	background-position: left center;
	background-size: cover;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
}
</style>
