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
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button type="primary" @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>供应商报价单</h3><br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="报价单编号">
								<span>{{form.offerNo}} </span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form ref="form2" :model="form2" label-width="130px">
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="供应商名称">
								<span>{{form2.supplierName}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="供应商编号">
								<span>{{form2.supplierNo}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					</el-form>
					<el-row>
						<template>
							<el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
								<el-table-column prop="id" label="序号">
								</el-table-column>
								<el-table-column prop="goodsName" label="商品名称">
								</el-table-column>
								<el-table-column prop="goodsNo" label="商品编号">
								</el-table-column>
								<el-table-column prop="goodsDescribe" label="描述 ">
								</el-table-column>
								<el-table-column label="数量 ">1
								</el-table-column>
								<el-table-column prop="goodsPrice" label="单价(元) ">
								</el-table-column>
								<el-table-column prop="goodsPrice" label="小计(元) ">
								</el-table-column>
								<el-table-column prop="goodsDiscount" label="折扣(%)">
								</el-table-column>
							</el-table>
						</template>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="登记人" >
								<span>{{form.registrar}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="登记时间">
								<span>{{form.registrartime}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="审核人">
								<span>{{form.auditor}} </span> 
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="审核时间" prop="auditor">
								<span>{{form.auditorTime}} </span> 
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
				form2:{supplierName:'暂无',supplierNo:'暂无'},
				tableData: [],
				supplierId:0
			};
		},
		methods: {
			selectsupId(){
				this.$http.post(this.$api+"/supplierfiles/selectByPrimaryKey", "id=" + this.form.supplierId)
				.then(res => {
					this.form2 = res.data;
				})
				.catch(err => {
					console.log(err)
				}); 
			},
			back() {
					location.href = "#/RequestForChanges"
			}
		},
		created() {
			this.form = this.$route.query.arr;
			this.tableData.push(this.form);
			this.supplierId = this.form.supplierId;
			this.selectsupId();
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
		width:6.25rem;
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
