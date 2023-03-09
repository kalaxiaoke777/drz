import { load } from "/完整项目/admin/util/LoadView.js";
load("sidemenu-adduser")
let username = document.querySelector("#username")
let password = document.querySelector("#password")
let usertext = document.querySelector("#usertext")
let userimg = document.querySelector("#userimg")
// let ouserbtn = document.querySelector("#userbtn")
let photo = ""
loginform.onsubmit = async function(evt){
    evt.preventDefault()
    console.log(username.value);
    console.log(photo);
    await fetch("http://localhost:3000/users",
    {
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username:username.value,
            password:password.value,
            usertext:usertext.value,
            photo
        })
    }).then(res=>res.json())
    location.href = "/完整项目/admin/views/usermanage/userlist/index.html"
}
userimg.onchange = function(evt){
    console.log(evt.target.files[0]);
    let reader = new FileReader()
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = (e) =>{
        photo = e.target.result
    }
}