<template>
	<!-- 采购管理--采购质量控制管理--质检结果登记复核-->
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>采购管理</el-breadcrumb-item>
				<el-breadcrumb-item>采购质量控制管理</el-breadcrumb-item>
				<el-breadcrumb-item>质检结果登记复核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-card class="box-card">
				<div style="padding-bottom: 10px; ">

					<span style="font-size: 20px; color: #6275A6;">质检结果登记复核</span>

					<br />
					<span style="font-size: 12px; color: #C6C6C9;">等待质检结果登记复核的采购执行单总数 :({{number}})例</span>
				</div>
				<div id="table" style="">
					<el-table id="" :data="tableData" border stripe style="width: 100%" stripe>
						<el-table-column prop="purchaseqNo" label="采购执行单编号" width="200px">
						</el-table-column>
						<el-table-column prop="productNo" label="产品编号">
						</el-table-column>
						<el-table-column prop="productName" label="产品名称" width="200px">
						</el-table-column>
						<el-table-column prop="purchaseQuantity" label="采购数量">
						</el-table-column>
						<el-table-column prop="qualifiedQuantity" label="已收合格数量">
						</el-table-column>
						<el-table-column prop="costPriceSum" label="未收数量" :formatter="Unreceived">
						</el-table-column>
						<el-table-column label="复核">
							<template slot-scope="scope">
								<el-button @click="reviewButton(scope.row)" size="mini" type="success" plain>复核</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>

				<div style="margin: 10px auto; width: 550px;">
					<el-pagination background :current-page.sync="currentPage1" :page-size="100" layout="prev, pager, next, jumper"
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
				number: 0,
				tableData: [],
				currentPage1: 1
			}
		},
		methods: {
			reviewButton(row) {
				this.$router.push({
					path: '/qualitysh2',
					query: {row:row}
				});
			},
			initialize() {
				this.$http.post(this.$api + "/purchase/selectQualityCheck")
					.then(res => {
						this.tableData = res.data;
						this.number = this.tableData.length;
					})
					.catch(err => {
						console.log(err)
					})
			},
			Unreceived(row){
				return parseInt(row.purchaseQuantity)-parseInt(row.qualifiedQuantity);
			}
		},
		mounted() {
			this.initialize();
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
