<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
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
const subMenus: Record<string, string>[] = [
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

const { rules } = useValidator(form);
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
                <DropdownMenu 
                    :is-open="isOpen" 
                    class="font-normal text-gray-700 w-full" 
                    left-icon="ph:gear-six-bold" 
                    @click="toggleMenu"
                    :sub-menus="subMenus"
                >
                    <div class="flex-1 flex items-center justify-between">
                        <span class="text-gray-700">Settings</span>
                        <Icon :name="isOpen ? 'ic:outline-keyboard-arrow-up' : 'ic:outline-keyboard-arrow-down'" />
                    </div>
                </DropdownMenu>
            </div>
        </div>

        <hr class="my-3" />
        <div class="max-w-lg">
            <AtomTheCard>
                Hello.. card content
            </AtomTheCard>
        </div>
    </div>
</template>
