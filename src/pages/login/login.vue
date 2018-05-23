<template>
<el-form ref="AccountForm" :model="account" :rules="rules" label-position="left" label-width="0px" class="demo-ruleForm login-container" >
    <h3 class="title">系统登录</h3>
    <el-form-item prop="username">
        <el-input v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd" >
        <el-input v-model="account.pwd" type="password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%">
        <el-button type="primary" @click.native.prevent="handleLogin" style="width:100%" :loading="loading" >登录</el-button>
    </el-form-item>
</el-form>
  
</template>
<script >
import {setCookie,getCookie} from '../../assets/js/cookie.js'
import { ApiLogin } from '../../api/api_user';

export default {
     mounted(){
       if(getCookie('username')){
           this.$router.push('/')
       }
   },
data(){
    return {
        // temp:'',
        loading:false,
        account:{
            username: 'Admin',
            pwd:'Admin'
        },
        rules:{
            username:[
                {required: true, message:'请输入账号',trigger:'blur'},
            ],
            pwd:[
                {required:true,message:'请输入密码',trigger:'blur'},
            ]
        },
        
    };
   },
  
   methods:{
       handleLogin(){
          // this.$router.push('/');
          this.$refs.AccountForm.validate((valid) => {
              if(valid) {
                  this.loading =true;
                  let loginParams = {username: this.account.username,pwd:this.account.pwd};
                  //console.log(this.username);
                  ApiLogin(loginParams).then(data =>{
                      this.loading =false;
                       
                      let str=new Array();
                      str=data.split(',');
                     
                      if(str[0]=="OK")
                      {
                           this.$message.success("登陆成功!");
                         
                           this.$store.commit('ADD_STAFFID',str[3]);
                          if(str[2]!=0)
                          {
                              //console.log(111);
                              this.$router.options.routes[4].menuShow=false;
                              setCookie('username',str[1]+","+str[2],1000*60);
                               
                                this.$router.push({path: '/navg2/product'});
                             
                          }
                          else{
                                 //   string a =str[1]+str[2];
                                 if(this.$router.options.routes[4].menuShow==false)
                                 {
                                    this.$router.options.routes[4].menuShow=true;
                                 }
                          setCookie('username',str[1]+","+str[2],1000*60);
                          
                             this.$router.push({path: '/navg2/product'});
                          
                          }
                       
                         
                      }
                      else if(str[0]=="False"){
                          this.$message.error("账号或密码错误!请重新输入!");
                      }else{
                          console.log('error submit!');
                          return false;
                      }                                        
                  }),function(err){
                       this.loading=false;
                  };
              }
          })
       },
     
   },
//    computed:{

//    }
}
</script>
<style scoped>

.login-container {
 -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    background: -ms-linear-gradient(top, #ace, #00C1DE); /* IE 10 */
    background: -moz-linear-gradient(top, #ace, #00C1DE); /*火狐*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE)); /*谷歌*/
    background: -webkit-linear-gradient(top, #ace, #00C1DE); /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top,#ace, #00C1DE); /*Opera 11.10+*/
}
.title{
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
}

</style>


