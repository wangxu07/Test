<template>
  <el-row>
    <el-col :span="24" v-loading="loading" element-loading-text="正在加载中" element-loading-spinner="el-icon-loading">
        <el-col :span="24" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
              <el-form-item>
                <el-input placeholder="供应商名称" prefix-icon="el-icon-search" style="min-width:240px" v-model="filters.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSearch">查询</el-button>
              </el-form-item>
              <el-form-item>
               <el-button type="primary" @click="handleAdd">新增</el-button>
              </el-form-item>
            </el-form>
        </el-col>
        <el-table :data="sproducts" highlight-current-row v-loading="loading" style="width:100%">
          <el-table-column type="index" width="60">
          </el-table-column>
          <el-table-column label="商品名称" prop="SulProductName" width="220" sortable>
          </el-table-column>
          <el-table-column label="供应商ID" prop="Supplierid" width="120" sortable>
          </el-table-column>
          <el-table-column label="备注" prop="Remarks" min-width="240" sortable>
          </el-table-column>
          <el-table-column label="操作" width="150">
              <template slot-scope="scope">
               <el-button size="small" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
               <el-button type="danger" @click="delProduct(scope.$index,scope.row)" size="small">删除</el-button>
              </template>
           </el-table-column>
          
        </el-table>
    </el-col>
<el-dialog title="供应商商品信息修改" :visible.sync="editFormVisible" :close-on-click-modal="false">
     <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">

          <el-form-item label="商品名称" prop="SulProductName">
                 <el-input v-model="editForm.SulProductName" auto-complete="off"></el-input>
             </el-form-item>
             <el-form-item label="供应商ID" prop="Supplierid">
                 <el-input v-model="editForm.Supplierid" auto-complete="off"></el-input>
             </el-form-item>
             <el-form-item label="备注" prop="Remarks">
               <el-input type="textarea" v-model="editForm.Remarks"></el-input>
             </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit">提交</el-button>
        </div>
