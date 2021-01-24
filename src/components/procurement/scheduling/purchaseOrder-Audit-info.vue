<template>
	<div id="box">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">采购管理</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/' }">采购调度管理</el-breadcrumb-item>
			<el-breadcrumb-item>采购执行单审核</el-breadcrumb-item>
		</el-breadcrumb>

		<el-form ref="form" :model="form" label-width="130px">
			<div id="buttons">
				<el-button v-if="show" type="primary" @click="form.checkMark='审核未通过';submit()" size="small">审核不通过</el-button>
				<el-button v-if="show" type="primary" @click="form.checkMark='已审核';submit()" size="small">审核通过</el-button>
				<el-button type="primary" @click="back()" size="small">返回</el-button>
			</div>
			<el-card class="box-card">
				<h3>采购执行单</h3>

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

				<el-row>
					<template>
						<el-table :data="tableData" style="margin-left: 9%; width: 83%;" border>
							<el-table-column prop="supplierNo" label="供应商编号">
							</el-table-column>
							<el-table-column prop="supplierName" label="供应商名称">
							</el-table-column>
							<el-table-column prop="quantity" label="采购数量">
							</el-table-column>
							<el-table-column prop="price" label="单价（元）">
							</el-table-column>
							<el-table-column prop="subtotal" label="小计（元）">
							</el-table-column>
							<el-table-column prop="paymenttime" label="供货时间">
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
					<el-col :span="8" :push='2'>
						<el-form-item label="采购总数量:">
							<span>{{form.purchaseQuantity}}</span>
						</el-form-item>
					</el-col>
					<el-col :span="8" :push='7'>
						<el-form-item label="采购总金额:">
							<span>{{form.purchaseMoney}}</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" :push='2'>
						<el-form-item label="登记人:">
							<span>{{form.purchaseRegistrant}}</span>
						</el-form-item>
					</el-col>
					<el-col :span="8" :push='7'>
						<el-form-item label="登记时间:">
							<span>{{form.purchaseRegistranttime}}</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" :push='2'>
						<el-form-item label="审核人:">

							<el-input v-if="show" size="small" v-model="form.auditor" clearable :style="{width: '80%'}">
							</el-input>
							<span v-else>{{form.auditor}}</span>
						</el-form-item>
					</el-col>
					<el-col :span="8" :push='7'>
						<el-form-item label="审核时间:">
							<span>{{form.auditorTime}}</span>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- <el-row :gutter="15">
					
						<el-col :span="20" :push='1'>
							<el-form-item label="审核意见">
								<el-input v-model="form.yijian" type="textarea" placeholder="请输入审核意见" :autosize="{minRows: 4, maxRows: 4}"
								 :style="{width: '100%'}"></el-input>
							</el-form-item>
						</el-col>
						
				</el-row> -->
			</el-card>
		</el-form>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				//表单
				form: {},
				tableData: [],
				show:true
			};
		},
		methods: {
			//提交
			submit() {
				this.$http.post(this.$api + "/purchase/updateByPrimaryKey", this.$qs.stringify(this.form))
					.then(res => {
						if (res.data > 0) {
							location.href = "#/purchaseOrderAudit";
							this.$message({
								message: '审核成功',
								type: 'success'
							});

						} else {
							this.$message.error({
								message: '审核失败'
							});
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			//返回
			back() {
				this.$router.go(-1); //返回上一层
			},
			//初始化
			initializeData(row) {
				this.form = row;
				var aData = new Date();
				this.form.auditorTime =
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

			},
			isShow(url){
				if (url == "/purchaseOrderSelect") {
					this.show = false;
				} else {
					this.show = true;
				}
			}
		},
		mounted() {
			this.initializeData(this.$route.query.row);
		} ,
		beforeRouteEnter(to, from, next) {
			/* next(vm => { */
				
			/* }) */
			/* next(); */
			  next((vm) => {
			      vm.isShow(from.path);
			    });
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
