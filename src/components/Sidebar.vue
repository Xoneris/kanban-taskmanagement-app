<script setup>

    import { ref, watch } from "vue"
    import Navigation from "./Navigation.vue"

    const {data, currentBoard, isSidebar, isDarkMode} = defineProps(["data","currentBoard","isSidebar","isDarkMode"])

    const emit = defineEmits(['updateBoard','updateSidebar','updateDarkMode'])

    function forwardUpdate(value) {
        emit('updateBoard', value)
    }

    function toggleSidebar(value) {
        emit('updateSidebar', value)
    }

    function updateDarkMode() {
        emit('updateDarkMode')
    }

</script>

<template>
    <div 
        class="w-[300px] flex flex-col border-r border-lines-light dark:border-lines bg-white dark:bg-dark-grey overflow-hidden transition-all"
        :class="[isSidebar ? 'max-w-[300px] w-full' : 'max-w-0']"
    >

        <div class="pt-8 pl-[34px] pb-[54px]">
            <img v-if="isDarkMode" src="/public/assets/logo-light.svg" />
            <img v-else-if="!isDarkMode" src="/public/assets/logo-dark.svg" />
        </div>

        <Navigation
            :data="data"
            :currentBoard="currentBoard"
            @updateBoard="forwardUpdate"
        />

        <div class="mx-[25px] bg-light-grey dark:bg-very-dark-grey rounded-[6px] h-12 flex justify-center items-center transition-all">
            <img src="/public/assets/icon-light-theme.svg" class="w-[18px] h-[18px]" />
            <div class="w-[40px] h-[20px] bg-main-purple rounded-xl mx-6 relative hover:cursor-pointer" @click="updateDarkMode">
                <div 
                    class="absolute top-[3px] w-[14px] h-[14px] rounded-full bg-white transition-all"
                    :class="[isDarkMode ? 'ml-[3px]' : 'ml-[23px]']"
                ></div>
            </div>
            <img src="/public/assets/icon-dark-theme.svg" class="w-[18px] h-[18px]"/>
        </div>

        <div 
            class="mr-6 py-4 pl-8 my-2 flex gap-4 items-center rounded-r-full text-medium-grey hover:dark:bg-white hover:dark:text-main-purple hover:text-main-purple hover:bg-main-purple/10 hover:cursor-pointer transition-all"
            v-on:click="toggleSidebar(false)"
        >
            <img src="/public/assets/icon-hide-sidebar.svg" class="w-[18px] h-4" />
            <span class="heading-m ">Hide Sidebar</span>
        </div>

    </div>

    <div 
        class="fixed w-14 h-12 left-0 bottom-8 rounded-r-full bg-main-purple justify-start items-center pl-4 hover:cursor-pointer"
        :class="[isSidebar ? 'hidden' : 'flex']"
        v-on:click="toggleSidebar(true)"    
    >
        <img src="/public/assets/icon-show-sidebar.svg" class="w-5" />
    </div>
</template>