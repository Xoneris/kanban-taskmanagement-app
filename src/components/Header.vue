<script setup  lang="ts">
    import { ref } from "vue"
    import { useCurrentBoardStore } from "../stores/currentBoard"
    import { useSidebarStore } from "../stores/sidebar"
    import { useDarkModeStore } from "../stores/darkmode"
    import PrimaryButton from "./PrimaryButton.vue"
    import TaskboardModal from "./TaskboardModal.vue"
    import DeleteTaskboardModal from "./DeleteTaskboardModal.vue"

    const sidebarStore = useSidebarStore()
    const darkModeStore = useDarkModeStore()
    const currentBoard = useCurrentBoardStore()

    const openTaskbarOptions = ref(false)
    const showTaskboardModal = ref(false)
    const showDeleteTaskboardModal = ref(false)

    function closeTaskboardModal() {
        showTaskboardModal.value = false
    }

    function closeDeleteTaskboardModal() {
        showDeleteTaskboardModal.value = false
    }
</script>

<template>
    <div class="h-[97px] border-b border-lines-light dark:border-lines bg-white dark:bg-dark-grey text-black dark:text-white flex transition-all">
        <div 
            class="h-full flex justify-center items-center border-lines-light dark:border-lines transition-all"
            :class="[!sidebarStore.isSidebar ? 'max-w-[300px] w-full border-r' : 'max-w-0']"
        >
            <img v-if="darkModeStore.isDarkMode" src="/public/assets/logo-light.svg" />
            <img v-else-if="!darkModeStore.isDarkMode" src="/public/assets/logo-dark.svg" />
        </div>
        <div class="flex grow justify-between items-center p-5">

            <h1 class="heading-xl">{{ currentBoard.board.name }}</h1>
            <div class="flex gap-6 items-center">
                <PrimaryButton>
                    + Add New Task
                </PrimaryButton>
                <img 
                    src="/public/assets/icon-vertical-ellipsis.svg"
                    class="h-5 hover:cursor-pointer"
                    v-on:click="openTaskbarOptions = true"
                />

                <div
                    v-if="openTaskbarOptions"
                    class="fixed top-0 left-0 w-screen h-screen"
                    v-on:click="openTaskbarOptions = false"
                >
                    <div
                        class="absolute top-[90px] right-6 bg-white dark:bg-dark-grey w-[192px] h-[94px] border border-lines-light dark:border-lines rounded-lg flex flex-col gap-4 p-4"
                        @click.stop
                    >
                        <span 
                            class="body-l text-medium-grey hover:underline hover:cursor-pointer"
                            v-on:click="showTaskboardModal = true, openTaskbarOptions = false"
                        >
                            Edit Board
                        </span>
                        <span 
                            class="body-l text-red hover:underline hover:cursor-pointer"
                            v-on:click="showDeleteTaskboardModal = true, openTaskbarOptions = false"
                        >
                            Delete Board
                        </span>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <TaskboardModal
        v-if="showTaskboardModal"
        :editBoard="true"
        @closeTaskboardModal="closeTaskboardModal"
    />

    <DeleteTaskboardModal 
        v-if="showDeleteTaskboardModal"
        @closeDeleteTaskboardModal="closeDeleteTaskboardModal"
    />
</template>