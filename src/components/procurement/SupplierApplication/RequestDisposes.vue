<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>采购管理</el-breadcrumb-item>
				<el-breadcrumb-item>供应商申请审批管理</el-breadcrumb-item>
				<el-breadcrumb-item>申请处理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :rules="rules" :model="form" label-width="130px">
				<div id="buttons">
					<el-button type="success" @click="submit()">处理完成</el-button>
					<el-button type="warning" @click="del()">删除</el-button>
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
					<el-form ref="form2" :rules="rules" :model="form2" label-width="130px">
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
								<el-table-column prop="goodsPrice" label="单价(元) ">
									<input v-model="tableData.goodsPrice" style="border: none;"></input>
								</el-table-column>
								<el-table-column prop="goodsSubtotal" label="小计(元) ">
								</el-table-column>
								<el-table-column prop="goodsDiscount" label="折扣(%) ">
									<input v-model="tableData.goodsDiscount" style="border: none;"></input>
								</el-table-column>
							</el-table>
						</template>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="处理人" prop="changer">
								<input v-model="input"></input>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="处理人编号" prop="changerid">
								<input v-model="input"></input>
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
				form2: {},
				input: '',
				tableData: [],
				rules: {
					changer: [{
						required: true,
						message: '请填写变更人',
						trigger: 'blur'
					}],
					changerid: [{
						required: true,
						message: '请填写变更人编号',
						trigger: 'blur'
					}]
				},
			};
		},
		methods: {
			back() {
				this.$confirm('处理已完成?立即返回', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					location.href = "#/RequestDispose"
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			selsup() {
				this.$http.post(this.$api + "/supplierfiles/selectByPrimaryKey", "?id=" + this.form.supplierId)
					.then(res => {
						this.form2 = res.data;
					})
					.catch(err => {
						console.log(err)
					});
			},
			submit() {
				this.$confirm('确认变更?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.form.checkMark = "未审核";
					this.form.goodsPrice = this.tableData[0].goodsPrice;
					this.form.goodsDiscount = this.tableData[0].goodsDiscount;
					this.form.goodsSubtotal = this.tableData[0].goodsSubtotal;
					this.$http.post(this.$api + "/offer/updateByPrimaryKey", this.$qs.stringify(this.form))
						.then(res => {
							this.$message({
								message: '已变更',
								type: 'success'
							});
						})
						.catch(err => {
							console.log(err)
						});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			del() {
				this.$confirm('确认变更?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post(this.$api + "/offer/deleteByPrimaryKey", "?id=" + this.form.id)
						.then(res => {
							this.$message({
								message: '已删除',
								type: 'success'
							});
							location.href = "#/RequestDispose"
						})
						.catch(err => {
							console.log(err)
						});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			}
		},
		created() {
			this.form = this.$route.query.arr;
			this.tableData.push(this.form);
			this.selsup();
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
		width: 12.5rem;
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