</el-dialog>
<el-dialog title="添加供应商商品" :visible.sync ="addFormVisible" :close-on-click-modal="false">
         <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
             <el-form-item label="商品名称" prop="SulProductName">
                 <el-input v-model="addForm.SulProductName" auto-complete="off"></el-input>
             </el-form-item>
             <el-form-item label="供应商ID" prop="Supplierid">
                 <el-input v-model="addForm.Supplierid" auto-complete="off"></el-input>
             </el-form-item>
             <el-form-item label="备注" prop="Remarks">
               <el-input type="textarea" v-model="addForm.Remarks"></el-input>
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
import {ApiGetSulProducts,ApiPostAddSulProduct,ApiGetSulProductsByName,ApiPutSulProduct,ApiDeleteSulProduct} from '../../api/api_sproduct';
export default {
  data(){
     return{
       filters:{
         name:''
       },
       loading:false,
       addLoading:false,
       sproducts:[],
       editFormVisible:false,
       editForm:{
         SulProductID:'',
         SulProductName:'',
         Remarks:'',
         Supplierid:''
       },
       editFormRules:{
         SulProductName:[{required:true,message:'请输入商品名称!',trigger:'blur'}],
         Supplierid:[{required:true,message:'请输入供应商ID!',trigger:'blur'}]
       },
       addFormVisible:false,
         
       addFormRules:{
         SulProductName:[{required:true,message:'请输入商品名称!',trigger:'blur'}],
         Supplierid:[{required:true,message:'请输入供应商ID!',trigger:'blur'}]
       },
       addForm:{
         SulProductID:'',
         SulProductName:'',
         Remarks:'',
         Supplierid:''
       }


     }
  },
  methods:{
       handleSearch:function(){
                let para={name:this.filters.name};
                this.loading=true;
                if(this.filters.name==""){
                      
                       ApiGetSulProducts().then((res)=>{
                           this.loading=false;
                           this.sproducts=res.data;
                        }).catch(error =>{
                           this.loading=false;
                           if(error.response){
                           console.log(error.response);
                            }
                           })
                }
                else
                {
                      ApiGetSulProductsByName(para).then((res) =>{
                            
                           // console.log(res);
                            if(res.data=="false")
                            {          
                                 this.loading=false;                      
                                 this.$message.error("该供应商不存在!");
                                 this.sproducts=[];
                                 
                            }
                            else
                            {
                              //console.log(res.data);
                              this.sproducts=res.data;
                              this.loading=false;
                            }
                       })
                }

               
       },
       handleAdd:function(){
          this.addFormVisible=true;
       },
       addSubmit:function(){
          this.$confirm('确认提交吗？','提示',{}).then(()=>{
            this.$refs.addForm.validate((valid)=>{
              if(valid){
                this.addLoading=true;
                let para={
                  SulProductName:this.addForm.SulProductName,
                  Remarks:this.addForm.Remarks,
                  Supplierid:this.addForm.Supplierid
                };
                ApiPostAddSulProduct(para).then((data)=>{
                  this.addLoading=false;
                  if(data=="OK")
                  {
                       this.$message.success("成功添加商品!");
                       this.$refs['addForm'].resetFields();
                       this.addFormVisible=false;

                        setTimeout(function(){
                                  this.loading=true;
                                  ApiGetSulProducts().then((res) =>{
                                     this.loading=false;
                                     this.sproducts=res.data;
                                   })
                                 }.bind(this),1000)
                  }
                  else if(data=="false"||data=="error")
                  {
                        this.$message.error("添加商品失败!");
                        this.addFormVisible=false;
                  }
                  else{
                         this.$message.error("其他异常!");
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
       editSubmit:function(){
           this.$confirm("确认提交吗？","提示",{}).then(()=>{
             this.$refs.editForm.validate((valid)=>{
               if(valid)
               {
                 this.loading=true;
                 let para={
                   SulProductID:this.editForm.SulProductID,
                   SulProductName:this.editForm.SulProductName,
                   Supplierid:this.editForm.Supplierid,
                   Remarks:this.editForm.Remarks
                 };
                ApiPutSulProduct(para).then((data)=>{
                    this.loading=false;
                    if(data=="OK")
                    {
                          //console.log(1);
                          this.$message.success({showClose:true,message: "商品信息修改成功!",duration:2000});
                          this.editFormVisible = false;
                          this.loading=true;
                          ApiGetSulProducts().then((res)=>{
                              this.loading=false;
                              this.sproducts=res.data;
                           })
                    }
                    else{
                      this.$message.error({showClose:true,message: '商品信息修改失败!',duration:2000});
                              this.editFormVisible = false;
                    }
                })
               }
             })
           })
       },
       delProduct:function(index,row){
              this.$confirm("确认删除吗？","提示",{type: 'warning'}).then(()=>{
                this.loading=true;
                 let para={SulProductID:row.SulProductID};
                 ApiDeleteSulProduct(para).then((res)=>{
                   this.loading=false;
                   //console.log(res);
                   if(res.data=="OK")
                   {
                        this.$message.success({showClose:true,message: '删除成功!',duration:1500});
                         this.loading=true;
                         ApiGetSulProducts().then((res)=>{
                            this.loading=false;
                            this.sproducts=res.data;
                           })
                   }
                   else if(res.data=="false")
                   {
                          this.$message.error({showClose:true,message: '删除失败!',duration:1500});
                   }
                   else{
                     this.$message.warning({showClose:true,message: '删除异常!',duration:1500});
                   }
                   
                 })
              })
       }
  },
  mounted(){
    this.loading=true;
    ApiGetSulProducts().then((res)=>{
      this.loading=false;
      this.sproducts=res.data;
      //console.log(1);
      //console.log(res.data.Supplier);
    }).catch(error =>{
      this.loading=false;
      //console.log(1);
      if(error.response){
        console.log(error.response);
      }
    })
  }
}
</script>

<style>

</style>


