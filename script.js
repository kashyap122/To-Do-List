let mainTask = document.getElementById("mainTask");
let taskToEdit = document.getElementById("taskToEdit");
let taskStatus = document.getElementById("taskStatus");
let date = document.getElementById("date");
document.body.style = 'background:rgb(232, 209, 213);';

function openForm() {
    if (mainTask.value === "") {
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
        let row = document.createElement("tr");
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
            // event.preventDefault();
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
function editRow(index) {
    let data = JSON.parse(localStorage.getItem("items")) || [];
    let arrayIndex = index;
    console.log(index, data[arrayIndex]);


    // creating the whole form in JS
    let mainDivJS = document.createElement("div");
    let formJS = document.createElement("form");
    let inputJS = document.createElement("input");
    let sectionJS = document.createElement("section");
    let optionJS1 = document.createElement("option");
    let optionJS2 = document.createElement("option");
    let optionJS3 = document.createElement("option");
    let dateJS = document.createElement("date");
    let saveButtonJS = document.createElement("button")
    let clearButtonJS = document.createElement("button")

    mainDivJS.appendChild(formJS);
    formJS.appendChild(inputJS);
    formJS.appendChild(sectionJS);
    formJS.appendChild(optionJS1);
    formJS.appendChild(optionJS2);
    formJS.appendChild(optionJS3);
    formJS.appendChild(dateJS);
    formJS.appendChild(saveButtonJS);
    formJS.appendChild(clearButtonJS);
}
