import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Register from '@/pages/register'
import Home from '@/pages/home'
import Index from '@/pages/index'
import Shop from '@/pages/shop'
import Shops from '@/pages/shops'
import Orders from '@/pages/orders'
import Cart from '@/pages/cart';
import Person from '@/pages/person'
import Collect from '@/pages/collects'
import AddressList from '@/pages/address_list'
import Address from '@/pages/address'
import makeOrder from '@/pages/make_order'
import Order from '@/pages/order'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/login',
      name:'Login',
      component:Login,
      meta:{
        title:'登录',
        certify:true
      }
    },
    {
      path:'/register',
      name:'Register',
      component:Register,
      meta:{
        title:'注册',
        certify:true
      }
    },
    {
      path: '/',
      // name: 'Home',
      component: Home,
      meta: {
        title: '商城首页',
        certify:true
      },
      children:[
        {
          path:'/',
          name:'Index',
          component:Index,
          meta: {
            title: '商城首页',
            certify:true
          }
        },
        {
          path:'/orders',
          name:'Orders',
          component:Orders,
          meta: {
            title: '订单列表'
          }
        },
        {
          path:'/cart',
          name:'Cart',
          component:Cart,
          meta:{
            title:'购物车'
          }
        },
        {
          path:'/person',
          name:'Person',
          component:Person,
          meta:{
            title:'个人中心'
          }
        }
      ]
    },
    {
      path:'/shops/:sort?',
      name:'Shops',
      component:Shops,
      meta:{
        title:'分类商品',
        certify:true
      }
    },
    {
      path:"/shop/:id",
      name:'Shop',
      component:Shop,
      meta:{
        title:'商品详情',
        certify:true
      }
    },
    {
      path:"/collect",
      name:'Collect',
      component:Collect,
      meta:{
        title:'我的收藏'
      },
    },
    {
      path:'/address/list',
      name:'AddressList',
      component:AddressList,
      meta:{
        title:"我的地址"
      }
    },
    {
      path:'/address/detail/:id',
      name:'Address',
      component:Address,
      meta:{
        title:"添加地址"
      }
    },
    {
      path:'/make_order',
      name:'makeOrder',
      component:makeOrder,
      meta:{
        title:'确认订单'
      }
    },
    {
      path:'/order/:id',
      name:'Order',
      component:Order,
      meta:{
        title:"订单详情"
      }
    }
    
  ]
})
