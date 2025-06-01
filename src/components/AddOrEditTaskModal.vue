<script setup lang="ts">

    import { ref } from 'vue';
    import { useCurrentBoardStore } from '../stores/currentBoard';
    import { useAllBoardsStore } from '../stores/allBoards';
    import { TaskClass } from '../models/TaskClass';
    import type { Column, Subtask, Task } from '../types/types';
    import PrimaryButton from './PrimaryButton.vue';
    import SecondaryButton from './SecondaryButton.vue';

    // const { task, editTask, taskIndex } = defineProps(['task','editTask','taskIndex'])
    const { task, column, editTask } = defineProps<{
        task: Task|null,
        column: Column|null,
        editTask: boolean,
    }>()
    const allBoardsStore = useAllBoardsStore()
    const currentBoardStore = useCurrentBoardStore()
    const emit = defineEmits(["closeAddOrEditTaskModal"])

    const currentColumnIndex = currentBoardStore.board.columns.findIndex((c) => c.name === column?.name)
    const taskIndex = currentBoardStore.board.columns[currentColumnIndex]?.tasks?.findIndex((t) => t.title === task?.title) 

    const cloneCurrentTask:any = {
        title: task?.title,
        description: task?.description,
        status: task?.status,
        subtasks: task?.subtasks.map((subtask:Subtask) => {
            return {
                title: subtask?.title,
                isCompleted: subtask?.isCompleted
            }
        }),
    }
    
    const taskClass = editTask 
        ? ref(new TaskClass(cloneCurrentTask.title, cloneCurrentTask.description, cloneCurrentTask.status, cloneCurrentTask.subtasks))
        : ref(new TaskClass())

    const statusOptions = ref(false)

    function closeAddOrEditTaskModal() {
        emit('closeAddOrEditTaskModal')
    }

    const errors = ref<{taskTitle:boolean|undefined, taskDescription:boolean|undefined, taskStatus: boolean|undefined, taskSubtasks:(boolean|undefined)[]}>({
        taskTitle: undefined,
        taskDescription: undefined,
        taskStatus: undefined,
        taskSubtasks: [
            undefined,
            undefined,
        ],
    })

    function updateStatus(statusName:string){

        taskClass.value.status = statusName
        errors.value.taskStatus = false
        statusOptions.value = false
    }

    function validateTaskTitle(){
        if (taskClass.value.title === "") {
            errors.value.taskTitle = true
            return false
        } else {
            errors.value.taskTitle = false
            return true
        }
    }

    function validateTaskDescription(){
        if (taskClass.value.description === "") {
            errors.value.taskDescription = true
            return false
        } else {
            errors.value.taskDescription = false
            return true
        }
    }
    function validateSubtaskTitle(index:number){
        if (taskClass.value.subtasks[index].title === "") {
            errors.value.taskSubtasks[index] = true
            return false
        } else {
            errors.value.taskSubtasks[index] = false
            return true
        }
    }

    function validateTaskStatus() {
        if (taskClass.value.status === "") {
            errors.value.taskStatus = true
            return false
        } else {
            errors.value.taskStatus = false
            return true
        }
    }

    function editCurrentTask(){
        if (!validateTaskTitle()) {
            return
        }
        for (let i=0 ; i < taskClass.value.subtasks.length ; i++ ) {
            if (!validateSubtaskTitle(i)){
                return
            }
        }
        if (!validateTaskStatus()){
            return
        }

        allBoardsStore.editTask(taskClass.value, column!.name, taskIndex)
        closeAddOrEditTaskModal()
    }

    function createNewTask(){
        if (!validateTaskTitle()) {
            return
        }
        for (let i=0 ; i < taskClass.value.subtasks.length ; i++ ) {
            if (!validateSubtaskTitle(i)){
                return
            }
        }
        if (!validateTaskStatus()){
            console.log(taskClass)
            return
        }
        console.log("pred")
        
        allBoardsStore.newTask(taskClass.value)
        closeAddOrEditTaskModal()
    }

</script>

