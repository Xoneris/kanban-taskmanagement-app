<script setup lang="ts">

    import { ref } from 'vue';
    import { useCurrentBoardStore } from '../stores/currentBoard';
    import { useAllBoardsStore } from '../stores/allBoards';
    import type { Column, Subtask, Task } from '../types/types';

    const { task, column } = defineProps<{
        task: Task,
        column: Column,
    }>()

    const currentBoard = useCurrentBoardStore()
    const allBoardsStore = useAllBoardsStore()

    const statusOptions = ref(false)

    const emit = defineEmits(["closeTaskModal","showAddOrEditTaskModal","showDeleteTaskModal"])

    const openTaskOptions = ref(false)

    function closeTaskModal() {
        emit('closeTaskModal')
    }
    function showAddOrEditTaskModal() {
        emit('showAddOrEditTaskModal')
    }
    function showDeleteTaskModal() {
        emit('showDeleteTaskModal')
    }

    function editTask() {
        showAddOrEditTaskModal()
        openTaskOptions.value = false
        closeTaskModal()
    }

    function deleteTask() {
        showDeleteTaskModal()
        openTaskOptions.value = false
        closeTaskModal()
    }

    function updateStatus(statusName:string){

        allBoardsStore.updateTaskStatus(column.name, task.title, statusName)
        statusOptions.value = false
    }

</script>

<template>
    <Teleport to="body">
    <div 
        v-on:click="closeTaskModal" 
        class="fixed top-0 left-0 min-w-screen w-full min-h-screen h-screen flex justify-center items-center bg-black/50 overflow-hidden"
    >

        <div @click.stop class="relative bg-white dark:bg-dark-grey w-full max-w-[480px] max-h-[90vh] flex flex-col gap-4 rounded-[6px] p-8 mx-4 overflow-y-auto ">

            <div class="flex gap-6 items-center">

                <h2 class="heading-l w-full text-black dark:text-white">{{ task.title }}</h2>

                <img 
                    src="/public/assets/icon-vertical-ellipsis.svg"
                    class="h-5 hover:cursor-pointer"
                    v-on:click="openTaskOptions = true"
                />

                    <div
                        v-if="openTaskOptions"
                        class="absolute top-[90px] right-6 bg-white dark:bg-dark-grey w-[192px] h-[94px] border border-lines-light dark:border-lines rounded-lg flex flex-col gap-4 p-4 z-50"
                        @click.stop
                    >
                        <span 
                            class="body-l text-medium-grey hover:underline hover:cursor-pointer"
                            v-on:click="editTask"
                        >
                            Edit Task
                        </span>
                        <span 
                            class="body-l text-red hover:underline hover:cursor-pointer"
                            v-on:click="deleteTask"
                        >
                            Delete Task
                        </span>
                    </div>

            </div>

            <p class="body-l text-medium-grey">{{ task.description }}</p>

            <h3 class="body-m text-medium-grey dark:text-white">
                Subtasks ({{ task.subtasks.filter((subtask:Subtask) => subtask.isCompleted === true).length }} 
                of 
                {{ task.subtasks.length }})     
            </h3>

            <div v-for="(subtask,index) in task.subtasks" class="bg-light-grey dark:bg-very-dark-grey rounded-sm p-3 flex gap-4 items-center group hover:bg-main-purple/25 hover:text-dark">

                <input 
                    type="checkbox"
                    :id="'subtask'+index"
                    class="appearance-none min-w-5 min-h-5 max-w-5 max-h-5 border-2 text-white border-medium-grey/25 rounded-sm bg-white dark:bg-dark-grey checked:bg-main-purple checked:border-0 checked:after:content-['✓'] after:flex after:justify-center after:items-center"
                    :checked="subtask.isCompleted"
                    v-on:change="allBoardsStore.updateSubtaskCompleation(column.name, task.title, index)"
                />

                <label
                    :for="'subtask'+index" 
                    class="body-m text-medium-grey w-full h-full hover:cursor-pointer group-hover:text-black group-hover:dark:text-white"
                    :class="[subtask.isCompleted ? 'line-through' : '' ]"
                >
                    {{ subtask.title }}
                </label>

            </div>

            <h3 class="body-m text-medium-grey dark:text-white">Current Status</h3>

            <div
                class="relative h-10 rounded-sm border flex justify-between items-center px-4 hover:cursor-pointer"
                v-on:click="statusOptions = !statusOptions"
                :class="statusOptions ? 'border-main-purple' : 'border-medium-grey'"
            >
                <span class="text-black dark:text-white">{{ task.status }}</span>
                <img
                    v-if="statusOptions"
                    src="/public/assets/icon-chevron-up.svg"
                />
                <img
                    v-else
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
                        v-for="currentBoardColumn in currentBoard.board.columns"
                        v-on:click="updateStatus(currentBoardColumn.name)"
                    >
                        {{ currentBoardColumn.name }}
                    </span>
                </div>
            </div>
        </div>

    </div>
    </Teleport>
</template>