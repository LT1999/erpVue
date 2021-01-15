<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">生产管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/' }">产品生产工序设计</el-breadcrumb-item>
				<el-breadcrumb-item>产品生产工序设计单变更</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">

			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button type="primary" @click="drawer = true">添加工序</el-button>
					<el-button type="primary" @click="onsubmit()">提交</el-button>
					<el-button type="primary" @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>生产工序设计单</h3><br />

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="设计单编号">
								<span>{{form.designnumber}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="设计人">
								<input v-model="form.designman" />
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
						<template>
							<el-table :data="tableData" style="margin-left: 8%; width: 80%;" border>
								<el-table-column prop="materialno" label="序号">
								</el-table-column>
								<el-table-column prop="materialname" label="工序名称">
								</el-table-column>
								<el-table-column prop="materialtype" label="工序编号">
								</el-table-column>
								<el-table-column prop="materialdescribe" label="描述 ">
								</el-table-column>
								<el-table-column prop="materialcount" label="工时数 ">
								</el-table-column>
								<el-table-column prop="materialunit" label="工时单位 ">
								</el-table-column>
								<el-table-column prop="materialprice" label="单价工时成本 ">
								</el-table-column>
								<el-table-column prop="materialprice" label="操作 ">
									<template slot-scope="scope">
										<el-button type="text">
											<el-button type="text" @click="del(scope.row)">删除</el-button>
										</el-button>
									</template>
								</el-table-column>
							</el-table>
						</template>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="工时总成本">
								<span>{{form.materialcost}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="审核状态">
								<span>{{form.state}}</span>
							</el-form-item>
						</el-col>
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
							<el-form-item label="设计要求" style="width: 100%;">
								<el-input style="width: 90%;" v-model="form.designrequire" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容">

								</el-input>
							</el-form-item>
						</el-col>
					</el-row>

				</el-card>
			</el-form>
		</div>
		<el-drawer title="添加工序" :visible.sync="drawer" :with-header="false" :size="size">
			<el-table :data="gridData">
				<template>
					<el-table-column property="id" label="工序编号" width="150"></el-table-column>
					<el-table-column property="name" label="工序名称" width="200"></el-table-column>
					<el-table-column property="describe" label="工序描述"></el-table-column>
					<el-table-column prop="materialprice" label="操作 ">
						<template slot-scope="scope">
							<el-button type="text">
								<el-button type="text" @click="ins(scope.row)">添加</el-button>
							</el-button>
						</template>
					</el-table-column>
				</template>
			</el-table>
			<div class="block">
				<el-pagination style="margin-top: 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 7, 9]" :page-size="3" layout="total, sizes, prev, pager, next, jumper" :total="10">
				</el-pagination>
			</div>
		</el-drawer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//抽屉
				drawer: false,
				size: "700px",
				//抽屉table
				gridData: [{
					id: '2016-05-01',
					name: '王小虎',
					describe: '上海市普陀区金沙江路 1518 弄'
				}, {
					id: '2016-05-03',
					name: '王小虎',
					describe: '上海市普陀区金沙江路 1518 弄'
				}],
				form: {
					state: "通过", //审核状态
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
					materialprice: '100.00', //单价
					materialsubtotal: '100.00' //小计
				}]
			};
		},
		methods: {
			//提交
			onsubmit() {
				this.$message({
					type: 'success',
					message: '提交!'
				});
			},
			//添加
			ins(row) {
				this.$notify.success({
					title: '添加工序',
					message: '添加成功！',
					showClose: false
				});
			},
			//删除
			del(row) {
				this.$confirm('是否删除该生产工序?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//返回
			back() {
				location.href = "#/ProductProcessChange"
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
	
	.el-row {
		margin: 10px;
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