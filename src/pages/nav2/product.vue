<template>
  <el-row>
      <el-col :span="24" v-loading="loading" element-loading-text="正在加载" element-loading-spinner="el-icon-loading">
           <el-col :span="24">
               <el-form :inline="true" :model="filters">
                   <el-form-item>
                      <el-input placeholder="商品名称" style="min-width: 240px;" v-model="filters.name"></el-input>
                   </el-form-item>
                   <el-form-item>
                      <el-button type="primary" @click="handleSearch">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-table highlight-current-row style="width:100%" v-loading="loading" :data="sells">
             <el-table-column type="index" width="60">
             </el-table-column>
             <el-table-column prop="ProductName" width="150" sortable="true" label="商品名称">
             </el-table-column>
             <el-table-column prop="Count" width="180" sortable="true" label="商品库存数量">
             </el-table-column>
             <el-table-column prop="OutCount" min-width="180" sortable="true" label="商品上架数量">
             </el-table-column>
             <el-table-column prop="OutPrice" min-width="180" sortable="true" label="商品销售价格">
             </el-table-column>
             <el-table-column prop="OutDate" min-width="180" sortable="true" label="商品上架日期">
             </el-table-column>
             <el-table-column label="操作" width="150">
              <template slot-scope="scope">
               <el-button size="small" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
               <!-- <el-switch @click="delUser(scope.$index,scope.row)"></el-switch> -->
               <!-- <el-button type="danger" @click="delUser(scope.$index,scope.row)" size="small">上架</el-button> -->
              </template>
           </el-table-column>
         </el-table>
      </el-col>
      <el-dialog title="上架商品信息修改" :visible.sync="editFormVisible" :close-on-click-modal="false">
     <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">

          <el-form-item label="商品名称" prop="ProductName" label-width="110px" >
                 <el-input v-model="editForm.ProductName" auto-complete="off" :disabled="true"></el-input>
             </el-form-item>
              <el-form-item label="库存数量" prop="Count" label-width="110px" >
                  <el-input-number v-model="editForm.Count" :min="0" :disabled="true"></el-input-number>
             </el-form-item>
             <el-form-item label="是否上架" label-width="110px" prop="IsSelling">
                  <el-switch v-model="editForm.IsSelling"></el-switch>
              </el-form-item>
              <el-form-item label="上架数量" prop="OutCount" label-width="110px" v-show="editForm.IsSelling">
                 <el-input-number v-model="editForm.OutCount" :min="0" :max="editForm.Count"></el-input-number>
             </el-form-item>
              <el-form-item label="销售价格" prop="OutPrice" label-width="110px" v-show="editForm.IsSelling">
                 <el-input-number v-model="editForm.OutPrice" :min="0"></el-input-number>
             </el-form-item>
              
              <el-form-item label="上架日期" prop="OutDate" label-width="110px" v-show="editForm.IsSelling">
                 <el-date-picker v-model="editForm.OutDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
                 </el-date-picker>
             </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit">提交</el-button>
        </div>
</el-dialog>  
  </el-row>
</template>
<script>
import {ApiGetStock,ApiPutStocksell,ApiPutOnSell,ApiGetStockByName} from '../../api/api_stock';

export default {
     data(){
         return{
             filters:{
                 name:''
             },
             
             loading:false,
             sells:[],
             editFormVisible:false,
             editForm:{
                ProductName:'',
                Count:'',
                OutCount:'',
                OutPrice:'',
                OutDate:'',
                IsSelling:'',
                Supplierid:''
             },

             editFormRules:{

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
                    ApiGetStock().then((res)=>{
                          this.loading=false;        
                          for(let i =0;i<res.length;i++)
                        {
                              if(res[i].IsSelling==1)
                              {
                                     res[i].IsSelling=true;
                              }
                               else{
                                  res[i].IsSelling=false;
                            }         
                        }       
                           this.sells=res;         
                      })
               }
               else{
                   
                  ApiGetStockByName(para).then((res)=>{
                      //console.log(res.data.length);
                      this.loading=false;
                      if(res.data.length!=0)
                      {
                            for(let i =0;i<res.data.length;i++)
                                  {
                                       if(res.data[i].IsSelling==1)
                                      {
                                        res.data[i].IsSelling=true;
                                      }
                                      else{
                                         res.data[i].IsSelling=false;
                                      }         
                                  }     
                         this.sells=res.data;
                      }
                      else
                      {
                          this.$message.error("不存在!");
                      }
                  })
               }

               
          },

          showEditDialog:function(index,row){
              
                  this.editFormVisible=true;

                  this.editForm =Object.assign({},row);
          },
          editSubmit(){
            // console.log(this.editForm.IsSelling);
            this.loading=true;
            if(this.editForm.IsSelling)
            {
                let para={
                    ProductName:this.editForm.ProductName,
                    OutCount:this.editForm.OutCount,
                    OutPrice:this.editForm.OutPrice,
                    OutDate:this.editForm.OutDate,
                    IsSelling:1,
                    Supplierid:this.editForm.Supplierid
                };
              ApiPutStocksell(para).then((res)=>{
                  this.loading=false;
                  if(res=="OK")
                  {
                      this.$message.success({showClose:true,message: "信息修改成功!",duration:2000});
                                   this.editFormVisible = false;

                                   this.loading=true;
                                 ApiGetStock().then((res)=>{
                                      this.loading=false;        
                                   for(let i =0;i<res.length;i++)
                                  {
                                       if(res[i].IsSelling==1)
                                      {
                                        res[i].IsSelling=true;
                                      }
                                      else{
                                         res[i].IsSelling=false;
                                      }         
                                  }     
                                       this.sells=res;         
                                  })
                  }
                  else
                  {
                      this.$message.error({showClose:true,message: '信息修改失败!',duration:2000});
                                   this.editFormVisible = false;
                  }
              })
            }
            else
            {
                let para={
                    ProductName:this.editForm.ProductName,
                    IsSelling:0,
                    Supplierid:this.editForm.Supplierid
                };
                ApiPutOnSell(para).then((res)=>{
                    this.loading=false;
                    if(res=="OK")
                    {
                          this.$message.success({showClose:true,message: "信息修改成功!",duration:2000});
                                   this.editFormVisible = false;

                                   this.loading=true;
                                 ApiGetStock().then((res)=>{
                                      this.loading=false;        
                                   for(let i =0;i<res.length;i++)
                                  {
                                       if(res[i].IsSelling==1)
                                      {
                                        res[i].IsSelling=true;
                                      }
                                      else{
                                         res[i].IsSelling=false;
                                      }         
                                  }           
                                       this.sells=res;         
                                  })
                    }
                    else
                    {
                            this.$message.error({showClose:true,message: '信息修改失败!',duration:2000});
                                   this.editFormVisible = false;
                    }
                })
                //   ApiPutSellStock(para).then((res)=>{

                //   })
            }
          }
        
     },
     mounted(){
         this.loading=true;
        ApiGetStock().then((res)=>{
            this.loading=false;   
            for(let i =0;i<res.length;i++)
            {
                   if(res[i].IsSelling==1)
                 {
                     res[i].IsSelling=true;
                 }
                 else{
                     res[i].IsSelling=false;
                 }         
            }     
           
            this.sells=res;         
        })
     }
}
</script>
<style>

</style>

