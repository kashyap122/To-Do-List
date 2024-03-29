let mainTask = document.getElementById("mainTask");
let taskToEdit = document.getElementById("taskToEdit");
let taskStatus = document.getElementById("taskStatus");
let date = document.getElementById("date");
document.body.style = 'background:rgb(232, 209, 213);';

function openForm() {
    if (mainTask.value === "") {
        // alert("")
        alert("You Must Write Something!");
    }
    else {
        document.getElementById("hiddenForm").style.display = "block";
    }
    let valueOfTask = mainTask.value;
    taskToEdit.value = valueOfTask;
    document.getElementById("mainTask").value = "";
}

function closeForm() {
    document.getElementById("hiddenForm").style.display = "none";
}

function saveButton() {
    if (taskToEdit.value === "") {
        alert("You Must Write Something!");
    }
    else if (date.value === "") {
        alert("Due Date is required!");
    }

    else {
        let task = taskToEdit.value;
        let statusOfTask = taskStatus.value;
        let tarikh = date.value;

        let data = JSON.parse(localStorage.getItem("items")) || [];

        let currentDate = new Date();
        let selectedDate = new Date(tarikh);

        if (selectedDate <= currentDate) {
            alert("Due Date should be in the future!");
            return;
        }

        data.push({
            task: task,
            statusOfTask: statusOfTask,
            tarikh: tarikh,
        });

        localStorage.setItem("items", JSON.stringify(data));

        displayData();
    }
    closeForm();
    document.getElementById("taskToEdit").value = "";
    document.getElementById("taskStatus").value = "";
    document.getElementById("date").value = "";
}

function displayData() {
    let data = JSON.parse(localStorage.getItem("items")) || [];
    let tbody = document.getElementById("tbody");

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    data.forEach((item, index) => {
        height = "40px";
        width = "40px";
        deleteSrc = "/Images/delete.png";
        editSrc = "/Images/edit.png"
        // checkboxType = "checkbox" 
        let row = document.createElement("tr");
        // let checkbox1 = document.createElement("input");
        // checkbox1.type = checkboxType;
        let r1 = document.createElement("td");
        let r2 = document.createElement("td");
        let r3 = document.createElement("td");
        let r4 = document.createElement("td");
        let a1 = document.createElement("a");
        let deleteImage = document.createElement("img");
        deleteImage.src = deleteSrc;
        deleteImage.height = height;
        deleteImage.width = width;

        let r5 = document.createElement("td");
        let a2 = document.createElement("a");
        let editImage = document.createElement("img");
        editImage.src = editSrc;
        editImage.height = height;
        editImage.width = width;

        r1.innerHTML = item.statusOfTask;
        r2.innerHTML = item.task;
        r3.innerHTML = item.tarikh;

        a1.appendChild(deleteImage);
        r4.appendChild(a1);
        a1.addEventListener("click", (event) => {
            event.preventDefault();
            deleteRow(index);
        });

        a2.appendChild(editImage);
        r5.appendChild(a2);
        a2.addEventListener("click", (event) => {
            editRow(index);
        });

        row.appendChild(r1);
        row.appendChild(r2);
        row.appendChild(r3);
        row.appendChild(r4);
        row.appendChild(r5);

        tbody.appendChild(row);
    });
}
displayData();

function deleteRow(index) {
    let data = JSON.parse(localStorage.getItem("items")) || [];

    data.splice(index, 1);

    localStorage.setItem("items", JSON.stringify(data));

    displayData();
}

function openFormToEdit(task, statusOfTask, tarikh) {
    document.getElementById("hiddenForm").style.display = "block";
}

function editRow(index) {
    let data = JSON.parse(localStorage.getItem("items")) || [];
    let selectedItem = data[index];

    taskToEdit.value = selectedItem.task;
    taskStatus.value = selectedItem.statusOfTask;
    date.value = selectedItem.tarikh;

    openFormToEdit();

    document.querySelector('.saveButton').onclick = function () {
        if (taskToEdit.value === "" || date.value === "") {
            alert("All fields are required!");
            return;
        }

        selectedItem.task = taskToEdit.value;
        selectedItem.statusOfTask = taskStatus.value;
        selectedItem.tarikh = date.value;

        localStorage.setItem("items", JSON.stringify(data));

        displayData();
        closeForm();

        taskToEdit.value = "";
        taskStatus.value = "";
        date.value = "";
    };
}
