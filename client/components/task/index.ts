import { state } from "../../state";
customElements.define(
    "custom-task", 
    class extends HTMLElement {
        shadow = this.attachShadow({mode: "open"});
        constructor() {
            super();
            state.subscribe(()=>{
                this.render();
            })
            this.render();
        };
        render(){
            const taskTitle = this.getAttribute("taskTitle");
            const taskDesc = this.getAttribute("taskDesc");
            const id = parseInt(this.getAttribute("id"));
            const done = this.getAttribute("done");
            this.shadow.innerHTML = `
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
                <div class="task-border ${done}">
                    <li class="task">
                        <span class="task-name ${done}">${taskTitle ? taskTitle : ""}</span>
                        <p class="task-description ${done}">${taskDesc ? taskDesc : ""}</p>
                        ${done == "false" ? `<input type="checkbox" id="checkbox">` : `<input type="checkbox" id="checkbox" class="completed" checked>`}
                        <button class="delete-task-btn"><i class="bi bi-trash"></i></button>
                        <span class="task-number">Tarea número: ${id + 1}</span>
                    </li>
                </div>
            `;
            const style:HTMLStyleElement = document.createElement("style");
            style.innerHTML = `
                .task-border {
                    background: linear-gradient(129deg, rgba(225,84,255,1) 0%, rgba(77,121,228,1) 100%);
                    padding: 5px;
                    border-radius: 20px;
                    box-shadow: 0px 0px 20px 6px rgba(204,204,204,0.53);
                }
                .task {
                    display: grid;
                    align-items: center;
                    grid-template-columns: 1fr 50px;
                    grid-template-rows: 50px 1fr 1fr;
                    border-radius: 15px;
                    padding: 20px;
                    gap: 10px;
                    background-color: white;
                }
                .task-text-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: start;
                    align-items: start;
                }
                .task-controls{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                }
                .task-name {
                    font-size: 24px;
                    font-weight: 500;
                    grid-column: 1;
                    grid-row: 1;
                    align-self: flex-start;
                }
                .task-description {
                    margin: 0;
                    color: #615d5d;
                    grid-column: 1;
                    grid-row: 2;
                    align-self: flex-start;
                }
                .task-number {
                    grid-column: 1;
                    grid-row: 3;
                    color: #989898;
                }
                input[type="checkbox"] {
                    width: 45px;
                    height: 45px;
                    grid-column: 2;
                    grid-row: 1;
                    justify-self: center;
                    cursor: pointer;
                    border: solid green 3px;
                }
                .delete-task-btn {
                    padding: 0;
                    color: #393232;
                    width: 40px;
                    height: 40px;
                    border: none;
                    border-radius: 50%;
                    box-shadow: 0px 0px 9px 8px rgba(204,204,204,0.53);
                    grid-column: 2;
                    grid-row: 2;
                    font-size: 16px;
                    justify-self: center;
                    cursor: pointer;
                    font-weight: 700;
                    transition: .15s ease-in;
                }
                .delete-task-btn:hover {
                    background-color: #ff6b6b;
                    box-shadow: 0px 0px 9px 3px rgba(204,204,204,0.53);
                    color: rgb(237, 237, 237);
                }
                .task-border.true {
                    background: #656565;
                    background: linear-gradient(129deg, rgba(225,84,255,.5) 0%, rgba(77,121,228,.5) 100%);
                }
                .task-name.true, .task-description.true {
                    color: #959595;
                }
            `;
            this.shadow.appendChild(style);
            const borderEl:HTMLDivElement = this.shadow.querySelector(".task-border");
            const checkboxEl:HTMLInputElement = this.shadow.querySelector("#checkbox");
            const deleteTaskBtnEl:HTMLButtonElement = this.shadow.querySelector(".delete-task-btn");
            checkboxEl.addEventListener("change", (e) => {
                if(checkboxEl.checked) {
                    state.markTaskAsDone(id);
                    borderEl.classList.add('completed');
                    this.shadow.querySelector(".task-name").classList.add("completed");
                    this.shadow.querySelector(".task-description").classList.add("completed");
                } else {
                    borderEl.classList.remove('completed');
                    this.shadow.querySelector(".task-name").classList.remove("completed");
                    this.shadow.querySelector(".task-description").classList.remove("completed");
                    state.markTaskAsUndone(id);
                };
            });
            deleteTaskBtnEl.addEventListener("click", () => {
                state.deleteThisTask(id);
            });
        };
    }
);