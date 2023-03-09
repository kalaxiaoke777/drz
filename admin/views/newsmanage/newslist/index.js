import { load,isLogin } from "/完整项目/admin/util/LoadView.js";
load("sidemenu-newslist")
let myModal = new bootstrap.Modal(document.getElementById('previewModal'))
let mydelModal = new bootstrap.Modal(document.getElementById('delModal'))
let list = []
let id = 0
async function getList(){
    let username = JSON.parse(isLogin()).username
    let category = ["最新动态","典型案例","通知公告"]
    list = await fetch(`http://localhost:3000/news?author=${username}`).then(res => res.json())  
    tbodyList.innerHTML = list.map(item =>
        `
        <tr>
            <th scope="row">${item.title}</th>
            <th scope="row">${category[item.category]}</th>

            <td><button type="button" class="btn btn-success btn-sm btn-preview"} data-id="${item.id}">预览</button><button type="button" class="btn btn-primary btn-sm btn-edit"} data-id="${item.id}">编辑</button><button type="button" class="btn btn-danger btn-sm btn-del"} data-id="${item.id}">删除</button></td>
        </tr>
       `
    ).join("")
}
tbodyList.onclick = function(evt){
    if(evt.target.className.includes("btn-preview")){
        myModal.toggle()
        let newsid =evt .target.dataset.id
        let obj = list.filter(item => item.id == newsid)[0]
        rendernews(obj)
    }
    else if(evt.target.className.includes("btn-edit")){
        myModal.toggle()
        location.href = "/完整项目/admin/views/newsmanage/editnews/index.html?id="+evt .target.dataset.id
    }
    else if(evt.target.className.includes("btn-del")){
        mydelModal.toggle()
        id = evt .target.dataset.id

    }
}
getList()
function rendernews(info){
let previewModalTitle =document.querySelector("#previewModalTitle")
let previewModalContent =document.querySelector("#previewModalContent")
previewModalTitle.innerHTML = info.title
previewModalContent.innerHTML = info.content
}
delConfirm.onclick =async function(){
    await fetch(`http://localhost:3000/news/${id}`,{
        method:"DELETE",
    }).then(res=>res.json())
    mydelModal.toggle()
    getList()
}