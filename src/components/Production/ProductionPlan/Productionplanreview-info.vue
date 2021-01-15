<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>生产管理</el-breadcrumb-item>
				<el-breadcrumb-item>生产计划管理</el-breadcrumb-item>
				<el-breadcrumb-item>生产计划审核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="apply" :model="apply" label-width="130px">
				<div id="buttons">
					<el-button size="mini" type="primary" @click="audit='审核不通过';onSubmit();" plain>复核不通过</el-button>
					<el-button size="mini" type="primary" @click="audit='审核通过';onSubmit();" plain>复核通过</el-button>
					<el-button size="mini" type="primary" plain @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>生产计划单</h3><br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="计划单编号">
								<span>{{apply.applyId}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<template>
						<el-table id="table" :data="tableData" style="margin:0 auto; width: 90%;" border>
							<el-table-column prop="id" label="序号"></el-table-column>
							<el-table-column prop="productId" label="产品编号"></el-table-column>
							<el-table-column prop="productName" label="产品名称"></el-table-column>
							<el-table-column prop="productDescribe" label="描述 "></el-table-column>
							<el-table-column prop="amount" label="数量"></el-table-column>
						</el-table>
					</template>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="登记人">
								<input v-model="apply.register" />
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="登记时间">
								<span>{{apply.registerTime}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="审核人">
								<input v-model="apply.checker" />
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="审核时间">
								<span>{{apply.checkTime}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="21" :push='1'>
							<el-form-item label="审核意见" style="width: 100%;">
								<el-input style="width: 100%;" v-model="apply.checkSuggestion" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"
								 placeholder="请输入内容">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>

				</el-card>
			</el-form>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				apply: {},
				tableData: [],
				audit: ''
			};
		},
		methods: {
			onSubmit() {
				this.apply.checkTag = this.audit;
				console.log(this.apply);
				this.$http.post("http://localhost:8080/Erp-web/apply/updateApply.do", this.$qs.stringify(this.apply))
				.then(res => {
					
					if (this.apply.checkTag == '审核通过') {
						var demo = new URLSearchParams()
						demo.append("productId", this.apply.productId);
						demo.append("amount", this.apply.amount)
						this.$http.post("http://localhost:8080/Erp-web/apply/ifStorage.do", demo)
							.then(res => {
								if (res.data) {
									this.$notify({
										title: '提示',
										message: '所需物料充足',
										type: 'success',
										position: 'bottom-right',
										duration: 0
									});
								} else {
									this.$notify({
										title: '警告',
										message: '所需物料不足',
										type: 'warning',
										position: 'bottom-right',
										duration: 0
									});
								}
							})
							.catch(err => {
								console.log(err)
							})
					}
					location.href = "#/Productionplanreview";
				})
				.catch(err => {
					console.log(err)
				})

				
			},
			back() {
				location.href = "#/Productionplanreview"
			},
			assignment(row) {
				var aData = new Date();
				row.checkTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
				this.apply = row;
				this.tableData[0] = row;
			}
		},
		mounted() {
			this.assignment(this.$route.query.rows);

		}
	}
</script>

<style scoped>
	/* #head {
		padding: 30px;
	} */

	.box-card {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		padding-bottom: 23px;
	}

	#buttons {
		float: right;
		margin-right: 50px;
		margin-bottom: 20px;
	}

	input {
		outline: none;
		border: none;
		border-bottom: 1px solid #000;
	}

	#box>>>.el-form-item {
		margin-bottom: 0px;
	}

	#box>>>.el-form-item__label {
		line-height: 35px;
	}

	.el-row {
		margin: 10px;
	}

	h3 {
		text-align: center;
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

	table {
		margin-left: 3%;
	}

	table td {
		margin-left: 50px;
		display: inline-block;
	}

	#box>>>.el-form-item__content {
		line-height: 35px;
	}
</style>
