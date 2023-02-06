export  interface Task {
    id: string,
    title: string,
    description : string,
    createdAt: string,
    done: boolean
}

export type TaskWithOutId = Omit<Task, 'id'|'createdAt' >