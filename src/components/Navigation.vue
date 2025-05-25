<script setup>
    import NavItem from "./NavItem.vue"

    const {data, currentBoard} = defineProps(["data","currentBoard"])

    const emit = defineEmits(['updateBoard'])

    function selectBoard(selectedBoard) {
        emit('updateBoard', selectedBoard)
    }

</script>

<template>
    <nav class="flex flex-col grow">

        <h3 class="py-4 pl-8 heading-s">ALL BOARDS ({{ data.length }})</h3>

        <NavItem v-for="(board,index) in data" v-on:click="selectBoard(index)" :currentBoard="currentBoard" :board="board">
            {{ board.name }}
        </NavItem>
        
        <div class="mr-6 py-2 pl-8 flex gap-4 items-center heading-m text-main-purple">
            <img src="/public/assets/icon-board.svg" class="w-4 h-4"/>
            <span>+ Create New Board</span>
        </div>

    </nav>
</template>