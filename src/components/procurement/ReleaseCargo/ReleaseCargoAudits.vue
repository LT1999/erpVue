<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>采购管理</el-breadcrumb-item>
				<el-breadcrumb-item>放货管理</el-breadcrumb-item>
				<el-breadcrumb-item>放货审核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div id="card">
			<el-form ref="form"  :model="form" label-width="130px">
				<div id="buttons">
					<el-button type="success" @click="submit('已审核')">通过</el-button>
					<el-button type="warning" @click="submit('审核未通过')">未通过</el-button>
					<el-button type="primary" @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>放货登记单</h3><br />
					<el-form ref="form2"  :model="form2" label-width="130px">
						<el-row>
							<el-col :span="8" :push='1'>
								<el-form-item label="采购单编号">
									<span>{{form2.purchaseqNo}}</span>
								</el-form-item>
							</el-col>
							<el-col :span="8" :push='6'>
								<el-form-item label="供应商">
									<!-- <span>{{form2.purchasedetail.supplierName}}</span> -->
								</el-form-item>
							</el-col>
						</el-row>

						<el-row>
							<template>
								<el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
									<el-table-column prop="id" label="序号">
									</el-table-column>
									<el-table-column prop="productName" label="商品名称 ">
									</el-table-column>
									<el-table-column prop="productNo" label="商品编号">
									</el-table-column>
									<el-table-column prop="releaseCargo" label="已放货数量">
									</el-table-column>
									<el-table-column prop="checkReleaseCargo" label="放货数量">
									</el-table-column>
									<el-table-column prop="purchasedetail[0].price" label="单价(元)">
									</el-table-column>
									<!-- <el-table-column  label="小计(元)">
										<template slot-scope="scope">
											<span>{{scope.checkReleaseCargo}}</span>
										</template>
									</el-table-column> -->
								</el-table>
							</template>
						</el-row>
						<!-- <el-row>
							<el-col :span="8" :push='1'>
								<el-form-item label="放货件数">
									<span>{{form2.supplierName}}</span>
								</el-form-item>
							</el-col>
							<el-col :span="8" :push='6'>
								<el-form-item label="放货金额">
									<span>{{form2.supplierName}}</span>
								</el-form-item>
							</el-col>
						</el-row> -->
						<el-row>
							<el-col :span="8" :push='1'>
								<el-form-item label="审核人">
									<input></input>
								</el-form-item>
							</el-col>
							<el-col :span="8" :push='6'>
								<el-form-item label="审核时间">
									<span>{{value}}</span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="21" :push="1">
								<el-form-item label="备注" style="width: 100%;">
									<el-input style="width: 100%;" type="textarea" v-model="value1" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

					</el-form>
				</el-card>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
					value: '是',
					label: '是'
				}, {
					value: '否',
					label: '否'
				}],
				value: '',
				value1: '',
				
				form: {},
				form2: {
				},
				tableData: []

			};
		},
		methods: {
			submit(check) {
				if(check==='已审核'){
					this.tableData[0].releaseCargo+=this.tableData[0].checkReleaseCargo;
					this.tableData[0].checkReleaseCargo=0;
					if(this.tableData[0].releaseCargo==this.tableData[0].purchaseQuantity){
						this.tableData[0].releaseCargoCheck='已审核';
					}else{
						this.tableData[0].releaseCargoCheck='待登记';
					}
				}else{
					this.tableData[0].checkReleaseCargo=0;
					this.tableData[0].releaseCargoCheck='待登记';
				}
				this.$http.post(this.$api + "/purchase/updateByKeyReleaseCargo",this.$qs.stringify(this.tableData[0], {
							arrayFormat: 'purchaseList',
							allowDots: true
						}))
					.then(res => {
						if (res.data >0) {
							this.$message({
								message: '提交成功！',
								type: 'success',
								duration: 1000
							});
							this.$router.go(-1);}
					})
					.catch(err => {
						console.log(err)
					});
			},
			back() {
				this.$confirm('审核已完成?立即返回', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					location.href = "#/ReleaseCargoAudit"
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			initialize(arr){
				this.form2=arr;
				/* this.$set(this.form2,"supplierName",arr.purchasedetail[0].supplierName); */
				this.tableData[0]=arr;
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
				time = year + "-" + month + "-" + date;
				this.value = time;
			}
		},
		mounted() {
			this.initialize(this.$route.query.arr);
			this.shijian();
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
		margin-bottom: 20px;
	}

	input {
		outline: none;
		border: none;
		border-bottom: 1px solid #000;
		width: 12.5rem;
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
