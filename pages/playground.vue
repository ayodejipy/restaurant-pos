<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import type { ChildLinks } from "~/components/DropdownMenu.vue";
import useValidator from "~/composables/useValidator";

//  modal functions
const isOpen = ref<boolean>(false);
const open = ref<boolean>(false);
const toggleModal = () => (open.value = !open.value);
const toggleMenu = () => (isOpen.value = !isOpen.value);

const categories: Record<string, string>[] = [
    { title: "Starter", sub: "starter" },
    { title: "Main course", sub: "main" },
    { title: "dessert", sub: "dessert" },
    { title: "Beverage", sub: "beverage" },
    { title: "Other", sub: "other" },
];
const subMenus: ChildLinks[] = [
    { name: "Account", url: "/account" },
    { name: "Billing", url: "/billing" },
    { name: "Preferences", url: "/preferences" },
];

// form
const form = reactive({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    category: "",
});

const { rules } = useValidator();
const $v = useVuelidate(rules, form);

// computed

async function submit() {
    const isFormCorrect = await $v.value.$validate();
    if (isFormCorrect) {
        console.log($v);
    }
}
</script>

<template>
    <div class="max-w-7xl mx-auto pt-14">
        <button @click="toggleModal" class="bg-black text-white rounded-sm px-4 py-2">Toggle modal</button>
        <AtomBaseModal :is-open="open" @close="toggleModal" size="lg" rounded="2xl">
            <div class="mt-2">
                <p class="text-sm text-gray-500">Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.</p>
            </div>

            <div class="mt-4">
                <button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" @click="toggleModal">Got it, thanks!</button>
            </div>
        </AtomBaseModal>

        <hr class="my-3" />
        <div class="flex gap-3 items-start">
            <AtomTheButton size="xs" intent="primary"> Button xsmall </AtomTheButton>
            <AtomTheButton size="sm" intent="primary" rounded="sm"> Button small </AtomTheButton>
            <AtomTheButton size="md" intent="primary" rounded="md"> Button medium </AtomTheButton>
            <AtomTheButton size="lg" intent="primary" rounded="lg"> Button large </AtomTheButton>
        </div>

        <hr class="my-3" />
        <div class="max-w-lg flex">
            <form @submit.prevent="submit" class="flex-1">
                <Field label="Name" :errors="$v.name.$errors">
                    <AtomInput v-model="form.name" type="text" placeholder="Enter your name" />
                </Field>
                <Field label="Email" :errors="$v.email.$errors">
                    <AtomInput v-model="form.email" type="email" placeholder="Enter your email" />
                </Field>
                <Field label="Password" :errors="$v.password.$errors">
                    <AtomInput v-model="form.password" type="password" placeholder="" />
                </Field>
                <Field label="Confirm Password" :errors="$v.confirmPassword.$errors">
                    <AtomInput v-model="form.confirmPassword" type="password" placeholder="" />
                </Field>
                <Field label="Select country">
                    <AtomTheSelect v-model="form.category">
                        <option v-for="category in categories" :value="category.sub">{{ category.title }}</option>
                    </AtomTheSelect>
                </Field>

                <AtomTheButton type="submit" role="button" class="mt-4" size="xs" intent="primary" @click="submit"> Submit </AtomTheButton>
            </form>
            <!-- <div>
                <pre>{{ $v }}</pre>
            </div> -->
        </div>

        <hr class="my-3" />
        <div class="max-w-lg">
            <div class="relative w-48 px-3 py-2.5 border border-gray-800">
                <AtomTheLink url="/" left-icon="material-symbols:home-rounded" class="text-gray-700 font-normal hover:bg-gray-100"> Homepage </AtomTheLink>
                <AtomTheLink url="/" left-icon="ph:gear-six-bold" class="text-gray-700 font-normal hover:bg-blue-100 hover:text-blue-500"> Settings </AtomTheLink>
                <DropdownMenu class="font-normal text-gray-700 w-full" :is-open="isOpen" :sub-menus="subMenus" left-icon="ph:gear-six-bold" @click="toggleMenu">
                    <div class="flex-1 flex items-center justify-between">
                        <span class="text-gray-700">Settings</span>
                        <Icon :name="isOpen ? 'ic:outline-keyboard-arrow-up' : 'ic:outline-keyboard-arrow-down'" />
                    </div>
                </DropdownMenu>
            </div>
        </div>

        <hr class="my-3" />
        <div class="max-w-6xl bg-gray-100 p-3">
            <div class="flex gap-10">
                <AtomTheCard v-for="n in 3" :key="n" class="border bg-white" shadow="lg">
                    <div class="flex flex-col items-center justify-center p-6">
                        <div class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 mb-2">
                            <Icon name="clarity:bank-solid-badged" class="text-green-500" />
                        </div>
                        <h5 class="font-semibold text-sm text-green-500">11,25,140</h5>
                        <p class="text-xs text-gray-400">Interest Savings</p>
                    </div>
                    <div class="flex flex-nowrap border-t border-gray-300 divide-x divide-gray-300">
                        <div class="basis-1/2 p-3">
                            <p class="text-xs font-normal text-gray-400">Additional Payment</p>
                            <h5 class="text-sm font-semibold text-gray-900">$10,184</h5>
                        </div>
                        <div class="basis-1/2 p-3">
                            <p class="text-xs font-normal text-gray-400">Total Monthly Payment</p>
                            <h5 class="text-sm font-semibold text-gray-900">$10,184</h5>
                        </div>
                    </div>
                </AtomTheCard>
            </div>
        </div>

        <hr class="my-3" />
        <div class="max-w-6xl bg-gray-100 p-3">
            <!-- <Multiselect /> -->
            <AtomTheAvatar size="lg" name="Ayodeji Jegede" url="https://wallpaper.dog/large/5568021.jpg" />
            <AtomTheAvatar size="sm" name="African man smiling" url="https://img.freepik.com/free-photo/close-up-portrait-dark-skinned-adult-man-with-thick-bristle-smiles-toothy-wears-big-optical-glasses-striped-jumper-glad-meet-friend_273609-38587.jpg?w=2000&t=st=1687988303~exp=1687988903~hmac=31692939773f6532f629fd91604bed4f7e9b36b0a4b552fa269be05548c766b0" />
        </div>
    </div>
</template>
