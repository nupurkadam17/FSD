
function addTask() {

    let task = document.getElementById("task").value;

    if (task == "") {
        alert("Please enter a task!");
    }
    else {
        let li = document.createElement("li");

        li.innerHTML = task;

        let btn = document.createElement("button");
        btn.innerHTML = "Delete";

        btn.onclick = function() {
            li.remove();
        };

        li.appendChild(btn);

        document.getElementById("taskList").appendChild(li);

        document.getElementById("task").value = "";
    }
}
