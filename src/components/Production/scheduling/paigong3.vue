<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>生产管理</el-breadcrumb-item>
				<el-breadcrumb-item>生产调度管理</el-breadcrumb-item>
				<el-breadcrumb-item>制定生产派工单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button size="mini" type="primary" plain @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>工序物料单</h3><br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="设计单编号">
								<span>{{form.procedureId}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="工序名称">
								<span>{{form.procedureName}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<template>
						<el-table id="table" :data="tableData" style="margin:0 auto; width: 95%;" border>
							<el-table-column prop="id" label="序号" width="100">
							</el-table-column>
							<el-table-column prop="productId" label="物料编号">
							</el-table-column>
							<el-table-column prop="productName" label="物料名称">
							</el-table-column>
							<el-table-column prop="productDescribe" label="描述">
							</el-table-column>
							<el-table-column prop="designAmount" label="本工序数量" width="90">
							</el-table-column>
							<el-table-column prop="amountUnit" label="单位" width="80">
							</el-table-column>
							<el-table-column prop="costPrice" label="单价(元)" width="120">
							</el-table-column>
							<el-table-column prop="subtotal" label="小计(元)" width="120">
							</el-table-column>
						</el-table>
					</template>

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
				designId:''
			};
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			initialize(pid) {
				var demo = new URLSearchParams()
				demo.append("parentId", pid);
				this.$http.post("http://localhost:8080/Erp-web/design-procedure-module/selectByParentId.do", demo)
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		mounted() {
			this.form = this.$route.query.rows;
			this.designId=this.$route.query.designId
			this.initialize(this.$route.query.rows.id);
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

	#box>>>.el-table th {
		text-align: center;
	}

	#box>>>.el-table td {
		padding: 0px;
		height: 50px;
		line-height: 50px;
		text-align: center;
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
