<script setup lang="ts">

    import { useCurrentBoardStore } from "../stores/currentBoard.ts"
    import { useAllBoardsStore } from "../stores/allBoards.ts"
    import SecondaryButton from "./SecondaryButton.vue"
    import DestructiveButton from "./DestructiveButton.vue"


    const emit = defineEmits(['closeDeleteTaskboardModal'])

    const allBoards = useAllBoardsStore()
    const currentBoard = useCurrentBoardStore()

    function closeDeleteTaskBoardModal () {
        emit('closeDeleteTaskboardModal')
    }

    function deleteBoard () {

        allBoards.deleteBoard(currentBoard.board.name)
        currentBoard.changeCurrentBoard(0)
        closeDeleteTaskBoardModal()
    }

</script>

<template>
    <Teleport to="body">
    <div @click="closeDeleteTaskBoardModal" class="fixed top-0 left-0 min-w-screen w-full min-h-screen h-screen flex justify-center items-center bg-black/50">

        <div @click.stop class="dark:bg-dark-grey bg-white w-full max-w-[480px] flex flex-col gap-6 rounded-[6px] p-8 mx-4">
            <h1 class="heading-l text-red">Delete this Board?</h1>

            <p class="body-l text-medium-grey">Are you sure you want to delete the `{{ currentBoard.board.name }}` board? This action will remove all columns and tasks and cannot be reversed.</p>

            <div class="flex gap-4 w-full">
                <DestructiveButton v-on:click="deleteBoard">
                    Delete
                </DestructiveButton>
                <SecondaryButton v-on:click="closeDeleteTaskBoardModal">
                    Cancel
                </SecondaryButton>
            </div>
            
        </div>

    </div>
    </Teleport>
</template>