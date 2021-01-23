<template>
	<div id="box">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">采购管理</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/' }">采购调度管理</el-breadcrumb-item>
			<el-breadcrumb-item>制定采购执行单</el-breadcrumb-item>
		</el-breadcrumb>

		<el-form ref="form" :model="form" label-width="130px">
			<div id="buttons">
				<el-button type="primary" @click="" size="small">PDF打印</el-button>
				<el-button type="primary" @click="submit" size="small">提交</el-button>
				<el-button type="primary" @click="back()" size="small">返回</el-button>
			</div>
			<el-card class="box-card">
				<h3>采购执行单</h3>

				<el-row>
					<el-col :span="8" :push='1'>
						<el-form-item label="产品名称">
							<span>{{form.productName}}</span>
						</el-form-item>
					</el-col>

					<el-col :span="8" :push='6'>
						<el-form-item label="产品编号">
							<span>{{form.productNo}}</span>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<template>
						<el-table :data="tableData" style="margin-left: 5%; width: 90%;" border>
							<el-table-column prop="supplierNo" label="供应商编号">
							</el-table-column>
							<el-table-column prop="supplierName" label="供应商名称">
							</el-table-column>
							<el-table-column prop="supplierQualityRank" label="优质级别">
							</el-table-column>
							<el-table-column prop="materialtype" label="采购数量">
								<template slot-scope="scope">
									<el-input v-model="scope.row.quantity" @blur="scope.row.subtotal=scope.row.quantity*scope.row.price" clearable
									 :style="{width: '100%'}">
									</el-input>
								</template>
							</el-table-column>
							<el-table-column prop="materialdescribe" label="单价（元）">
								<template slot-scope="scope">
									<el-input v-model="scope.row.price" @blur="scope.row.subtotal=scope.row.quantity*scope.row.price" clearable
									 :style="{width: '100%'}">
									</el-input>
								</template>
							</el-table-column>
							<el-table-column prop="subtotal" label="小计（元）">
							</el-table-column>
							<el-table-column  label="供货时间">
								<template slot-scope="scope">
									<el-date-picker v-model="scope.row.paymenttime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}"
									 clearable></el-date-picker>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</el-row>
				<el-row style="margin-top: 50PX;">
					<el-col :span="8" :push='1'>
						<el-form-item label="采购总数量:">
							<span>{{form.purchaseQuantity}}</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" :push='1'>
						<el-form-item label="登记人:">
							<el-input size="small" v-model="form.purchaseRegistrant" clearable :style="{width: '100%'}">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8" :push='7'>
						<el-form-item label="登记时间:">
							<span>{{form.purchaseRegistranttime}}</span>
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
				//表单
				form: {
					/**
					 * 产品编号
					 */
					productNo: '',
					/**
					 * 产品名称
					 */
					productName: '',
					/**
					 * 采购总数量
					 */
					purchaseQuantity: '',
					/**
					 * 采购总金额
					 */
					purchaseMoney: 0,
					/**
					 * 登记人
					 */
					purchaseRegistrant: '',
					/**
					 * 登记时间
					 */
					purchaseRegistranttime: ''
				},
				tableData: [],
				purchaseDto: {
					planDetailId:''
				}

			};
		},
		methods: {
			//返回
			back() {
				location.href = "#/purchaseOrder"
			},
			//提交
			submit() {
				var amount = 0;
				this.form.purchaseMoney = 0;
				for (var i = 0; i < this.tableData.length; i++) {
					if (this.tableData[i].quantity < 1) {
						this.tableData.splice(i, 1);
						continue;
					}
					this.$delete(this.tableData[i], 'id');
					this.$delete(this.tableData[i], 'linkmanId');
					this.$delete(this.tableData[i], 'offerId');
					this.$delete(this.tableData[i], 'parentId');
					this.$delete(this.tableData[i], 'supplierArea');
					this.$delete(this.tableData[i], 'supplierId');
					this.$delete(this.tableData[i], 'supplierPhone');
					this.$delete(this.tableData[i],'supplierQualityRank');
					this.form.purchaseMoney += this.tableData[i].subtotal;
					amount += this.tableData[i].quantity;
				}
				if (this.form.purchaseQuantity == amount) {
					this.$set(this.purchaseDto, 'purchasedetailList', this.tableData);
					this.$set(this.purchaseDto, 'purchase', this.form);
					this.$http.post(this.$api+"/purchase/insert", this.$qs.stringify(this.purchaseDto, {
							arrayFormat: 'purchasedetailList',
							allowDots: true
						}))
						.then(res => {
							if (res.data > 0) {
								location.href = "#/purchaseOrder";
								this.$message({
									message: '采购执行单制定成功',
									type: 'success'
								});

							} else {
								this.$message.error({
									message: '采购执行单制定失败'
								});
							}

						})
						.catch(err => {
							console.log(err)
						})
				} else {
					this.$message.error({
						message: '采购数量与采购总数量不符'
					});
				}
			},
			initializeData(row) {
				this.form.productName = row.productName;
				this.form.productNo = row.productNo;
				this.form.purchaseQuantity = row.quantity;
				this.purchaseDto.planDetailId = row.id;
				var aData = new Date();
				this.form.purchaseRegistranttime =
					aData.getFullYear() + "-" +
					(aData.getMonth() + 1) + "-" +
					aData.getDate() + " " +
					aData.getHours() + ":" +
					aData.getMinutes() + ":" +
					aData.getSeconds();

				this.$http.post(this.$api + "/recommenddetail/selectByProductNo", "productNo=" + row.productNo)
					.then(res => {
						if (res.data != null) {
							this.tableData = res.data;
							this.tableData.forEach(item => {
								this.$set(item, 'quantity', 0);
								this.$set(item, 'price', 0);
								this.$set(item, 'subtotal', item.quantity * item.price);
								this.$set(item, "paymenttime");
							})

							console.log(this.tableData);
						} else {
							console.log('selUsers错误');
						}
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		mounted() {
			this.initializeData(this.$route.query.row);
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
