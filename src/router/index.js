import Vue from 'vue'
import VueRouter from  'vue-router'


const Home = ()=>import('../views/home/Home')
const Category = ()=>import('../views/category/Category')
const Cart = ()=>import('../views/cart/Cart')
const Profile = ()=>import('../views/profile/Profile')
const Detail =()=>import('../views/detail/Detail')

//1安装插件
Vue.use(VueRouter)

//2创建router
const routes=[
  {
    path:'',
    redirect:'/home'//redirect重定向   默认显示的页面
  },
  {
    path: '/home',  //url地址
    component:Home  //对应的组件（名称）
  },
  {
    path: '/category/:maitKey',
    component:Category
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/profile',
    component:Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
const router =new VueRouter({
  routes,
  mode:'history',
  // linkActiveClass:"active"
})

//3导出
export default router
