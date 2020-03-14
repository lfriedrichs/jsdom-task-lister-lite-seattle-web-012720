document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById('create-task-form');
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    let listContainer = document.getElementById('tasks');
    const task = event.target['new-task-description'].value;
    const priority = event.target.priority.value;
    if (task != "") {
      console.log(listContainer)
      createTask(task, priority, listContainer);
    }
  })

  const sortTasks = document.getElementById('sort-tasks');
  sortTasks.addEventListener("click", function() {
    let listContainer = document.getElementById('tasks');
    sortList(listContainer);
  })
});


function createTask(task, priority, parent) {
  const div = document.createElement('div');
  const list = document.createElement('li');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button'); 


  div.className = priority;
  list.innerText = task;
  deleteButton.innerText = 'delete';
  editButton.innerText = 'edit';
  priorityStyle(div, priority)

  deleteButton.addEventListener('click', function() {
    deleteTask(div, parent)
  })

  editButton.addEventListener('click', function() {
  })

  div.appendChild(list)
  div.appendChild(deleteButton);
  div.appendChild(editButton);
  parent.appendChild(div);
}

function deleteTask(task, parent) {
  delete parent.removeChild(task)
}

function priorityStyle(div, priority) {
  if (priority === 'high') {
    div.style.color = 'red';
  } else if (priority === 'medium') {
    div.style.color = 'yellow';
  } else {
    div.style.color = 'green';
  }
}

// from https://stackoverflow.com/questions/8837191/sort-an-html-list-with-javascript
function sortList(ul){
  var new_ul = ul.cloneNode(false);
  new_ul.id = 'tasks'

  // Add all lis to an array
  var lis = [[],[],[]];
  for (var i = ul.childNodes.length; i--;){
      const child = ul.childNodes[i];
      if (child.className == 'high') {
          lis[0].push(child);
      } else if (child.className == 'medium') {
        lis[1].push(child);
      } else {
        lis[2].push(child);
      }
      delete ul.removeChild(child)
  }
  // Add them into the ul in order
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < lis[i].length; j++) {
      new_ul.appendChild(lis[i][j]);
    }
  }
  console.log(new_ul)
  const parent = document.getElementById('list');
  delete parent.removeChild(ul);
  parent.appendChild(new_ul);
}