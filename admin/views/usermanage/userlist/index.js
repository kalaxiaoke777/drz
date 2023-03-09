import { load } from "/完整项目/admin/util/LoadView.js";
load("sidemenu-userlist")

let list = []
async function render() {
    let tbody = document.querySelector("#tbodyList")
    list = await fetch("http://localhost:3000/users").then(res => res.json())
    tbody.innerHTML = list.map(item =>
        `
        <tr>
            <th scope="row">${item.username}</th>
            <td>
               <img src="${item.photo}" style ="width:50px;height:50px;border-radius: 50%"/>
            </td>
            <td><button type="button" class="btn btn-primary btn-sm btn-edit" ${item.default ? "disabled" : ""} data-id="${item.id}">编辑</button><button type="button" class="btn btn-danger btn-sm btn-del"${item.default ? "disabled" : ""} data-id="${item.id}">删除</button></td>
        </tr>
        `
    ).join("")
}
let myModal = new bootstrap.Modal(document.getElementById('editModal'))
let mydelModal = new bootstrap.Modal(document.getElementById('delModal'))
let upData = 0
let photoflie = ""
let tbody = document.querySelector("#tbodyList")
tbody.onclick = function (evt) {
    // console.log("111",evt.target)

    if (evt.target.className.includes("btn-edit")) {
        myModal.toggle()
        upData = evt.target.dataset.id
        // console.log(evt.target.dataset);
        // console.log();
        let { username, password, usertext, photo } = list.filter(item => item.id == upData)[0]
        document.querySelector("#username").value = username
        document.querySelector("#password").value = password
        document.querySelector("#usertext").value = usertext
        // document.querySelector("#photo").value = photo
        photoflie = photo
    } else if (evt.target.className.includes("btn-del")) {
        mydelModal.toggle()
        upData = evt.target.dataset.id
        console.log(upData);
    }

}
editConfirm.onclick = async function(){
    await fetch(`http://localhost:3000/users/${upData}`,{
        method:"put",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username: document.querySelector("#username").value,
            usertext: document.querySelector("#usertext").value,
            password: document.querySelector("#password").value,
            photo:photoflie
        })
    }).then(res =>res.json())
    myModal.toggle()
    render()
}
render()
userimg.onchange = function(evt){
    // console.log(evt.target.files[0]);
    let reader = new FileReader()
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = (e) =>{
        photoflie = e.target.result
    }
}
delConfirm.onclick =async function(){
    await fetch(`http://localhost:3000/users/${upData}`,{
        method:"DELETE",
    }).then(res=>res.json())
    mydelModal.toggle()
    render()
}
render()


