<template>
	<!-- 采购管理--采购质量控制管理--质检结果登记复核-->
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>采购管理</el-breadcrumb-item>
				<el-breadcrumb-item>采购质量控制管理</el-breadcrumb-item>
				<el-breadcrumb-item>质检结果登记复核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button size="mini" type="primary" plain @click="approve('已审核')">复核通过</el-button>
					<el-button size="mini" type="primary" plain @click="approve('审核未通过')">复核不通过</el-button>
					<el-button size="mini" type="primary" plain @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>质检登记单</h3><br />
					<el-row>
						<el-col :span="8" :push='2'>
							<el-form-item label="执行单编号">
								<span>{{form.purchaseqNo}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6" :push='2'>
							<el-form-item label="产品名称">
								<span>{{form.productName}}</span>
							</el-form-item>
						</el-col>

						<el-col :span="8" :push='2'>
							<el-form-item label="产品编号">
								<span>{{form.productNo}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<template>
						<el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
							<el-table-column prop="supplierNo" label="供应商编号" width="200px">
							</el-table-column>
							<el-table-column prop="supplierName" label="供应商名称">
							</el-table-column>
							<!-- <el-table-column label="联系人">
									<template slot-scope="stockcount">
										<el-input v-model="rk" clearable></el-input>
									</template>
								</el-table-column>
								<el-table-column label="电话">
									<template slot-scope="stockcount">
										<el-input v-model="dh" clearable></el-input>
									</template>
								</el-table-column> -->
							<el-table-column prop="subtotal" label="采购金额">
							</el-table-column>
							<el-table-column prop="quantity" label="采购数量">
							</el-table-column>
							<el-table-column prop="qualifiedQuantity" label="已收合格数量">
								<template slot-scope="scope">
									<span v-if="scope.row.qualifiedQuantity">{{scope.row.qualifiedQuantity}}</span>
									<span v-else>0</span>
								</template>
							</el-table-column>
							<el-table-column prop="checkQualified" label="本次合格数量">
							</el-table-column>
						</el-table>
					</template>

					<el-row>
						<el-col :span="8" :push='2'>
							<el-form-item label="采购数量">
								<span>{{form.purchaseQuantity}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='8'>
							<el-form-item label="已合格数量">
								<span>{{form.qualifiedQuantity}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='2'>
							<el-form-item label="复核人">
								<input v-model="auditor" />
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='8'>
							<el-form-item label="复核时间">
								<span>{{auditorTime}}</span>
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
				form: {},
				tableData: [],
				auditor: '',
				auditorTime: '',
				purchaseDto: {},
				gatherDto:{
					gather:{},
					gatherDetail:{}
				}

			};
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			back() {
				this.$router.go(-1); //返回上一层
			},
			approve(check) { //审核通过
				this.form.productId = 0;
				var count = 0;
				if (check=='已审核') {
					this.tableData.forEach(item => {
						count += parseInt(item.checkQualified);
						item.qualifiedQuantity += item.checkQualified;
						item.checkQualified = 0;
					})
					count += parseInt(this.form.qualifiedQuantity);
					this.form.qualifiedQuantity = count;
				}
				this.$set(this.purchaseDto, 'purchasedetailList', this.tableData);
				this.$set(this.purchaseDto, 'purchase', this.form);
				this.$http.post(this.$api + "/purchase/updatePurchaseAndPurchaseDetail", this.$qs.stringify(this.purchaseDto, {
						arrayFormat: 'purchasedetailList',
						allowDots: true
					}))
					.then(res => {
						if (res.data > 0) {
							location.href = "#/qualitydJ";
							this.$message({
								message: '质检登记复核成功',
								type: 'success'
							});
				
						} else {
							this.$message.error({
								message: '质检登记复核失败'
							});
						}
				
					})
					.catch(err => {
						console.log(err)
					})
			 	if (count == this.form.purchaseQuantity) { 
					/* 入库数量 */
					this.$set(this.gatherDto.gather,"amountSum",count);
					//总金额
					this.$set(this.gatherDto.gather,"costPriceSum",this.form.purchaseMoney);
					//产品编号
					this.$set(this.gatherDto.gatherDetail,"productId",this.form.productNo);
					//产品名称
					this.$set(this.gatherDto.gatherDetail,"productName",this.form.productName);
					//数量
					this.$set(this.gatherDto.gatherDetail,"amount",count);
					//单价
					this.$set(this.gatherDto.gatherDetail,"costPrice",this.form.purchaseMoney/count);
					//小计
					this.$set(this.gatherDto.gather,"subtotal",this.form.purchaseMoney);
					console.log(this.gatherDto);
					this.$http.post("http://localhost:8080/Erp-web/gather/insertPurchase.do", this.$qs.stringify(this.gatherDto,{allowDots: true}))
						.then(res => {
							if (res.data > 0) {
								this.$message({
									message: '采购入库成功',
									type: 'success'
								});
					
							} else {
								this.$message.error({
									message: '采购入库失败'
								});
							}
					
						})
						.catch(err => {
							console.log(err)
						})
					
			 	} 

			},
			initialize(row) {
				this.form = row;
				var aData = new Date();
				this.auditorTime =
					aData.getFullYear() + "-" +
					(aData.getMonth() + 1) + "-" +
					aData.getDate() + " " +
					aData.getHours() + ":" +
					aData.getMinutes() + ":" +
					aData.getSeconds();
				this.$http.post(this.$api + "/purchasedetail/selectByParentId", 'parentId=' + row.id)
					.then(res => {
						if (res.data != null) {
							this.tableData = res.data;
						} else {
							console.log('错误');
						}
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		mounted() {
			this.initialize(this.$route.query.row);
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
