const loginform = document.querySelector("#loginform")
const username = document.querySelector("#username")
const password = document.querySelector("#password")
const emailHelp = document.querySelector("#emailHelp")

/* 为表单添加提交事件 */
loginform.onsubmit = async  function (evt) {
    // 设置提示信息为none
    emailHelp.style.display = "none"
    // 清楚表单默认行为
    evt.preventDefault()
    // 这里是登录验证
    let res = await fetch(`http://localhost:3000/users?username=${username.value}&password=${password.value}`)
    .then(res=>res.json())
    // 如果请求的结果数组长度大于零则添加token然后跳转页面
    if(res.length>0){
        localStorage.setItem("token",JSON.stringify({
            ...res[0],
            password:"***"
        }))
        location.href="/完整项目/admin/views/home/index.html"
    }else{
        // 否则弹出提示信息
        emailHelp.style.display = "block"
    }
}
