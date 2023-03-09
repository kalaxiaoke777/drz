import { load } from "/完整项目/web/util/LoadView.js";
load("")
let otitle = document.querySelector(".title")
let oauthor = document.querySelector(".author")
let newsContent = document.querySelector(".newsContent")
async function render(){
    let id = new URL(location.href).searchParams.get("id")
    // console.log(id);
    let {title,author,content} = await fetch(`http://localhost:3000/news/${id}`).then(res=>res.json())
    otitle.innerHTML = title
    oauthor.innerHTML = author
    newsContent.innerHTML = content
}
render()