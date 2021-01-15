<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">生产管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/' }">工序物料设计</el-breadcrumb-item>
				<el-breadcrumb-item>工序物料设计单变查询</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button type="primary" @click="">打印</el-button>
					<el-button type="primary" @click="back">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>工序物料设计单</h3><br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="登记时间">
								<span>{{form.time}}</span>
							</el-form-item>
						</el-col>

						<el-col :span="8" :push='6'>
							<el-form-item label="工序名称">
								<span>{{form.name}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="登记人">
								<span>{{form.man}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="设计单编号">
								<span>{{form.number}}</span>
							</el-form-item>
						</el-col>

					</el-row>

					<el-row>
						<template>
							<el-table :data="tableData" style="margin-left: 8%; width: 80%;" border>
								<el-table-column prop="id" label="序号">
								</el-table-column>
								<el-table-column prop="name" label="物料名称">
								</el-table-column>
								<el-table-column prop="wid" label="物料编号">
								</el-table-column>
								<el-table-column prop="miaoshu" label="描述 ">
								</el-table-column>
								<el-table-column prop="count" label="本工序数量">
								</el-table-column>
								<el-table-column prop="danwei" label="单位 ">
								</el-table-column>
								<el-table-column prop="money" label="单价(元) ">
								</el-table-column>
								<el-table-column prop="moneys" label="小计(元) ">
								</el-table-column>
							</el-table>
						</template>
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
					id: '1', //序号
					name: '纸箱', //物料名称
					wid: '物料', //物料编号
					miaoshu: '', //描述
					count: '1.00', //本工序数量
					danwei: '', //单位
					money: '100.00', //单价
					moneys: '100.00' //小计
				}]
			};
		},
		methods: {
			//返回
			back() {
				location.href = "#/MaterialDesignChangeInfo"
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
		margin-bottom:5px;
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
	#box>>>.el-table td, .el-table th {
    padding: 0px 0;
	}
</style>