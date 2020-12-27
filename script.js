//selectors
var inputitem = document.querySelector("#inputitem");
let inputbtn = document.querySelector("#input-btn");
let todoitems = document.querySelector(".list");
let trashbutton = document.querySelectorAll(".trash-btn");
let checkbutton = document.getElementsByClassName(".check-btn");
let selectop = document.querySelector(".select-op");

//event listeners
inputbtn.addEventListener("click", additem);
todoitems.addEventListener("click", deletecheck);
selectop.addEventListener("click", selected);

//functions
//function to create elements upon each addition of input
function additem(event) {
    event.preventDefault();
    if(inputitem.value.length!==0) {
        const tododiv = document.createElement('div');
        tododiv.classList.add("todo-div");
        let todoitem = document.createElement("li");
        todoitem.classList.add("todo-item");
        todoitem.innerText = inputitem.value;
        tododiv.appendChild(todoitem);
        let checkbtn = document.createElement("button");
        checkbtn.innerText = "-";
        checkbtn.classList.add("check-btn");
        tododiv.appendChild(checkbtn);
        let trashbtn = document.createElement("button");
        trashbtn.innerText = "X";
        trashbtn.classList.add("trash-btn");
        tododiv.appendChild(trashbtn);
        todoitems.appendChild(tododiv);   
    }
    //function call to store in local storage
    saveToLocal(inputitem.value);
    console.log(JSON.stringify(localStorage));
    //set the input value back to null
    inputitem.value ="";
}
//function to assign actions to check and delete buttons
function deletecheck(e) {
    let clicked = e.target;    
    if(clicked.classList[0] === "trash-btn") {
        let clickedText = clicked.parentElement.querySelector(".todo-item").innerText;
        let todos = JSON.parse(localStorage.getItem("todos"));
        for(var i=0; i<todos.length; i++) {
            if(todos[i] === clickedText) {
                todos.splice(i, 1);
                localStorage.setItem("todos", JSON.stringify(todos));                
            }
        }
        console.log(JSON.stringify(localStorage));
        clicked.parentElement.classList.add("fall");
        clicked.parentElement.addEventListener("transitionend", function a(){
              clicked.parentElement.remove();
        }); 
    }
    if(clicked.classList[0] === "check-btn") {
        clicked.parentElement.classList.toggle("checked");
    }
}
//function to create dropdown for checked elements and delete elements
function selected(ev) {
    let items = todoitems.childNodes; 
    let tododivs = document.querySelectorAll(".todo-div");   
        switch(ev.target.value) {
            case "all":
                for(var i=0; i<=tododivs.length; i++) {
                    tododivs[i].classList.remove("hide");   
                }
                break;
            case "checked":
                for(var i=0; i<=tododivs.length; i++)
                    {
                        if(!tododivs[i].classList.contains("checked"))
                            {
                                tododivs[i].classList.add("hide");
                            }
                        if(tododivs[i].classList.contains("checked"))
                            {
                                tododivs[i].classList.remove("hide");
                            }
                    }
                break;                
            case "yet to be done":
                for(var i=0; i<=tododivs.length; i++)
                    {
                        if(tododivs[i].classList.contains("checked"))
                            {
                                tododivs[i].classList.add("hide");
                            }
                        if(!tododivs[i].classList.contains("checked"))
                            {
                                tododivs[i].classList.remove("hide");
                            }
                    }
                break;
        }        
}
//function to add to local storage
if (localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", "[]");
}
function saveToLocal(todo) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos));
}