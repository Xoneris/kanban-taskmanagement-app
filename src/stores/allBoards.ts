import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useCurrentBoardStore } from "./currentBoard"
import data from "../data/data.json"

import type { Taskboard, Task, Subtask } from "../types/types"

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

    function newTask(task:Task) {

        const currentBoardIndex = allBoards.value.findIndex((board) => board.name === currentBoardStore.board.name)
        const currentColumnIndex = allBoards.value[currentBoardIndex].columns.findIndex((column) => column.name === task.status)

        // Insert API Route to add new Task

        allBoards.value[currentBoardIndex].columns[currentColumnIndex].tasks.push(task)

    }


    function editTask(updatedTask:Task, columnName:string, editedTaskIndex:number) {

        const currentBoardIndex = allBoards.value.findIndex((board) => board.name === currentBoardStore.board.name)
        const currentColumnIndex = allBoards.value[currentBoardIndex].columns.findIndex((column) => column.name === columnName)
        const targetColumnIndex = allBoards.value[currentBoardIndex].columns.findIndex((column) => column.name === updatedTask.status)

        // Insert API Route to update a Task

        if (updatedTask.status === columnName) {
            allBoards.value[currentBoardIndex].columns[targetColumnIndex].tasks[editedTaskIndex] = updatedTask
        } else {
            allBoards.value[currentBoardIndex].columns[currentColumnIndex].tasks.splice(editedTaskIndex)
            allBoards.value[currentBoardIndex].columns[targetColumnIndex].tasks.push(updatedTask)
        }
        
        
    }

    function deleteTask(columnName:string, taskTitle:string) {

        const currentBoardIndex = allBoards.value.findIndex((board) => board.name === currentBoardStore.board.name)
        const currentColumnIndex = allBoards.value[currentBoardIndex].columns.findIndex((column) => column.name === columnName)
        const currentTaskIndex = allBoards.value[currentBoardIndex].columns[currentColumnIndex].tasks.findIndex((task) => task.title === taskTitle)

        // Insert API Route to delete a Task here

        allBoards.value[currentBoardIndex].columns[currentColumnIndex].tasks.splice(currentTaskIndex,1)

    }

    function updateTaskStatus(columnName:string, taskTitle: string, statusName:string) {

        const currentBoardIndex = allBoards.value.findIndex((board) => board.name === currentBoardStore.board.name)
        const currentColumnIndex = allBoards.value[currentBoardIndex].columns.findIndex((column) => column.name === columnName)
        const targetColumnIndex = allBoards.value[currentBoardIndex].columns.findIndex((column) => column.name === statusName)
        const currentTaskIndex = allBoards.value[currentBoardIndex].columns[currentColumnIndex].tasks.findIndex((task) => task.title === taskTitle)

        // Insert API Route to update the status of a Task

        allBoards.value[currentBoardIndex].columns[currentColumnIndex].tasks[currentTaskIndex].status = statusName

        const currentTask:Task = allBoards.value[currentBoardIndex].columns[currentColumnIndex].tasks[currentTaskIndex]
        const taskClone:Task = {
            title: currentTask.title,
            description: currentTask.description,
            status: statusName,
            subtasks: currentTask.subtasks.map((subtask:Subtask) => {
                return {
                    title: subtask.title,
                    isCompleted: subtask.isCompleted,
                }
            }),
        }

        allBoards.value[currentBoardIndex].columns[currentColumnIndex].tasks.splice(currentTaskIndex,1)
        allBoards.value[currentBoardIndex].columns[targetColumnIndex].tasks.push(taskClone)

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

    return { allBoards, getNamesOfAllBoards, addNewBoard, edit, deleteBoard, newTask, editTask, deleteTask, updateTaskStatus, updateSubtaskCompleation }
})