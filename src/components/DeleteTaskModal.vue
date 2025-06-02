<script setup lang="ts">

    import { useAllBoardsStore } from "../stores/allBoards.ts"
    import SecondaryButton from "./SecondaryButton.vue"
    import DestructiveButton from "./DestructiveButton.vue"

    const { column, task } = defineProps(["column","task"])
    const emit = defineEmits(['closeDeleteTaskModal'])

    const allBoards = useAllBoardsStore()

    function closeDeleteTaskModal () {
        emit('closeDeleteTaskModal')
    }

    function deleteTask () {
        allBoards.deleteTask(column.name, task.title)
        closeDeleteTaskModal()
    }

</script>

<template>
    <Teleport to="body">
    <div @click="closeDeleteTaskModal" class="fixed top-0 left-0 min-w-screen w-full min-h-screen h-screen flex justify-center items-center bg-black/50">

        <div @click.stop class="dark:bg-dark-grey bg-white w-full max-w-[480px] flex flex-col gap-6 rounded-[6px] p-8 mx-4">
            <h1 class="heading-l text-red">Delete this Task?</h1>

            <p class="body-l text-medium-grey">Are you sure you want to delete the ‘{{ task.title }}’ task and its subtasks? This action cannot be reversed.</p>

            <div class="flex gap-4 w-full">
                <DestructiveButton v-on:click="deleteTask">
                    Delete
                </DestructiveButton>
                <SecondaryButton v-on:click="closeDeleteTaskModal">
                    Cancel
                </SecondaryButton>
            </div>
            
        </div>

    </div>
    </Teleport>
</template>