let imgUrlConst;
const categoryDropdown = document.getElementById("cat_id");
let oldSizeLength = 0;
let dynamicUrl = "https://demo-hp.herokuapp.com/";

function getCategories() {
    axios.get(dynamicUrl + '/category/get')
        .then(response => {
            let rac = response.data.data;
            console.log(rac);
            rac.forEach(element => {
                const option = document.createElement("option");
                option.value = element.id;
                option.innerText = element.categoryName;
                option.backgroundImage = `url(${element.imageUrl})`;
                console.log(element.categoryName);
                categoryDropdown.appendChild(option);
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
    let catId = document.getElementById("cat_id").value;
    // alert(catId);
    axios.get(dynamicUrl + `v1/size/get/${catId}`).
    then(response => {
        let rac = response.data.data;
        oldSizeLength = rac.length;
        console.log(rac);
        rac.forEach(element => {
            const option = document.createElement("option");
            option.value = element.id;
            option.innerText = element.name;
            sizeDropdown.appendChild(option);
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
    let categoryId = document.querySelector("#cat_id").value;
    let itemDesc = document.querySelector("#item_desc").value;
    let itemPrice = document.querySelector("#item_price").value;
    let imageData = {
        "categoryId": categoryId,
        "imgUrl": imgUrls,
        "itemDescription": itemDesc,
        "itemName": itemName,
        "itemPrice": itemPrice,
        "userId": 1
    }
    axios.post(dynamicUrl + '/item/add', imageData).then(
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
    axios.get(dynamicUrl + '/item/get/0'
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
                    itemImage.src = element.imgUrl;
                    imgDiv.appendChild(itemImage);
                    const imgDes = document.createElement("div");
                    imgDes.classList.add("text");
                    imgDes.innerText = element.itemDesc;
                    cardDiv.appendChild(imgDes);
                    const price = document.createElement("div");
                    price.classList.add("price");
                    price.innerText = element.itemPrice
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
document.getElementById("cat_id").addEventListener('change', function() {
    // alert("something")
    getSizes();
});