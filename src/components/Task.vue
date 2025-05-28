<script setup  lang="ts">
    import { ref } from 'vue'
    import type { Subtask } from '../types/types'
    import TaskModal from './TaskModal.vue'
    
    const { task, column } = defineProps(["task", "column"])
    const openTaskModal = ref(false)

    function closeTaskModal() {
        openTaskModal.value = false
    }
</script>

<template>

    <div 
        class="rounded-lg px-4 py-[23px] flex flex-col gap-2 justify-center items-start shadow hover:cursor-pointer bg-white dark:bg-dark-grey dark:text-white transition-all"
        v-on:click="openTaskModal=true"
    >
        <h4 class="heading-m">{{ task.title }}</h4>
        <span class="body-m text-medium-grey">
            {{ task.subtasks.filter((subtask:Subtask) => subtask.isCompleted === true).length }} 
            of 
            {{ task.subtasks.length }} 
            subtasks
        </span>
    </div>

    <TaskModal
        v-if="openTaskModal" 
        :task="task"
        :column="column"
        @closeTaskModal="closeTaskModal"
    />

</template>