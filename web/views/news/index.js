import { load } from "/完整项目/web/util/LoadView.js";
load("top-news")
let list = document.querySelector(".list-group")
let card = document.querySelector(".cardshit")

search.oninput = async function () {
    if (!search.value) {
        list.style.display = "none"
        return
    } else {
        list.style.display = "block"
    }
    let res = await fetch("http://localhost:3000/news?title_like=" + search.value).then(res => res.json())
    // console.log(res);
    list.innerHTML = res.map(item =>
        `
        <li class="list-group-item"><a href="/完整项目/web/views/detail/index.html?id=${item.id}">${item.title}</a></li>
        `
    ).join("")
}
search.onblur = function () {
    setTimeout(() => {
        list.style.display = "none"
    }, 100);
}
let news = []
async function render() {
    await renderList()
    renderTab()
}
async function renderList() {
    news = await fetch("http://localhost:3000/news").then(res => res.json())
    news.reverse()
    // console.log(news);
    card.innerHTML = news.slice(0, 4).map(item =>`<div class="cardContainer" data-id="${item.id}"><div class="imgcard" style="background:url(${item.cover});"></div>
    <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">作者：${item.author}</p>
    </div>
</div>`
    ).join("")
    let allcard = document.querySelectorAll(".cardContainer")
    for (let item of allcard) {
        item.onclick = function () {
            location.href = `/完整项目/web/views/detail/index.html?id=${item.dataset.id}`
        }
    }
}
function renderTab() {
    let tebs = [tab0,tab1,tab2]
    let category = _.groupBy(news,item=>item.category)
    // console.log(category);
    tebs.forEach((item,index)=>{
        // item.innerHTML = category[index]
        // console.log(item);
        // console.log(category[index]);
        item.innerHTML = category[index]?.map(item =>`
        <div class="box .clearfix:after" data-id="${item.id}">
        <img src="${item.cover}" data-id="${item.id}"/>
        <div data-id="${item.id}">${item.title}</div>
        <p class="card-text" data-id="${item.id}">作者：${item.author}</p>
        </div>
        `).join("") || ""
        item.onclick = function(evt){
            // console.log(evt.target.dataset.id);
            location.href = `/完整项目/web/views/detail/index.html?id=${evt.target.dataset.id}`

        }
    })
}
render()
