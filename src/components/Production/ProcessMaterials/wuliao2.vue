<template>
	<!-- 工序物料设计单-->
	<div id="app">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>生产管理</el-breadcrumb-item>
			<el-breadcrumb-item>工序物料设计</el-breadcrumb-item>
			<el-breadcrumb-item>制定工序物料设计单 </el-breadcrumb-item>
		</el-breadcrumb>
		<el-row style="margin-top: 20px;">
			<el-col :span="3" style="float: right;">
				<el-button type="primary" @click="onSubmit" size="small">提交</el-button>
				<el-button @click="back" size="small">返回</el-button>
			</el-col>
		</el-row>

		<el-form :inline="true" :model="formInline" class="demo-form-inline">

			<center style="margin-top: 10px;">
				<el-card class="box-card">
					<h4>工序物料设计单</h4>


					<el-row>
						<el-col :span="8">
							<p>工序单编号：{{formInline.designId}}</p>
						</el-col>

						<el-col :span="8">
							<p>产品编号：{{formInline.productId}}</p>
						</el-col>

						<el-col :span="8">
							<p>产品名称：{{formInline.productName}}</p>
						</el-col>
					</el-row>






					<el-table :data="gridData" style="margin: 10px auto; width: 90%;">
						<el-table-column prop="id" label="序号"></el-table-column>
						<el-table-column prop="procedureName" label="工序名称"></el-table-column>
						<el-table-column prop="procedureId" label="工序编号"></el-table-column>
						<el-table-column prop="procedureDescribe" label="描述"></el-table-column>
						<el-table-column prop="labourHourAmount" label="工时数(小时)"></el-table-column>
						<el-table-column prop="subtotal" label="工时成本小计(元)"></el-table-column>
						<el-table-column prop="moduleSubtotal" label="物料成本小计(元)"></el-table-column>
						<el-table-column label="设计">
							<template slot-scope="scope">
								<el-button v-if="scope.row.designModuleTag=='未设计'"
								 @click.native.prevent="setMaterial(scope.row)" type="text" size="small">
									<span>设计</span>
								</el-button>
								<el-button v-else @click.native.prevent="anewSetMaterial(scope.row)" type="text" size="small">
									<span style="color: #67C23A;">重新设计</span>
								</el-button>

							</template>
						</el-table-column>
					</el-table>
					<el-row>
						<el-col :span="5" :push="1">
							<p>工时总成本：{{formInline.costPriceSum}}</p>
						</el-col>
						<el-col :span="5" :push="1">
							<p>物料总成本：{{formInline.moduleCostPriceSum}}</p>
						</el-col>
						<el-col :span="5" :push="1">
							<p>审核人：{{formInline.checker}}</p>
						</el-col>
						<el-col :span="5" :push="1">
							<p>审核时间：{{formInline.checkTime}}</p>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="21" :push="2">
							<p style="text-align: left;">设计要求：{{formInline.procedureDescribe}}</p>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="9" :push="16">
							<p>设计人：{{formInline.designer}}</p>
						</el-col>
					</el-row>


				</el-card>

			</center>
		</el-form>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				formInline: {},
				gridData: [],
				row: {},
				residualAmount:0,
				moduleCost:0,
				designProcedure:{}
			}
		},
		methods: {
			onSubmit() {
				this.moduleCost=0;
				this.residualAmount=0;
				var demo = new URLSearchParams()
				demo.append("productId", this.formInline.productId);
				this.$http.post("http://localhost:8080/Erp-web/module-details/selectByProductId.do", demo)
				.then(res => {
					res.data.forEach((item)=>{
						this.residualAmount+=item.residualAmount;
					});
				})
				.catch(err => {
					console.log(err)
				})
				
				this.gridData.forEach((item)=>{
					if(item.designModuleTag=='未设计'){
						this.residualAmount++;
					}
				})
				if(this.residualAmount<1){
					this.gridData.forEach((item)=>{
						this.moduleCost+=item.moduleSubtotal;
					})
					this.$set(this.designProcedure,'designProcedure.id',this.row.id);
					this.$set(this.designProcedure,'designProcedure.moduleCostPriceSum',this.moduleCost);
					this.$set(this.designProcedure,'designProcedure.designModuleTag','已提交');
					console.log(this.designProcedure);
					this.$http.post("http://localhost:8080/Erp-web/design-procedure/updateDesignProcedure.do",this.$qs.stringify(this.designProcedure))
					.then(res => {
						if(res.data>0){
							location.href = "#/wuliao";
							this.$message({
								message: '制定工序物料设计成功',
								type: 'success'
							});
							
						}else{
							this.$message.error({
								message: '制定工序物料设计失败'
							});
						}
					})
					.catch(err => {
						console.log(err)
					})
				}
			},
			back() {
				location.href = "#/wuliao"
			},
			productData(row) {
				this.formInline = row;
				this.selectByParentId(row.id);
			},
			selectByParentId(parentId) {
				var demo = new URLSearchParams()
				demo.append("parentId", parentId);
				this.$http.post("http://localhost:8080/Erp-web/design-procedure-details/selectByParentId.do", demo)
					.then(res => {
						this.gridData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			},
			setMaterial(row) { //点击设计将产品编号传到设计页面
				this.$router.push({
					path: '/wuliao3',
					query: {
						productId: this.formInline.productId,
						pid: row.id
					}
				});
			},
			anewSetMaterial(row) { //点击重新设计将产品编号传到设计页面
				this.$router.push({
					path: '/wuliao4',
					query: {
						row:row,
						productId:this.formInline.productId
					}
				});
			}
		},
		beforeRouteEnter(to, from, next) { //路由守卫判断路由是从哪里跳转，如果是wuliao3则保持数据，否则刷新
			if (from.path == "/wuliao3" || from.path == "/wuliao4") {
				to.meta.isBack = true;
			} else {
				to.meta.isBack = false;
			}
			next();
		},
		activated() { //为了在其他页面进入时，更新页面中的列表数据，我们将在activated钩子函数中挂载页面初次进入时的请求数据
			if (!this.$route.meta.isBack) {
				this.productData(this.$route.query.rows);
			} else {
				this.selectByParentId(this.row.id);
			}
			this.$route.meta.isBack = false;
		},
		mounted() {
			this.row = this.$route.query.rows;
			this.productData(this.$route.query.rows);
		}
	}
</script>

<style scoped>
	.el-card {
		margin-bottom: 20px;
	}
</style>
