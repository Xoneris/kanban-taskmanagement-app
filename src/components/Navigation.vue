<script setup lang="ts">
    import { ref } from "vue"
    import NavItem from "./NavItem.vue"
    import TaskboardModal from "./TaskboardModal.vue"
    import { useCurrentBoardStore } from "../stores/currentBoard"
    import { useAllBoardsStore } from "../stores/allBoards"

    const showTaskboardModal = ref<boolean>(false)

    function closeTaskboardModal() {
        showTaskboardModal.value = false
    }

    const currentBoard = useCurrentBoardStore()
    const allBoards = useAllBoardsStore()
</script>

<template>
    <nav class="flex flex-col grow">

        <h3 class="py-4 pl-8 heading-s">ALL BOARDS ({{ allBoards.getNamesOfAllBoards.length }})</h3>

        <NavItem 
            v-for="(boardName,index) in allBoards.getNamesOfAllBoards" 
            v-on:click="currentBoard.changeCurrentBoard(index)" 
            :currentBoard="currentBoard" 
            :boardName="boardName"
        >
            {{ boardName }}
        </NavItem>
        
        <div 
            class="mr-6 py-4 pl-8 flex gap-4 items-center heading-m rounded-r-full text-main-purple hover:dark:bg-white hover:bg-main-purple/10 hover:cursor-pointer" 
            v-on:click="showTaskboardModal = true"
        >
            <img src="/public/assets/icon-board.svg" class="w-4 h-4"/>
            <span>+ Create New Board</span>
        </div>

        <TaskboardModal
            v-if="showTaskboardModal"
            @closeTaskboardModal="closeTaskboardModal"
        />

    </nav>
</template>