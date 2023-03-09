async function load(id){

        let topbarText = await fetch("/完整项目/web/components/topbar/index.html").then(res=>res.text())
        // console.log(topbarText);
        document.querySelector("header").innerHTML = topbarText
        if(id){
                document.querySelector(`#${id}`).style.color = "blue"
        }
}
export {load}
