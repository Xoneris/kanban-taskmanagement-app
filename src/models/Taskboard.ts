export class Taskboard {

    name: string
    columns: string[]

    constructor(name?:string, columns?:string[]) {

        this.name = name || ""

        this.columns = columns || [
            "ToDo",
            "Doing",
            "Done",
        ]
    }
}