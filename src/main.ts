import Vue from 'vue'

Vue.config.productionTip = false
import Antd from 'ant-design-vue'
// index.html中引入
// import 'ant-design-vue/dist/antd.less';
Vue.use(Antd)

import moment from 'moment'
moment.locale('zh-cn')
Vue.prototype.$moment = moment

import axios from 'axios'
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})
Vue.prototype.$http = http

export default Vue