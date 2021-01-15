<template>
	<!-- 生产登记-->
	<div id="app">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>生产管理</el-breadcrumb-item>
			<el-breadcrumb-item>内部生产管理</el-breadcrumb-item>
			<el-breadcrumb-item>生产登记(责任人控制)</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row>
			<el-col :span="3" :push="22">
				<el-button type="primary" size="small" @click="back">返回</el-button>
			</el-col>
		</el-row>




		<el-card class="box-card">
			<center>
				<h4>生产派工单</h4>
			</center>
			<el-row>
				<el-col :span="8" :push="4">
					<span>派工单编号：{{manufacture.manufactureId}}</span>
				</el-col>
				<el-col :span="4" :push="7">
					<span>数量：{{manufacture.amount}}</span>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8" :push="4">
					<span>产品编号：{{manufacture.productId}}</span>
				</el-col>
				<el-col :span="7" :push="7">
					<span>产品名称：{{manufacture.productName}}</span>
				</el-col>
			</el-row>



			<!-- <span>描述：xxxxxx</span> -->
			<!-- <span>出库单编号：xxx</span> -->

			<el-table :data="gridData" style="margin: 0 auto; width: 90%;">
				<el-table-column prop="procedureName" label="工序名称"></el-table-column>
				<el-table-column prop="labourHourAmount" label="设计工时数"></el-table-column>
				<el-table-column prop="realLabourHourAmount" label="实际工时数"></el-table-column>
				<el-table-column prop="subtotal" label="设计工时成本"></el-table-column>
				<el-table-column prop="realSubtotal" label="实际工时成本"></el-table-column>
				<el-table-column prop="moduleSubtotal" label="设计物料成本"></el-table-column>
				<el-table-column prop="realModuleSubtotal" label="实际物料成本"></el-table-column>
				<el-table-column label="工序登记">
					<template slot-scope="scope">
						<el-button v-if="scope.row.procedureFinishTag=='未开始'" size="mini" @click="register(scope.row)">登记</el-button>
						<el-button v-else-if="scope.row.procedureFinishTag=='未完成' || scope.row.procedureFinishTag=='已完成'" type="text">等待复核</el-button>
						<el-button v-else type="text">完成</el-button>
					</template>
				</el-table-column>
				<el-table-column label="交接登记" >
					<template slot-scope="scope">
						<div v-if="scope.row.procedureFinishTag=='已审核'">
							<el-button v-if="scope.row.procedureTransferTag=='未交接'" size="mini" @click="showConnect(scope.row)" >交接登记</el-button>
							<el-button v-else-if="scope.row.procedureTransferTag=='已交接'" type="text">等待复核</el-button>
							<el-button v-else type="text">完成</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>

			<el-row>
				<el-col :span="8" :push="4">
					<span>设计工时总成本：{{manufacture.labourCostPriceSum}}</span>
				</el-col>
				<el-col :span="7" :push="7">
					<span>设计物料总成本：{{manufacture.moduleCostPriceSum}}</span>
				</el-col>

			</el-row>
			<el-row>
				<el-col :span="8" :push="4">
					<span>实际工时总成本：{{manufacture.realLabourCostPriceSum}}</span>
				</el-col>
				<el-col :span="7" :push="7">
					<span>实际物料总成本：{{manufacture.realModuleCostPriceSum}}</span>
				</el-col>

			</el-row>
			<el-row>
				<el-col :span="8" :push="4">
					<span>登记人：{{manufacture.register}}</span>
				</el-col>
				<el-col :span="7" :push="7">
					<span>登记时间：{{manufacture.registerTime}}</span>
				</el-col>

			</el-row>
			<el-row>
				<el-col :span="8" :push="4">
					<span>复核人：{{manufacture.checker}}</span>
				</el-col>
				<el-col :span="7" :push="7">
					<span>复核时间：{{manufacture.checkTime}}</span>
				</el-col>

			</el-row>
			<el-row>
				<el-col :span="22" :push="2">
					<span>备注 ：{{manufacture.remark}}</span>

				</el-col>

			</el-row>

		</el-card>
		
		<el-dialog title="交接登记" :visible.sync="dialogFormVisible" width="30%">
		  <el-form :model="connectForm">
			  <el-form-item label="请输入本工序合格数量:">
			    <el-input v-model="connectForm.realAmount" autocomplete="off"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="connect">确 定</el-button>
		  </div>
		</el-dialog>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				manufacture: {},
				gridData: [],
				dialogFormVisible:false,
				connectForm:{
					realAmount:0,
					manufactureId:'',
					procedureId:''
				}
				
				
			}
		},
		methods: {
			initialize(row) {
				this.manufacture = row;
				this.$http.post("http://localhost:8080/Erp-web/procedure/selectByParentId.do", "parentId=" + row.id)
					.then(res => {
						this.gridData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			},
			back() {
				this.$router.go(-1);
			},
			register(row){
				this.$router.push({
					path: '/dengji3',
					query: {
						rows: row,
						manufacture:this.manufacture
					}
				});
			},
			showConnect(row){
				this.connectForm.procedureId=row.id;
				this.connectForm.manufactureId=this.manufacture.id;
				this.dialogFormVisible=true;
			},
			connect(){
				this.$http.post("http://localhost:8080/Erp-web/manufacture/connect.do", this.$qs.stringify(this.connectForm))
					.then(res => {
						if(res.data>0){
							location.href = "#/dengji";
							this.$message({
								message: '交接成功，请复核',
								type: 'success'
							});
							
						}else{
							this.$message.error({
								message: '交接失败'
							});
						}
					})
					.catch(err => {
						console.log(err)
					})
					this.dialogFormVisible=false;
			}
		},
		mounted() {
			this.initialize(this.$route.query.rows);
		},
		beforeRouteEnter(to, from, next) { //路由守卫判断路由是从哪里跳转，如果是则保持数据，否则刷新
			if (from.path == "/dengji3") {
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
	.el-col {
		margin: 12px;
	}

	/* #app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		margin-top: 20px;
	}

	#butt {
		width: 500px;
		margin-left: 1090px;
	}

	.box-card {
		width: 1000px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	}

	#span {
		margin-left: 250px;
	}

	.sp1 {
		margin-right: 400px;
	}

	.sp2 {
		margin-right: 550px;
	}

	.sp3 {
		margin-right: 550px;
	}

	.sp4 {
		margin-right: 515px;
	}

	.sp5 {
		margin-left: 350px;
	} */
</style>
