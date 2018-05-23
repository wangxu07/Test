<template>
  <el-row class="wrap">
      
      <el-col :span="6">
          <h2 style="color:#E6A23C;">名称查询</h2>
          <el-form :model="Nfilters" :inline="true">
            <el-form-item>
                <el-input placeholder="商品名称" prefix-icon="el-icon-search" v-model="Nfilters.InProductName" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch" size="small">查询</el-button>
            </el-form-item>
          </el-form>         
      </el-col>
      <el-col :span="6">
          <h2 style="color:#E6A23C">日查询</h2>
          <el-form :model="Dfilters" :inline="true">
            <el-form-item>
               <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="Dfilters.InDate" placeholder="请选择日期" suffix-icon="el-icon-date" size="small" style="width:200px"></el-date-picker>
          </el-form-item>
          <el-form-item>
               <el-button type="primary" @click="handleSearchByDate" size="small">查询</el-button>
          </el-form-item>
          </el-form>
      </el-col>
      <el-col :span="6">
          <h2 style="color:#E6A23C">月查询</h2>
          <el-form :model="Mfilters" :inline="true">
            <el-form-item>
               <el-date-picker type="month" value-format="yyyy-MM"  v-model="Mfilters.InDate" placeholder="请选择日期" suffix-icon="el-icon-date" size="small" style="width:200px"></el-date-picker>
          </el-form-item>
          <el-form-item>
               <el-button type="primary" @click="handleSearchByMonth" size="small">查询</el-button>
          </el-form-item>
          </el-form>
      </el-col>
      <el-col :span="6">
          <h2 style="color:#E6A23C">年查询</h2>
          <el-form :model="Yfilters" :inline="true">
            <el-form-item>
               <el-date-picker type="year" value-format="yyyy"  v-model="Yfilters.InDate" placeholder="请选择日期" suffix-icon="el-icon-date" size="small" style="width:200px"></el-date-picker>
          </el-form-item>
          <el-form-item>
               <el-button type="primary" @click="handleSearchByYear" size="small">查询</el-button>
          </el-form-item>
          </el-form>
      </el-col>
      <el-table :data="tdata" v-loading="loading">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="InProductName" width="160" sortable>
        </el-table-column>
        <el-table-column label="订单数量" prop="InCount" width="160" sortable>
        </el-table-column>
        <el-table-column label="商品进价" prop="InPrice" width="160" sortable>
        </el-table-column>
        <el-table-column label="订单日期" prop="InDate" min-width="170" sortable>
        </el-table-column>
        <el-table-column label="供应商ID" prop="Suppliersid" min-width="120" sortable>
        </el-table-column>
      </el-table>
  </el-row>
 
</template>
<script>
import {ApiGetPurchaseByName,ApiGetPurchases,ApiGetPurchaseByDate } from '../../api/api_purchase'
export default {
  data (){
      return {
          Nfilters:{
              InProductName:''
          },
          Dfilters:{
              InDate:''
          },
          Mfilters:{
              InDate:''
          },
          Yfilters:{
              InDate:''
          },
          tdata:[],
          loading:false,
      }
  },
  methods:{
      handleSearch(){
          //console.log("asdfdsf");
          let para={InProductName:this.Nfilters.InProductName};
          this.loading=true;

          ApiGetPurchaseByName(para).then((res) =>{
          if(res.data.length!=0)
             {                 
                 this.tdata=res.data;
                 this.loading =false;
             }
             else
             {
                 this.loading =false;
                 this.tdata=[];
                 this.$message.error("订单不存在！");
             }
          })

      },
      handleSearchByDate(){
          //console.log("1111111");
          let para={InDate:this.Dfilters.InDate};
          this.loading=true;
          ApiGetPurchaseByDate(para).then((res)=>{
              if(res.data.length!=0)
              {
                  this.tdata=res.data;
                  this.loading=false;
              }
              else{
                 this.loading =false;
                 this.tdata=[];
                 this.$message.error("暂无订单信息！");
              }
          },function(err){
             this.loading=false;
          })
      },
      handleSearchByMonth(){
          //console.log("2222");
               let para={InDate:this.Mfilters.InDate};
          this.loading=true;
          ApiGetPurchaseByDate(para).then((res)=>{
              if(res.data.length!=0)
              {
                  this.tdata=res.data;
                  this.loading=false;
              }
              else{
                 this.loading =false;
                 this.tdata=[];
                 this.$message.error("暂无订单信息！");
              }
          },function(err){
             this.loading=false;
          })
      },
      handleSearchByYear(){
          //console.log("333");
               let para={InDate:this.Yfilters.InDate};
          this.loading=true;
          ApiGetPurchaseByDate(para).then((res)=>{
              if(res.data.length!=0)
              {
                  this.tdata=res.data;
                  this.loading=false;
              }
              else{
                 this.loading =false;
                 this.tdata=[];
                 this.$message.error("暂无订单信息！");
              }
          },function(err){
             this.loading=false;
          })
      }
  },
  mounted(){
      this.loading=true;
      ApiGetPurchases().then((res)=>{
          this.tdata=res;
          this.loading=false;
      })
  }
}
</script>
<style>

</style>


