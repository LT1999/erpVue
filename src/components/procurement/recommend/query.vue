<template>
  <!-- 采购管理--产品供应商推荐管理--产品供应商推荐查询-->
<div id="box">
    <div id="head">
    	<el-breadcrumb separator="/">
    		<el-breadcrumb-item>采购管理</el-breadcrumb-item>
    		<el-breadcrumb-item>产品供应商推荐管理</el-breadcrumb-item>
    		<el-breadcrumb-item>产品供应商推荐查询</el-breadcrumb-item>
    	</el-breadcrumb>
    </div>
    <br />
    <el-divider></el-divider>
    <div id="sel">
      <el-card class="box-card">
        <div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="请选择产品分类:">
              <el-cascader v-model="formInline.ly" :options="options" @change=""></el-cascader>
            </el-form-item>
            <el-form-item label="请输入登记时间">
              <el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">搜索</el-button>
              <el-button type="primary" @click="">开始</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <br />
    <div>
    	<span>
    	等待执行的推荐单总数：{{num1}}例, 正在执行的推荐单总数：{{num2}}例, 完成的推荐单总数：{{num3}}例
    	</span>
    </div>
    <br />
    <div>
       <el-card class="box-card">
            <div>
            	<el-table :data="tableData" style="width: 100%">
            		<el-table-column prop="payId" label="推荐单编号">
            		</el-table-column>
            		<el-table-column prop="reason" label="产品编号">
            		</el-table-column>
            		<el-table-column prop="registerTime" label="推荐单状态">
            		</el-table-column>
            		<el-table-column prop="amountSum" label="审核状态">
            		</el-table-column>
            	</el-table>
            </div>
       </el-card>
    </div>
</div>
</template>

<script>
  export default {
    created() {
     // this.selectPayTag();
    },
    data() {
      return {
        num1:1,
        num2:2,
        num3:3,
        options: [{
            value: '01/电子',
            label: '01/电子',
            children: [{
              value: '01/计算机',
              label: '01/计算机',
              children: [{
                value: '01/服务器',
                label: '01/服务器'
              }]
            }]
          }
        ], //联动菜单
        currentPage4: 1,
        formInline:{
          ly: '',
          time: ''
        },
        tableData: []

      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      selectPayTag(){
        this.$http.post("http://localhost:8080/Erp-web/pay/selectPayTag.do")
        	.then( res => {
        	//alert("a");
                    this.tableData = res.data;
                 })
        	.catch(err =>{
        		console.log(err)
        	})
      }
    }
  }
</script>

<style>
</style>
