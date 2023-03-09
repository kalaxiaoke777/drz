import { load } from "/完整项目/web/util/LoadView.js";
load("top-products")

{/* <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button> */ }

let indicor = document.querySelector(".carousel-indicators")
let indicortext = document.querySelector(".carousel-inner")
async function getList() {
    
    let list = await fetch("http://localhost:3000/products").then(res => res.json())
    console.log(list);
    indicor.innerHTML = list.map((item,index) => `
<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" class="active" aria-current="true" aria-label="${item.title}"></button>
`).join("")
indicortext.innerHTML = list.map((item,index) => `
    <div class="carousel-item ${index===0?"active":""}">
    <div style="background-image: url(${item.cover});width: 100%;height: calc(100vh - 50px);background-size: cover;"></div>
    <div class="carousel-caption d-none d-md-block">
      <h5>${item.title}</h5>
      <p>${item.introduction}</p>
    </div>
  </div>
`).join("")
}
getList()




