// ----- 存放所有逻辑的代码 -----
import axios from '../utils/axios.config'
import URL from '../constant/url'

// -- 登录 -------------------------------------
// login 登录获取接口 login()
export function LoginByMobile (data) {
  return axios({
    method: 'post',
    url: URL.APP_LOGIN,
    data
  })
}
// -- 账户列表 ---------------------------------
// account 账户列表 saveUserInfo () 保存数据
export function SaveUserInfo (data) {
  return axios({
    method: 'patch',
    url: URL.APP_ACCOUNT_SAVEUSERINFO,
    data
  })
}
// account 账户列表 uploadImg (params) 上传图片
// export function UploadImg (data) {
//   return axios({
//     method: 'patch',
//     url: URL.APP_ACCOUNT_UPLOADIMG,
//     data
//   })
// }
