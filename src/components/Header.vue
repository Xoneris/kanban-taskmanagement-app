<script setup>
  import Button from "./Button.vue"
    const {currentBoard, isSidebar, isDarkMode} = defineProps(["currentBoard","isSidebar","isDarkMode"])
</script>

<template>
    <div class="h-[97px] border-b border-lines-light dark:border-lines bg-white dark:bg-dark-grey text-black dark:text-white flex transition-all">
        <div 
            class="h-full flex justify-center items-center border-lines-light dark:border-lines  transition-all"
            :class="[!isSidebar ? 'max-w-[300px] w-full border-r' : 'max-w-0']"
        >
            <img v-if="isDarkMode" src="/public/assets/logo-light.svg" />
            <img v-else-if="!isDarkMode" src="/public/assets/logo-dark.svg" />
        </div>
        <div class="flex grow justify-between items-center  p-5">

            <h1 class="heading-xl">{{ currentBoard.name }}</h1>
            <div>
                <Button>
                    + Add New Task
                </Button>
            </div>
        </div>
    </div>
</template>