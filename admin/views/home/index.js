import { load,isLogin } from "/完整项目/admin/util/LoadView.js";
load("sidemenu-home")
// 解析传来的token数据
let user =JSON.parse(isLogin()) 
// 创建数组
let categorylist = ["最新动态","典型案例","通知公告"]
document.querySelector(".mains").innerHTML = 
`
<div>
  <img src="${user.photo}" style="width:80px"/>
  <div>
  ${user.username}
  <pre>${user.produce || "这个人很懒"}</pre>
  </div>
</div>
`

      async function anyalist(){
        let res = await fetch("http://localhost:3000/news?author="+user.username).then(res=>res.json())
        let obj = _.groupBy(res,item=>item.category)
        let arr = []
        for(let i in obj){
          arr.push({
            value:obj[i].length,
            name:categorylist[i]
            // value:category
          })
        }
        // console.log(arr);
        console.log(obj[0]);
        render(arr)
      }
      anyalist()
      function render(data){
        let myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
       var option = {
          title: {
            text: '当前用户发布的新闻',
            subtext: '不同比例占比',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '类别',
              type: 'pie',
              radius: '50%',
              data:data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
  
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
  
      }