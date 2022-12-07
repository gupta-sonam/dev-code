var addToList = document.getElementById('addToList');
addToList.addEventListener('click', addTitleToList);   
let existingEntries = [];
if(localStorage.getItem("allTaskList") != ''){
    existingEntries = JSON.parse(localStorage.getItem("allTaskList"));
}
var count = 0 ;
function addTitleToList(){
    console.log('inside onclick');
    var li = document.createElement("li");
    var inputValue = document.getElementById("toDoInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("task_list").appendChild(li);
        existingEntries.push(inputValue);
    }
    document.getElementById("toDoInput").value = '';
    
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    li.dataset.index = count;
    const close = document.getElementsByClassName('close')
    span.dataset.index = count;
    count = count + 1;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function(e) {
            var div = this.parentElement;
            div.style.display = "none";
            const index = e.target.dataset.index;
            if (index > -1) { // only splice array when item is found
                existingEntries.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
    }
    localStorage.setItem("allTaskList", JSON.stringify(existingEntries));
    
}

const tasklistul = document.getElementById('task_list')
tasklistul.addEventListener('click', tdl_change_task_status_done)

function tdl_change_task_status_done(event){
    var target = event.target;
    target.classList.toggle('checked')
}

//  fire click event on enter click
const toDoInput = document.getElementById('toDoInput');
toDoInput.addEventListener('keypress', addTaskToListEnterclick)

function addTaskToListEnterclick(e){
    var key = e.which;
    if (key == 13) // the enter key code
    {
      addToList.click();
      return false;
    }
}

// On app load, get all tasks from localStorage
window.onload = loadTasks;

function loadTasks() {
    if(localStorage.getItem("allTaskList") == null){
        return false;
    }
  // Get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("allTaskList")));

  // Loop through the tasks and add them to the list
  tasks.forEach(task => {
    const lsli = document.createElement("li");
    
    lsli.innerHTML = task;
    document.getElementById("task_list").appendChild(lsli);   
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    
    span.className = "close";
    span.appendChild(txt);
    lsli.appendChild(span);
    lsli.dataset.index = count;
    const lsclose = document.getElementsByClassName('close')
    span.dataset.index = count;
    count = count + 1;
    for (i = 0; i < lsclose.length; i++) {
        lsclose[i].onclick = function(e) {
            var div = this.parentElement;
            div.style.display = "none";
            const index = e.target.dataset.index;
            //const index = tasks.indexOf(i - 1);
            if (index > -1) { // only splice array when item is found
                tasks.splice(index, 1); // 2nd parameter means remove one item only
            }
            localStorage.setItem("allTaskList", JSON.stringify(tasks));
        }
    }
    
  });
}
