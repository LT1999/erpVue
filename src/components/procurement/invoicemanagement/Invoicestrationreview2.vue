<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>采购管理</el-breadcrumb-item>
				<el-breadcrumb-item>采购发票管理</el-breadcrumb-item>
				<el-breadcrumb-item>发票信息复核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button size="mini" type="success" plain @click="onSubmit">审核通过</el-button>
					<el-button size="mini" type="primary" plain @click="back">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>发票登记单</h3><br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="执行单编号">
								<span>{{this.$route.query.arr.purchaseqNo}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="产品编号">
								<span>{{this.$route.query.arr.productNo}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="产品名称">
								<span>{{this.$route.query.arr.productName}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<template>
						<el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
							<el-table-column prop="supplierName" v-model="form.storeId" label="供应商名称">
							</el-table-column>
							<el-table-column prop="supplierNo" label="供应商编号">
							</el-table-column><!-- 
							<el-table-column prop="purchaseQuantity" label="采购总数量">
							</el-table-column> -->
							<el-table-column prop="shouldinvoicemoney" label="应开票金额">
							</el-table-column>
							<el-table-column prop="Noinvoice" label="已支出发票总额">
							</el-table-column>
							<el-table-column prop="Nowinvoice" label="本次支出发票金额">
								<template slot-scope="scope">
									<el-input v-model="form.Nowinvoice" clearable>
									</el-input>
								</template>
							</el-table-column>

						</el-table>
					</template>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="应开票总额">
								<span>{{this.$route.query.arr.shouldinvoicemoney}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="已支出发票总额">
								<span>{{form.invoicemoney2}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="复核人">
								<input v-model="form.auditor" />
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="复核时间">
								<span>{{form.auditorTime}}</span>
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
					id: this.$route.query.arr.id, //id
					purchaseqNo: this.$route.query.arr.purchaseqNo, //采购编号
					productNo: this.$route.query.arr.productNo, //产品编号
					productName: this.$route.query.arr.productName, //产品名称
					supplierNo: this.$route.query.arr.supplierNo, //供应商编号
					supplierName: this.$route.query.arr.supplierName, //供应商名称
					invoicemoney: '', //已开票金额
					invoicemoney2: this.$route.query.arr.invoicemoney, //已开票金额
					shouldinvoicemoney: this.$route.query.arr.shouldinvoicemoney, //应开票金额
					registrant: this.$route.query.arr.registrant, //登记人
					registranttime: this.$route.query.arr.registranttime, //登记时间
					auditor: '', //审核人
					auditorTime: '', //审核时间
					checkMark: '已审核' ,//审核标志
					Nowinvoice:'0'//本次支出金额
				},
				tableData: [{
					supplierName: this.$route.query.arr.supplierName, //供应商名称
					supplierNo: this.$route.query.arr.supplierNo, ////供应商编号
					purchaseQuantity: this.$route.query.arr.purchaseQuantity, //
					shouldinvoicemoney: this.$route.query.arr.shouldinvoicemoney,
					Noinvoice: this.$route.query.arr.invoicemoney, //已开票金额
					Nowinvoice: '',//本次支出发票金额
				}]
			};
		},
		methods: {
			onSubmit() { 
				this.form.invoicemoney=parseInt(this.form.Nowinvoice)+parseInt(this.form.invoicemoney2);
				//+parseInt(this.form.Nowinvoice)
				console.log(this.form.invoicemoney);//updateByPrimaryKey
				var number=parseInt(this.form.shouldinvoicemoney)-parseInt(this.form.invoicemoney2);
				if(parseInt(this.form.Nowinvoice)>number){
					this.$message({
						message: '您填写的本次开票金额太大请重新填写',
						type: 'warning'
					}); 
				}else{
					this.$http.post("http://localhost:8081/invoice/updateByPrimaryKey", this.$qs.stringify(this.form))
										.then(res => {
											this.$message({
												message: '审核成功',
												type: 'success'
											});
											location.href = "#/Invoicestrationreview"
									
										})
										.catch(err => {
											console.log("审核失败" + err);
										});
					        
				}
				/* this.$http.post("http://localhost:8081/invoice/updateByPrimaryKey", this.$qs.stringify(this.form))
						.then(res => {
							this.$message({
								message: '审核成功',
								type: 'success'
							});
							location.href = "#/Invoicestrationreview"
					
						})
						.catch(err => {
							console.log("审核失败" + err);
						}); */
			},
			back() {
				location.href = "#/Invoicestrationreview"
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
				this.form.auditorTime = time;
			},

		},
		created() {
			this.shijian();
		}
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
