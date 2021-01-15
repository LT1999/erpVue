<template>
	<!-- 制定生产派工单-->
	<div id="app">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item>生产管理</el-breadcrumb-item>
			<el-breadcrumb-item>生产调度管理</el-breadcrumb-item>
			<el-breadcrumb-item>制定生产派工单</el-breadcrumb-item>
		</el-breadcrumb>

		<el-row style="margin-bottom: 10px;">
			<el-col :span="4" :push="20">
				<el-button type="primary" @click="onSubmit" size="small">提交</el-button>
				<el-button @click="back" size="small">返回</el-button>
			</el-col>
		</el-row>


		<center>

			<el-card class="box-card">
				<h4>生产派工单</h4>
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<el-row style="margin-top: 40px;">
						<el-col :span="10" :push="1">
							<el-form-item label="工单制定人:">
								<el-input type="text" v-model="formInline.designer"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push="1">
							<span>产品编号：{{formInline.productId}}</span>
						</el-col>
						<el-col :span="8">
							<span>产品名称：{{formInline.productName}}</span>
						</el-col>
						<el-col :span="8">
							<span>数量：{{formInline.amount}}</span>
						</el-col>
					</el-row>
					<!-- <span class="sp5">出库单编号：xxx</span> -->

					<el-row style="margin: 20px 0px;">
						<el-col :span="12" :push="3">
							<span style="float: left;">描述：{{formInline.productDescribe}}</span>
						</el-col>
					</el-row>

					<el-table :data="gridData" style="width: 90%;">
						<el-table-column prop="id" label="序号"></el-table-column>
						<el-table-column prop="procedureName" label="工序名称"></el-table-column>
						<el-table-column prop="procedureId" label="工序编号"></el-table-column>
						<el-table-column prop="procedureDescribe" label="描述"></el-table-column>
						<el-table-column prop="labourHourAmount" label="工时数(小时)"></el-table-column>
						<el-table-column prop="costPrice" label="单位工时成本"></el-table-column>
						<el-table-column prop="subtotal" label="工时成本小计"></el-table-column>
						<el-table-column label="查看物料">
							<template slot-scope="scope">
								<el-button size="mini" @click="selectMaterial(scope.row)">查看物料</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-row style="margin-top: 20px;">
						<el-col :span="8" :push="2">
							<el-form-item label="登记人:">
								<el-input type="text"
								 v-model="formInline.register"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push="2">
							<span style="line-height: 40px;">登记时间：{{formInline.registerTime}}</span>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="21" :push='1'>
							<el-form-item label="备注" style="width: 100%;">
								<el-input style="width: 700px;" v-model="formInline.remark" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"
								 placeholder="请输入内容">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-card>

		</center>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				formInline: {
					id:'',//传过去的id未新发生计划的id
					productId: '',//产品编号
					productName: '',//产品名称
					amount: '',//投产数量
					applyIdGroup: ' ',//生产计划序号组
					productDescribe: '',//产品描述
					moduleCostPriceSum: '',//设计物料总成本
					labourCostPriceSum: '',//设计工时总成本
					designer: '',//工单制定人
					register: '',//登记人 
					registerTime: '',//登记时间
					remark: '',//备注
					checkTag: '等待审核',//审核标志：等待审核 审核通过 审核不通过
					manufactureProcedureTag: '待登记'//生产过程标志：待登记 未审核 已完工

				},
				gridData: []
			}
		},
		methods: {
			onSubmit() {
				
				this.$http.post("http://localhost:8080/Erp-web/manufacture/insertManufacture.do",this.$qs.stringify(this.formInline))
				.then(res => {
					if(res.data>0){
						this.$router.go(-1);
						this.$message({
							message: '派工成功',
							type: 'success'
						});
						
					}else{
						this.$message.error({
							message: '派工失败'
						});
					}
				})
				.catch(err => {
					console.log(err)
				})
				
			},
			back() {
				this.$router.go(-1);
			},
			initialize(row){
				this.formInline.id=row.id;
				this.formInline.productId=row.productId;
				this.formInline.productName=row.productName;
				this.formInline.amount=row.amount;
				this.formInline.productDescribe=row.productDescribe;
				var aData = new Date();
				this.formInline.registerTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
				this.$http.post("http://localhost:8080/Erp-web/design-procedure-details/selectByProductId.do","productId="+row.productId)
					.then(res => {
						this.gridData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
				
				
			},
			selectMaterial(row){
				this.$router.push({
					path: '/paigong3',
					query: {
						rows: row,
						designId:row.designId
					}
				});
			}
		},
		mounted() {
			console.log(this.$route.query.rows);
			this.initialize(this.$route.query.rows);
		},
		beforeRouteEnter(to, from, next) { //路由守卫判断路由是从哪里跳转，如果是则保持数据，否则刷新
			if (from.path == "/paigong3") {
				to.meta.isBack = true;
			} else {
				to.meta.isBack = false;
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
</style>
