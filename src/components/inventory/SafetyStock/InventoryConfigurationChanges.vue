<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">库存管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/' }">安全库存配置管理</el-breadcrumb-item>
				<el-breadcrumb-item>安全库存配置单变更</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button type="primary" @click="onsubmit()">提交</el-button>
					<el-button type="primary" @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>安全库存配置单</h3><br />

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="配置单编号">
								<span>{{form.designnumber}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="产品名称">
								<span>{{form.productname}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="产品编号">
								<span>{{form.productnumber}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="库存报警下限数">
								<input v-model="form.productname" />
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="库存报警上限数">
								<input v-model="form.productnumber" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="设置B/N或S/N">
								<span>{{form.productname}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="设计人">
								<span>{{form.productnumber}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<template>
							<el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
								<el-table-column prop="materialprice" label="序号">
								</el-table-column>
								<el-table-column prop="materialprice" label="库房名称">
								</el-table-column>
								<el-table-column prop="materialprice" label="存储地址编号">
								</el-table-column>
								<el-table-column prop="materialprice" label="存储地址名称 ">
								</el-table-column>
								<el-table-column prop="materialprice" label="存储单元简称 ">
									<template slot-scope="scope">
									<input v-model="scope.row.materialprice"></input>
									</template>
								</el-table-column>
								<el-table-column prop="materialprice" label="最大存储量 ">
									<template slot-scope="scope">
									<input v-model="scope.row.materialprice" ></input>
									</template>
								</el-table-column>
								<el-table-column prop="materialprice" label="存储单位">
									<template slot-scope="scope">
									<input v-model="scope.row.materialprice"></input>
									</template>
								</el-table-column>
							</el-table>
						</template>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="变更人">
								<input v-model="form.auditor" />
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="变更时间">
								<span>{{form.reviewtime}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="21" :push='1'>
							<el-form-item label="配置要求" style="width: 100%;">
								<el-input style="width: 100%;" v-model="form.designrequire" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容">
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
				//级联选择器
				value: [],
				options: [{
					value: '1',
					label: '电子',
					children: [{
						value: '2',
						label: '计算机',
						children: [{
							value: '3',
							label: '服务器'
						}]
					}]
				}],
				//对话框
				dialogVisible: false,
				radio: '1', //未通过
				form: {
					designnumber: '02040020201113100001', //设计单编号
					designman: '', //设计人
					productname: 'Test', //产品名称
					productnumber: '02020001010100100008', //产品编号
					materialcost: '100.00', //物料总成本
					reviewmen: 'Newer', //审核人
					reviewtime: '2020-11-16 15:30:51', //审核时间
					designrequire: '' //设计要求
				},
				tableData: [{
					materialno: '1', //序号
					materialname: '纸箱', //物料名称
					materialtype: '物料', //用途类型
					materialdescribe: '', //描述
					materialcount: '1.00', //数量
					materialunit: '', //单位
					materialprice: "9090", //单价
					materialsubtotal: '100.00' //小计
				}]
			};
		},
		methods: {
			//提交
			onsubmit() {
			},
			onSubmit() {
			},
			back() {
				this.$confirm('确定已提交?立即返回', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					location.href = "#/InventoryConfigurationChange"
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});

			},
			ins() {
				this.dialogVisible = false;
				this.value = [];
			}
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
	
	.el-input {
		border: none;
		border-bottom: 1px solid #000;
		border-radius: 0;
		text-align: center;
		font-size: 17px;
		color: #000000;
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