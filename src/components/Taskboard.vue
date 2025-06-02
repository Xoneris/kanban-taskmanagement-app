<script setup  lang="ts">
    import { ref } from "vue";
    import { useCurrentBoardStore } from "../stores/currentBoard";
    import PrimaryButton from "./PrimaryButton.vue";
    import Column from "./Column.vue"
    import TaskboardModal from "./TaskboardModal.vue";
    
    const currentBoard = useCurrentBoardStore()
    const showTaskboardModal = ref(false)

    function closeTaskboardModal() {
        showTaskboardModal.value = false
    }

</script>

<template>
    <div 
        v-if="currentBoard.board.columns.length > 0" 
        class="w-full bg-light-grey dark:bg-very-dark-grey grow flex gap-6 p-6 justify-start items-start transition-all overflow-x-scroll"
    >

        <Column v-for="column in currentBoard.board.columns" 
            :column="column"
        />

        <div
            v-on:click="showTaskboardModal = true" 
            class="grow min-w-[280px] max-w-[280px] mt-9 h-[calc(100%-36px)] bg-[#E9EFFA] dark:bg-dark-grey/25 heading-xl text-medium-grey rounded-[6px] flex justify-center items-center hover:cursor-pointer hover:text-black hover:dark:text-white"
        >
            + New Column
        </div>
    </div>

    <div 
        v-else 
        class="bg-light-grey dark:bg-very-dark-grey grow flex p-6 justify-center items-center"
    >
        <div class="flex flex-col justify-center items-center gap-8">
            <h1 class="heading-l text-medium-grey">This board is empty. Create a new colum to get started.</h1>
            <PrimaryButton 
                v-on:click="showTaskboardModal = true"
                class="self-start m-auto"
            >
                + Add New Column
            </PrimaryButton>
        </div>
    </div>

    <TaskboardModal
        v-if="showTaskboardModal"
        :editBoard="true"
        @closeTaskboardModal="closeTaskboardModal"
    />

</template>