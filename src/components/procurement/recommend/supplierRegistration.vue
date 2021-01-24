<template>
  <!-- 产品供应商推荐登记-->
<div id="app">
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">采购管理</el-breadcrumb-item>
      <el-breadcrumb-item>产品供应商推荐管理</el-breadcrumb-item>
      <el-breadcrumb-item>产品供应商推荐登记</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-divider></el-divider>
  <div id="sel">
  	<el-card class="box-card">
  		<div>
  			<el-form :inline="true" :model="formInline" class="demo-form-inline">
  				<el-form-item label="请选择供应商所供产品类别">
  					<el-cascader v-model="formInline.classification" :options="options"></el-cascader>
  				</el-form-item>
  				<el-form-item label="请输入登记时间">
  					<el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
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
  	<el-card class="box-card">
  		<el-table :data="tableData" stripe style="width: 100%">
  		<el-table-column prop="productId" label="产品编号" width="150"></el-table-column>
  		  <el-table-column prop="productName" label="产品名称"></el-table-column>
  		  <el-table-column prop="type" label="用途类型" ></el-table-column>
  		  <el-table-column prop="productClass" label="档次级别" ></el-table-column>
  		  <el-table-column prop="firstKindName" label="Ⅰ级分类" ></el-table-column>
  		  <el-table-column prop="secondKindName" label="Ⅱ级分类"></el-table-column>
  		  <el-table-column prop="thirdKindName" label="Ⅲ级分类" ></el-table-column>
  		<el-table-column label="推荐供应商">
  			<template slot-scope="scope">
  				<el-button size="mini" @click="handleEdit(scope.$index,scope.row)">推荐供应商</el-button>
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
      this.selectProduct();
    },
    data() {
      return {
      	options: [
      			{
      			 value:'01/电子',
      			 label:'01/电子',
      			 children:[
      			   {
      			   	value:'01/计算机',
      			    label:'01/计算机',
      			    children:[
      			     {
      			   	  value:'01/服务器',
      			      label:'01/服务器'
      			   }
      			 ]
      			   }
      			 ]
      			}

      		 ],//联动菜单
      	formInline:{
      		time:'',
      		classification:[]
      	},
      	tableData:[
      		{
      			productId:'001',
      			productName:'手机',
      			productClass:'高档',
      			firstKindName:'电子',
      			secondKindName:'计算机',
      			thirdKindName:'服务器',
      			type:'商品'
      		}
      	]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      selectProduct(){
        this.$http.post("http://localhost:8080/Erp-web/productfile/findwl.do")
        	.then( res => {
        	//alert("a");
                    this.tableData = res.data;
                 })
        	.catch(err =>{
        		console.log(err)
        	})
      },
      handleEdit(index,row){
          this.$router.push({
          	path: '/supplierRegistration2',query:{id:row.id,productId:row.productId,productName:row.productName,type:row.type,productClass:row.productClass}
          });
      }
    }
  }
</script>

<style scoped>
	#box {
		height: 100%;
	}

	#place {
		font-size: 15px;
		color: blue;
	}

	.text {
		font-size: 14px;
	}
	#box>>>.el-table th {
		text-align: center;
	}

	#box>>>.el-table td {
		padding: 0px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}

	#card {
		margin-top: 30px;
		/*margin-left: 3%;*/
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 100%
	}

	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: oldlace;
	}

	.el-table td,
	.el-table th {
		text-align: center;
	}

	#box>>>.el-card__body {
		padding: 30px;
	}
</style>
