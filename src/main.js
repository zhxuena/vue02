// 入口文件
import Vue from 'vue'

//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import Vuex from 'vuex'
Vue.use(Vuex)

var car=JSON.parse(localStorage.getItem('car') || '[]')
var store=new Vuex.Store({
  state: {
    car:car
  },
  mutations: {
    addToCar(state,goodsinfo) {

      var flags=false
      state.car.some(item => {
        if(item.id==goodsinfo.id) {
          item.count +=parseInt(goodsinfo.count)
          flags=true
          return true
        }
      })
      if(!flags) {
        state.car.push(goodsinfo)
      }

      localStorage.setItem('car',JSON.stringify(state.car))

    },

    updateGoodsTnfo(state,goodsinfo) {
      state.car.some(item => {
        if(item.id ==goodsinfo.id) {
          item.count=parseInt(goodsinfo.count)
          return true
        }
      })

      localStorage.setItem('car',JSON.stringify(state.car))
    },

    removecar(state,id) {
      state.car.some((item,i)=>{
        if(item.id==id){
          state.car.splice(i,1)
          return true
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters: {
    getAllCount(state) {
      var c=0;
      state.car.forEach(item => {
        c+=item.count
      })
      return c
    },
    getGoodsCount(state) {
      var o={}
      state.car.forEach(item => {
        o[item.id]=item.count
      })
      return o
    }
  }
})

// 导入router.js
import router from './router.js'

// 导入MUI
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root="http://www.liulongbin.top:3005"

Vue.http.options.emulateJSON=true

// 按需导入mint-ui
// import {Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

// 全局导入
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 全局过滤器 -时间
import moment from 'moment'
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
  })




  // 图片缩略图
  import VuePreview from 'vue-preview'
  Vue.use(VuePreview)
  Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: {top: 0, bottom: 0},
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
  })

  
import a from './App.vue'
new Vue({
    el:'#app',
    render: c => c(a),
    router,
    store
})
