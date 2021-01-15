<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">生产管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/' }">生产调度管理</el-breadcrumb-item>
				<el-breadcrumb-item>生产派工单查询</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button type="primary" @click="">打印</el-button>
					<el-button type="primary" @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>生产派工单</h3>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="派工单编号">
								<span>{{form.designnumber}}</span>
							</el-form-item>
						</el-col>

					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="工单制定人">
								<span>{{form.state}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="出库单编号">
								<span>{{form.state}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="审核状态">
								<span>{{form.state}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="生产状态">
								<span>{{form.state}}</span>
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
							<el-form-item label="投产数量">
								<span>{{form.productname}}</span>
							</el-form-item>
						</el-col>

						<el-col :span="8" :push='6'>
							<el-form-item label="合格数量">
								<span>{{form.productnumber}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<template>
							<el-table :data="tableData" style="margin-left: 8%; width: 80%;" border>
								<el-table-column prop="materialno" label="序号">
								</el-table-column>
								<el-table-column prop="materialname" label="工序状态">
								</el-table-column>
								<el-table-column prop="materialtype" label="工序名称">
								</el-table-column>
								<el-table-column prop="materialdescribe" label="设计工时成本（元）">
								</el-table-column>
								<el-table-column prop="ss" label="实际工时成本（元）">
									<template slot-scope="scope">
										<el-button type="text">
											<el-button type="text" @click="chakan(scope.row)">查看</el-button>
										</el-button>
									</template>
								</el-table-column>
								<el-table-column prop="materialsubtotal" label="设计物料成本（元）">
								</el-table-column>
								<el-table-column prop="sss" label="实际物料成本（元） ">
									<template slot-scope="scope">
										<el-button type="text">
											<el-button type="text" @click="chakan2(scope.row)">查看</el-button>
										</el-button>
									</template>
								</el-table-column>
							</el-table>
						</template>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="设计工时总成本">
								<span>{{form.materialcost}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="设计物料总成本">
								<span>{{form.wmoney}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="实际工时总成本">
								<span>{{form.materialcost}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="实际物料总成本">
								<span>{{form.wmoney}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="登记人">
								<span>{{form.auditor}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="登记时间">
								<span>{{form.reviewtime}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="复核人">
								<span>{{form.auditor}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="复核时间">
								<span>{{form.reviewtime}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="21" :push='1'>
							<el-form-item label="备注" style="width: 100%;">
								<span>{{form.yijian}}</span>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-card>
			</el-form>
		</div>
		<el-dialog title="生产登记单" :visible.sync="dialogFormVisible" :width="width">

			<el-row>
				<el-col :span="6">
					<div class="grid-content bg-purple"><span>派工单编号</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light"><span>{{form.designnumber}}</span></div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple"><span>工序名称</span></div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light"><span>{{form.state}}</span></div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<div class="grid-content bg-purple"><span>实际工时数</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light"><span>{{form.state}}</span></div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple"><span>实际工时成本</span></div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light"><span>{{form.state}}</span></div>
				</el-col>
			</el-row>
			<el-table :data="tableData" border>
				<el-table-column prop="ss" label="序号">
				</el-table-column>
				<el-table-column prop="ss" label="负责人">
				</el-table-column>
				<el-table-column prop="ss" label="描述">
				</el-table-column>
				<el-table-column prop="ss" label="本次工时数">
				</el-table-column>
				<el-table-column prop="ss" label="单位工时成本">
				</el-table-column>
				<el-table-column prop="ss" label="本次工时成本（元）">
				</el-table-column>
				<el-table-column prop="sss" label="登记人">
				</el-table-column>
				<el-table-column prop="sss" label="登记时间">
				</el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogFormVisible = false">关闭</el-button>
			</div>
		</el-dialog>
		<el-dialog title="生产登记单" :visible.sync="dialogFormVisible2" :width="width">

			<el-row>
				<el-col :span="6">
					<div class="grid-content bg-purple"><span>派工单编号</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light"><span>{{form.designnumber}}</span></div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple"><span>工序名称</span></div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light"><span>{{form.state}}</span></div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<div class="grid-content bg-purple"><span>实际物料成本</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light"><span>{{form.state}}</span></div>
				</el-col>
			</el-row>
			<el-table :data="tableData" border>
				<el-table-column prop="ss" label="序号">
				</el-table-column>
				<el-table-column prop="ss" label="物料名称">
				</el-table-column>
				<el-table-column prop="ss" label="物料编号">
				</el-table-column>
				<el-table-column prop="ss" label="本次数量">
				</el-table-column>
				<el-table-column prop="ss" label="单位物料成本">
				</el-table-column>
				<el-table-column prop="ss" label="物料成本（元）">
				</el-table-column>
				<el-table-column prop="sss" label="登记人">
				</el-table-column>
				<el-table-column prop="sss" label="登记时间">
				</el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogFormVisible2 = false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//对话框
				width: "1000px",
				dialogFormVisible: false,
				dialogTableVisible: false,
				dialogFormVisible2: false,
				dialogTableVisible2: false,
				//表单
				form: {

					yijian: "", //审核意见
					wmoney: "32132", //物料总成本
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
					ss: "22",
					sss: "333",
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
			//查看
			chakan(row) {
				this.dialogFormVisible = true;
			},
			//查看2
			chakan2(row) {
				this.dialogFormVisible2 = true;
			},
			//返回
			back() {
				location.href = "#/ProductionSelect"
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
		margin-bottom: 8px;
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
	
	#box>>>.el-table td,
	.el-table th {
		padding: 10px 0;
	}
</style>