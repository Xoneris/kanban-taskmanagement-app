<script setup  lang="ts">
    import { ref } from 'vue'
    import type { Column, Subtask, Task } from '../types/types'
    import TaskModal from './TaskModal.vue'
    import AddOrEditTaskModal from './AddOrEditTaskModal.vue'
    import DeleteTaskModal from './DeleteTaskModal.vue'
    
    const { task, column } = defineProps<{
        task: Task,
        column: Column,
        taskIndex: number,
    }>()

    const openTaskModal = ref(false)
    const openAddOrEditTaskModal = ref(false)
    const openDeleteTaskModal = ref(false)

    function closeTaskModal() {
        openTaskModal.value = false
    }

    function showAddOrEditTaskModal() {
        openAddOrEditTaskModal.value = true
    }

    function closeAddOrEditTaskModal() {
        openAddOrEditTaskModal.value = false
    }

    function showDeleteTaskModal() {
        openDeleteTaskModal.value = true
    }

    function closeDeleteTaskModal() {
        openDeleteTaskModal.value = false
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
        @showAddOrEditTaskModal="showAddOrEditTaskModal"
        @showDeleteTaskModal="showDeleteTaskModal"
        @closeTaskModal="closeTaskModal"
    />

    <AddOrEditTaskModal
        v-if="openAddOrEditTaskModal" 
        :task="task"
        :editTask="true"
        :column="column"
        @closeAddOrEditTaskModal="closeAddOrEditTaskModal"
    />

    <DeleteTaskModal 
        v-if="openDeleteTaskModal"
        :task="task"
        :column="column"
        @closeDeleteTaskModal="closeDeleteTaskModal"
    />

</template>