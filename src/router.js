import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import newslist from './components/news/NewsList.vue'
import newscontent from './components/news/newsinfo.vue'
import Photo from './components/photos/photo.vue'
import Photoinfo from './components/photos/photoinfo.vue'
import Goodlist from './components/goods/goodlist.vue'
import Goodinfo from './components/goods/goodinfo.vue'
import Gooddetail from './components/goods/goodsdetail.vue'
import Goodcomment from './components/goods/goodscomment.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },
    { path: '/home/newslist', component: newslist },
    { path: '/home/newsinfo/:id', component: newscontent },
    { path: '/home/photo',component: Photo},
    { path: '/home/photoinfo/:id',component:Photoinfo},
    { path: '/home/goodlist',component:Goodlist},
    { path: '/home/goodinfo/:id',component:Goodinfo},
    { path: '/home/goodsdetail/:id',component:Gooddetail},
    { path: '/home/goodscomment/:id',component:Goodcomment},
  ],
  linkActiveClass:'mui-active'
})

// 把路由对象暴露出去
export default router