<template>
<el-row class="wrap">
     <el-col :span="24" v-loading="loading" element-loading-text="正在加载" element-loading-spinner="el-icon-loading">
         <el-col :span="24">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input placeholder="供应商名称" style="min-width: 240px;" v-model="filters.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
               <el-button type="primary" @click="handleAdd">新增</el-button>
           </el-form-item>
            </el-form>
         </el-col>
         <el-table highlight-current-row style="width:100%" v-loading="loading" :data="suppliers">
             <el-table-column type="index" width="60">
             </el-table-column>
             <el-table-column prop="SupplierName" width="150" sortable="true" label="供应商名称">
             </el-table-column>
             <el-table-column prop="SupplierID" width="100" sortable="true" label="供应商ID">
             </el-table-column>
             <el-table-column prop="SupplierAddress" min-width="180" sortable="true" label="供应商地址">
             </el-table-column>
             <el-table-column prop="SuplierEmail" label="邮箱" sortable="true" width="240">
             </el-table-column>
             <el-table-column prop="SupplierPhone" label="联系电话" sortable="true" width="240">
             </el-table-column>
             <el-table-column label="操作" width="150">
              <template slot-scope="scope">
               <el-button size="small" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
               <el-button type="danger" @click="delUser(scope.$index,scope.row)" size="small">删除</el-button>
              </template>
           </el-table-column>
         </el-table>
     </el-col>
<el-dialog title="供应商信息修改" :visible.sync="editFormVisible" :close-on-click-modal="false">
     <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">

          <el-form-item label="供应商品名称" prop="SupplierName" label-width="110px">
                 <el-input v-model="editForm.SupplierName" auto-complete="off"></el-input>
             </el-form-item>
             <el-form-item label="供应商ID" prop="SupplierID" label-width="110px">
                 <el-input v-model="editForm.SupplierID" auto-complete="off" :disabled="true"></el-input>
             </el-form-item>
              <el-form-item label="供应商地址" prop="SupplierAddress" label-width="110px">
                 <el-input v-model="editForm.SupplierAddress" auto-complete="off"></el-input>
             </el-form-item>
              <el-form-item label="邮箱" prop="SuplierEmail" label-width="110px">
                 <el-input v-model="editForm.SuplierEmail" auto-complete="off"></el-input>
             </el-form-item>
             <el-form-item label="联系电话" prop="SupplierPhone" label-width="110px">
                 <el-input v-model="editForm.SupplierPhone" auto-complete="off"></el-input>
             </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit">提交</el-button>
        </div>
</el-dialog>
     <el-dialog title="新增供应商" :visible.sync ="addFormVisible" :close-on-click-modal="false">
         <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
             <el-form-item label="供应商名称" prop="SupplierName" label-width="120px">
                 <el-input v-model="addForm.SupplierName" auto-complete="off" ></el-input>
             </el-form-item>
             <el-form-item label="供应商地址" prop="SupplierAddress" label-width="120px">
                 <el-input v-model="addForm.SupplierAddress" auto-complete="off"></el-input>
             </el-form-item>
             <el-form-item label="邮箱" prop="SuplierEmail" label-width="120px">
                <el-input v-model="addForm.SuplierEmail" auto-complete="off"></el-input>
             </el-form-item>
             <el-form-item label="联系电话" prop="SupplierPhone" label-width="120px">
                <el-input v-model="addForm.SupplierPhone" auto-complete="off"></el-input>
             </el-form-item>
         </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" v-loading="addLoading">提交</el-button>
        </div>
    </el-dialog>
