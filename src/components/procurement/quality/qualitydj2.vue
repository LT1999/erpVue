<template>
	<!--采购管理--采购质量控制管理--质检结果登记-->
	<div id="app">
		<div>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">采购管理</el-breadcrumb-item>
				<el-breadcrumb-item>采购质量控制管理</el-breadcrumb-item>
				<el-breadcrumb-item>质检结果登记</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-divider></el-divider>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button size="mini" type="primary">PDF打印</el-button>
					<el-button size="mini" type="primary" @click="approve">提交</el-button>
					<el-button size="mini" type="primary" @click="back()">返回</el-button>
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
							<el-table-column label="本次合格数量">
								<template slot-scope="scope">
									<el-input v-model="scope.row.checkQualified" clearable></el-input>
								</template>
							</el-table-column>
						</el-table>
					</template>

					<el-row>
						<el-col :span="8" :push='2'>
							<el-form-item label="放货数量">
								<span>{{form.releaseCargo}}</span>
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
							<el-form-item label="登记人">
								<input v-model="registrant" />
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='8'>
							<el-form-item label="登记时间">
								<span>{{registrantTime}}</span>
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
				purchaseDto: {},
				registrantTime:'',
				registrant:''
			};
		},
		methods: {
			approve() {
				this.form.productId = 1;
				var count = 0;
				this.tableData.forEach(item => {
					count += parseInt(item.checkQualified);
				})
				count += parseInt(this.form.qualifiedQuantity);
				if (count <= this.form.purchaseQuantity) {
					this.$set(this.purchaseDto, 'purchasedetailList', this.tableData);
					this.$set(this.purchaseDto, 'purchase', this.form);
					this.$set(this.purchaseDto.purchase,'purchasedetailList',this.tableData);
					this.$http.post(this.$api + "/purchase/updatePurchaseAndPurchaseDetail", this.$qs.stringify(this.purchaseDto, {
							arrayFormat: 'purchasedetailList',
							allowDots: true
						}))
						.then(res => {
							if (res.data > 0) {
								location.href = "#/qualitydJ";
								this.$message({
									message: '质检登记成功',
									type: 'success'
								});

							} else {
								this.$message.error({
									message: '质检登记失败'
								});
							}

						})
						.catch(err => {
							console.log(err)
						})
				} else {
					this.$message.error({
						message: '请输入正确的数量'
					});
				}

			},
			back() {
				this.$router.go(-1); //返回上一层
			},
			initialize(row) {
				this.form = row;
				var aData = new Date();
				this.registrantTime =
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
