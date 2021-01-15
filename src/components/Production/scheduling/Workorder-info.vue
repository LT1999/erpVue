<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>生产管理</el-breadcrumb-item>
				<el-breadcrumb-item>生产调度管理</el-breadcrumb-item>
				<el-breadcrumb-item>生产派工单审核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button size="mini" type="primary"@click="form.checkTag='审核不通过'; onSubmit()" plain>复核不通过</el-button>
					<el-button size="mini" type="primary"@click="form.checkTag='审核通过';onSubmit()" plain>复核通过</el-button>
					<el-button size="mini" type="primary" plain @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>生产派工单审核</h3>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="派工单编号">
								<span>{{form.manufactureId}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="产品编号">
								<span>{{form.productId}}</span>
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
							<el-form-item label="数量">
								<span>{{form.amount}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="2" :push='1'>
							<el-form-item label="工单制定人">
								<input v-model="form.designer" />
							</el-form-item>

						</el-col>
					</el-row>

					<template>
						<el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
							<el-table-column prop="id" label="序号">
							</el-table-column>
							<el-table-column prop="procedureName" label="工序名称">
							</el-table-column>
							<el-table-column prop="procedureId" label="工序编号 ">
							</el-table-column>
							<el-table-column prop="labourHourAmount" label="工时数(小时) ">
							</el-table-column>
							<el-table-column prop="subtotal" label="工时成本小计(元)" width="150px">
							</el-table-column>
							<el-table-column prop="moduleSubtotal" label="物料成本小计">
							</el-table-column>
							<el-table-column label="审核物料 ">
								<template slot-scope="scope">
									<el-button size="mini" type="success" plain @click="checkMaterial(scope.row)">审核物料</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
					
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="工时总成本">
								<span>{{form.labourCostPriceSum}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="物料总成本">
								<span>{{form.moduleCostPriceSum}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="登记人">
								<input v-model="form.register" />
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="登记时间">
								<span>{{form.registerTime}}</span>
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
					
					
					<!-- <el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="描述">
								<span>{{form.describe}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="出库单编号">
								<span>{{form.outbanknum}}</span>
							</el-form-item>
						</el-col>
					</el-row> -->
					<el-row>
						<el-col :span="21" :push='1'>
							<el-form-item label="备注" style="width: 100%;">
								<el-input style="width: 100%;" v-model="form.remark" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>

				</el-card>
			</el-form>
		</div>
		<el-drawer title="审核物料" :visible.sync="drawer" :with-header="false" :size="size">
			<h3>生产派工单审核</h3><br />
			<el-row>
						<el-col :span="9" :push='2'>
							<label>
								派工单编号:<span>{{form.manufactureId}}</span>
							</label>
						</el-col>
						<el-col :span="5" :push='8'>
							<label>
								工序名称:<span>{{row.procedureName}}</span>
							</label>
						</el-col>
					</el-row>
			<el-table :data="gridData">
				<template>
						<el-table-column prop="id" label="序号" border>
							</el-table-column>
							<el-table-column prop="productName" label="物料名称">
							</el-table-column>
							<el-table-column prop="productId" label="物料编号 " width="200px">
							</el-table-column>
							<!-- <el-table-column prop="describe" label="描述 ">
							</el-table-column> -->
							<el-table-column prop="amount" label="本工序数量" width="100px">
							</el-table-column>
							<!-- <el-table-column prop="unit" label="单位">
							</el-table-column> -->
							<el-table-column prop="costPrice" label="单价(元)">
							</el-table-column>
							<el-table-column prop="subtotal" label="小计 ">
							</el-table-column>
					</template>
			</el-table>
			<!-- <div class="block">
				<el-pagination style="margin: 10px auto; width: 550px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 7, 9]" :page-size="3" layout="total, sizes, prev, pager, next, jumper" :total="10">
				</el-pagination>
			</div> -->
		</el-drawer>
	</div>
</template>

<script scoped>
	export default {
		data() {
			return {
				form: {},
				tableData: [],
				drawer: false,
				size: "800px",
				//抽屉table
				gridData: [],
				row:{}
			}
		},
		methods: {
			onSubmit() {
				this.$http.post("http://localhost:8080/Erp-web/manufacture/updateManufacture.do",this.$qs.stringify(this.form))
					.then(res => {
						if(res.data>0){
							this.$router.go(-1);
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
				location.href = "#/Workorder"
			},
			checkMaterial(row){
				this.row=row;
				this.$http.post("http://localhost:8080/Erp-web/procedure-module/selectByParentId.do","parentId="+row.id)
					.then(res => {
						this.gridData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
				this.drawer = true;
			}, 
			initialize(row){
				this.form=row;
				var aData = new Date();
				this.form.checkTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
				this.$http.post("http://localhost:8080/Erp-web/procedure/selectByParentId.do","parentId="+row.id)
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		mounted() {
			this.initialize(this.$route.query.rows);
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
	
	#buttons {
		float: right;
		margin-right: 50px;
		margin-bottom: 20px;
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