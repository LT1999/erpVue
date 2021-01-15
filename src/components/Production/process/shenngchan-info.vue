<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb>
				<el-breadcrumb-item>生产管理</el-breadcrumb-item>
				<el-breadcrumb-item>产品生产工序设计</el-breadcrumb-item>
				<el-breadcrumb-item>制定产品生产工序设计单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button type="primary" size="small" @click="">打印</el-button>
					<el-button type="primary" size="small" @click="addProcess = true">添加工序</el-button>
					<el-button type="primary" size="small" @click="deletes">删除工序</el-button>
					<el-button type="primary" size="small" @click="insert">完成</el-button>
					<el-button type="primary" size="small" @click="back">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>生产工序设计单</h3><br />



					<el-row>
						<el-col :span="5">
							<el-form-item label="产品名称:">
								<span>{{form.productName}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="5" :push='1'>
							<el-form-item label="产品编号:">
								<span>{{form.productId}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="设计人:">
								<el-input v-model="form.designer" size="small"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<template>
							<el-table :data="tableData" ref="tableData" style=" width: 100%;margin: 0 auto;" border id="tableInput"
							 @selection-change="checkChange">
								<el-table-column type="selection" width="55">
								</el-table-column>
								<el-table-column prop="detailsInt" label="序号">
								</el-table-column>
								<el-table-column prop="procedureName" label="工序名称">
								</el-table-column>
								<el-table-column prop="procedureId" label="工序编号">
								</el-table-column>
								<el-table-column prop="procedureDescribe" label="描述 ">
								</el-table-column>
								<el-table-column prop="labourHourAmount" label="工时数(小时)">
									<template slot-scope="scope">
										<el-input v-model="scope.row.labourHourAmount" v-on:input="hoursSubtotal(scope.row)"></el-input>
									</template>
								</el-table-column>

								<el-table-column prop="amountUnit" label="工时单位">
									<template slot-scope="scope">
										<el-input v-model="scope.row.amountUnit"></el-input>
									</template>
								</el-table-column>
								<el-table-column prop="costPrice" label="单价工时成本">
									<template slot-scope="scope">
										<el-input v-model="scope.row.costPrice" v-on:input="hoursSubtotal(scope.row)"></el-input>
									</template>
								</el-table-column>

								<el-table-column prop="subtotal" label="工时成本小计(元)">
								</el-table-column>
							</el-table>
						</template>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="登记人:">
								<el-input v-model="form.register" size="small"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="登记时间:">
								<span>{{form.registerTime}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="23" id="yq">
							<el-form-item label="设计要求:">
								<el-input style="width: 100%;" type="textarea" v-model="form.procedureDescribe" :autosize="{ minRows: 4, maxRows: 6}"
								 placeholder="请输入内容">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>

				</el-card>


				<el-drawer :visible.sync="addProcess" direction="rtl" size="40%">
					<el-table :data="tableprocess">
						<el-table-column property="procedureId" label="工序编号" width="150"></el-table-column>
						<el-table-column property="procedureName" label="工序名称" width="200"></el-table-column>
						<el-table-column property="procedureDescribe" label="描述"></el-table-column>
						<el-table-column label="添加">
							<template slot-scope="scope">
								<el-button size="mini" type="text" @click="addProcessRow(scope.row)">
									添加
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-drawer>

			</el-form>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				checkData: [],
				radio: '1', //未通过
				form: {
					/* id:'',//序号 */
					designId: '100002', //设计编号
					firstKindId: '', //产品I级分类编号
					firstKindName: '', //产品I级分类名称
					secondKindId: '', //产品II级分类编号
					secondKindName: '', //产品II级分类名称
					thirdKindId: '', //产品III级分类编号
					thirdKindName: '', //产品III级分类名称
					productId: '', //产品编号
					productName: '', //产品名称 
					procedureDescribe: '', //设计要求
					costPriceSum: 0, //工时总成本
					moduleCostPriceSum: 0, //物料总成本 
					designer: '', //设计人
					register: 'nen', //登记人
					registerTime: '', //登记时间 
					checkTag: '等待审核', //审核标志：等待审核 审核通过 审核不通过
					changeTag: '未变更', //变更标志：未变更 已变更
					designModuleTag: '未设计', //工序物料设计标志：未设计 已提交  已审核
					designModuleChangeTag: '未变更', //工序物料变更标志： 未变更 已变更


				},
				tableData: [],
				tableprocess: [],
				addProcess: false,
				designProcedure: {},
				fileId: 0
			};
		},
		methods: {
			back() {
				location.href = "#/shengchan"
			},
			productData(row) {
				this.form.firstKindId = row.firstKindId; //产品I级分类编号
				this.form.firstKindName = row.firstKindName; //产品I级分类名称
				this.form.secondKindId = row.secondKindId; //产品II级分类编号
				this.form.secondKindName = row.secondKindName; //产品II级分类名称
				this.form.thirdKindId = row.thirdKindId; //产品III级分类编号
				this.form.thirdKindName = row.thirdKindName; //产品III级分类名称
				this.form.productId = row.productId; //产品编号
				this.form.productName = row.productName; //产品名称 
				this.fileId = row.id; //产品id
				var demo = new URLSearchParams()
				demo.append("productId", row.productId);
				this.$http.post("http://localhost:8080/Erp-web/module/selectByFileId.do", demo)
					.then(res => {
						this.form.moduleCostPriceSum = res.data.costPriceSum;
					})
					.catch(err => {
						console.log(err)
					})
			},
			addProcessRow(row) {
				this.$set(row, 'labourHourAmount', 0);
				this.$set(row, 'amountUnit', '');
				this.$set(row, 'costPrice', 0);
				this.$set(row, 'subtotal', row.labourHourAmount * row.costPrice);
				this.$set(row, 'designModuleTag', '未设计');
				this.$set(row, 'designModuleChangeTag', '未变更');
				this.$set(row, 'detailsInt', row.detailsInt);
				this.$set(row, 'register', this.form.register);
				this.$set(row, 'registerTime', this.form.registerTime);
				this.$set(this.tableData, row.detailsInt, row);
			},
			checkChange(val) {
				this.checkData = val;
			},
			Process() {
				this.$http.post("http://localhost:8080/Erp-web/process/selectAll.do")
					.then(res => {
						this.tableprocess = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			},
			registrar() {
				var aData = new Date();
				this.form.registerTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
			},
			deletes() {
				this.tableData.forEach((item, idx) => {
					this.checkData.forEach(i => {
						if (item.id == i.id) {
							this.tableData.splice(idx, 1);
						}
					})
				})
			},
			hoursSubtotal(row) {
				row.subtotal = row.labourHourAmount * row.costPrice;
			},
			sumSubtotal() {
				this.form.costPriceSum = 0;
				this.tableData.forEach((item, idx) => {
					this.form.costPriceSum += parseInt(item.subtotal);
				})
			},
			insert() {
				this.sumSubtotal();
				this.$set(this.designProcedure, 'designProcedure', this.form);
				this.$set(this.designProcedure, 'detailsList', this.tableData);
				this.$set(this.designProcedure, 'fileId', this.fileId);
				console.log(this.designProcedure);
				this.$http.post("http://localhost:8080/Erp-web/design-procedure/addDesignProcedure.do", this.$qs.stringify(this.designProcedure, {
						arrayFormat: 'detailsList',
						allowDots: true
					}))
					.then(res => {
						if(res.data>0){
							location.href = "#/shengchan";
							this.$message({
								message: '产品生产工序设计成功',
								type: 'success'
							});
							
						}else{
							this.$message.error({
								message: '产品生产工序设计失败'
							});
						}
						
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		computed: {

		},
		mounted() {
			this.registrar();
			this.productData(this.$route.query.rows);
			this.Process();
		}
	}
</script>

<style scoped>
	.box-card {
		width: 80%;
		height: 100%;
		margin: 0 auto;
		padding: 40px;
	}

	#buttons {
		float: right;
		margin-top: 30px;
		margin-right: 80px;
		margin-bottom: 20px;
	}

	#box>>>.el-table th {
		background-color: #F2F8FD;
		padding: 0px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}

	#box>>>.el-table td {
		padding: 0px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}

	input {
		outline: none;
		border: none;
		border-bottom: 1px solid #000;
	}

	/* #box>>>.el-input input {
		border: none;
		border-bottom: 1px solid #000;
		border-radius: 0;
		text-align: center;
		font-size: 17px;
		color: #000000;
		height: 20px;
	} */
	#box>>>.el-table .cell {
		padding: 0px;
	}

	#tableInput>>>.el-input input {
		border: none;
		border-radius: 0;
		font-size: 12px;
		color: #000000;
		margin: 0px;

	}

	/* .el-input__inner */
	#box>>>.el-form-item {
		margin-bottom: 0px;
	}

	#box>>>.el-form-item__label {
		line-height: 35px;
	}

	#yq>>>.el-form-item__label {
		line-height: 96px;
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
		padding: 0px 0;
	}
</style>
