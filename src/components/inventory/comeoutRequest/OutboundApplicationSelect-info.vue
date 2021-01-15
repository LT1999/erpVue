<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">库存管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/' }">出库申请管理</el-breadcrumb-item>
				<el-breadcrumb-item>出库申请查询</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button type="primary" @click="">打印</el-button>
					<el-button type="primary" @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>出库申请单</h3><br />

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="申请单编号">
								<span>{{this.$route.query.payId}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="审核状态">
								<span>{{this.$route.query.checkTag}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="借领状态">
								<span></span>
							</el-form-item>
						</el-col>

						<el-col :span="8" :push='6'>
							<el-form-item label="归还状态">
								<span></span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="出库人">
								<span>{{this.$route.query.storer}}</span>
							</el-form-item>
						</el-col>

						<el-col :span="8" :push='6'>
							<el-form-item label="出库人编号">
								<span></span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="出库理由">
								<span>{{this.$route.query.reason}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="归还时间">
								<span></span>
							</el-form-item>
						</el-col>

					</el-row>

					<el-row>
						<template>
							<el-table :data="tableData" style="margin-left: 8%; width: 80%;" border>
								<el-table-column prop="id" label="序号">
								</el-table-column>
								<el-table-column prop="productName" label="产品名称">
								</el-table-column>
								<el-table-column prop="productId" label="产品编号" width="200px">
								</el-table-column>
								<el-table-column prop="productDescribe" label="描述 ">
								</el-table-column>
								<el-table-column prop="amount" label="数量">
								</el-table-column>
								<el-table-column prop="amountUnit" label="单位">
								</el-table-column>
								<el-table-column prop="costPrice" label="成本单价(元) ">
								</el-table-column>
								<el-table-column prop="subtotal" label="小计(元) ">
								</el-table-column>
							</el-table>
						</template>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="总件数">
								<span>{{this.$route.query.amountSum}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="总金额">
								<span>{{this.$route.query.costPriceSum}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="登记人">
								<span>{{this.$route.query.register}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="登记时间">
								<span>{{this.$route.query.registerTime}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="审核人">
								<span>{{this.$route.query.checker}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="审核时间">
								<span>{{this.$route.query.checkTime}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="21" :push='1'>
							<el-form-item label="备注" style="width: 100%;">
								<span>{{this.$route.query.remark}}</span>
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
    created() {
      this.selectPayDetailsAll();
    },
		data() {
			return {
        id:0,
				radio: '1', //未通过
				form: {
				},
				tableData: []
			}
		},
		methods: {
			//返回
			back() {
				location.href = "#/OutboundApplicationSelect"
			},
      selectPayDetailsAll(){
        this.id=this.$route.query.id;
        var demo = new URLSearchParams()
        demo.append("prid", this.id);
        this.$http.post('http://localhost:8080/Erp-web/pay-details/selectPayDetailsAll.do', demo).then((response) => {
        						this.tableData = response.data;
        				}).catch((error) => {
        					console.log(error)
        				})
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
		margin-bottom: 5px;
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
		padding: 0px 0;
	}
</style>
