<template>
	<!-- 工序物料设计单-->
	<div id="app">
		<div>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>生产管理</el-breadcrumb-item>
				<el-breadcrumb-item>工序物料设计</el-breadcrumb-item>
				<el-breadcrumb-item>制定工序物料设计单 </el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row style="margin-top: 20px;">
			<el-col :span="5" style="float: right;">
				<el-button type="info" size="small">PDF打印</el-button>
				<el-button type="primary" size="small" @click="onSubmit">提交</el-button>
				<el-button type="danger" size="small" @click="back">返回</el-button>
			</el-col>
		</el-row>

			<center style="margin-top:10px;height: 50%;">

					<el-card class="box-card">
						<h4>工序物料设计单</h4>

							<el-table :data="gridData">
								<el-table-column prop="id" label="序号"></el-table-column>
								<el-table-column prop="productName" label="物料名称"></el-table-column>
								<el-table-column prop="productId" label="物料编号" width="150"></el-table-column>
								<el-table-column prop="productDescribe" label="描述"></el-table-column>
								<el-table-column prop="amount" label="设计数量"></el-table-column>
								<el-table-column prop="residualAmount" label="可用数量"></el-table-column>
								<el-table-column prop="amountUnit" label="单位"></el-table-column>
								<el-table-column prop="costPrice" label="单价(元)"></el-table-column>
								<el-table-column label="本工序数量" width="100">
									<template slot-scope="scope">
										<el-input v-model="scope.row.designAmount" clearable></el-input>
									</template>
								</el-table-column>
							</el-table>

					</el-card>
			</center>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				parentId:'',
				gridData:[],
				designProcedureModule:{},
				submit:true
			}	
		},
		methods: {
			onSubmit() {
				this.submit=true;
				/* 遍历表格数据,进行修改,新增到工序物料明细表，并修改产品物料明细表可用数量 */
				this.gridData.forEach((item)=>{
					if(item.residualAmount>=item.designAmount){
						this.$delete(item,'amount'); /*删掉产品物料明细表设计数量 */
						item.parentId=this.parentId;/*设置工序物料明细表父id,为产品生产明细表传来的ID */
						item.subtotal=item.designAmount*item.costPrice;/*修改小计为本工序数量*单价 */
					}else{
						this.$message.error({
							message: '请输入正确的数量'
						});
						this.submit=false;
					}
				})
				if(this.submit){
					this.$set(this.designProcedureModule,'designProcedureModuleList',this.gridData);
					console.log(this.designProcedureModule);
					this.$http.post("http://localhost:8080/Erp-web/design-procedure-module/insertDesignProcedureModule.do",this.$qs.stringify(this.designProcedureModule,{arrayFormat: 'designProcedureModuleList', allowDots: true}))
					.then(res => {
							if(res.data>0){
								location.href = "#/wuliao2";
								this.$message({
									message: '设计成功',
									type: 'success'
								});
								
							}else{
								this.$message.error({
									message: '设计失败'
								});
							}
					})
					.catch(err => {
							console.log(err)
					})
					console.log(this.gridData);
				}
				
			},
			back() {
				this.$router.go(-1);
			},
			selectModuleDetails(productId){//根据传过来的产品编号查询产品物料组成
				console.log(productId);
				var demo = new URLSearchParams()
				demo.append("productId",productId);
				this.$http.post("http://localhost:8080/Erp-web/module-details/selectByProductId.do",demo)
					.then(res => {
						this.gridData = res.data;
						/* 对查询出来的数据进行处理 */
						this.gridData.forEach((item)=>{
							this.$set(item,'designAmount',0);/* 给每个对象添加一个本工序数量 */
						})

					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		mounted() {
			this.selectModuleDetails(this.$route.query.productId);
			this.parentId=this.$route.query.pid;
		}
	}
</script>

<style scoped>
	.el-card{
		min-height: 500px;
	}
</style>
