import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/login/login.vue'
import Home from '@/pages/home/home.vue'
import Staff from '@/pages/nav1/staff.vue'
import Supplier from '@/pages/nav1/supplier.vue'
import Product from '@/pages/nav2/product.vue'
import Sproduct from '@/pages/nav2/sproduct.vue'
import Storehousecheckin from '@/pages/nav3/storehousecheckin.vue'
import Storehousecheckout from '@/pages/nav3/storehousecheckout.vue'
import Userinfoalter from '@/pages/nav4/userinfoalter.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '',
      component: Login,
     
    },
    {
      path:'/',
      name:'基础信息',
      component: Home,
      iconCls:'el-icon-menu',
      menuShow:true,
      children:[
        
        {path:'/navg1/staff',component:Staff,name:'员工信息',menuShow:true},
        {path:'/navg1/supplier',component:Supplier,name:'供应商信息',menuShow:true}
      
      ]
    },
    {
      path:'/',
      name:'商品管理',
      component:Home,
      iconCls:'el-icon-tickets',
      menuShow:true,
       //leaf:true,
      children:[
        {path:'/navg2/product',component: Product,name:'上架商品管理',menuShow:true},
        {path:'/navg2/sproduct',component: Sproduct,name:'供应商商品管理',menuShow:true}
      ]
    },
    {
      path:'/',
      name:'库存管理',
      component:Home,
      iconCls:'el-icon-document',
      menuShow:true,
      //leaf:true,
      children:[
        {path:'/navg3/storehousecheckin',component:Storehousecheckin,name:'入库登记',menuShow:true},
        {path:'/navg3/storehousecheckout',component:Storehousecheckout,name:'入库订单查询',menuShow:true}
      ]
    },
    {
      path:'/',
      name:'系统管理',
      component:Home,  
      iconCls:'el-icon-loading',
      menuShow:true,
      children:[
        {path:'/navg4/userinfoalter',component:Userinfoalter,name:'员工管理',menuShow:true}
      ]
    }
  ]
})
