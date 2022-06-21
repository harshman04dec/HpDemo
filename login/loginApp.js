
    const saveSignInDetail = () => {
    let dynamicPostUrl ="localhost:9191";
    let url = 'http://'+dynamicPostUrl+'/v1/sign-in';
      let username = document.getElementById("sign-in-username").value;
      let pwd = document.getElementById("sign-in-password").value;

      if(username == "" || pwd == ""){
        toggleModal("One of the input is not Present");
        return;
      }

      let data = {
        "username":username,
        "password":pwd
      }

      console.log(data);

      axios.post(url, data)
      .then(response => {
          sessionStorage.setItem("userId", response.data.data.userId);
          sessionStorage.setItem("userName",response.data.data.username)
          var jwtToken = response.data.data.jwtToken;
          sessionStorage.setItem("jwtToken",jwtToken)
          location.href = "category.html";
      }).catch(error => {
        console.log(error.response);
          toggleModal(error.response.data.message);
      });
    }
    const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal(message) {
  document.getElementById("modalContent").innerHTML=message;
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
function imageCall(){

  alert("function called")
// const img = document.getElementById("img").value;
// var data = {
//   "image" : img
// }

var file = document.getElementById('input_img');
var form = new FormData();
form.append("image", file.files[0])
axios.post( "https://api.imgbb.com/1/upload" ,  form, 
{ params: { key : "c292af1078297b7be7963538f8ebc2c6" }, //Add userID as a param 
}).then(response=> console.log("repsonse", response.data.data.display_url))
.catch(
  console.log("response is the call is the galat")
) // is 201
}

