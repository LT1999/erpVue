<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>采购管理</el-breadcrumb-item>
				<el-breadcrumb-item>采购发票管理</el-breadcrumb-item>
				<el-breadcrumb-item>发票信息登记</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button size="mini" type="success" plain @click="onSubmit">提交</el-button>
					<el-button size="mini" type="primary" plain @click="back">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>发票登记单</h3><br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="执行单编号">
								<span>{{this.$route.query.arr.purchase.purchaseqNo}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="产品编号">
								<span>{{this.$route.query.arr.purchase.productNo}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="产品名称">
								<span>{{this.$route.query.arr.purchase.productName}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<template>
						<el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
							<el-table-column prop="supplierName" v-model="form.storeId" label="供应商名称">
							</el-table-column>
							<el-table-column prop="supplierNo" label="供应商编号">
							</el-table-column>
							<el-table-column prop="purchaseQuantity" label="采购总数量">
							</el-table-column>
							<el-table-column prop="purchaseMoney" label="应开票金额">
							</el-table-column>
							<el-table-column prop="Noinvoice" label="已支出发票总额">
							</el-table-column>
							<el-table-column prop="Nowinvoice" label="本次支出金额">
								<template slot-scope="scope">
									<el-input v-model="form.invoicemoney" clearable>
									</el-input>
								</template>
							</el-table-column>

						</el-table>
					</template>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="应开票总额">
								<span>{{this.$route.query.arr.purchase.purchaseMoney}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="已支出发票总额">
								<span>0.00</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="登记人">
								<input v-model="form.registrant" />
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="登记时间">
								<span>{{form.registranttime}}</span>
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
				
				form: {
					id:this.$route.query.arr.purchase.id,//id
					purchaseqNo:this.$route.query.arr.purchase.purchaseqNo,//采购编号
					productNo:this.$route.query.arr.purchase.productNo,//产品编号
					productName:this.$route.query.arr.purchase.productName,//产品名称
					supplierNo:this.$route.query.arr.purchasedetail.supplierNo,//供应商编号
					supplierName:this.$route.query.arr.purchasedetail.supplierName,//供应商名称
					invoicemoney:0,//已开票金额
					shouldinvoicemoney:this.$route.query.arr.purchase.purchaseMoney,//应开票金额
					registrant:'',//登记人
					registranttime: '', //复核时间
					checkMark:'未审核'//审核标志
				},
				tableData: [{
					supplierName: this.$route.query.arr.purchasedetail.supplierName, //供应商名称
					supplierNo:this.$route.query.arr.purchasedetail.supplierNo,////供应商编号
					purchaseQuantity:this.$route.query.arr.purchase.purchaseQuantity,//
					purchaseMoney:this.$route.query.arr.purchase.purchaseMoney,
					Noinvoice:'0.00',//已开票金额
					Nowinvoice:'',
				}]
			};
		},
		methods: {
			onSubmit() {
				this.$http.post("http://localhost:8081/invoice/insert", this.$qs.stringify(this.form))
					.then(res => {
						this.$message({
							message: '登记成功',
							type: 'success'
						});
						location.href = "#/Invoicestration"
				
					})
					.catch(err => {
						console.log("登记失败" + err);
					});
			},
			back() {
				location.href = "#/Invoicestration"
			},
			shijian() {
				var now = new Date();
				var year = now.getFullYear(); //得到年份
				var month = now.getMonth(); //得到月份
				var date = now.getDate(); //得到日期

				month = month + 1;
				if (month < 10) month = "0" + month;
				if (date < 10) date = "0" + date;
				var time = "";
				time = year + "-" + month + "-" + date + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
				this.form.registranttime = time;
			},
			
		},
		created() {
			
			this.shijian();
		},
	}
</script>

<style scoped>
	#box>>>.el-table th {
		text-align: center;
	}

	#box>>>.el-table td {
		padding: 0px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}

	.box-card {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		padding-bottom: 20px;
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
