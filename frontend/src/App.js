import react ,{useEffect,useState} from 'react'
import './App.css';
import axios from 'axios';
import * as dd from 'dingtalk-jsapi';

//内网穿透工具介绍:
// https://developers.dingtalk.com/document/resourcedownload/http-intranet-penetration?pnamespace=app
// 替换成后端服务域名
const domain = "https://epmet-test.elinkservice.cn/api";
//const domain = "http://localhost:8999/dingding";
function App() {
  const [userInfo,setUserInfo,token] = useState({name:'',avatar:"",extension:''})
  useEffect(()=>{
    dd.ready(function () {
        alert('ready')
        let corpId = 'dingd1e19e397c754c7735c2f4657eb6378f';
        //alert('corpId'+corpId)
        // dd.ready参数为回调函数，在 环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
        dd.runtime.permission.requestAuthCode({

            corpId: corpId, //三方企业ID
            onSuccess: function(result) {
                axios.post(domain + "/auth/thirdlogin/govlogin-internalding", {'authCode':result.code,'miniAppId':'5000000003100489'})
                    .then(response => {
                        //alert("token:"+JSON.stringify(response))
                        //setUserInfo(response?.data?.data)
                        dd.biz.util.openLink({
                            url:"https://epmet-test.elinkservice.cn/epmet-oper-gov/#/?token="+response.data.data.token,//要打开链接的地址
                            onSuccess : function(result) {
                                window.close();
                            },
                            onFail : function(err) {}
                        })


                        // console.log(response)
                    })
                    .catch(error => {
                        alert('登录失败，请稍后重试！')
                        // console.log(error.message)
                    })

            },
            onFail : function(err) {
                alert('登录失败：'+JSON.stringify(err))
            }
        });


     /* fetch(domain + '/config')
        .then(res => res.json())
        .then((result) => {
          alert(JSON.stringify(result));
         console.log('dd', dd);
          corpId = result.data.corpId;

        });*/
    });
  },[])

return <div className="App">
  <img src={userInfo.avatar||'https://img.alicdn.com/imgextra/i3/O1CN01Mpftes1gwqxuL0ZQE_!!6000000004207-2-tps-240-240.png'} className="avatar"/>
  <p>测试123123123员工:{userInfo.name} 登陆成功</p>
</div>
}



export default App;