</el-row>
</template>
<script>
import {ApiGetSuppliers,ApiPostAddSupplier,ApiGetSupplierByName,ApiPutSupplier,ApiDeleteSupplier} from '../../api/api_suppliers';
export default {
      data (){
          return {
              filters:{
                  name:''
              },
              suppliers:[],
              loading:false,
              addLoading:false,
              addForm:{
                 SupplierID:'',
                 SupplierName:'',
                 SupplierAddress:'',
                 SuplierEmail:'',
                 SupplierPhone:'',
              },
              addFormVisible:false,
              addFormRules:{
                   SupplierName:[{required:true,message:'输入供应商名称!',trigger:'blur'}],
                   
              },

              editForm:{
                 SupplierID:'',
                 SupplierName:'',
                 SupplierAddress:'',
                 SuplierEmail:'',
                 SupplierPhone:'',
              },
              editFormVisible:false,
              editFormRules:{
                  SupplierName:[{required:true,message:'输入供应商名称!',trigger:'blur'}],
              }
          }
      },
      methods:{
          handleSearch(){
               let para={
                   name:this.filters.name
               };
               this.loading=true;
               if(this.filters.name=="")
               {
                   ApiGetSuppliers().then((res)=>{
                     this.suppliers=res.data;
                     this.loading=false;
                   })
               }
               else{
                   
                  ApiGetSupplierByName(para).then((res)=>{
                      //console.log(res.data.length);
                      this.loading=false;
                      if(res.data.length!=0)
                      {
                         this.suppliers=res.data;
                      }
                      else
                      {
                          this.$message.error("供应商不存在!");
                      }
                  })
               }
          },
          handleAdd(){
             this.addFormVisible=true;
          },
          addSubmit(){
               this.$confirm("确认提交吗?","提示",{}).then(()=>{
                   this.$refs.addForm.validate((valid)=>{
                       if(valid)
                       {
                           this.addLoading=true;
                           let para={
                               SupplierName:this.addForm.SupplierName,
                               SupplierAddress:this.addForm.SupplierAddress,
                               SuplierEmail:this.addForm.SuplierEmail,
                               SupplierPhone:this.addForm.SupplierPhone
                           };
                           ApiPostAddSupplier(para).then((data)=>{
                               this.addLoading=false;
                               if(data=="OK")
                               {
                                  this.$message.success("成功新增供应商!");
                                  this.$refs['addForm'].resetFields();
                                  this.addFormVisible=false;

                                  setTimeout(function(){
                                     this.loading=true;
                                     ApiGetSuppliers().then((res) =>{
                                       this.suppliers=res.data;
                                       this.loading=false;
                                     })
                                   }.bind(this),1000)
                               }
                               else
                               {
                                    this.$message.error("新增供应商失败!");
                                    this.addFormVisible=false;
                               }
                           })
                       }
                   })
               })
          },
          showEditDialog:function(index,row){
                this.editFormVisible=true;
                this.editForm =Object.assign({},row);
          },
          editSubmit(){
               
               this.$confirm("确认提交吗？","提示",{}).then(()=>{
                   this.$refs.editForm.validate((valid)=>{
                       if(valid)
                       {
                           this.loading=true;
                           let para={
                               SupplierID:this.editForm.SupplierID,
                               SupplierName:this.editForm.SupplierName,
                               SupplierAddress:this.editForm.SupplierAddress,
                               SuplierEmail:this.editForm.SuplierEmail,
                               SupplierPhone:this.editForm.SupplierPhone
                           };
                           ApiPutSupplier(para).then((data)=>{
                               this.loading=false;
                               if(data=="OK")
                               {
                                   this.$message.success({showClose:true,message: "供应商信息修改成功!",duration:2000});
                                   this.editFormVisible = false;
                                   this.loading=true;

                                   ApiGetSuppliers().then((res)=>{
                                     this.suppliers=res.data;
                                     this.loading=false;
                                     })
                               }
                               else{
                                   this.$message.error({showClose:true,message: '供应商信息修改失败!',duration:2000});
                                   this.editFormVisible = false;
                               }
                           })
                       }
                   })
               })
          },
          delUser:function(index,row){
            this.$confirm("确认删除吗？","提示",{type: 'warning'}).then(()=>{
                    this.loading=true;
                    let para={
                        SupplierID:row.SupplierID
                    };
                    ApiDeleteSupplier(para).then((res)=>{
                            this.loading=false;
                            if(res.data=="OK")
                            {
                                this.$message.success({showClose:true,message: '删除成功!',duration:1500});
                                this.loading=true;
                                 ApiGetSuppliers().then((res)=>{
                                    this.suppliers=res.data;
                                    this.loading=false;
                                  })
                            }
                            else{
                                this.$message.error({showClose:true,message: '删除失败!',duration:1500});
                            }
                    })
            })
          },

      },
      mounted(){
          this.loading=true;
          ApiGetSuppliers().then((res)=>{
              //console.log(res[0].SupplierEmail.tostring());
              //console.log(res);
               this.suppliers=res.data;
               this.loading=false;
          })
      }
}
</script>
<style>

</style>

