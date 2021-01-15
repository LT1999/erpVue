<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>生产管理</el-breadcrumb-item>
				<el-breadcrumb-item>产品生产工序设计</el-breadcrumb-item>
				<el-breadcrumb-item>产品生产工序设计单审核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button size="mini" type="primary" @click="noAudit" plain>复核不通过</el-button>
					<el-button size="mini" type="primary" @click="okAudit" plain>复核通过</el-button>
					<el-button size="mini" type="primary" plain @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>生产工序设计单</h3><br />

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="设计单编号">
								<span>{{form.designId}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="设计人">
								<input v-model="form.designer" />
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="产品名称">
								<span>{{form.productName}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="产品编号">
								<span>{{form.productId}}</span>
							</el-form-item>
						</el-col>
					</el-row>


					<template>
						<el-table id="table" :data="tableData" style="margin-left: 8%; width: 85%;" border>
							<el-table-column prop="id" label="序号">
							</el-table-column>
							<el-table-column prop="procedureName" label="工序名称">
							</el-table-column>
							<el-table-column prop="procedureId" label="工序编号">
							</el-table-column>
							<el-table-column prop="procedureDescribe" label="描述 ">
							</el-table-column>
							<el-table-column prop="labourHourAmount" label="工时数">
								<template slot-scope="scope">
									<el-input v-model="scope.row.labourHourAmount" v-on:input="hoursSubtotal(scope.row)"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="amountUnit" label="工时单位">
								<template slot-scope="scope">
									<el-input v-model="scope.row.amountUnit"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="costPrice" label="单价工时成本">
								<template slot-scope="scope">
									<el-input v-model="scope.row.costPrice" v-on:input="hoursSubtotal(scope.row)"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="subtotal" label="工时成本小计(元)" width="150px">
							</el-table-column>
						</el-table>
					</template>

					<el-row>
						<el-col :span="2" :push='1'>
							<el-form-item label="工时总成本">
								<span>{{form.costPriceSum}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="审核人">
								<input v-model="form.checker" />
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="审核时间">
								<span>{{form.checkTime}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="21" :push='1'>
							<el-form-item label="设计要求" style="width: 100%;">
								<el-input style="width: 100%;" v-model="form.procedureDescribe" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"
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
				form: {},
				tableData: [],
				designProcedure: {}
			};
		},
		methods: {
			noAudit() {
				this.form.checkTag = "审核不通过";
				this.onSubmit();
			},
			okAudit() {
				this.form.checkTag = "审核通过";
				this.onSubmit();
			},
			onSubmit() {
				this.sumSubtotal();
				this.$set(this.designProcedure, 'designProcedure', this.form);
				this.$set(this.designProcedure, 'detailsList', this.tableData);
				console.log(this.designProcedure);
				this.$http.post("http://localhost:8080/Erp-web/design-procedure/updateDesignProcedure.do", this.$qs.stringify(this.designProcedure, {
						arrayFormat: 'detailsList',
						allowDots: true
					}))
					.then(res => {
						if (res.data > 0) {
							location.href = "#/processdesign";
							this.$message({
								message: '审核成功',
								type: 'success'
							});

						}else{
							this.$message.error({
								message: '审核失败'
							});
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			back() {
				location.href = "#/processdesign";
			},
			hoursSubtotal(row) {
				row.subtotal = row.labourHourAmount * row.costPrice;
				this.sumSubtotal();
			},
			sumSubtotal() {
				this.form.costPriceSum = 0;
				this.tableData.forEach((item) => {
					this.form.costPriceSum += parseInt(item.subtotal);
				})
			},
			registrar() {
				var aData = new Date();
				this.form.checkTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
			},
			audit(row) {
				var demo = new URLSearchParams()
				demo.append("parentId", row.id);
				this.$http.post("http://localhost:8080/Erp-web/design-procedure-details/selectByParentId.do", demo)
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err);
					})
				this.$delete(row, 'changeTime');
				this.form = row;
			}
		},
		mounted() {
			this.audit(this.$route.query.rows);
			this.registrar();
		}
	}
</script>

<style scoped>
	#box>>>.el-table th {
		text-align: center;
	}

	#box>>>.el-table td {
		padding: 0px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}

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
