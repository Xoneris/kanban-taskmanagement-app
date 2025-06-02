<script setup lang="ts">

    import { useSidebarStore } from "../stores/sidebar"
    import { useDarkModeStore } from "../stores/darkmode"

    import Navigation from "./Navigation.vue"
    import DarkModeToggle from "./DarkModeToggle.vue"

    const sidebarStore = useSidebarStore()
    const darkModeStore = useDarkModeStore()

</script>

<template>
    <div 
        class="hidden w-[300px] md:flex flex-col border-r border-lines-light dark:border-lines bg-white dark:bg-dark-grey overflow-hidden transition-all"
        :class="[sidebarStore.isSidebar ? 'min-w-[300px] max-w-[300px] w-full' : 'min-w-0 max-w-0']"
    >

        <div class="pt-8 pl-[34px] pb-[54px]">
            <img v-if="darkModeStore.isDarkMode" src="/public/assets/logo-light.svg" />
            <img v-else-if="!darkModeStore.isDarkMode" src="/public/assets/logo-dark.svg" />
        </div>

        <Navigation/>

        <DarkModeToggle/>

        <div 
            class="mr-6 py-4 pl-8 my-2 mb-10 flex gap-4 items-center rounded-r-full text-medium-grey hover:dark:bg-white hover:dark:text-main-purple hover:text-main-purple hover:bg-main-purple/10 hover:cursor-pointer transition-all"
            v-on:click="sidebarStore.toggleSidebar(false)"
        >
            <img src="/public/assets/icon-hide-sidebar.svg" class="w-[18px] h-4" />
            <span class="heading-m ">Hide Sidebar</span>
        </div>

    </div>

    <div 
        class="fixed w-14 h-12 left-0 bottom-8 rounded-r-full bg-main-purple justify-start items-center pl-4 hover:cursor-pointer"
        :class="[sidebarStore.isSidebar ? 'hidden' : 'flex']"
        v-on:click="sidebarStore.toggleSidebar(true)"    
    >
        <img src="/public/assets/icon-show-sidebar.svg" class="w-5" />
    </div>
</template>