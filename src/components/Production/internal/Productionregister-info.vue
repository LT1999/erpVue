<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>生产管理</el-breadcrumb-item>
				<el-breadcrumb-item>生产计划管理</el-breadcrumb-item>
				<el-breadcrumb-item>生产计划审核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button size="mini" type="primary" plain @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>生产登记单</h3><br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="派工单编号">
								<span>{{form.manufactureId}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="数量">
								<span>{{form.amount}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<!-- <el-row>
						<el-col :span="8" :push='1'>
							
						</el-col>
						<el-col :span="8" :push='5'>
							
						</el-col>
					</el-row> -->

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="产品名称">
								<span>{{form.productName}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="产品编号">
								<span>{{form.productId}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<template>
						<el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
							<el-table-column prop="procedureName" label="工序名称">
							</el-table-column>
							<el-table-column prop="labourHourAmount" label="设计工时数">
							</el-table-column>
							<el-table-column prop="realLabourHourAmount" label="实际工时数 ">
							</el-table-column>
							<el-table-column prop="subtotal" label="设计工时成本(元)">
							</el-table-column>
							<el-table-column prop="realSubtotal" label="实际工时成本(元)">
							</el-table-column>
							<el-table-column prop="moduleSubtotal" label="设计物料成本(元)">
							</el-table-column>
							<el-table-column prop="realModuleSubtotal" label="实际物料成本(元)">
							</el-table-column>

							<el-table-column label="登记复核">
								<template slot-scope="scope">
									<el-button v-if="scope.row.procedureFinishTag=='已审核'" type="text">完成</el-button>
									<el-button v-else size="mini" @click="reviewButton(scope.row)" type="success" plain>复核</el-button>
								</template>
							</el-table-column>
							<el-table-column label="交接复核">
								<template slot-scope="scope">
									<div v-if="scope.row.procedureFinishTag=='已审核'">
										<el-button v-if="scope.row.procedureTransferTag=='已交接'" @click="showConnect(scope.row)" type="success" size="mini"
										 plain>交接复核</el-button>
										<el-button v-else type="text">完成</el-button>
									</div>
								</template>
							</el-table-column>

						</el-table>
					</template>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="设计工时总成本">
								<span>{{form.labourCostPriceSum}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="设计物料总成本">
								<span>{{form.moduleCostPriceSum}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="实际工时总成本">
								<span>{{form.realLabourCostPriceSum}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="实际物料总成本">
								<span>{{form.realModuleCostPriceSum}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="登记人">
								<span>{{form.register}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="登记时间">
								<span>{{form.registerTime}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="审核人">
								<span>{{form.checker}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="审核时间">
								<span>{{form.checkTime}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="21" :push='1'>
							<el-form-item label="备注" style="width: 100%;">
								<el-input style="width: 100%;" v-model="form.remark" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"
								 placeholder="请输入内容">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>

				</el-card>
			</el-form>

			<el-dialog title="交接复核" :visible.sync="dialogFormVisible" width="30%">
				<el-form :model="connectForm">
					<el-form-item label="投产数量:">
						{{connectForm.production}}
					</el-form-item>
					<el-form-item label="本工序合格数量:">
						<el-input v-model="connectForm.realAmount" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="connect">确 定</el-button>
				</div>
			</el-dialog>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
				tableData: [],
				dialogFormVisible: false,
				connectForm: {
					realAmount: 0,//工序合格数量
					production: 0,//投产数量
					manufactureId: '',//总表id
					procedureId: ''//生产工序表id
				},
				complete:true
			};
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			back() {
				location.href = "#/productionregister"
			},
			showConnect(row){
				this.connectForm.manufactureId=this.form.id;
				this.connectForm.procedureId=row.id;
				this.connectForm.realAmount=row.realAmount;
				this.connectForm.production=row.demandAmount;
				this.dialogFormVisible=true;
			},
			connect(){
				this.tableData.forEach(item=>{
					if(item.procedureTransferTag=='未交接'){
						this.complete=false;
					}
					
				})
				if(this.complete){
					this.$set(this.connectForm,'productId',this.form.productId);
					this.$http.post("http://localhost:8080/Erp-web/manufacture/lastConnectAudit.do", this.$qs.stringify(this.connectForm))
					.then(res => {
						if(res.data>0){
							location.href = "#/Productionregister";
							this.$message({
								message: '交接复核成功',
								type: 'success'
							});
							this.$notify({
								title: '提示',
								message: '产品生产完成，请入库',
								type: 'success',
								position: 'bottom-right'
							});
							
						}else{
							this.$message.error({
								message: '交接复核失败'
							});
						}
					})
					.catch(err => {
						console.log(err)
					})
				}else{
					this.$delete(this.connectForm,'productId');
					this.$http.post("http://localhost:8080/Erp-web/manufacture/connectAudit.do", this.$qs.stringify(this.connectForm))
					.then(res => {
						if(res.data>0){
							location.href = "#/Productionregister";
							this.$message({
								message: '交接复核成功',
								type: 'success'
							});
							
						}else{
							this.$message.error({
								message: '交接复核失败'
							});
						}
						
					})
					.catch(err => {
						console.log(err)
					})
				}
				
				this.dialogFormVisible=false;
			},
			reviewButton(row) {
				this.$router.push({
					path: '/productionregister-info2',
					query: {
						rows: row,
						manufacture: this.form
					}
				});
			},
			initialize(row) {
				this.$http.post("http://localhost:8080/Erp-web/procedure/selectByParentId.do", "parentId=" + this.form.id)
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			}

		},
		mounted() {
			this.form = this.$route.query.rows;
			this.initialize(this.$route.query.rows);
		},
		beforeRouteEnter(to, from, next) { //路由守卫判断路由是从哪里跳转，如果是则保持数据，否则刷新
			if (from.path == "/Productionregister-info2") {
				to.meta.isBack = true;
			}
			next();
		},
		activated() { //为了在其他页面进入时，更新页面中的列表数据，我们将在activated钩子函数中挂载页面初次进入时的请求数据
			if (!this.$route.meta.isBack) {
				this.initialize(this.$route.query.rows);
			}
			this.$route.meta.isBack = false;
		}
	}
</script>

<style scoped>
	/* #head {
		padding: 30px;
	} */

	.box-card {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		padding-bottom: 23px;
	}

	#box>>>.el-table th {
		text-align: center;
	}

	#box>>>.el-table td {
		padding: 0px;
		height: 50px;
		line-height: 50px;
		text-align: center;
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
