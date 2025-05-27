<script setup lang="ts">
  import data from "./data/data.json"
  import { ref } from 'vue'

  import Sidebar from "./components/Sidebar.vue"
  import Header from "./components/Header.vue"
  import Taskboard from "./components/Taskboard.vue"

  const allBoards = ref(data)
  const currentBoard = ref(data[0])



  function handleUpdate(value:number) {
    currentBoard.value = data[value]
  }

  // function addNewBoard(newBoard) {
  //   allBoards.value.push(newBoard)
  // }

</script>

<template>
  <div class="w-screen h-screen flex flex-col">

    <div class="grow flex">

      <Sidebar/>

      <div class="grow flex flex-col">
        
        <Header/>
          
        <Taskboard/>

      </div>
    </div>
  </div>
</template>