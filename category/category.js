const tbody = document.getElementById("table-body");


let dynamicUrl = "https://demo-hp.herokuapp.com/";

function getCategories() {
    axios.get(dynamicUrl + 'category/get')
        .then(response => {
            let rac = response.data.data;
            console.log(response);
            console.log("this is my category data " + rac[0].categoryName);
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
                column2.innerHTML = element.categoryName;
                const column3 = document.createElement("td");
                column3.classList.add("column");
                // <button type="button" class="btn btn-outline-primary">Primary</button>
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
                // checkbox.type = "checkbox";
                // list.value = element.id;
                // list.innerText = element.categoryName;
                // list.backgroundImage = `url(${element.imageUrl})`;
                // list.append(checkbox)
                // console.log(element.categoryName);
                // categoryDropdown.appendChild(list);
            })
        })
}

function postImage() {
    var file = document.getElementById('input_img');
    var form = new FormData();

    form.append("image", file.files[0])

    axios.post("https://api.imgbb.com/1/upload", form, {
            params: { key: "c292af1078297b7be7963538f8ebc2c6" },
        }).then(
            response => {
                imgUrlConst = response.data.data.display_url;
                alert(imgUrlConst);
                postCategory(imgUrlConst);
            })
        .catch(
            console.log("response is the call is the galat")
        )
}

var imgUrl;

function postCategory(imgUrl) {

    var catName = document.getElementById("category_name").value;
    var catData = {
        "categoryName": catName,
        "imgUrl": imgUrl,
        "userId": 1
    }
    axios.post(dynamicUrl + 'category/add', catData)
        .then(response => {

            console.log(response);
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