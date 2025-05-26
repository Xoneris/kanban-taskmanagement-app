<script setup>

    const {openingTrigger} = defineProps(["openingTrigger"])

    const emit = defineEmits(['updateBoard'])

    function closeModal() {
        emit('closeModal')
    }

</script>

<template>

    <div v-if="openingTrigger" @click="closeModal" class="fixed top-0 left-0 min-w-screen w-full min-h-screen h-screen bg-black/50">

        <div @click.stop class="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-dark-grey bg-white w-full max-w-[480px] flex flex-col gap-6 rounded-[6px] p-8">

            <slot></slot>

        </div>

    </div>

</template>