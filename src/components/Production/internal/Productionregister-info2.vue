<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>生产管理</el-breadcrumb-item>
				<el-breadcrumb-item>生产计划管理</el-breadcrumb-item>
				<el-breadcrumb-item>生产计划审核
					<a>(责任人控制)</a>
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="proceduring" :model="manufacture" label-width="130px">
				<div id="buttons">
					<el-button size="mini" type="primary" plain @click="onSubmit()">复核通过</el-button>
					<el-button size="mini" type="primary" plain @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>生产登记单</h3><br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="派工单编号">
								<span>{{manufacture.manufactureId}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="工序名称">
								<span>{{procedure.procedureName}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="负责人">
								<span>{{proceduring.procedureResponsiblePerson}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="设计工时数">
								<span>{{procedure.labourHourAmount}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="已用工时数">
								<span>{{procedure.realLabourHourAmount}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="本次工时数">
								<span>{{proceduring.labourHourAmount}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<template>
						<el-table :data="procedureModule" style="margin-left: 8%; width: 85%;" border>
							<el-table-column prop="id" label="序号">
							</el-table-column>
							<el-table-column prop="productName" label="物料名称">
							</el-table-column>
							<el-table-column prop="productId" label="物料编号" width="200px">
							</el-table-column>
							<el-table-column prop="amount" label="设计数量">
							</el-table-column>
							<el-table-column prop="replenish" label="补充数量">
							</el-table-column>
							<el-table-column prop="realAmount" label="已使用数量">
							</el-table-column>
							<el-table-column prop="thisAmount" label="本次使用数量">
							</el-table-column>
						</el-table>
					</template>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="复核人">
								<el-input v-model="proceduring.checker" size="small"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="复核时间">
								<span>{{proceduring.checkTime}}</span>
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
				proceduring: {}, //生产工序过程记录
				procedureModuling: [], //生产工序物料过程记录
				procedureModule: [], //生产工序物料
				procedure: {}, //生产工序表数据
				manufacture: {}, //生产总表数据
				dto: {}
			};
		},
		methods: {
			onSubmit() {
				if (this.proceduring) {
					this.manufacture.manufactureProcedureTag = "待登记"; //设置总表生产过程标志

					this.procedure.realLabourHourAmount = this.procedure.realLabourHourAmount +
						this.proceduring.labourHourAmount; //设置生产工序表的实际工时数
					this.procedure.realSubtotal = this.procedure.realSubtotal +
						this.proceduring.subtotal; //设置生产工序表的实际工时成本

					if (this.procedure.procedureFinishTag == '未完成') {
						this.procedure.procedureFinishTag = '未开始';
					} else if (this.procedure.procedureFinishTag == '已完成') {
						this.procedure.procedureFinishTag = '已审核';
					}

					this.procedureModuling.forEach(item => {
						this.procedure.realModuleSubtotal = this.procedure.realModuleSubtotal +
							item.subtotal; //设置生产工序表的实际物料成本

						this.procedureModule.forEach(procedureModuleItem => {
							if (procedureModuleItem.detailsInt == item.detailsInt) {
								procedureModuleItem.realAmount = procedureModuleItem.realAmount +
									item.thisAmount; //设置生产工序物料的实际使用数量
								procedureModuleItem.realSubtotal = procedureModuleItem.realAmount *
									procedureModuleItem.costPrice; //设置生产工序物料的实际物料成本小计
							}
						})
					})

					this.manufacture.realModuleCostPriceSum = this.manufacture.realModuleCostPriceSum +
						this.procedure.realModuleSubtotal; //设置总表实际物料总成本
					this.manufacture.realLabourCostPriceSum = this.manufacture.realLabourCostPriceSum +
						this.procedure.realSubtotal; //设置总表实际工时总成本


					this.$set(this.dto, 'manufacture', this.manufacture); //生产总表
					this.$set(this.dto, 'procedure', this.procedure); //生产工序表
					this.$set(this.dto, 'procedureModule', this.procedureModule); //生产工序物料表
					this.$set(this.dto, 'proceduring', this.proceduring); //生生产工序过程记录
					console.log(this.dto);

					this.$http.post("http://localhost:8080/Erp-web/manufacture/updateRatify.do", this.$qs.stringify(this.dto, {
							arrayFormat: 'procedureModule',
							allowDots: true
						}))
						.then(res => {
							if(res.data>0){
								location.href = "#/Productionregister";
								this.$message({
									message: '复核成功',
									type: 'success'
								});
								
							}else{
								this.$message.error({
									message: '复核失败'
								});
							}
						})
						.catch(err => {

						})


				} else {
					this.$message.error('该工序未进行登记');
				}

			},
			back() {
				this.$router.go(-1);
			},
			initialize() {
				//通过生产总表id与工序编号查询，生产工序过程记录未审核数据
				var demo = new URLSearchParams()
				demo.append("parentId", this.manufacture.id);
				demo.append("procedureId", this.procedure.procedureId);
				this.$http.post("http://localhost:8080/Erp-web/proceduring/selectParentIdAndDetailsInt.do", demo)
					.then(res => {
						this.proceduring = res.data;
						//审核时间
						var aData = new Date();
						this.proceduring.checkTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();

						//通过生产工序过程记录id,查询生产工序物料过程记录
						this.$http.post("http://localhost:8080/Erp-web/procedure-moduling/selectByparentNumber.do", "parentNumber=" +
								this.proceduring.id)
							.then(res => {
								this.procedureModuling = res.data;
								if (res.data.length > 0) {
									//通过传过来的工序id查询工序物料
									this.$http.post("http://localhost:8080/Erp-web/procedure-module/selectByParentId.do", "parentId=" + this.procedure
											.id)
										.then(res => {
											this.procedureModuling.forEach(procedureModuleItem => {
												res.data.forEach(item => {

													if (procedureModuleItem.detailsInt == item.detailsInt) {
														this.$set(item, "thisAmount", procedureModuleItem.thisAmount);
													}
													this.$set(item, "replenish", 0); //item.renewAmount-item.amount
												})
											})
											this.procedureModule = res.data;
										})
										.catch(err => {
											console.log(err)
										})

								}

							})
							.catch(err => {
								console.log(err)
							})

					})
					.catch(err => {
						console.log(err)
					})



			}
		},
		mounted() {
			this.procedure = this.$route.query.rows; //生产工序表数据
			this.manufacture = this.$route.query.manufacture; //生产总表数据
			this.initialize();
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

	#box>>>.el-table th {
		text-align: center;
	}

	#box>>>.el-table td {
		padding: 0px;
		height: 50px;
		line-height: 50px;
		text-align: center;
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