<template>
    <div @click="closeAddOrEditTaskModal" class="fixed top-0 left-0 min-w-screen w-full min-h-screen h-screen bg-black/50">

        <div @click.stop class="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-dark-grey bg-white w-full max-w-[480px] flex flex-col gap-6 rounded-[6px] p-8">
            <h1 v-if="editTask" class="heading-l text-black dark:text-white">Edit Task</h1>
            <h1 v-else class="heading-l text-black dark:text-white">Add New Task</h1>

            <div class="flex flex-col gap-2">
                <label class="body-m text-medium-grey dark:text-white">Title</label>
                <input 
                    type="text" 
                    class="rounded-sm border py-2 px-4 dark:text-white text-black"
                    :class="[errors.taskTitle === true ? 'border-red' : 'border-medium-grey']" 
                    placeholder="e.g. Take coffee break"
                    v-model="taskClass.title"
                    @input="validateTaskTitle"
                />
                <span v-if="errors.taskTitle === true" class="text-red">Please enter a title for the Task!</span>
            </div>

            <div class="flex flex-col gap-2">
                <label class="body-m text-medium-grey dark:text-white">Description</label>
                <textarea 
                    type="text" 
                    class="rounded-sm border py-2 px-4 h-[112px] dark:text-white text-black flex justify-start items-start"
                    :class="[errors.taskDescription === true ? 'border-red' : 'border-medium-grey']" 
                    placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                    v-model="taskClass.description"
                    @input="validateTaskDescription"
                ></textarea>
                <span v-if="errors.taskDescription === true" class="text-red">Please enter a description for the Board!</span>
            </div>

            <div class="flex flex-col gap-3">

                <label class="body-m text-medium-grey dark:text-white">Subtasks</label>
                <div v-for="(_,index) in taskClass.subtasks" class="flex flex-col" :key="index">

                    <div class="flex gap-4 items-center">
                        
                        <input 
                            type="text" 
                            class="grow rounded-sm border border-medium-grey py-2 px-4 dark:text-white text-black"
                            :placeholder="
                                index === 0 
                                    ? 'e.g. Make coffee'
                                    : index === 1
                                    ? 'e.g. Drink coffee & smile'
                                    : ''
                            "
                            :class="[errors.taskSubtasks[index] ? 'border-red' : 'border-medium-grey']"
                            v-model="taskClass.subtasks[index].title"
                            @input="validateSubtaskTitle(index)"
                        />
                        
                        <img 
                            src="/public/assets/icon-cross.svg"
                            class="w-4 h-4 hover:cursor-pointer"
                            v-on:click="taskClass.removeSubtask(index)"
                        />

                    </div>
                    
                    <span v-if="errors.taskSubtasks[index]" class="text-red">Please enter a title</span>
                
                </div>

                <SecondaryButton v-on:click="taskClass.addSubtask()">
                    + Add New Subtask
                </SecondaryButton>
            </div>

            <div class="flex flex-col gap-3">

                <h3 class="body-m text-medium-grey dark:text-white">Status</h3>

                <div 
                    class="relative h-10 rounded-sm border border-medium-grey flex justify-between items-center px-4 hover:cursor-pointer"
                    v-on:click="statusOptions = !statusOptions"
                >
                    <span class="text-black dark:text-white">{{ taskClass.status }}</span>
                    <img
                        src="/public/assets/icon-chevron-down.svg"
                    />

                    <div 
                        v-if="statusOptions" 
                        @click.stop 
                        class="absolute top-11 left-0 flex flex-col w-full bg-white dark:bg-very-dark-grey rounded-md z-50 border border-medium-grey transition-all"
                        :class="[statusOptions ? 'max-h-[500px]' : 'max-h-0']"
                    >
                        <span
                            class="p-2 text-black dark:text-medium-grey hover:bg-main-purple hover:text-white"
                            v-for="currentBoardColumn in currentBoardStore.board.columns"
                            v-on:click="updateStatus(currentBoardColumn.name)"
                        >
                            {{ currentBoardColumn.name }}
                        </span>
                    </div>

                </div>

                <span v-if="errors.taskStatus" class="text-red">Please select a status</span>

            </div>

            <PrimaryButton v-if="editTask" v-on:click="editCurrentTask">
                Save Changes
            </PrimaryButton>

            <PrimaryButton v-else v-on:click="createNewTask">
                Create New Task
            </PrimaryButton>

        </div>
    </div>
</template>