<script setup>
    import { ref } from 'vue'
    const { task } = defineProps(["task"])

    const openTask = ref(false)

    function closeTask() {
        openTask.value = false
    }
</script>

<template>
    <div 
        class="
         rounded-lg px-4 py-[23px] flex flex-col gap-2 justify-center items-start shadow hover:cursor-pointer
         bg-white
        dark:bg-dark-grey dark:text-white 
        transition-all"
        v-on:click="openTask=true"
    >
        <h4 class="heading-m">{{ task.title }}</h4>
        <span class="body-m text-medium-grey">
            {{ task.subtasks.filter((subtask) => subtask.isCompleted === true).length }} 
            of 
            {{ task.subtasks.length }} 
            subtasks
        </span>
    </div>

    <div v-if="openTask" @click="closeTask" class="fixed top-0 left-0 min-w-screen w-full min-h-screen h-screen bg-black/50">

        <div @click.stop class="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-[480px] flex flex-col gap-4 rounded-[6px] p-8">
            <h2 class="heading-l text-black dark:text-white">{{ task.title }}</h2>
            <p class="body-l text-medium-grey">{{ task.description }}</p>

            <h3 class="body-m text-medium-grey dark:text-white">
                Subtasks ({{ task.subtasks.filter((subtask) => subtask.isCompleted === true).length }} 
                of 
                {{ task.subtasks.length }}) 
            </h3>

            <div v-for="subtask in task.subtasks" class="bg-light-grey rounded-sm p-3 flex gap-4 items-center">

                <input 
                    type="checkbox"
                    class="w-4 h-4 rounded-[2px]"
                    :class="[subtask.isCompleted ? 'bg-main-purple' : 'bg-white']"
                    :checked="subtask.isCompleted"
                />

                <span 
                    class="body-m text-medium-grey"
                    :class="[subtask.isCompleted ? 'line-through' : '' ]"
                >
                    {{ subtask.title }}
                </span>

            </div>

            <h3 class="body-m text-medium-grey dark:text-white">Current Status</h3>
            <select>
                <option>a</option>
                <option>b</option>
                <option>c</option>
            </select>
        </div>
        
    </div>
</template>