import { defineStore } from "pinia"
import { ref } from "vue"
import { useAllBoardsStore } from "./allBoards"

export const useCurrentBoardStore = defineStore('currentBoard', () => {

    const allBoards = useAllBoardsStore()

    const board = ref(allBoards.allBoards[0])

    function changeCurrentBoard(index:number) {
        board.value = allBoards.allBoards[index]
    }

    function updateCurrentBoard(index:number) {
        board.value = allBoards.allBoards[index]
    }

    return { board, changeCurrentBoard, updateCurrentBoard }
})