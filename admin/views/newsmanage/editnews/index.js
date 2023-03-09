import { load,isLogin } from "/完整项目/admin/util/LoadView.js";
load("sidemenu-newslist")
let id = new URL(location.href).searchParams.get("id");
const { createEditor, createToolbar } = window.wangEditor
let content = ""
let cover = ""
const editorConfig = {
    placeholder: 'Type here...',
    onChange(editor) {
      const html = editor.getHtml()
      content = html
      // 也可以同步到 <textarea>
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})
const toolbarConfig = {}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})

let title = document.querySelector("#title")
let category = document.querySelector("#category")
let titleimg = document.querySelector("#titleimg")

editnewsform.onsubmit = async function(evt){
    evt.preventDefault()
    await fetch(`http://localhost:3000/news/${id}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            title:title.value,
            content,
            category:category.value,
            cover,
            author:JSON.parse(isLogin()).username
        })
    }).then(res =>res.json())
    location.href = "/完整项目/admin/views/newsmanage/newslist/index.html"
}
titleimg.onchange = function(evt){
    console.log(evt.target.files[0]);
    let reader = new FileReader()
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = (e) =>{
        cover = e.target.result
    }
}

async function reader(){
    let {title,category,content:mycontent,cover:mycover} = 
    await fetch(`http://localhost:3000/news/${id}`).then(res =>res.json())
    document.querySelector("#title").value = title
    document.querySelector("#category").value = category
    editor.setHtml(mycontent)
    content = mycontent
    cover = mycover
}
reader()
