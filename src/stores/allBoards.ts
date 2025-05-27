import { defineStore } from "pinia"
import { computed, ref } from "vue"
import data from "../data/data.json"

import type { Taskboard } from "../types/types"

export const useAllBoardsStore = defineStore('allBoards', () => {

    const allBoards = ref<Taskboard[]>(data)

    function addNewBoard (taskboard:Taskboard) {

        allBoards.value.push(taskboard)
    }

    const getNamesOfAllBoards = computed(() => {

        const boardNames:string[] = []
        for (let i=0 ; i<allBoards.value.length ; i++) {
            boardNames.push(allBoards.value[i].name)
        }
        return boardNames
    })

    return { allBoards, getNamesOfAllBoards, addNewBoard }
})