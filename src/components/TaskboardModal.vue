<script setup>
    import { ref } from "vue"
    import Modal from "./Modal.vue"
    import Button from "./Button.vue"

    import { Taskboard } from "../models/Taskboard.ts"

    const props = defineProps([""])
    const emit = defineEmits(['closeTaskboardModal'])

    const newTaskBoard = ref(new Taskboard())

    function closeModal () {
        emit('closeTaskboardModal')
    }

    const errors = ref({
        boardName: undefined,
        column: [
            undefined,
            undefined,
            undefined,
        ],
    })


    function validateBoardName() {
        if (newBoardName.value === "") {
            errors.value.boardName = true
        } else {
            errors.value.boardName = false
        }
    }

    function validateColumnName(index) {
        if (newBoardColumns.value[index] === "") {
            errors.value.column[index] = true
        } else {
            errors.value.column[index] = false
        }
    }

    function removeColumn(index) {
        newBoardColumns.value.splice(index,1)
    }

    function addColumn() {
        newBoardColumns.value.push("")
    }

    function createNewBoard() {

        validateBoardName()
        if (errors.boardName || newBoardName === "") {
            return
        }
        for (let i=0 ; i < newBoardColumns.lenght ; i++){
            validateColumnName(i)
            if (errors.column[i] || newBoardColumns[i] === "") {
                return 
            }
        }

        const newBoard = {
            name: "",
            columns: []
        }
        newBoard.name = newBoardName.value

        for (let i=0 ; i<newBoardColumns.value.length ; i++) {

            const newColumn = {
                name: newBoardColumns.value[i],
                tasks: []
            }

            newBoard.columns.push(newColumn)
        }

        emit('addNewBoard', newBoard)
        newBoardName.value = ""
        newBoardColumns.value = [
            "ToDo",
            "Doing",
            "Done",
        ]
        closeNewTaskModal()
        
    }

</script>

<template>
    <div @click="closeModal" class="fixed top-0 left-0 min-w-screen w-full min-h-screen h-screen bg-black/50">

        <div @click.stop class="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-dark-grey bg-white w-full max-w-[480px] flex flex-col gap-6 rounded-[6px] p-8">

            <h1 class="heading-l text-black dark:text-white">Add New Board</h1>

            <div class="flex flex-col gap-2">
                <label class="body-m text-medium-grey">Name</label>
                <input 
                    type="text" 
                    class="rounded-sm border py-2 px-4 dark:text-white text-black"
                    :class="[errors.boardName === true ? 'border-red' : 'border-medium-grey']" 
                    placeholder="e.g. Web Design"
                    v-model="newTaskBoard.name"
                    @input="validateBoardName"
                />
                <span v-if="errors.boardName === true" class="text-red">Please enter a name for the Board!</span>
            </div>

            <div class="flex flex-col gap-2">
                <label class="body-m text-medium-grey">Columns</label>

                <div v-for="(column,index) in newTaskBoard.columns" class="flex flex-col">

                    <div class="flex gap-4 items-center">
                        
                        <input 
                            type="text" 
                            class="grow rounded-sm border border-medium-grey py-2 px-4 dark:text-white text-black"
                            :class="[errors.column[index] ? 'border-red' : 'border-medium-grey']"
                            v-model="newTaskBoard.columns[index]"
                            @input="validateColumnName(index)"
                        />
                        
                        <img 
                            src="/public/assets/icon-cross.svg"
                            class="w-4 h-4 hover:cursor-pointer"
                            v-on:click="removeColumn(index)"
                        />

                    </div>
                    
                        <span v-if="errors.column[index]" class="text-red">Please enter a name</span>

                </div>
                
                <Button v-on:click="addColumn">
                    + Add New Column
                </Button>
            </div>

            <Button v-on:click="createNewBoard">
                Create New Board
            </Button>
        </div>

    </div>
</template>