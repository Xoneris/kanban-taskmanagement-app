<script setup lang="ts">
    import { ref } from "vue"
    import NavItem from "./NavItem.vue"
    import TaskboardModal from "./TaskboardModal.vue"

    const {allBoards, currentBoard} = defineProps(["allBoards","currentBoard"])
    const emit = defineEmits(['updateBoard',"addNewBoard"])

    const showTaskboardModal = ref<boolean>(false)

    function selectBoard(selectedBoard:number) {
        emit('updateBoard', selectedBoard)
    }

    function closeTaskboardModal() {
        showTaskboardModal.value = false
    }
</script>

<template>
    <nav class="flex flex-col grow">

        <h3 class="py-4 pl-8 heading-s">ALL BOARDS ({{ allBoards.length }})</h3>

        <NavItem 
            v-for="(board,index) in allBoards" 
            v-on:click="selectBoard(index)" 
            :currentBoard="currentBoard" 
            :board="board"
        >
            {{ board.name }}
        </NavItem>
        
        <div 
            class="mr-6 py-4 pl-8 flex gap-4 items-center heading-m rounded-r-full text-main-purple hover:dark:bg-white hover:bg-main-purple/10" 
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