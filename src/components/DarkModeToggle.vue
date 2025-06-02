<script setup lang="ts">
    import { useDarkModeStore } from '../stores/darkmode';
    const darkModeStore = useDarkModeStore()
</script>

<template>
    <div class="mx-[25px] bg-light-grey dark:bg-very-dark-grey rounded-[6px] h-12 flex justify-center items-center transition-all">
        <img src="/public/assets/icon-light-theme.svg" class="w-[18px] h-[18px]" />
        <div class="w-[40px] h-[20px] bg-main-purple rounded-xl mx-6 relative hover:cursor-pointer" @click="darkModeStore.toggleDarkMode">
            <div 
                class="absolute top-[3px] w-[14px] h-[14px] rounded-full bg-white transition-all"
                :class="[!darkModeStore.isDarkMode ? 'ml-[3px]' : 'ml-[23px]']"
            ></div>
        </div>
        <img src="/public/assets/icon-dark-theme.svg" class="w-[18px] h-[18px]"/>
    </div>
</template>