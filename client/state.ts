interface Task {
    taskTitle:string;
    taskDesc?:string;
    done:boolean;
};
const state = {
    data: {
        tasks: localStorage.getItem("tasks") ? Object.values(JSON.parse(localStorage.getItem("tasks"))) : []
    },
    listeners: [],
    getState() {
        return this.data;
    },
    setState(newState:object) {
        this.data = newState;
        this.listeners.forEach(listener => listener());
    },
    subscribe(callback) {
        this.listeners.push(callback);
    },
    createNewTask(taskTitle:string, taskDesc?:string) {
        const currentState = this.getState();
        const newTask:Task = {
            taskTitle,
            taskDesc,
            done: false
        };
        currentState.tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(currentState.tasks));
        this.setState(currentState);
    },
    deleteThisTask(taskIndex:number) {
        const currentState = this.getState();
        let tasks:Task[] = currentState.tasks;
        tasks.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        this.setState(currentState);
    },
    markTaskAsDone(taskIndex:number) {
        const currentState = this.getState();
        let tasks:Task[] = currentState.tasks;
        tasks[taskIndex].done = true;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        this.setState(currentState);
    },
    markTaskAsUndone(taskIndex:number) {
        const currentState = this.getState();
        let tasks:Task[] = currentState.tasks;
        tasks[taskIndex].done = false;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        this.setState(currentState);
    }
};

export {state, Task};