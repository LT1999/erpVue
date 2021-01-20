<template>
	<div id="box">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">采购管理</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/' }">采购调度管理</el-breadcrumb-item>
			<el-breadcrumb-item>采购执行单审核</el-breadcrumb-item>
		</el-breadcrumb>

		<el-form ref="form" :model="form" label-width="130px">
			<div id="buttons">
				<el-button type="primary" @click="" size="small">审核不通过</el-button>
				<el-button type="primary" @click="" size="small">审核通过</el-button>
				<el-button type="primary" @click="back()" size="small">返回</el-button>
			</div>
			<el-card class="box-card">
				<h3>采购执行单</h3>

				<el-row>
					<el-col :span="8" :push='1'>
						<el-form-item label="执行单编号">
							<span>{{form.productnumber}}</span>
						</el-form-item>
					</el-col>
					<el-col :span="5" :push='1'>
						<el-form-item label="产品名称">
							<span>{{form.productname}}</span>
						</el-form-item>
					</el-col>

					<el-col :span="8" :push='1'>
						<el-form-item label="产品编号">
							<span>{{form.productnumber}}</span>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<template>
						<el-table :data="tableData" style="margin-left: 8%; width: 80%;" border>
							<el-table-column prop="materialno" label="供应商编号">
							</el-table-column>
							<el-table-column prop="materialname" label="供应商名称">
							</el-table-column>
							<el-table-column prop="materialtype" label="采购数量">
							</el-table-column>
							<el-table-column prop="materialdescribe" label="单价（元）">
							</el-table-column>
							<el-table-column prop="ss" label="小计（元）">
							</el-table-column>
							<el-table-column prop="materialsubtotal" label="供货时间">
							</el-table-column>
							<!-- <el-table-column prop="assembletable" label="操作">
								<template slot-scope="scope">
									<el-button type="text">
										<el-button type="text" @click="back">查看</el-button>
									</el-button>
								</template>
							</el-table-column> -->
						</el-table>
					</template>
				</el-row>
				<el-row style="margin-top: 50PX;">
					<el-col :span="8" :push='1'>
						<el-form-item label="采购总数量:">
							<span>{{form.materialcost}}</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" :push='1'>
						<el-form-item label="登记人:">
							<span>{{form.auditor}}</span>
						</el-form-item>
					</el-col>
					<el-col :span="8" :push='7'>
						<el-form-item label="登记时间:">
							<span>{{form.reviewtime}}</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" :push='1'>
						<el-form-item label="审核人:">
							<span>{{form.auditor}}</span>
						</el-form-item>
					</el-col>
					<el-col :span="8" :push='7'>
						<el-form-item label="审核时间:">
							<span>{{form.reviewtime}}</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="15">
					
						<el-col :span="20" :push='1'>
							<el-form-item label="审核意见">
								<el-input v-model="form.yijian" type="textarea" placeholder="请输入审核意见" :autosize="{minRows: 4, maxRows: 4}"
								 :style="{width: '100%'}"></el-input>
							</el-form-item>
						</el-col>
						
				</el-row>
			</el-card>
		</el-form>

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
				location.href = "#/ProductionDispatchSelect"
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
		padding: 0px 0px;
	}

	/deep/.el-table .cell {
		padding: 0px;
		margin: 0px;
	}

	/deep/.el-table th {
		background-color: #F2F8FD;
		text-align: center;
		height: 50px;
		line-height: 50px;
		padding: 0px;
	}

	/deep/.el-table td {
		padding: 0px;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}

	/deep/.el-table tr {
		padding: 0px;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}
</style>
