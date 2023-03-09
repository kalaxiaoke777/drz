function isLogin(info){
    return localStorage.getItem("token")
}
function render(info){
    let oheaderPhoto = document.querySelector("#headerPhoto")
    let ouser = document.querySelector("#user")
    let oexit = document.querySelector("#exit")
    let onews = document.querySelector("#news")
    // console.log(info);
    
    oheaderPhoto.src = info.photo
    ouser.innerHTML = info.username
    oexit.onclick = function(){
        localStorage.removeItem("token")
        location.href = "/完整项目/admin/views/login/index.html"
    }
    onews.onclick = function(){
        // localStorage.removeItem("token")
        location.href = "/完整项目/web/views/news/index.html"
    }
    

    isLogin(info)

} 
function renderSide(info,id){
    document.querySelector("#"+id).style.color = "#0d6efd"

        if(info.role !== "admin"){
            document.querySelector(".user-manage-item").remove()
        }
}
async function load(id){
    let isLoad =localStorage.getItem("token")
    if(isLoad){
        let topbarText = await fetch("/完整项目/admin/components/topbar/index.html").then(res=>res.text())
        // console.log(topbarText);
        document.querySelector("header").innerHTML = topbarText

        render(JSON.parse(isLoad))

        let navbarText = await fetch("/完整项目/admin/components/sidemenu/index.html").then(res=>res.text())
        // console.log(navbarText);
        document.querySelector(".sidemenu").innerHTML = navbarText
        // document.querySelector("#"+id).style.color = "0a58ca"
        // console.log(id);
        renderSide(JSON.parse(isLoad),id)
    }else{
        location.href="/完整项目/admin/views/login/index.html"
    }
}
export {load,isLogin}
