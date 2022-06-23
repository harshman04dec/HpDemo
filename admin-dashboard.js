let imgUrlConst;
const categoryDropdown = document.getElementById("categories");
let oldSizeLength = 0;
let dynamicUrl = "https://demo-hp.herokuapp.com/";
var listIds = [];
var sizeIdList = [];
var catIdList = [];

function getCategories() {
    axios.get(dynamicUrl + 'category/get')
        .then(response => {
            let rac = response.data.data;
            console.log(response);
            console.log("this is my category data " + rac[0].categoryName);
            rac.forEach(element => {
                const list = document.createElement("li");
                list.classList.add("category-list");
                const checkbox = document.createElement("input");
                checkbox.classList.add("category-checkbox")
                checkbox.id = element.id + "checkbox"
                checkbox.onchange = function() { checkboxOnChange(element.id); };
                console.log(catIdList);
                checkbox.value = element.id;
                checkbox.type = "checkbox";
                list.value = element.id;
                list.innerText = element.categoryName;
                list.backgroundImage = `url(${element.imageUrl})`;
                list.append(checkbox)
                console.log(element.categoryName);
                categoryDropdown.appendChild(list);
            })
        })


}
const sizeDropdown = document.getElementById("size_id")

function getSizes() {
    if (oldSizeLength > 0) {
        for (let index = 0; index < oldSizeLength; index++) {
            console.log("old size = " + oldSizeLength)
            console.log(index + " = index")
            console.log(sizeDropdown.children[0]);
            sizeDropdown.children[0].remove()

        }
        oldSizeLength = 0;
    }
    var stringCatId
    var listCatId = [];
    // var markedCheckbox = document.querySelectorAll('.category-checkbox:checked');
    // for (var checkbox of markedCheckbox) {
    //     console.log(checkbox.value + ' ')
    //     listCatId.push(checkbox.value);
    //     stringCatId += `&catId=${checkbox.value}`
    // }
    console.log("this is my list of category id's :" + listCatId);
    // let catId = document.getElementById("cat_id").value;
    // alert(catId);
    axios.get(dynamicUrl + `v1/size/get?` + listIds).
    then(response => {
        let rac = response.data.data;
        oldSizeLength = rac.length;
        console.log(rac);
        rac.forEach(element => {









            const list = document.createElement("li");
            list.classList.add("size-list");
            const checkbox = document.createElement("input");
            checkbox.classList.add("size-checkbox")
            checkbox.id = element.id + "size"
            checkbox.onchange = function() { checkboxOnChangeSize(element.id); };
            checkbox.value = element.id;
            checkbox.type = "checkbox";
            list.value = element.id;
            list.innerText = element.name;
            list.backgroundImage = `url(${element.imageUrl})`;
            list.append(checkbox)
            console.log(element.name);
            sizeDropdown.appendChild(list);










            // const option = document.createElement("option");
            // const checkbox = document.createElement("input");
            // checkbox.type = "checkbox";
            // checkbox.name = "name";
            // checkbox.value = "value";
            // option.value = element.id;
            // option.innerText = element.name;
            // option.appendChild(checkbox);
            // sizeDropdown.appendChild(option);
        })

    })

}

getCategories();
const imgUrls = [];
let promises = [];

function getImage() {
    var file = document.getElementById('input_img');
    for (let lengthOfFile = 0; lengthOfFile < file.files.length; lengthOfFile++) {
        // alert(file.files.length)
        var form = new FormData();

        form.append("image", file.files[lengthOfFile])
            // promises.push(

        axios.post("https://api.imgbb.com/1/upload", form, {
                params: { key: "c292af1078297b7be7963538f8ebc2c6" }, //Add userID as a param 
            }).then(
                response => {
                    imgUrlConst = response.data.data.display_url;
                    imgUrls.push(imgUrlConst);
                    alert(imgUrlConst);
                })
            .catch(
                console.log("response is the call is the galat")
            ) // is 201
            // );
    }
    // Promise.all(promises)
    // .then(postItem());

    console.log(imgUrls);
    return imgUrlConst;
}

