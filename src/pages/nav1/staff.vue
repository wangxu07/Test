<template>
<el-row class="wrap">
   <el-col :span="9" class="wrap-main" v-loading="loading" element-loading-text="正在加载中" element-loading-spinner="el-icon-loading">
         <el-form :model="userForm" label-width="100px" >
               <el-form-item label="姓名" prop="StaffName">
                   <el-input v-model="userForm.StaffName" disabled></el-input>
               </el-form-item>
                <el-form-item label="年龄" prop="StaffAge">
                  <el-input-number disabled  v-model="userForm.StaffAge" :min="0" :max="200"></el-input-number>
               </el-form-item>
                <el-form-item label="性别" prop="StaffSex">
					<el-radio-group v-model="userForm.StaffSex" disabled>
						<el-radio class="radio" :label="0">男</el-radio>
						<el-radio class="radio" :label="1">女</el-radio>
					</el-radio-group>
               </el-form-item>
                 <el-form-item label="地址" prop="StaffAddress">
                   <el-input v-model="userForm.StaffAddress"></el-input>
                </el-form-item>
                 <el-form-item label="邮箱" prop="StaffEmail">
                   <el-input v-model="userForm.StaffEmail"></el-input>
                </el-form-item>
                <el-form-item label="入职时间" prop="CheckInTime">
                   <el-date-picker disabled v-model="userForm.CheckInTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
                   </el-date-picker>
                </el-form-item>
                 <el-form-item label="薪水" prop="Salary">
                   <el-input disabled v-model="userForm.Salary"></el-input>
                </el-form-item>
                <el-form-item label="生日" prop="StaffBirthday">
                   <el-date-picker disabled v-model="userForm.StaffBirthday" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
                   </el-date-picker>
                </el-form-item>

         </el-form>
   </el-col>
   <el-col :span="8">
       <el-form :model="account" label-width="100px">
         <el-form-item label="账号" prop="StaffUserName">
            <el-input v-model="account.StaffUserName" disabled></el-input>
         </el-form-item>
          <el-form-item label="密码" prop="StaffPassWord">
            <el-input v-model="account.StaffPassWord"></el-input>
         </el-form-item>
         <el-form-item size="large">
             <el-button type="primary" @click="onSubmit">立即修改</el-button>
         </el-form-item>
       </el-form>
   </el-col>
</el-row>
</template>
<script>
import { ApiGetStaffs,ApiGetStaffsByName,ApiGetStaffByID,ApiPutPeopleBypara} from '../../api/api_user';
export default {
  data(){
      return {
         //temp:'',
          loading:false,
          userForm:{
              StaffID:'',
              StaffName:'ss',
              StaffAge:'',
              StaffSex:'',
              StaffAddress:'',
              StaffEmail:'',
              CheckInTime:'',
              Salary:'',
              StaffBirthday:'',
          },
          account:{
              StaffUserName:'',
              StaffPassWord:''
          },
          user:[]
      }
  },
  methods:{
      formatSex: function (row, column){
             return row.StaffSex ==0?'男' :row.StaffSex ==1? '女': '未知';
      },
    //   formatInTime:function(row,column){
    //       return row.CheckInTime.
    //   },
    onSubmit(){
        //console.log(this.$store.state.StaffID);
        let para={
            StaffID:this.userForm.StaffID,
            StaffAddress:this.userForm.StaffAddress,
            StaffEmail:this.userForm.StaffEmail,
            StaffPassWord:this.account.StaffPassWord
        };
        ApiPutPeopleBypara(para).then((res)=>{
            if(res=="OK")
            {
                 this.$message.success("成功修改信息!");
            }
            else{
                  this.$message.error("修改信息失败!");
            }
        })
    }
      
  },
  computed:{
    //  temp:function(){
    //      return this.$store.state.StaffID;
    //  }
  },
  mounted(){
     
     let para={
         StaffID:this.$store.state.StaffID
     };
    //  console.log(para.StaffID);
     ApiGetStaffByID(para).then((res)=>{
                if(res.data!=null)
                {
                   this.userForm=res.data;
                   this.account.StaffUserName=res.data.StaffUserName;
                    this.account.StaffPassWord=res.data.StaffPassWord;
                }
             
             //console.log(res);
     })

     
  }
}
</script>
<style>

</style>

