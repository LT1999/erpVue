<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">产品设计</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/' }">产品物料组成设计</el-breadcrumb-item>
				<el-breadcrumb-item>物料组成设计单审核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button type="primary" @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>物料组成设计单</h3><br />

					<el-row>
						<el-col :span="13" :push="1">
							<el-form-item label="设计单编号">
								<span>{{form.designId}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item label="设计人">
								<span>{{form.designer}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="13" :push="1">
							<el-form-item label="产品名称">
								<span>{{form.productName}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item label="产品编号">
								<span>{{form.productId}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<template>
							<el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
								<el-table-column prop="detailsInt" label="序号">
								</el-table-column>
								<el-table-column prop="productName" label="物料名称">
								</el-table-column>
								<el-table-column prop="type" label="用途类型">
								</el-table-column>
								<el-table-column prop="productDescribe" label="描述 ">
								</el-table-column>
								<el-table-column prop="amount" label="数量 ">
								</el-table-column>
								<el-table-column prop="amountUnit" label="单位 ">
								</el-table-column>
								<el-table-column prop="costPrice" label="单价(元) ">
								</el-table-column>
								<el-table-column prop="subtotal" label="小计(元) ">
								</el-table-column>
							</el-table>
						</template>
					</el-row>
					<el-row>
						<el-col :span="13" :push="1">
							<el-form-item label="审核人">
								<span>{{form.checker}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item label="审核时间">
								<span>{{form.checkTime}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="13" :push='1'>
							<el-form-item label="设计要求" style="width: 100%;">
								<span>{{form.moduleDescribe}}</span>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="10" >
							<el-form-item label="物料总成本">
								<span>{{form.costPriceSum}}</span>
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
				radio: '1', //未通过
				form: {},
				tableData: [],
				id: 0
			};
		},
		methods: {
			back() {
				location.href = "#/MaterialCompositionChange"
			}
		},
		created() {
			this.form = this.$route.query.arr;
			this.id = this.form.id;
		},
		mounted() {
			this.$http.post("http://localhost:8080/Erp-web/module-details/findwlById.do", "id=" + this.id)
				.then(res => {
					this.tableData = res.data;
				})
				.catch(err => {
					console.log(err)
				});
		}
	}
</script>

<style scoped>
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
