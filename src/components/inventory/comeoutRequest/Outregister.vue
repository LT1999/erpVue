<template>

	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>库存管理</el-breadcrumb-item>
				<el-breadcrumb-item>出库申请管理</el-breadcrumb-item>
				<el-breadcrumb-item>出库申请登记审核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div id="card">
			<el-card class="box-card">
				<div style="padding-bottom: 10px; ">

					<span style="font-size: 20px; color: #6275A6;">出库申请登记审核</span>

					<br />
					<span style="font-size: 12px; color: #C6C6C9;">当前等待审核的申请单总数 :({{number}})例</span>
				</div>
				<div id="table" style="">
					<el-table id="" :data="tableData" border stripe style="width: 100%" stripe>
						<el-table-column prop="payId" label="申请单编号" width="200px">
						</el-table-column>
						<el-table-column prop="reason" label="出库理由">
						</el-table-column>
						<el-table-column prop="registerTime" label="登记时间" width="200px">
						</el-table-column>
						<el-table-column prop="backtime" label="归还时间">
						</el-table-column>
						<el-table-column prop="amountSum" label="总件数">
						</el-table-column>
						<el-table-column prop="costPriceSum" label="总金额(元)">
						</el-table-column>
						<el-table-column label="审核">
							<template slot-scope="scope">
								<el-button @click="reviewButton(scope.$index,scope.row)" size="mini" type="success" plain>复核</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>

				<div style="margin: 10px auto; width: 550px;">
					<el-pagination background :current-page.sync="currentPage1" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
					</el-pagination>
				</div>

			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
    created() {
      this.selectPay();
    },
		data() {
			return {
				number:0,
				tableData: [],
				input: '',
				currentPage1:1
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
