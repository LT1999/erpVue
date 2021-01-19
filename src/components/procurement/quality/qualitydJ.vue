<template>
  <!-- 采购管理--采购质量控制管理--质检结果登记-->
  <div id="box">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">采购管理</el-breadcrumb-item>
        <el-breadcrumb-item>采购质量控制管理</el-breadcrumb-item>
        <el-breadcrumb-item>质检结果登记</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>

    <div id="card">
    	<el-card class="box-card">
    		<div style="padding-bottom: 10px; ">
    			<span style="font-size: 12px; color: #C6C6C9;">等待登记质检结果的采购执行单总数 :({{number}})例</span>
    		</div>
    		<div id="table" style="">
    			<el-table id="" :data="tableData" border stripe style="width: 100%" stripe>
    				<el-table-column prop="payId" label="采购执行单编号" width="200px">
    				</el-table-column>
    				<el-table-column prop="reason" label="产品编号">
    				</el-table-column>
    				<el-table-column prop="registerTime" label="产品名称" width="200px">
    				</el-table-column>
    				<el-table-column prop="backtime" label="采购数量">
    				</el-table-column>
    				<el-table-column prop="amountSum" label="已合格数量">
    				</el-table-column>
    				<el-table-column prop="costPriceSum" label="未收数量">
    				</el-table-column>
    				<el-table-column label="登记">
    					<template slot-scope="scope">
    						<el-button @click="reviewButton(scope.$index,scope.row)" size="mini" type="success" plain>登记</el-button>
    					</template>
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
      //this.selectPay();
    },
  	data() {
  		return {
  			number:0,
  			tableData: [],
  			input: ''
  		}
  	},
  	methods: {
  		reviewButton(index,row){
        this.$router.push({
        	path: '/Outregister-info',query:{id:row.id,payId:row.payId,storer:row.storer,reason:row.reason,
          amountSum:row.amountSum,costPriceSum:row.costPriceSum,remark:row.remark,register:row.register,registerTime:row.registerTime}
        });
  		},
      selectPay(){
        this.$http.post("http://localhost:8080/Erp-web/pay/selectPay.do")
        	.then( res => {
        	//alert("a");
                    this.tableData = res.data;
                    this.number=this.tableData.length;
                 })
        	.catch(err =>{
        		console.log(err)
        	})
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
