import { defineStore } from "pinia"
import { ref, watch } from "vue"

export const useDarkModeStore = defineStore('isDarkMode', () => {

    const isDarkMode = ref<boolean>(false)

    function toggleDarkMode () {
        isDarkMode.value = !isDarkMode.value
    }

    watch(isDarkMode, (enabled) => {
        const html = document.documentElement
        html.classList.toggle('dark', enabled)
    })

    return { isDarkMode, toggleDarkMode }
})