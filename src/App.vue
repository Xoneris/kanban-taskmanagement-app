<script setup lang="ts">
  import data from "./data/data.json"
  import { ref, watch } from 'vue'

  import Sidebar from "./components/Sidebar.vue"
  import Header from "./components/Header.vue"
  import Taskboard from "./components/Taskboard.vue"

  const currentBoard = ref(data[0])
  const isSidebar = ref(true)
  const isDarkMode = ref(false)

    function toggleDarkMode() {
        isDarkMode.value = !isDarkMode.value
    }

    watch(isDarkMode, (enabled) => {
        const html = document.documentElement
        html.classList.toggle('dark', enabled)
    })

  function handleUpdate(value:number) {
    currentBoard.value = data[value]
  }

  function handleSidebarUpdate(value:boolean) {
    isSidebar.value = value
  }

</script>

<template>
  <div class="w-screen h-screen flex flex-col">

    <div class="grow flex">

      <Sidebar 
        :data="data"
        :currentBoard="currentBoard"
        :isSidebar="isSidebar"
        :isDarkMode="isDarkMode"
        @updateBoard="handleUpdate"
        @updateSidebar="handleSidebarUpdate"
        @updateDarkMode="toggleDarkMode"
      />

      <div class="grow flex flex-col">
        
        <Header 
          :currentBoard="currentBoard" 
          :isSidebar="isSidebar"
          :isDarkMode="isDarkMode"
        />
          
        <Taskboard 
          :currentBoard="currentBoard"
        />

      </div>
    </div>
  </div>
</template>