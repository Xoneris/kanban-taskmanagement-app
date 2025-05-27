<script setup>
    const {currentBoard, board} = defineProps(["currentBoard","boardName"])
</script>

<template>
    <div 
        class="mr-6 py-4 pl-8 flex gap-4 items-center heading-m rounded-r-full text-medium-grey transition-all"
        :class="[currentBoard.board.name === boardName ? 'bg-main-purple text-white' : 'hover:cursor-pointer hover:dark:bg-white hover:dark:text-main-purple  hover:bg-main-purple/10 hover:text-main-purple']"
    >
        <img src="/public/assets/icon-board.svg" class="w-4 h-4"/>
        <span>
            <slot></slot>
        </span>
    </div>
</template>