function postItem() {
    let itemName = document.querySelector("#item_name").value;
    // let categoryId = document.querySelector("#cat_id").value;
    let itemDesc = document.querySelector("#item_desc").value;
    let itemPrice = document.querySelector("#item_price").value;
    let imageData = {
        "categoryId": catIdList,
        "imgUrl": imgUrls,
        "itemDescription": itemDesc,
        "itemName": itemName,
        "itemPrice": itemPrice,
        "sizeIds": sizeIdList,
        "userId": 1
    }
    axios.post(dynamicUrl + '/item/add', imageData).then(
        // axios.post('http://localhost:9191/item/add', imageData).then(

        response => {
            alert("Addition succesful");
            console.log(response);
            location.reload();

        }
    ).catch(
        error =>
        console.log(error)
    )
}

const sectionDiv = document.getElementById("product-list");
const productContainer = document.createElement("div");
productContainer.setAttribute("id", "firstPracPara");
productContainer.classList.add("product-container")
sectionDiv.appendChild(productContainer);
showImages();

function showImages() {
    axios.get(dynamicUrl + 'item/get/0'
            // ,{ headers: { authorization: jwtToken }}
        )
        .then(function(response) {
                console.log("Below is the response from length data");
                console.log(response);
                let rac = response.data.data;
                rac.forEach(element => {
                    const cardDiv = document.createElement("div");
                    cardDiv.classList.add("card");
                    productContainer.appendChild(cardDiv);
                    const cardTitle = document.createElement("div");
                    cardTitle.classList.add("title");
                    cardTitle.innerText = element.itemName;
                    cardDiv.appendChild(cardTitle);
                    const imgDiv = document.createElement("div");
                    imgDiv.classList.add("image");
                    cardDiv.appendChild(imgDiv);
                    const itemImage = document.createElement("img");
                    console.log(element.imgUrl);
                    itemImage.src = element.imgUrl[0];
                    imgDiv.appendChild(itemImage);
                    const imgDes = document.createElement("div");
                    imgDes.classList.add("text");
                    imgDes.innerText = element.itemDesc;
                    cardDiv.appendChild(imgDes);
                    const price = document.createElement("div");
                    price.classList.add("price");
                    price.innerText = "₹" + element.itemPrice
                    cardDiv.appendChild(price);
                    const buy = document.createElement("button");
                    buy.classList.add("buy-button");
                    buy.classList.add("details");
                    buy.innerText = "Buy now";
                    cardDiv.appendChild(buy);
                });

            }


        )
}

var checkList = document.getElementById('categoryList');
checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (checkList.classList.contains('visible'))
        checkList.classList.remove('visible');
    else
        checkList.classList.add('visible');
}
var sizeList = document.getElementById('sizeList');
sizeList.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (sizeList.classList.contains('visible'))
        sizeList.classList.remove('visible');
    else
        sizeList.classList.add('visible');
}

function checkboxOnChange(id) {
    if (!(document.getElementById(`${id}checkbox`).checked)) {
        listIds = listIds.replace(`&catId=${id}`, "");
        let index = catIdList.indexOf(id);
        catIdList.splice(index, 1);
        console.log("catIdList" + catIdList);
    } else {
        catIdList.push(id);
        console.log("catIdList" + catIdList);

        if (listIds.length = 0) {
            listIds += `catId=${id}`
        } else
            listIds += `&catId=${id}`
    }
    getSizes();
    //size
}

function checkboxOnChangeSize(id) {
    if (!(document.getElementById(`${id}size`).checked)) {
        let index = sizeIdList.indexOf(id);
        sizeIdList.splice(index, 1);
        console.log("sizeIdList" + sizeIdList);
    } else {
        sizeIdList.push(id);
        console.log("sizeIdList" + sizeIdList);

        // if (listIds.length = 0) {
        //     listIds += `catId=${id}`
        // } else
        //     listIds += `&catId=${id}`
    }
    // getSizes();
    //size
}
const modal = document.getElementsByClassName("app-container-modal")[0];
modal.addEventListener("click", windowOnClick);

function toggleModal() {
    modal.classList.toggle("show-modal-edit");
    modal.classList.add("modal-hidden-edit");
}

function windowOnClick(event) {
    // alert("triggered -_-")
    if (event.target === modal) {
        toggleModal();
    }
}