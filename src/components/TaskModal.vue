<script setup lang="ts">

    import { ref } from 'vue';
    import { useCurrentBoardStore } from '../stores/currentBoard';
    import type { Subtask } from '../types/types';
import { useAllBoardsStore } from '../stores/allBoards';
    const { task, column } = defineProps(["task","column"])

    const currentBoard = useCurrentBoardStore()
    const allBoardsStore = useAllBoardsStore()

    const emit = defineEmits()

    const openTaskOptions = ref(false)
    // const showTaskModal = ref(false)
    // const showDeleteTaskModal = ref(false)

    function closeTaskModal() {

        emit('closeTaskModal')
    }

</script>

<template>
    <div 
        v-on:click="closeTaskModal" 
        class="fixed top-0 left-0 min-w-screen w-full min-h-screen h-screen bg-black/50"
    >

        <div @click.stop class="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-dark-grey w-full max-w-[480px] flex flex-col gap-4 rounded-[6px] p-8">

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
                            v-on:click="showTaskboardModal = true, openTaskOptions = false"
                        >
                            Edit Task
                        </span>
                        <span 
                            class="body-l text-red hover:underline hover:cursor-pointer"
                            v-on:click="showDeleteTaskboardModal = true, openTaskOptions = false"
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
                    v-model="subtask.isCompleted"
                    :id="'subtask'+index"
                    class="appearance-none min-w-5 min-h-5 max-w-5 max-h-5 border-2 text-white border-medium-grey/25 rounded-sm bg-white dark:bg-dark-grey checked:bg-main-purple checked:border-0 checked:after:content-['✓'] after:flex after:justify-center after:items-center"
                    :checked="subtask.isCompleted"
                    v-on:change="allBoardsStore.updateSubtask(column.name, task.title, index)"
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
            <select 
                class="rounded-sm px-4 py-2 border border-medium-grey text-black dark:text-white">
                <option v-for="column in currentBoard.board.columns">
                    {{ column.name }}
                </option>

            </select>
        </div>
        
    </div>
</template>