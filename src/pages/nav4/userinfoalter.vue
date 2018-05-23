<template>
<el-row class="wrap">
    <el-col :span="24" class="warp-main" :loading="loading" element-loading-text="拼命加载中" element-loading-background="rgba(0, 0, 0, 0.8)">
       <el-col :span="24" class="toolbar">
       <el-form :inline="true" :model="filters">
           <el-form-item>
                <el-input v-model="filters.name" placeholder="姓名" prefix-icon="el-icon-search" @keyup.enter.native="handleSearch"></el-input>
           </el-form-item>
           <el-form-item>
               <el-button type="primary" @click="handleSearch">查询</el-button>
           </el-form-item>
           <el-form-item>
               <el-button type="primary" @click="handleAdd">新增</el-button>
           </el-form-item>
       </el-form>
    </el-col>
    <el-col :span="24">
        <el-table :data="userinfo"  @selection-change="selsChange" style="width:100%;" :highlight-current-row="true" >
           <el-table-column type="selection" width="55"></el-table-column>
           <el-table-column type="index" width="60"></el-table-column>
        <el-table-column type="expand">
           <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                 <el-form-item label="姓名">
                    <span>{{ props.row.StaffName }}</span>              
                 </el-form-item>
                 <el-form-item label="年龄">
                    <span>{{ props.row.StaffAge }}</span>
                 </el-form-item>
                  <el-form-item label="入职日期">
                    <span>{{ props.row.CheckInTime }}</span>
                 </el-form-item>
                 <el-form-item label="地址">
                    <span>{{ props.row.StaffAddress }}</span>
                 </el-form-item>
               </el-form>
           </template>
           </el-table-column>
           <el-table-column prop="StaffName" label="姓名" sortable min-width="90" ></el-table-column>
           <el-table-column prop="StaffAddress" label="地址" sortable min-width="120"></el-table-column>
           <el-table-column prop="StaffSex" label="性别" width="80" :formatter="formatSex" sortable="true">
           </el-table-column>  
           <el-table-column prop="StaffEmail" label="邮箱" min-width="140" sortable="true">
           </el-table-column>
           <el-table-column prop="Salary" label="薪水" min-width="80" sortable="true">
           </el-table-column>
           <el-table-column prop="Level" label="级别" min-width="80" sortable="true" :formatter="formatLevel"> 
           </el-table-column>
           <el-table-column label="操作" width="150">
              <template slot-scope="scope">
               <el-button size="small" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
               <el-button type="danger" @click="delUser(scope.$index,scope.row)" size="small">删除</el-button>
              </template>
           </el-table-column>
        </el-table>
        <el-col :span="24">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="5" :total="total" style="float:right;">
			</el-pagination>
         </el-col>
    </el-col>
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">

          <el-form-item label="姓名" prop="StaffName">
              <el-input v-model="editForm.StaffName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="StaffAge">
              <el-input-number v-model="editForm.StaffAge" :min="0" :max="200"></el-input-number>
          </el-form-item>
          <el-form-item label="性别">
					<el-radio-group v-model="editForm.StaffSex">
						<el-radio class="radio" :label="0">男</el-radio>
						<el-radio class="radio" :label="1">女</el-radio>
					</el-radio-group>
           </el-form-item>
          <el-form-item label="地址" prop="StaffAddress">
              <el-input v-model="editForm.StaffAddress" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="StaffEmail">
              <el-input v-model="editForm.StaffEmail" auto-complete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="入职时间" prop="CheckInTime">
              <el-date-picker v-model="editForm.CheckInTime" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
          </el-form-item> -->
          <el-form-item label="离职时间" prop="CheckOutTime">
              <el-date-picker v-model="editForm.CheckOutTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="生日" prop="StaffBirthday">
              <el-date-picker v-model="editForm.StaffBirthday" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="薪金" prop="Salary">
              <el-input v-model="editForm.Salary" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="级别">
					<el-radio-group v-model="editForm.Level">
						<el-radio class="radio" :label="0">超级管理员</el-radio>
						<el-radio class="radio" :label="1">管理员A</el-radio>
                        <el-radio class="radio" :label="2">管理员B</el-radio>
					</el-radio-group>
           </el-form-item>
          <el-form-item label="账号" prop="StaffUserName">
              <el-input v-model="editForm.StaffUserName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="StaffPassWord">
              <el-input v-model="editForm.StaffPassWord" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit">提交</el-button>
        </div>
    </el-dialog>
    <el-dialog title="新增" :visible.sync ="addFormVisible" :close-on-click-modal="false">
         <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
             <el-form-item label="姓名" prop="StaffName">
                 <el-input v-model="addForm.StaffName" auto-complete="off"></el-input>
             </el-form-item>
             <el-form-item label="年龄" prop="StaffAge">
                 <el-input-number v-model="addForm.StaffAge" :min="0" :max="200"></el-input-number>
             </el-form-item>
             <el-form-item label="性别">
					<el-radio-group v-model="addForm.StaffSex">
						<el-radio class="radio" :label="0">男</el-radio>
						<el-radio class="radio" :label="1">女</el-radio>
					</el-radio-group>
           </el-form-item>
             <el-form-item label="地址" prop="StaffAddress">
                 <el-input v-model="addForm.StaffAddress" auto-complete="off"></el-input>
             </el-form-item>
             <el-form-item label="邮箱" prop="StaffEmail">
                 <el-input v-model="addForm.StaffEmail" auto-complete="off"></el-input>
             </el-form-item>
             <el-form-item label="入职时间" prop="CheckInTime">
                 <el-date-picker v-model="addForm.CheckInTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
                 </el-date-picker>
             </el-form-item>
             <el-form-item label="生日" prop="StaffBirthday">
                 <el-date-picker v-model="addForm.StaffBirthday" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
                 </el-date-picker>
             </el-form-item>
             <el-form-item label="薪金" prop="Salary">
                 <el-input v-model="addForm.Salary" auto-complete="off"></el-input>
             </el-form-item>
             <el-form-item label="级别">
					<el-radio-group v-model="addForm.Level">
						<el-radio class="radio" :label="0">超级管理员</el-radio>
						<el-radio class="radio" :label="1">管理员A</el-radio>
                        <el-radio class="radio" :label="2">管理员B</el-radio>
					</el-radio-group>
           </el-form-item>
             <el-form-item label="账号" prop="StaffUserName">
                 <el-input v-model="addForm.StaffUserName" auto-complete="off"></el-input>
             </el-form-item>
             <el-form-item label="密码" prop="StaffPassWord">
                 <el-input v-model="addForm.StaffPassWord" auto-complete="off"></el-input>
             </el-form-item>
         </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" v-loading="addLoading">提交</el-button>
        </div>
    </el-dialog>
    </el-col>
