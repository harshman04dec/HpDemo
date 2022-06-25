const tbody = document.getElementById("table-body");
const selectCategory = document.getElementById("category-list");

let dynamicUrl = "https://demo-hp.herokuapp.com/";

function getCategories() {
    axios.get(dynamicUrl + 'category/get')
        .then(response => {
            let rac = response.data.data;
            console.log(response);
            console.log("this is my category data " + rac[0].categoryName);
            rac.forEach(function callback(element, index) {
                const option = document.createElement("option");
                option.value = element.id;
                option.id = "cat" + element.id;
                option.innerHTML = element.categoryName;
                selectCategory.appendChild(option);
            })
        })
}


getCategories();



// modal 
const modal = document.getElementsByClassName("app-container-modal")[0];
modal.addEventListener("click", windowOnClick);

function toggleModal() {
    modal.classList.toggle("show-modal-edit");
    modal.classList.toggle("modal-hidden-edit");
}

function windowOnClick(event) {
    // alert("triggered -_-")
    if (event.target === modal) {
        toggleModal();
    }
}

function addCat() {
    toggleModal();
}

// selectCategory.addEventListener("change", getSizes(this));
var catId
var rows;

function getSizes(category) {
    catId = category.options[category.selectedIndex].value;
    console.log(catId);
    axios.get(dynamicUrl + `v1/size/get?catId=${catId}`)
        .then(response => {
            var row = document.getElementsByClassName("table-row");
            let rac = response.data.data;
            rowLength = row.length;
            for (var index = 0; index < rowLength; index++) {
                console.log(row[0]);
                row[0].remove();
            }
            console.log(response);
            rac.forEach(function callback(element, index) {
                const row = document.createElement("tr");
                row.classList.add("table-row");
                const column1 = document.createElement("th");
                column1.classList.add("index-column")
                column1.scope = "row";
                column1.id = "#" + element.id;
                column1.value = index;
                column1.innerHTML = index + 1;
                const column2 = document.createElement("td");
                column2.id = "name" + element.id;
                column2.value = index;
                column2.innerHTML = element.name;
                const column3 = document.createElement("td");
                column3.classList.add("column");
                const editButton = document.createElement("button");
                editButton.type = "button";
                editButton.classList.add("btn");
                editButton.classList.add("btn-outline-primary");
                editButton.innerText = "edit";
                column3.appendChild(editButton);
                const column4 = document.createElement("td");
                column4.classList.add("column");
                const deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.classList.add("btn");
                deleteButton.classList.add("btn-outline-danger");
                deleteButton.innerText = "delete";
                column4.appendChild(deleteButton);
                row.appendChild(column1);
                row.appendChild(column2);
                row.appendChild(column3);
                row.appendChild(column4);
                tbody.appendChild(row);

            })
        })
}
var categoryId

function getSizeByCatId(categoryId) {
    axios.get(dynamicUrl + `v1/size/get?catId=${categoryId}`)
        .then(response => {
            var row = document.getElementsByClassName("table-row");
            let rac = response.data.data;
            rowLength = row.length;
            for (var index = 0; index < rowLength; index++) {
                console.log(row[0]);
                row[0].remove();
            }
            console.log(response);
            rac.forEach(function callback(element, index) {
                const row = document.createElement("tr");
                row.classList.add("table-row");
                const column1 = document.createElement("th");
                column1.classList.add("index-column")
                column1.scope = "row";
                column1.id = "#" + element.id;
                column1.value = index;
                column1.innerHTML = index + 1;
                const column2 = document.createElement("td");
                column2.id = "name" + element.id;
                column2.value = index;
                column2.innerHTML = element.name;
                const column3 = document.createElement("td");
                column3.classList.add("column");
                const editButton = document.createElement("button");
                editButton.type = "button";
                editButton.classList.add("btn");
                editButton.classList.add("btn-outline-primary");
                editButton.innerText = "edit";
                column3.appendChild(editButton);
                const column4 = document.createElement("td");
                column4.classList.add("column");
                const deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.classList.add("btn");
                deleteButton.classList.add("btn-outline-danger");
                deleteButton.innerText = "delete";
                column4.appendChild(deleteButton);
                row.appendChild(column1);
                row.appendChild(column2);
                row.appendChild(column3);
                row.appendChild(column4);
                tbody.appendChild(row);

            })
        })
}

function postSize() {
    let name = document.getElementById("size_name").value;

    const data = {
        "categoryId": catId,
        "sizeName": name

    }
    axios.post(dynamicUrl + "v1/size", data).then(
            response => {
                getSizeByCatId(catId);

            })
        .catch(
            console.log("response is the call is the galat")
        )
    console.log(data);
}