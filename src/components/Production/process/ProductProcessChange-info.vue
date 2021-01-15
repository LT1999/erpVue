<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">生产管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/' }">产品生产工序设计</el-breadcrumb-item>
				<el-breadcrumb-item>产品生产工序设计单查询</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button type="primary" @click="">打印</el-button>
					<el-button type="primary" @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>生产工序设计单</h3><br />
					
					<el-row>
						<el-col :span="8" :push='1' >
							<el-form-item label="设计单编号">
								<span>{{form.designnumber}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6' >
							<el-form-item label="设计人">
								<span>{{form.designman}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					
					<el-row>
						<el-col :span="8" :push='1' >
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
							<el-table-column prop="materialcount" label="工时数(小时) ">
							</el-table-column>
							<el-table-column prop="materialunit" label="工时单位 ">
							</el-table-column>
							<el-table-column prop="materialprice" label="单价工时成本 ">
							</el-table-column>
							<el-table-column prop="materialsubtotal" label="工时成本小计(元) ">
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
							<el-form-item label="审核人">
								<span>{{form.auditor}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="审核时间">
								<span>{{form.reviewtime}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="21" :push='1'>
							<el-form-item label="设计要求" style="width: 100%;">
								<span>{{form.designrequire}}</span>
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
				radio: '1', //未通过
				form: {
					state:"通过",//审核状态
					designnumber: '02040020201113100001', //设计单编号
					designman: '', //设计人
					productname: 'Test', //产品名称
					productnumber: '02020001010100100008', //产品编号
					materialcost: '100.00', //物料总成本
					reviewmen: 'Newer', //审核人
					reviewtime: '2020-11-16 15:30:51', //审核时间
					designrequire:''//设计要求
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
	
	#buttons {
		float: right;
		margin-right: 50px;
		margin-bottom: 20px;
	}
	
	input {
		outline: none;
		border:none;
		border-bottom: 1px solid #000;
	}
	
	#box>>>.el-form-item {
		margin-bottom: 0px;
	}
	
	#box>>>.el-form-item__label {
		line-height: 35px;
	}
		
	.el-row{
		margin: 10px;
	}
	h3 {
		text-align: center;
	}
	
	table {
		margin-left: 3%;
	}
	table td{
		margin-left: 50px;display: inline-block;
	}
	#box>>>.el-form-item__content {
		line-height: 35px;
	}
	#box>>>.el-table td, .el-table th {
    padding: 0px 0;
	}
</style>