</el-row>
</template>
<script>
import {ApiGetStaffs,ApiGetStaffsByName,ApiAddStaff,ApiDeleteStaff,ApiPutStaff,ApiGetStaffsByPage} from '../../api/api_user';

export default {
  data (){
      return {
          filters:{
              name:''
          },
          total:0,
          page:1,
          loading:false,
          addLoading:false,
          userinfo:[],
          sels:[],//列表选中项
          //type:[],
          
          
          //编辑相关数据
          editFormVisible: false,
          editFormRules:{
              StaffName:[{required:true,message:'请输入姓名!',trigger:'blur'}],
              //CheckInTime:[{type:'date',required:true,message:'请选择入职时间!',trigger:'blur'}],
              Level:[{required:true,message:'请选择级别!',trigger:'change'}],
              StaffUserName:[{required:true,message:'请输入账号!',trigger:'blur'}],
              StaffPassWord:[{required:true,message:'请输入密码!',trigger:'blur'}],
              StaffAddress:[{required:true,message:'请输入地址!',trigger:'blur'}],
              StaffSex:[{required:true,message:'请选择性别',trigger:'change'}],
               //CheckOutTime:[{type:'date',required:false,trigger:'blur'}]
          },
          editForm:{
              StaffID:'',
              StaffName:'',
              StaffAge:'',
              StaffSex:-1,
              StaffAddress:'',
              StaffEmail:'',
              CheckInTime:'',
              CheckOutTime:'',
              StaffBirthday:'',
              Salary:'',
              Level:-1,
              StaffUserName:'',
              StaffPassWord:'',
          },
        //   editSelectValue:{
        //         SexLabel:{
        //             Slabel:'',
        //             Svalue:'',
        //         },
        //         LevelLabel:{
        //             Llabel:'',
        //             Lvalue:'',
        //         },
        //   },

          //新增相关
          addFormVisible:false,
          addFormRules:{
              StaffName:[{required:true,message:"请输入姓名",trigger:'blur'}],
              CheckInTime:[{required:true,message:'请选择入职时间!',trigger:'change'}],
              Level:[{required:true,message:'请选择级别!',trigger:'change'}],
              StaffBirthday:[{required:true,message:'请输入生日！',trigger:'blur'}],
              StaffUserName:[{required:true,message:'请输入账号!',trigger:'blur'}],
              StaffPassWord:[{required:true,message:'请输入密码!',trigger:'blur'}],
              StaffAddress:[{required:true,message:'请输入地址!',trigger:'blur'}],
              StaffSex:[{required:true,message:'请选择性别',trigger:'change'}],
             
          },
          addForm:{
              StaffID:'',
              StaffName:'',
              StaffAge:'',
              StaffSex:-1,
              StaffAddress:'',
              StaffEmail:'',
              CheckInTime:'',
              CheckOutTime:'',
              StaffBirthday:'',
              Salary:'',
              Level:-1,
              StaffUserName:'',
              StaffPassWord:'',
          },
      }
  },
  methods:{
       formatSex: function (row, column){
             return row.StaffSex ==0?'男' :row.StaffSex ==1? '女': '未知';
       },
       formatLevel:function (row,dolumn){
            return row.Level ==0?'超级管理员' :row.Level==1? '管理员A' :'管理员B';
       },
       handleCurrentChange(val){
           console.log(val);
           this.page=val;
           this.loading=true;
            let para={
                   page:this.page
               };
    ApiGetStaffsByPage(para).then((res)=>{
        //console.log(res);
        this.userinfo=res.data.userinfo;
        this.loading=false;
        this.total=res.data.TotalCount;
    })
       },
       handleSearch(){
          let para={name:this.filters.name};
          this.loading=true;
          //console.log(this.filters.name);
          if(this.filters.name=="")
          {
              
               ApiGetStaffs().then((res) =>{
                    this.userinfo=res;
                    this.loading=false;
                   })
          }
          else
          {
              ApiGetStaffsByName(para).then((res) =>{
              if(res.data.length!=0){
                  //console.log(res.data);
                   this.userinfo=res.data;
                   this.loading=false;
              }
              else{
                  this.loading=false;
                  this.userinfo=[];
                  this.$message.error("此人不存在!");
              }
          });
         }
         

       },
       handleAdd(){
                  this.addFormVisible = true;                 
       },
       addSubmit:function(){
           this.$confirm('确认提交吗?','提示',{}).then(()=>{
                this.$refs.addForm.validate((valid) =>{
                   if(valid){
                       this.addLoading=true;
                       let para={
                           StaffName:this.addForm.StaffName,
                           StaffAge:this.addForm.StaffAge,
                           StaffSex:this.addForm.StaffSex,
                           StaffAddress:this.addForm.StaffAddress,
                           StaffEmail:this.addForm.StaffEmail,
                           CheckInTime:this.addForm.CheckInTime,
                          // CheckOutTime:this.addForm.CheckOutTime,
                           StaffBirthday:this.addForm.StaffBirthday,
                           Salary:this.addForm.Salary,
                           Level:this.addForm.Level,
                           StaffUserName:this.addForm.StaffUserName,
                           StaffPassWord:this.addForm.StaffPassWord,
                       };
                       
                       ApiAddStaff(para).then((data)=>{
                           //console.log(data);
                              this.addLoading=false;
                              if(data=="OK")
                              {
                                 this.$message.success("成功新增人员!");
                                 this.$refs['addForm'].resetFields();
                                 this.addFormVisible=false;

                                 setTimeout(function(){
                                  this.loading=true;
                                  let para={
                                       page:this.page
                                   };
                                 ApiGetStaffsByPage(para).then((res)=>{
                                     //    console.log(res);
                                     this.userinfo=res.data.userinfo;
                                     this.loading=false;
                                     this.total=res.data.TotalCount;
                                     })
                                 }.bind(this),1000)
                              }
                              else if(data=="error")
                              {
                                 this.$message.error("新增人员失败!");
                                  this.addFormVisible=false;
                              }
                              else
                              {
                                 this.$message.error("其他异常!");
                                  this.addFormVisible=false;
                              }
                       }),function(error){
                           this.addLoading=false;
                           this.$message.error("请求异常!");
                            this.addFormVisible=false;
                       };
                   }
                   else{
                          console.log(this.addForm.StaffSex);
                   }
              });
           }).catch(function(){

           })

       },
       selsChange:function(sels) {
          this.sels=sels;
       },
       showEditDialog:function(index,row){
           //console.log(row.StaffSex);
             this.editFormVisible = true;
           
             this.editForm =Object.assign({},row);
       },
       editSubmit:function(){
            //console.log(this.editForm.StaffID);
            this.$confirm('确认提交吗?','提示',{}).then(()=>{
              this.$refs.editForm.validate((valid)=>{
               if(valid)
               {
                   this.loading =true;
                   //let para=Object.assign({},this.editForm);
                   let para={
                          StaffID:this.editForm.StaffID,
                           StaffName:this.editForm.StaffName,
                           StaffAge:this.editForm.StaffAge,
                           StaffSex:this.editForm.StaffSex,
                           StaffAddress:this.editForm.StaffAddress,
                           StaffEmail:this.editForm.StaffEmail,
                           //CheckInTime:this.editForm.CheckInTime,
                           CheckOutTime:this.editForm.CheckOutTime,
                           StaffBirthday:this.editForm.StaffBirthday,
                           Salary:this.editForm.Salary,
                           Level:this.editForm.Level,
                           StaffUserName:this.editForm.StaffUserName,
                           StaffPassWord:this.editForm.StaffPassWord,
                       };
                      // console.log(this.editSelectValue.SexLabel.Svalue);
                   ApiPutStaff(para).then((data)=>{
                       this.loading=false;
                       //console.log(data);
                       
                          if(data=="OK")
                          {
                              this.$message.success({showClose:true,message: "员工信息修改成功!",duration:2000});
                              this.editFormVisible = false;
                              this.loading=true;
                             let para={
                                 page:this.page
                             };
                             ApiGetStaffsByPage(para).then((res)=>{
                                 // console.log(res);
                                  this.userinfo=res.data.userinfo;
                                  this.loading=false;
                                  this.total=res.data.TotalCount;
                            })

                          }
                          else
                          {
                              this.$message.error({showClose:true,message: '员工信息修改失败!',duration:2000});
                              this.editFormVisible = false;
                          }
                       
                   },function(err){
                       this.loading=false;
                       this.$messaage.error({showClose:true,message: err.tostring(),duration:2000});
                   }).catch(function (error){
                       this.loading=false;
                       this.$message.error({showClose:true,message:"请求异常",duration:2000});
                   });
               }
               else{
                   console.log(this.editForm.CheckInTime);
               }
           });
            }).catch(function(){

            });

       },
       delUser:function(index,row){
           //console.log(index);
           //console.log(row.StaffID);
             this.$confirm('确认删除该账号吗?','提示',{type: 'warning'}).then(()=>{
                 this.loading=true;
                 let para={StaffID:row.StaffID};
                 ApiDeleteStaff(para).then((data)=>{
                     this.loading=false;
                     //console.log(data);
                     if(data.data=="OK")
                     {
                         this.$message.success({showClose:true,message: '删除成功!',duration:1500});
                         this.loading=true;
                        let para={
                               page:this.page
                        };
                        ApiGetStaffsByPage(para).then((res)=>{
                           // console.log(res);
                              this.userinfo=res.data.userinfo;
                              this.loading=false;
                              this.total=res.data.TotalCount;
                              })
                     }
                     else if(data.data=="false")
                     {
                         this.$message.error({showClose:true,message: '删除失败!',duration:1500});
                     }
                     else
                     {
                         
                         this.$message.warning({showClose:true,message: '删除异常!',duration:1500});
                     }
                 },function (err){
                     this.loading=false;
                     this.$message.error({showClose:true,message: err.tostring(),duration:2000});
                 }).catch(function(error){
                     this.loading =false;
                     console.log(error);
                     this.$message.error({showClose:true,message: '请求异常!',duration:2000});
                 });
             }).catch(() =>{

             });
       }
  },
  mounted() {
      this.loading=true;
   
    let para={
        page:this.page
    };
    ApiGetStaffsByPage(para).then((res)=>{
        //console.log(res);
        this.userinfo=res.data.userinfo;
        this.loading=false;
        this.total=res.data.TotalCount;
    })
  }
}
</script>
<style>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

