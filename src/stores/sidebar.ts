import { defineStore } from "pinia"
import { ref } from "vue"

export const useSidebarStore = defineStore('isSidebar', () => {

    const isSidebar = ref<boolean>(true)

    function toggleSidebar (value:boolean) {
        isSidebar.value = value
    }

    return { isSidebar, toggleSidebar }
})