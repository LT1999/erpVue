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
					<el-button type="warning" @click="submit()">删除</el-button>
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
						<el-col :span="8" :push='1'>
							<el-form-item label="电话" prop="phone">
								<input v-model="input"></input>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="拟供货时间" prop="time">
								<input v-model="input"></input>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<template>
							<el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
								<el-table-column prop="1" label="序号">
								</el-table-column>
								<el-table-column prop="1" label="商品编号">
								</el-table-column>
								<el-table-column prop="2" label="商品名称">
								</el-table-column>
								<el-table-column prop="3" label="描述 ">
								</el-table-column>
								<el-table-column prop="4" label="数量 ">
								</el-table-column>
								<el-table-column prop="5" label="单位 ">
								</el-table-column>
								<el-table-column prop="6" label="单价(元) ">
								</el-table-column>
								<el-table-column prop="3" label="小计(元) ">
								</el-table-column>
								<el-table-column prop="8" label="推荐供应商">
									<el-button type="text" @click="tj()">推荐</input></el-button>
								</el-table-column>
							</el-table>
						</template>
					</el-row>
					<br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="总计">
								<!-- <span>{{form.designer}}</span> -->
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
							<el-form-item label="处理人">
								<!-- <span>{{form.designer}}</span> -->
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="处理人编号">
								<!-- <span>{{form.designer}}</span> -->
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-col :span="21" :push='1'>
							<el-form-item label="备注" style="width: 100%;">
								<el-input style="width: 100%;" type="textarea" :autosize="{ minRows: 4, maxRows: 6}">
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
				rules: {
					phone: [{
						required: true,
						message: '请填写电话',
						trigger: 'blur'
					}],
					time: [{
						required: true,
						message: '请选择时间',
						trigger: 'blur'
					}]
				},
				input: '',
				form: {},
				tableData: [{
					1: "1",
					2: "2",
					3: "3",
					4: "4",
					5: "5"
				}]
			};
		},
		methods: {
			tj(){
				this.$confirm('确认推荐?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
				this.$message({
					type: 'success',
					message: '推荐成功！'
				});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消推荐'
					});
				});
			},
			submit() {
				this.$confirm('确认处理结果?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {



				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
				/* this.$message({
					message: '已变更！',
					type: 'success'
				});
				var aData = new Date();
				this.time = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
				 */
			},
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
