import type { Column } from "../types/types"

export class TaskboardClass {

    name: string
    columns: Column[]

    constructor(name?:string, columns?:Column[]) {

        this.name = name || ""

        this.columns = columns || [
            {
                name: "ToDo",
                tasks: []
            },
            {
                name: "Doing",
                tasks: []
            },
            {
                name: "Done",
                tasks: []
            },
        ]
    }

    removeColumn(index:number) {
        this.columns.splice(index,1)
    }

    addColumn() {
        this.columns.push({name: "", tasks:[]})
    }
}