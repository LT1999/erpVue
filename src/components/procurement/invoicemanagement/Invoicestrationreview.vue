<template>

	<div id="box">
		<el-breadcrumb>
			<el-breadcrumb-item>采购管理</el-breadcrumb-item>
			<el-breadcrumb-item>采购发票管理</el-breadcrumb-item>
			<el-breadcrumb-item>发票信息登记复核</el-breadcrumb-item>
		</el-breadcrumb>
		<div id="card">
			<el-card class="box-card">
				<div style="padding-bottom: 10px; ">
					<span style="font-size: 20px;padding-left: 30px; color: #6275A6;">发票信息登记复核</span>

					<br />
					<span style="font-size: 12px;padding-left: 30px; color: #C6C6C9;">等待发票信息登记复核的采购执行单总数 :{{number}}例 </span>
				</div>
				<div id="table" style="padding-left: 20px;padding-right: 20px;">
					<el-table :data="tableData" border stripe style="width: 100%" stripe>
						<el-table-column prop="purchaseqNo" label="采购执行单编号" width="200px">
						</el-table-column>
						<el-table-column prop="productNo" label="产品编号">
						</el-table-column>
						<el-table-column prop="productName" label="产品名称">
						</el-table-column>
						<el-table-column prop="shouldinvoicemoney" label="应开发票总额">
						</el-table-column>
						<el-table-column prop="invoicemoney" label="已开发票金额">
						</el-table-column>
						<el-table-column prop="Noinvoice" label="未开发票总额" :formatter="Noinvoice">
						</el-table-column>
						<el-table-column prop="review" label="复核">
							<template slot-scope="scope">
								<el-button @click="reviewButton(scope.row)" size="mini" type="success" plain>复核</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>

				<div style="margin: 20px auto; width: 550px;">
					<el-pagination background :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper"
					 :total="1000">
					</el-pagination>
				</div>

			</el-card>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				sz: [],
				number: '',
				tableData: [],
				input: '',
				currentPage1: 5,
				currentPage2: 5,
				currentPage3: 5,
				currentPage4: 4
			}
		},
		methods: {
			selectAll() {
				this.$http.post("http://localhost:8081/invoice/selectCheck")
					.then(res => {
						this.tableData = res.data;
						this.number=this.tableData.length;
					})
					.catch(err => {
						console.log(err)
					});
				this.$http.post("http://localhost:8080/Erp-web/productfile/getProductfileByCheckTag.do")
					.then(res => {
						this.number = res.data;

					})
					.catch(err => {
						console.log(err)
					});
			},
			Noinvoice(row){
				return parseInt(row.shouldinvoicemoney)-parseInt(row.invoicemoney);
			},
			reviewButton(row) {
				//console.log(row)
				this.$router.push({
					path: '/Invoicestrationreview2',
					query: {
						arr: row
					}
				});
			}
		},
		mounted() {
			this.selectAll();
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

	#box>>>.el-table th {
		text-align: center;
	}

	#box>>>.el-table td {
		padding: 0px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	#head {
		padding: 30px;
	}

	#card {
		margin-top: 30px;
		/* margin-left: 130px; */
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
		width: 100%;
	}

	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: oldlace;
	}
</style>
