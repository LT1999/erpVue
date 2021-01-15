<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>生产管理</el-breadcrumb-item>
				<el-breadcrumb-item>工序物料设计</el-breadcrumb-item>
				<el-breadcrumb-item>工序物料设计单审核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button size="mini" type="primary" plain @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>工序物料设计单</h3><br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="工序单编号">
								<span>{{form.procedureId}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="工序名称">
								<input v-model="form.procedureName" />
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="登记人">
								<span>{{form.register}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="登记时间">
								<span>{{form.registerTime}}</span>
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
							<el-table-column prop="type" label="用途类型" width="90">
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
				tableData: []
			};
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			back() {
				location.href = "#/Processmaterialdesign-info"
			},
			selectDesignProcedureModule(pid) {
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
			this.form = this.$route.query.row;
			/* this.designProcedureModule.productId=this.$route.query.productId; */
			this.selectDesignProcedureModule(this.$route.query.row.id);
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