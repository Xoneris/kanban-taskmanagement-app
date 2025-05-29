import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useCurrentBoardStore } from "./currentBoard"
import data from "../data/data.json"

import type { Taskboard } from "../types/types"

export const useAllBoardsStore = defineStore('allBoards', () => {

    const currentBoardStore = useCurrentBoardStore()

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
        currentBoardStore.updateCurrentBoard(currentBoardIndex)
    }

    function deleteBoard (currentBoardName:string) {

        const currentBoardIndex = allBoards.value.findIndex((board) => board.name === currentBoardName)

        // Insert API Route to delete a Taskboard here 

        allBoards.value.splice(currentBoardIndex,1)

    }

    // function updateTask(task:Task) {

    // }

    function deleteTask(columnName:string, taskTitle:string) {

        const currentBoardIndex = allBoards.value.findIndex((board) => board.name === currentBoardStore.board.name)
        const currentColumnIndex = allBoards.value[currentBoardIndex].columns.findIndex((column) => column.name === columnName)
        const currentTaskIndex = allBoards.value[currentBoardIndex].columns[currentColumnIndex].tasks.findIndex((task) => task.title === taskTitle)

        // Insert API Route to delete a Task here

        allBoards.value[currentBoardIndex].columns[currentColumnIndex].tasks.splice(currentTaskIndex,1)

    }


    function updateSubtaskCompleation(columnName:string, taskTitle:string, subTaskIndex:number) {

        const currentBoardIndex = allBoards.value.findIndex((board) => board.name === currentBoardStore.board.name)
        const currentColumnIndex = allBoards.value[currentBoardIndex].columns.findIndex((column) => column.name === columnName)
        const currentTaskIndex = allBoards.value[currentBoardIndex].columns[currentColumnIndex].tasks.findIndex((task) => task.title === taskTitle)

        const subTaskIsComplete = allBoards.value[currentBoardIndex].columns[currentColumnIndex].tasks[currentTaskIndex].subtasks[subTaskIndex].isCompleted

        // Insert API Route to update isComplete value of Subtask

        allBoards.value[currentBoardIndex].columns[currentColumnIndex].tasks[currentTaskIndex].subtasks[subTaskIndex].isCompleted = !subTaskIsComplete
        currentBoardStore.board.columns[currentColumnIndex].tasks[currentTaskIndex].subtasks[subTaskIndex].isCompleted = !subTaskIsComplete
        
    }

    const getNamesOfAllBoards = computed(() => {

        const boardNames:string[] = []
        for (let i=0 ; i<allBoards.value.length ; i++) {
            boardNames.push(allBoards.value[i].name)
        }
        return boardNames
    })

    return { allBoards, getNamesOfAllBoards, addNewBoard, edit, deleteBoard, deleteTask, updateSubtaskCompleation }
})