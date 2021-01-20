<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>采购管理</el-breadcrumb-item>
				<el-breadcrumb-item>供应商申请审批管理</el-breadcrumb-item>
				<el-breadcrumb-item>申请查看</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :rules="rules" :model="form" label-width="130px">
				<div id="buttons">
					<el-button type="success">打印</el-button>
					<el-button type="primary" @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>供应商报价单</h3><br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="报价单编号">
								<!-- <span>{{form.designId}} </span> -->
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="报价单附件">
								<!-- <span>{{form.designer}}</span> -->
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="供应商名称">
								<!-- <span>{{form.designId}}</span> -->
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="供应商编号">
								<!-- <span>{{form.designer}}</span> -->
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<template>
							<el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
								<el-table-column prop="1" label="序号">
								</el-table-column>
								<el-table-column prop="2" label="商品名称">
								</el-table-column>
								<el-table-column prop="1" label="商品编号">
								</el-table-column>
								<el-table-column prop="3" label="描述 ">
								</el-table-column>
								<el-table-column prop="4" label="数量 ">
								</el-table-column>
								<el-table-column prop="5" label="单位 ">
								</el-table-column>
								<el-table-column prop="6" label="单价(元) ">
								</el-table-column>
								<el-table-column prop="7" label="小计(元) ">
								</el-table-column>
								<el-table-column prop="8" label="折扣(%) ">
								</el-table-column>
								<el-table-column prop="8" label="推荐状态 ">
								</el-table-column>
							</el-table>
						</template>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="审核状态" >
								<!-- <span>{{}}</span> -->
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="处理状态">
								<!-- <span>{{}}</span> -->
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="登记人" >
								<!-- <span>{{}}</span> -->
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="登记时间">
								<!-- <span>{{}}</span> -->
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="电话">
								<!-- <span>{{}}</span> -->
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="拟供货时间">
								<!-- <span>{{}}</span> -->
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="总计">
								<!-- <span>{{}}</span> -->
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="备注">
								<!-- <span>{{}}</span> -->
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
				tableData: []
			};
		},
		methods: {
			back() {
					location.href = "#/RequestForChanges"
			}
		},
		mounted() {
			/* 
			this.$http.post("http://localhost:8080/Erp-web/module-details/findwlById.do", "id=" + this.id)
				.then(res => {
					this.tableData = res.data;
				})
				.catch(err => {
					console.log(err)
				}); */
		},
		created() {
			this.form = this.$route.query.arr;
			/*this.id = this.form.id; */
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
		margin-bottom: 20px;
	}

	input {
		outline: none;
		border: none;
		border-bottom: 1px solid #000;
		width: 18.75rem;
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
