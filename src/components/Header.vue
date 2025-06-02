<script setup  lang="ts">
    import { ref } from "vue"
    import { useCurrentBoardStore } from "../stores/currentBoard"
    import { useSidebarStore } from "../stores/sidebar"
    import { useDarkModeStore } from "../stores/darkmode"
    import PrimaryButton from "./PrimaryButton.vue"
    import TaskboardModal from "./TaskboardModal.vue"
    import DeleteTaskboardModal from "./DeleteTaskboardModal.vue"
    import AddOrEditTaskModal from "./AddOrEditTaskModal.vue"
    import Navigation from "./Navigation.vue"
    import DarkModeToggle from "./DarkModeToggle.vue"

    const sidebarStore = useSidebarStore()
    const darkModeStore = useDarkModeStore()
    const currentBoard = useCurrentBoardStore()

    const openTaskbarOptions = ref(false)
    const showTaskboardModal = ref(false)
    const showDeleteTaskboardModal = ref(false)
    const openAddOrEditTaskModal = ref(false)

    const openMobileNav = ref(false)

    function closeAddOrEditTaskModal() {
        openAddOrEditTaskModal.value = false
    }

    function closeTaskboardModal() {
        showTaskboardModal.value = false
    }

    function closeDeleteTaskboardModal() {
        showDeleteTaskboardModal.value = false
    }
</script>

<template>
    <div class="h-16 md:h-[97px] border-b border-lines-light dark:border-lines bg-white dark:bg-dark-grey text-black dark:text-white flex transition-all">
        <div 
            class="hidden h-full md:flex justify-center items-center border-lines-light dark:border-lines transition-all"
            :class="[!sidebarStore.isSidebar ? 'max-w-[300px] w-full border-r' : 'max-w-0']"
        >
            <img 
                v-if="darkModeStore.isDarkMode" 
                src="/public/assets/logo-light.svg"
            />
            <img 
                v-else-if="!darkModeStore.isDarkMode" 
                src="/public/assets/logo-dark.svg" 
            />
        </div>

        <div class="flex grow justify-between items-center p-5">

            <div class="flex gap-4 items-center">
                <img 
                    src="/public/assets/logo-mobile.svg"
                    class="block md:hidden w-6 h-6"
                />
                <div 
                    v-on:click="openMobileNav = true"
                    class="flex gap-2 items-center hover:cursor-pointer md:hover:cursor-default"
                >

                    <h1 class="heading-xl ">{{ currentBoard.board.name }}</h1>
                    <img
                        v-if="openMobileNav" 
                        src="/public/assets/icon-chevron-up.svg"
                        class="w-2 h-1 block md:hidden"
                    />
                    <img
                        v-else 
                        src="/public/assets/icon-chevron-down.svg"
                        class="w-2 h-1 block md:hidden"
                    />

                </div>
            </div>

            <div class="flex gap-6 items-center">
                <PrimaryButton
                    class="hidden md:flex"
                    v-on:click="openAddOrEditTaskModal = true"
                >
                    + Add New Task
                </PrimaryButton>
                <PrimaryButton
                    class="flex md:hidden !h-8"
                    v-on:click="openAddOrEditTaskModal = true"
                >
                    +
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
                        class="absolute top-[57px] md:top-[90px] right-6 bg-white dark:bg-dark-grey w-[192px] h-[94px] border border-lines-light dark:border-lines rounded-lg flex flex-col gap-4 p-4"
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

    <AddOrEditTaskModal
        v-if="openAddOrEditTaskModal" 
        :task="null"
        :editTask="false"
        :column="null"
        @closeAddOrEditTaskModal="closeAddOrEditTaskModal"
    />

    <div
        v-if="openMobileNav"
        v-on:click="openMobileNav = false"
        class="fixed top-0 left-0 min-w-screen w-full min-h-screen h-screen flex flex-col items-center bg-black/50"
    >
        <div
            @click.stop 
            class=" w-[264px] mt-20 bg-white dark:bg-dark-grey rounded-md"
        >
            <Navigation/>
            <DarkModeToggle class="my-4"/>
        </div>
    </div>

</template>