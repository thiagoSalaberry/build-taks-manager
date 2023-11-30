import { state, Task } from "./state";
import "../client/components/task";
import "../client/components/task-list";
(()=>{
    state.subscribe(()=>{
        console.log("Esto sale del subscribe()", state.getState());
    });
    const formEl:HTMLFormElement = document.querySelector(".new-task-form");
    formEl.addEventListener("submit", (e)=>{
        e.preventDefault();
        const taskNameInputEl:HTMLInputElement = document.querySelector("#task-name");
        const taskDescTextareaEl:HTMLTextAreaElement = document.querySelector("#task-desc");
        if(taskNameInputEl.value){
            state.createNewTask(taskNameInputEl.value, taskDescTextareaEl.value);
        };
        taskNameInputEl.value = "";
        taskDescTextareaEl.value = "";
    });
})();