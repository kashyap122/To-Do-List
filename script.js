let mainTask = document.getElementById("mainTask");
let taskToEdit = document.getElementById("taskToEdit");
let taskStatus = document.getElementById("taskStatus");
let date = document.getElementById("date");
// let dataFromForm = document.getElementById("dataFromForm");

function openForm() {
    if (mainTask.value === "") {
        alert("You Must Write Something!");
    }
    else {
        document.getElementById("hiddenForm").style.display = "block";
    }
    let valueOfTask = mainTask.value;
    taskToEdit.value = valueOfTask;
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

        data.push({
            task: task,
            statusOfTask: statusOfTask,
            tarikh: tarikh,
        });

        localStorage.setItem("items", JSON.stringify(data));

        displayData();
    }
}

    function displayData() {
        let data = JSON.parse(localStorage.getItem("items")) || [];
        let tbody = document.getElementById("tbody");

        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        // Populate the table with data
        data.forEach((item, index) => {
            height = "40px";
            width = "40px";
            deleteSrc = "/Images/delete.png";
            editSrc = "edit.png";

            let row = document.createElement("tr");
            let r1 = document.createElement("td");
            let r2 = document.createElement("td");
            let r3 = document.createElement("td");
            let r4 = document.createElement("td");
            let a1 = document.createElement("a")
            // a1.href = deleteLink;
            let deleteImage = document.createElement("img");
            deleteImage.src = deleteSrc;
            deleteImage.height = height;
            deleteImage.width = width;
            // let r5 = document.createElement("td");
            // let a2 = document.createElement("a")
            // a2.href = editLink;
            // let editImage = document.createElement("img");
            // editImage.src = editSrc;
            // editImage.height = height;
            // editImage.width = width;

            r1.innerHTML = item.statusOfTask;
            r2.innerHTML = item.task;
            r3.innerHTML = item.tarikh;

            a1.appendChild(deleteImage);
            r4.appendChild(a1);
            a1.addEventListener("click", (event) => {
                event.preventDefault();
                deleteRow(index);
            });


            // a2.appendChild(editImage);
            // r5.appendChild(a2);

            row.appendChild(r1);
            row.appendChild(r2);
            row.appendChild(r3);
            row.appendChild(r4);
            // row.appendChild(r5);

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
