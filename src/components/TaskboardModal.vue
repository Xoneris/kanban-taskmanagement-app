<script setup lang="ts">
    import { ref } from "vue" 
    import { useCurrentBoardStore } from "../stores/currentBoard.ts"
    import { useAllBoardsStore } from "../stores/allBoards.ts"
    import { TaskboardClass } from "../models/Taskboard.ts"
    import PrimaryButton from "./PrimaryButton.vue"
    import SecondaryButton from "./SecondaryButton.vue"

    const { editBoard } = defineProps<{
        editBoard?: boolean
    }>()

    const emit = defineEmits(['closeTaskboardModal'])

    const allBoards = useAllBoardsStore()
    const currentBoard = useCurrentBoardStore()

    const cloneCurrentBoard = {
        name: currentBoard.board.name,
        columns: currentBoard.board.columns.map((col) => {
            return {
                name: col.name,
                tasks: [...col.tasks]
            }
        }),
    }

    const taskBoard = editBoard 
        ? ref(new TaskboardClass(cloneCurrentBoard.name, cloneCurrentBoard.columns))
        : ref(new TaskboardClass())

    function closeTaskBoardModal () {
        emit('closeTaskboardModal')
    }

    const errors = ref<{boardName:boolean|undefined, column:(boolean|undefined)[]}>({
        boardName: undefined,
        column: [
            undefined,
            undefined,
            undefined,
        ],
    })

    function validateBoardName() {
        if (taskBoard.value.name === "") {
            errors.value.boardName = true
            return false
        } else {
            errors.value.boardName = false
            return true
        }
    }

    function validateColumnName(index:number) {
        if (taskBoard.value.columns[index].name === "") {
            errors.value.column[index] = true
            return false
        } else {
            errors.value.column[index] = false
            return true
        }
    }

    function createNewBoard() {

        if (!validateBoardName()) {
            return
        }
        for (let i=0 ; i < taskBoard.value.columns.length ; i++ ) {
            if (!validateColumnName(i)){
                return
            }
        }

        allBoards.addNewBoard(taskBoard.value)
        closeTaskBoardModal()
    }

    function editCurrentBoard() {

        if (!validateBoardName()) {
            return
        }
        for (let i=0 ; i < taskBoard.value.columns.length ; i++ ) {
            if (!validateColumnName(i)){
                return
            }
        }

        allBoards.edit(currentBoard.board.name, taskBoard.value)

        closeTaskBoardModal()
    }

</script>

<template>
    <div @click="closeTaskBoardModal" class="fixed top-0 left-0 min-w-screen w-full min-h-screen h-screen bg-black/50">

        <div @click.stop class="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-dark-grey bg-white w-full max-w-[480px] flex flex-col gap-6 rounded-[6px] p-8">

            <h1 v-if="editBoard" class="heading-l text-black dark:text-white">Edit Board</h1>
            <h1 v-else class="heading-l text-black dark:text-white">Add New Board</h1>

            <div class="flex flex-col gap-2">
                <label class="body-m text-medium-grey">Name</label>
                <input 
                    type="text" 
                    class="rounded-sm border py-2 px-4 dark:text-white text-black"
                    :class="[errors.boardName === true ? 'border-red' : 'border-medium-grey']" 
                    placeholder="e.g. Web Design"
                    v-model="taskBoard.name"
                    @input="validateBoardName"
                />
                <span v-if="errors.boardName === true" class="text-red">Please enter a name for the Board!</span>
            </div>

            <div class="flex flex-col gap-3">
                <label class="body-m text-medium-grey">Columns</label>

                <div v-for="( _,index) in taskBoard.columns" class="flex flex-col" :key="index">

                    <div class="flex gap-4 items-center">
                        
                        <input 
                            type="text" 
                            class="grow rounded-sm border border-medium-grey py-2 px-4 dark:text-white text-black"
                            :class="[errors.column[index] ? 'border-red' : 'border-medium-grey']"
                            v-model="taskBoard.columns[index].name"
                            @input="validateColumnName(index)"
                        />
                        
                        <img 
                            src="/public/assets/icon-cross.svg"
                            class="w-4 h-4 hover:cursor-pointer"
                            v-on:click="taskBoard.removeColumn(index)"
                        />

                    </div>
                    
                        <span v-if="errors.column[index]" class="text-red">Please enter a name</span>

                </div>
                
                <SecondaryButton v-on:click="taskBoard.addColumn()">
                    + Add New Column
                </SecondaryButton>
            </div>

            <PrimaryButton v-if="editBoard" v-on:click="editCurrentBoard">
                Save Changes
            </PrimaryButton>

            <PrimaryButton v-else v-on:click="createNewBoard">
                Create New Board
            </PrimaryButton>
        </div>

    </div>
</template>