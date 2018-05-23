<template>
<el-row class="container">
  <el-col :span="24" class="topbar-wrap">
    <div class="topbar-logo" v-show="!collapsed"> 
      <a href="/"><img src="../../assets/5.jpg" width="180px" height="50px"></a>
    </div>
    <div class="topbar-logos" v-show="collapsed">
      <a href="/"><img src="../../assets/0.jpg" width="80px" height="50px"></a>
    </div>
    <div class="topbar-title">
        <span style="font-size: 18px;color: #fff;">超市后台管理系统</span>
    </div>
    <div class="topbar-account">
       <el-dropdown trigger="click">
         <span class="el-dropdown-link userinfo-inner"><i class="el-icon-setting"></i>{{name}}<i class="el-icon-arrow-down"></i></span>
         <el-dropdown-menu slot="dropdown">
           <el-dropdown-item>
            <router-link to="/navg1/staff"> <span style="color: #555;font-size: 14px;">个人信息</span></router-link>
             </el-dropdown-item>
           <el-dropdown-item divided @click.native="handleCommand">注销登录</el-dropdown-item>
         </el-dropdown-menu>
       </el-dropdown>
    </div>
  </el-col>

  <el-col :span="24" class="main">
      <aside :class="{showSidebar:!collapsed}">
          <div @click.prevent="collapse" class="menu-toggle">
              <i class="el-icon-d-arrow-right" v-show="!collapsed"></i>
              <i class="el-icon-d-arrow-left" v-show="collapsed"></i>
          </div>
          <el-menu default-active="0" router :collapse="collapsed">
              <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
            <el-submenu v-if="!item.leaf" :index="index+''">
                <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow"
              :class="$route.path==term.path?'is-active':''">
              <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path"
            :class="$route.path==item.children[0].path?'is-active':''">
            <i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
            </template>
          </el-menu>
      </aside>

      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
  </el-col>
</el-row>
</template>
<script>
import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
export default{
    //name:'home',
       data(){
           return {
               collapsed:false,
               name:''    
           }
       },
       mounted(){
         let uname =getCookie('username')
         //console.log(uname+"1");
         this.$store.getters.isLogin;
         //console.log(this.$store.state.StaffID);
       let str = uname.split(',');
        if(str[1]!=0)
        {
              this.$router.options.routes[4].menuShow=false;
        }
         this.$router.push('/navg2/product');
         this.name=str[0];
         if(uname == ""){
           this.$router.push('/login');
         }
       },
       methods:{
           handleOpen() {

           },
           handleClose() {
             
           },
           handleCommand() {
             //console.log("aasd");
                this.$confirm('确认注销登录吗?','提示',{
                  confirmButtonClass: 'el-button--warning'
                }).then(()=>{
                     delCookie('username');
                     this.$router.push('/login'); 
                })
           },
           collapse:function(){
                this.collapsed = !this.collapsed;          
           }
           
       }
       
}
</script>
<style>
 	.container{
         position: absolute;
         top: 0px;
         bottom: 0px;
         width: 100%;

     }
     .topbar-wrap{
       height: 50px;
       line-height: 50px;
       background: #373d41;
       padding: 0px;
     }
     .topbar-logo{
       float: left;
       
     }
     .topbar-logos{
       float: left;
       
     }
      .topbar-title {
        float: left;
        text-align: left;
        width: 200px;
        padding-left: 10px;
        border-left: 1px solid #000;
      }
      .topbar-account{
        float: right;
        padding-right: 20px;
      }
      .userinfo-inner{
        
        color: #fff;
        padding-left: 10px;
      }
     .main{
         display: flex;
         position: absolute;
         top: 50px;
         bottom: 0px;
         overflow: hidden;
        
     }
     aside {
         min-width: 50px;
         background: #333744;
        
       
     }
     .showSidebar{
        overflow-x: hidden;
        overflow-y: auto;
     }
     .el-menu {
        height: 100%; /*写给不支持calc()的浏览器*/
        height: -moz-calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: calc(100% - 80px);
        border-radius: 0px;
       
        background-color: #333744;   
      }
      .el-submenu .el-menu-item {
        min-width: 60px;
       background-color: #333744;
      }
      .el-menu {
        width: 180px;
      }
      .el-menu--collapse {
        width: 80px;
      }
      .el-menu .el-menu-item, .el-submenu .el-submenu__title {
        height: 46px;
        line-height: 46px;
         color: white;
      }
      .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
        background-color: #7ed2df;
      }
      .menu-toggle {
      background: #4A5064;
      text-align: center;
      color: white;
      height: 26px;
      line-height: 30px;
    }
      .content-container {
      background: #fff;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      padding-bottom: 1px;
         }
      .content-wrapper {
         background-color: #fff; 
        box-sizing: border-box;
      }
    
</style>
