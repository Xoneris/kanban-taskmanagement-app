<script setup>
    import Button from "./Button.vue"
    import Column from "./Column.vue"
    const {currentBoard} = defineProps(["currentBoard"])

</script>

<template>
    <div v-if="currentBoard.columns.length > 0" class="bg-light-grey dark:bg-very-dark-grey grow flex gap-6 p-6 justify-start items-start transition-all">

        <Column v-for="column in currentBoard.columns" 
            :column="column"
        />

        <div class="grow max-w-[280px] h-full bg-[#E9EFFA] dark:bg-dark-grey/25 heading-xl text-medium-grey rounded-[6px] flex justify-center items-center">
            + New Column
        </div>
    </div>

    <div v-else class="bg-light-grey dark:bg-very-dark-grey grow flex flex-col gap-8 p-6 justify-center items-center">
        <h1 class="heading-l text-medium-grey">This board is empty. Create a new colum to get started.</h1>
        <Button>
            + Add New Column
        </Button>
    </div>
</template>