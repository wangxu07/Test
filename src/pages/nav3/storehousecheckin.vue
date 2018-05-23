<template>
<el-row class="wrap">
  <el-col :span="24">
    <el-transfer
    v-model="value3"
      filterable
       :titles="['供应商商品','入库商品']"
       :data="data">
       <el-button class="transfer-footer" slot="left-footer" size="small">商品操作</el-button>
        <el-button class="transfer-footer" slot="right-footer" size="small" @click="tableData">入库操作</el-button>
       </el-transfer>
  </el-col>

  <el-col :span="24">
      <el-table style="width: 100%" :data="arr" highlight-current-row>
          
          <el-table-column label="商品名称" width="180" sortable prop="name">   
          </el-table-column>
          <el-table-column label="商品数量" width="180" sortable prop="count">
          </el-table-column>
          <el-table-column label="商品进货价格￥" width="180" sortable prop="price">
          </el-table-column>     
          <el-table-column label="操作" min-width="200">
             <template slot-scope="scope">
               <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
               <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
           </template>
          </el-table-column>
      </el-table>
  </el-col>
      <el-dialog titile="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
           <el-form :model="editForm" label-width="80px" ref="editForm">
               <el-form-item label="商品名称" prop="name">
                   
                  <el-input v-model="editForm.name" auto-complete="off" size="small" disabled></el-input>
                   
               </el-form-item>
              <el-form-item label="商品数量" prop="count">
                 <el-input-number v-model="editForm.count" :min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="商品进价" prop="price">
                 <el-input-number v-model="editForm.price" :min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="进货日期" prop="datetime">
                 <el-date-picker v-model="editForm.datetime" type="datetime" placeholder="选择日期时间" suffix-icon="el-icon-date" value-format="yyyy-MM-dd HH:mm:ss">
                 </el-date-picker>
              </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
              <el-button @click.native="editFormVisible=false">取消</el-button>
              <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
           </div>
      </el-dialog>
</el-row>

</template>
<script>
import {ApiNewGetSulProduct} from '../../api/api_sproduct';
import {ApiAddPurchase} from '../../api/api_purchase';
import {ApiPutOrPostStock} from '../../api/api_stock';
export default {
  data() {
  
      return {
          data: [],
          value3:[],
          arr:[],
          j:0,
        
          temp:-1,
          editFormVisible: false,
          editLoading: false,
          
          editForm: {
              name:'',
              count:'',
              price:'',
              datetime:''
          }
      }

  },
  methods:{
     
      tableData:function(){
          
          if(this.j==0){
               for (let i=0;i<this.value3.length;i++)
              {
                                                
                         this.arr.push({
                              name:this.data[this.value3[i].toString()-1].label,
                              count:'',
                              price:'',
                              datetime:''
                        });                 
                 }
                 (this.j)++;               
          }
          else{
              this.arr=[];        
             for (let i=0;i<this.value3.length;i++)
                {                                    
                    
                         this.arr.push({
                              name:this.data[this.value3[i].toString()-1].label,
                              count:'',
                              price:'',
                              datetime:''
                        });             
                 }
          }
        
      },
      handleEdit(index,row) {
           //console.log(index,row);
           this.temp=index;
          this.editFormVisible =true;
    
               
          this.editForm = Object.assign({},row);
               
      },
      handleDelete(index,row) {
         //console.log(index,row);
         this.arr.splice(index,1);
        // console.log(index,row);
      },

      editSubmit: function () {
          
          this.arr[this.temp].count=this.editForm.count;

          this.arr[this.temp].price=this.editForm.price;
          this.arr[this.temp].datetime= this.editForm.datetime;
          
         // console.log(this.editForm.datetime.toString("yyyy-MM-dd"));
          let para={
              InProductName:this.arr[this.temp].name.split("--")[0],
              InCount:this.arr[this.temp].count,
              InPrice:this.arr[this.temp].price,
              InDate:this.arr[this.temp].datetime,
              SupplierName:this.arr[this.temp].name.split("--")[1]
              };
              let para1={
                  ProductName:this.arr[this.temp].name.split("--")[0],
                  Count:this.arr[this.temp].count,
                  IsSelling:'',
                  Date:this.arr[this.temp].datetime,
                  SupplierName:this.arr[this.temp].name.split("--")[1]
              };
              ApiAddPurchase(para).then((data)=>{
                  
                  ApiPutOrPostStock(para1).then((res)=>{
                     
                      if(res=="OK")
                      {
                          //console.log(1);;
                          ;
                      }
                      else
                      {
                          //console.log(2);
                          ;
                      }
                  })
                  this.$message.success("订单提交成功！");
                   this.editFormVisible=false;
              })
          
         
      }
  },
  mounted(){   

     
            ApiNewGetSulProduct().then((res) =>{
               
                for(let i=1;i<=res.length;i++)
                {
                    this.data.push({
                         key:i,
                         label:`${res[i-1].SulProductName}--${res[i-1].SupplierName}`
                    });
                }
            })
  }
  
}
</script>
<style>

</style>

