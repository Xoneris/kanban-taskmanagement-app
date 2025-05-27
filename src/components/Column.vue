<script setup  lang="ts">
    import Task from "./Task.vue"
    const { column } = defineProps(["column"])
</script>

<template>
    <div class="flex flex-col gap-5 max-w-[280px] grow">

        <h3 class="heading-s">{{ column.name }} ({{ column.tasks.length }})</h3>

        <Task 
            v-for="task in column.tasks" 
            :task="task" 
        />

    </div>
</template>