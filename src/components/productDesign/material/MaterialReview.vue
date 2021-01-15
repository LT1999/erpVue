<template>

	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>产品设计</el-breadcrumb-item>
				<el-breadcrumb-item>产品物料组成设计</el-breadcrumb-item>
				<el-breadcrumb-item>物料组成设计单审核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div id="card">
			<el-card class="box-card">
				<div style="padding-bottom: 10px; ">
					<span style="font-size: 20px; color: #6275A6;">物料组成设计单审核</span>

					<br />
					<span style="font-size: 12px; color: #C6C6C9;">当前等待审核的设计单总数:{{number}}例 </span>
				</div>
				<div id="table" style="">
					<el-table id="" :data="tableData" border stripe style="width: 100%" stripe>
						<el-table-column prop="designId" label="设计单编号" width="200px">
						</el-table-column>
						<el-table-column prop="productId" label="产品编号" width="200px">
						</el-table-column>
						<el-table-column prop="productName" label="产品名称">
						</el-table-column>
						<el-table-column prop="designer" label="设计人">
						</el-table-column>
						<el-table-column prop="registerTime" label="登记时间" width="200px">
						</el-table-column>
						<el-table-column prop="costPriceSum" label="物料总成本">
						</el-table-column>
						<el-table-column prop="review" label="复核">
							<template slot-scope="scope">
							<el-button type="text">
								<el-button @click="reviewButton(scope.row)" size="mini" type="success" plain>复核</el-button>
							</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>

				<div style="margin: 10px auto; width: 550px;">
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
				number: '',
				tableData: [],
				currentPage1: 5,
				currentPage2: 5,
				currentPage3: 5,
				currentPage4: 4
			}
		},
		methods: {
			reviewButton(row) {
				this.$router.push({path: '/materialreview-info',query:{arr:row}});
			},
			selectspwl() {
				this.$http.post("http://localhost:8080/Erp-web/module/findspwl.do")
					.then(res => {
						this.tableData = res.data;
						this.$http.post("http://localhost:8080/Erp-web/module/countspwl.do")
							.then(res => {
								this.number = res.data;
							})
							.catch(err => {
								console.log(err)
							});
					})
					.catch(err => {
						console.log(err)
					});
			}

		},
		mounted() {
			this.selectspwl();
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

	#box>>>.el-table th {
		text-align: center;
	}

	#box>>>.el-table td {
		padding: 0px;
		height: 50px;
		line-height: 50px;
		text-align: center;
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
