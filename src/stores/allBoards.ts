import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useCurrentBoardStore } from "./currentBoard"
import data from "../data/data.json"

import type { Column, Taskboard } from "../types/types"

export const useAllBoardsStore = defineStore('allBoards', () => {

    const currentBoard = useCurrentBoardStore()

    // Insert API Route to get all Taskboards here

    const allBoards = ref<Taskboard[]>(data)

    function addNewBoard (taskboard:Taskboard) {

        allBoards.value.push(taskboard)
    }

    function edit (currentBoardName: string, taskboard:Taskboard) {
       
        const currentBoardIndex = allBoards.value.findIndex((board) => board.name === currentBoardName)

        const updatedAllBoards = allBoards.value.map((board) => {
            return board.name === currentBoardName
            ? board = taskboard
            : board
        })

        // Insert API Route to update a Taskboard here

        allBoards.value = updatedAllBoards
        currentBoard.updateCurrentBoard(currentBoardIndex)
    }

    function deleteBoard (currentBoardName:string) {

        const currentBoardIndex = allBoards.value.findIndex((board) => board.name === currentBoardName)

        // Insert API Route to delete a Taskboard here 

        allBoards.value.splice(currentBoardIndex,1)

    }


    function updateSubtask(columnName:string, taskTitle:string, subTaskIndex:number) {

        console.log(columnName, taskTitle, subTaskIndex)
        
    }

    const getNamesOfAllBoards = computed(() => {

        const boardNames:string[] = []
        for (let i=0 ; i<allBoards.value.length ; i++) {
            boardNames.push(allBoards.value[i].name)
        }
        return boardNames
    })

    return { allBoards, getNamesOfAllBoards, addNewBoard, edit, deleteBoard, updateSubtask }
})