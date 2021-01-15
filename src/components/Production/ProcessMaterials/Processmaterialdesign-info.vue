<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>生产管理</el-breadcrumb-item>
				<el-breadcrumb-item>工序物料设计</el-breadcrumb-item>
				<el-breadcrumb-item>工序物料设计单审核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button size="mini" type="primary" @click="audit='审核未通过';onSubmit();" plain>复核不通过</el-button>
					<el-button size="mini" type="primary" @click="audit='已审核';onSubmit();" plain>复核通过</el-button>
					<el-button size="mini" type="primary" plain @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>工序物料设计单</h3><br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="工序单编号">
								<span>{{form.designId}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="设计人">
								<input v-model="form.designer" />
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="产品名称">
								<span>{{form.productName}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="产品编号">
								<span>{{form.productId}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<template>
						<el-table id="table" :data="tableData" style="margin-left: 8%; width: 85%;" border>
							<el-table-column prop="id" label="序号">
							</el-table-column>
							<el-table-column prop="procedureName" label="工序名称">
							</el-table-column>
							<el-table-column prop="procedureId" label="工序编号">
							</el-table-column>
							<el-table-column prop="procedureDescribe" label="描述 ">
							</el-table-column>
							<el-table-column prop="labourHourAmount" label="工时数(小时) ">
							</el-table-column>
							<el-table-column prop="subtotal" label="工时成本小计(元)" width="150px">
							</el-table-column>
							<el-table-column prop="moduleSubtotal" label="物料成本小计 ">
							</el-table-column>
							<el-table-column label="审核">
								<template slot-scope="scope">
										<el-button @click="reviewButton(scope.row)" size="mini" type="success" plain>复核</el-button>
								</template>
							</el-table-column>

						</el-table>
					</template>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="工时总成本">
								<span>{{form.costPriceSum}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="物料总成本">
								<span>{{form.moduleCostPriceSum}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<!-- <el-row>
						<el-col :span="21" :push='1'>
							<el-form-item label="设计要求" style="width: 100%;">
								<el-input style="width: 100%;" v-model="form.procedureDescribe" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="审核人">
								<input v-model="form.checker" />
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="审核时间">
								<span>{{form.checkTime}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="21" :push='1'>
							<el-form-item label="审核意见" style="width: 100%;">
								<el-input style="width: 100%;" v-model="form.auditopinion" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row> -->

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
				designProcedure:{},
				audit:''
			};
		},
		methods: {
			onSubmit() {
				this.Audit();
			},
			Audit(){
				this.$set(this.designProcedure,'designProcedure.id',this.form.id);
				this.$set(this.designProcedure,'designProcedure.designModuleTag',this.audit);
				this.$http.post("http://localhost:8080/Erp-web/design-procedure/updateDesignProcedure.do", this.$qs.stringify(this.designProcedure))
					.then(res => {
						if(res.data>0){
							location.href = "#/processmaterialdesign";
							this.$message({
								message: '审核成功',
								type: 'success'
							});
							
						}else{
							this.$message.error({
								message: '审核失败'
							});
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			back() {
				location.href = "#/processmaterialdesign"
			},
			selectByParentId(parentId) {
				var demo = new URLSearchParams()
				demo.append("parentId", parentId);
				this.$http.post("http://localhost:8080/Erp-web/design-procedure-details/selectByParentId.do", demo)
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			},
			productData(row){
				this.form = row;
				this.selectByParentId(row.id);
			},
			reviewButton(row){
				this.$router.push({
					path: '../Processmaterialdesign-info2',
					query: {
						row:row,
						productId:this.form.productId
					}
				});
			}
		},
		beforeRouteEnter(to, from, next) { //路由守卫判断路由是从哪里跳转，如果是则保持数据，否则刷新
			if (from.path == "/Processmaterialdesign-info2") {
				to.meta.isBack = true;
			} else {
				to.meta.isBack = false;
			}
			next();
		},
		activated() { //为了在其他页面进入时，更新页面中的列表数据，我们将在activated钩子函数中挂载页面初次进入时的请求数据
			if (!this.$route.meta.isBack) {
				this.productData(this.$route.query.rows);
			}
			this.$route.meta.isBack = false;
		},
		mounted() {
			this.productData(this.$route.query.rows);
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