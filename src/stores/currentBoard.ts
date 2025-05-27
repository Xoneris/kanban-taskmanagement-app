import { defineStore } from "pinia"
import { ref } from "vue"
import data from "../data/data.json"

export const useCurrentBoardStore = defineStore('currentBoard', () => {

    const board = ref(data[0])

    function changeCurrentBoard(value:number) {
        board.value = data[value]
    }


    return { board, changeCurrentBoard }
})