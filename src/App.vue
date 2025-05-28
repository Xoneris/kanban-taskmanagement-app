<script setup lang="ts">

  import Sidebar from "./components/Sidebar.vue"
  import Header from "./components/Header.vue"
  import Taskboard from "./components/Taskboard.vue"

</script>

<template>
  <div class="w-screen h-screen flex flex-col">

    <div class="grow flex">

      <Sidebar/>

      <div class="grow flex flex-col overflow-x-hidden">
        
        <Header/>
          
        <Taskboard/>

      </div>
    </div>
  </div>
</template>