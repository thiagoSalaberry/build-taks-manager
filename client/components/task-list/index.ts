import { state, Task } from "../../state";
class CustomTaskList extends HTMLElement {
    connectedCallback() {
        state.subscribe(()=>{
            this.render()
        })
        this.render()
    };
    render() {
        const currentState = state.getState();
        const tasks:Task[] = currentState.tasks;
        tasks.sort((a:Task, b:Task) => (a.done === b.done) ? 0 : a.done ? 1 : -1);
        this.innerHTML = `
            <ul class="task-list">
                ${tasks.map((task:Task) => {
                    return `<custom-task id="${tasks.indexOf(task)}" taskTitle="${task.taskTitle}" taskDesc="${task.taskDesc}" done="${task.done}"}></custom-task>`
                }).join("")}
            </ul>
        `;
        const style:HTMLStyleElement = document.createElement("style");
        style.innerHTML = `
            .task-list {
                padding: 0;
                display: flex;
                flex-direction: column;
                gap: 30px;
            }
        `;
        this.appendChild(style);
    };
};
customElements.define("custom-tasks-list", CustomTaskList);