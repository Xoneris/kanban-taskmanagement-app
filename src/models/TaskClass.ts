import type { Subtask } from "../types/types"

export class TaskClass {

    title: string
    description: string
    status: string
    subtasks: Subtask[]

    constructor(title?:string, description?:string, status?:string, subtasks?:Subtask[]) {

        this.title = title || ""
        this.description = description || ""
        this.status = status || ""
        this.subtasks = subtasks || [
            {
                title: "",
                placeholder: "e.g. Make coffee",
                isCompleted: false
            },
            {
                title: "",
                placeholder: "e.g. Drink coffee & smile",
                isCompleted: false
            },
        ]
    }

    removeSubtask(index:number) {
        this.subtasks.splice(index,1)
    }

    addSubtask() {
        this.subtasks.push({title: "", isCompleted: false})
    }
}