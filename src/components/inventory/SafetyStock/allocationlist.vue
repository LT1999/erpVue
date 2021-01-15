<template>
<div id="app">
  <div>
  	<el-breadcrumb separator="/">
  		<el-breadcrumb-item :to="{ path: '/' }">库存管理</el-breadcrumb-item>
  		<el-breadcrumb-item>安全库存配置管理</el-breadcrumb-item>
  		<el-breadcrumb-item>制定安全库存配置单 </el-breadcrumb-item>
  	</el-breadcrumb>
  </div>
  <el-divider></el-divider>
  <div id="sel">
  	<el-card class="box-card">
  		<div>
  			<el-form :inline="true" :model="formInline" class="demo-form-inline">
  				<el-form-item label="请选择产品菜单">
  					<el-cascader v-model="formInline.classification" :options="options" @change="handleChange"></el-cascader>
  				</el-form-item>
  				<el-form-item label="请选择建档时间">
  					<el-date-picker v-model="formInline.time" type="daterange" value-format="yyyy-mm-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
  				</el-form-item>
  				<el-form-item>
  					<el-button type="primary" @click="onSubmit">搜索</el-button>
  				</el-form-item>
  			</el-form>
  		</div>
  	</el-card>
  </div>
  <br />

  <div>
  	<el-card class="box-card">
  		<el-table :data="tableData" stripe style="width: 100%">
  		<el-table-column prop="productId" label="产品编号" width="150"></el-table-column>
  	    <el-table-column prop="productName" label="产品名称" width="150"></el-table-column>
        <el-table-column prop="type" label="用途类型" width="150"></el-table-column>
  	    <el-table-column prop="productClass" label="档次级别" width="150"></el-table-column>
  	    <el-table-column prop="firstKindName" label="Ⅰ级分类" width="150"></el-table-column>
  	    <el-table-column prop="secondKindName" label="Ⅱ级分类" width="150"></el-table-column>
  	    <el-table-column prop="thirdKindName" label="Ⅲ级分类" width="150"></el-table-column>
  		<el-table-column label="制定设计单">
  			<template slot-scope="scope">
  				<el-button size="mini" @click="zhiding(scope.$index,scope.row)">制定</el-button>
  			</template>
  		</el-table-column>
  	</el-table>
  	</el-card>
  </div>
</div>
</template>

<script>
  export default {
	  created() {
        this.get();
	  },
  	data() {
  		return {
  			options: [
  					{
  					 value:'电子',
  					 label:'电子',
  					 children:[
  					   {
  					   	value:'计算机',
  					    label:'计算机',
  					    children:[
  					     {
  					   	  value:'服务器',
  					      label:'服务器'
  					   }
  					 ]
  					   }
  					 ]
  					}

  				 ],//联动菜单
  			formInline:{
  				time:[],
  				classification:[]
  			},
  			tableData:[]
  		}
  	},
    methods: {
      get(){
        this.$http.post("http://localhost:8080/Erp-web/productfile/selectSafetyStock.do",this.$qs.stringify(this.formInline))
        		.then(res => {
        			console.log(res.data);
        			this.tableData = res.data;
        		})
        		.catch(err =>{
        			console.log(err)
        		})
      },
      onSubmit() {
        this.$http.post("http://localhost:8080/Erp-web/productfile/selectSafetyStock.do",this.$qs.stringify(this.formInline))
        	.then( res => {
        	//alert("a");
                    this.tableData = res.data;
                 })
        	.catch(err =>{
        		console.log(err)
        	})

      },
      handleChange(value) {
      	console.log(value);
      },
	  zhiding(index,row){
		  this.$router.push({
       /* firstKindId:'',//产品I级分类编号
        firstKindName:'',//产品I级分类名称
        secondKindId:'',//产品II级分类编号
        secondKindName:'',//产品II级分类名称
        thirdKindId:'',//产品III级分类编号
        thirdKindName:'',// 产品III级分类名称 */
		  	path: '/allocationlist2',query:{productId:row.productId,productName:row.productName,firstKindId:row.firstKindId,
        firstKindName:row.firstKindName,secondKindId:row.secondKindId,secondKindName:row.secondKindName,thirdKindId:row.thirdKindId,
        thirdKindName:row.thirdKindName}});
	  }


  	}
 }
</script>

<style scoped>
</style>
