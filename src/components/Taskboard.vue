<script setup  lang="ts">
    import { useCurrentBoardStore } from "../stores/currentBoard";
    import PrimaryButton from "./PrimaryButton.vue";
    import Column from "./Column.vue"
    
    const currentBoard = useCurrentBoardStore()

</script>

<template>
    <div v-if="currentBoard.board.columns.length > 0" class="bg-light-grey dark:bg-very-dark-grey grow flex gap-6 p-6 justify-start items-start transition-all">

        <Column v-for="column in currentBoard.board.columns" 
            :column="column"
        />

        <div class="grow max-w-[280px] mt-9 h-[calc(100%-36px)] bg-[#E9EFFA] dark:bg-dark-grey/25 heading-xl text-medium-grey rounded-[6px] flex justify-center items-center">
            + New Column
        </div>
    </div>

    <div v-else class="bg-light-grey dark:bg-very-dark-grey grow flex flex-col gap-8 p-6 justify-center items-center">
        <h1 class="heading-l text-medium-grey">This board is empty. Create a new colum to get started.</h1>
        <PrimaryButton>
            + Add New Column
        </PrimaryButton>
    </div>
</template>