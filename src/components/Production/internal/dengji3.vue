<template>
	<!-- 生产登记-->
	<div id="app">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item>生产管理</el-breadcrumb-item>
			<el-breadcrumb-item>内部生产管理</el-breadcrumb-item>
			<el-breadcrumb-item>生产登记(责任人控制)</el-breadcrumb-item>
		</el-breadcrumb>


		<el-row>
			<el-col :span="5" :push="18">
				<el-button type="info" size="small">PDF打印</el-button>
				<el-button type="primary" @click="dialogVisible=true" size="small">提交</el-button>
				<el-button @click="back" size="small">返回</el-button>
			</el-col>
		</el-row>


		<el-form :inline="true" :model="proceduring" class="demo-form-inline">

			<el-card class="box-card">
				<center>
					<h4>生产派工单</h4>
				</center>

				<el-row>
					<el-col :span="8" :push="3">
						<span>派工单编号：{{manufacture.manufactureId}}</span>
					</el-col>
					<el-col :span="7" :push="7">
						<span>工序名称：{{procedure.procedureName}}</span>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="8" :push="3">
						<span>已用工时数：{{procedure.realLabourHourAmount}}</span>
					</el-col>
					<el-col :span="7" :push="7">
						<span>设计工时数：{{procedure.labourHourAmount}}</span>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="8" :push="3">
						<span>产品编号：{{manufacture.productId}}</span>
					</el-col>
					<el-col :span="7" :push="7">
						<span>产品名称：{{manufacture.productName}}</span>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="8" :push="3">

						<el-form-item label="负责人:">
							<el-input size="small" v-model="proceduring.procedureResponsiblePerson"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8" :push="7">
						<el-form-item label="本次工时数:">
							<el-input size="small" v-model="proceduring.labourHourAmount"></el-input>
						</el-form-item>
					</el-col>
				</el-row>


				<el-table :data="gridData" style="margin: 0 auto; width: 90%;">
					<el-table-column prop="id" label="序号"></el-table-column>
					<el-table-column prop="productName" label="物料名称"></el-table-column>
					<el-table-column prop="productId" label="物料编号" width="140px"></el-table-column>
					<el-table-column prop="amount" label="设计数量"></el-table-column>
					<el-table-column prop="replenish" label="补充数量"></el-table-column>
					<el-table-column prop="realAmount" label="已使用数量"></el-table-column>
					<el-table-column label="本次数量">
						<template slot-scope="scope">
							<el-input size="small" v-model="scope.row.thisAmount"></el-input>
						</template>
					</el-table-column>
				</el-table>

				<el-row>
					<el-col :span="8" :push="3">
						<el-form-item label="登记人:">
							<el-input size="small" v-model="proceduring.register"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6" :push="7">
						<span style="line-height: 32px;">登记时间：{{proceduring.registerTime}}</span>
					</el-col>
				</el-row>



			</el-card>


		</el-form>
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="30%">
		  <span>该工序是否完成？</span>
		  <span slot="footer" class="dialog-footer">
		     <el-button @click="dialogVisible = false" size="small">取 消</el-button>
			 <el-button type="primary" @click="ok" size="small">完 成</el-button>
		     <el-button type="primary" @click="no" size="small">未 完 成</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				error:true,
				dialogVisible:false,
				proceduring: {
					parentId: '', //父级序号
					detailsInt: '', //工序序号
					procedureId: '', //工序编号
					procedureName: '', //工序名称
					labourHourAmount: '', //本次工时数
					costPrice: '', //单位工时成本
					subtotal: '', //工时成本小计
					/*regCount:'',// 登记次数 */
					procedureResponsiblePerson: '', //负责人
					register: '', //登记人
					registerTime: '' //登记时间
				},
				gridData: [], //生产工序物料表
				manufacture: {}, //生产总表
				procedure: {}, //生产工序表
				proceduringDto: {
					manufactureId: '',
					procedureId: '',
					whether: ''
				} //提交后台的dto
			}
		},
		methods: {
			ok(){
				this.proceduringDto.whether = '已完成';
				this.insert();
				this.dialogVisible = false;
			},
			no(){
				this.proceduringDto.whether = '未完成';
				this.insert();
				this.dialogVisible = false;
			},
			insert() {
				this.proceduring.subtotal = this.proceduring.costPrice * parseInt(this.proceduring.labourHourAmount);
				this.gridData.forEach(item => {
					
					
					if((parseInt(item.amount)+parseInt(item.replenish))<(parseInt(item.realAmount)+parseInt(item.thisAmount))){
						this.error=false;
					}
					item.id = null;
					item.parentId = null;
					this.$delete(item, 'amount');
					this.$delete(item, 'renewAmount');
					this.$delete(item, 'realAmount');
					this.$delete(item, 'realSubtotal');
					this.$delete(item,'replenish');
					item.subtotal = item.thisAmount * item.costPrice;
				})
				this.$set(this.proceduringDto, "proceduring", this.proceduring);
				this.$set(this.proceduringDto, "procedureModulingList", this.gridData);

				if(this.error){
					 this.$http.post("http://localhost:8080/Erp-web/proceduring/insertProceduring.do", this.$qs.stringify(this.proceduringDto, {
							arrayFormat: 'procedureModulingList',
							allowDots: true
						}))
						.then(res => {
							if(res.data>0){
								location.href = "#/dengji";
								this.$message({
									message: '登记成功，请复核',
									type: 'success'
								});
								
							}else{
								this.$message.error({
									message: '登记失败'
								});
							}
						})
						.catch(err => {
							console.log(err)
						}) 
				}else{
					 this.$message.error('物料数量有误');
					 
				}
					this.error=true;
			},
			initialize() {
				this.proceduring.parentId = this.manufacture.id; //父级序号
				this.proceduring.detailsInt = this.procedure.detailsInt; //工序序号
				this.proceduring.procedureId = this.procedure.procedureId; //工序编号
				this.proceduring.procedureName = this.procedure.procedureName; //工序名称
				this.proceduring.costPrice = this.procedure.costPrice; //工时成本单价
				//登记时间
				var aData = new Date();
				this.proceduring.registerTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();

				//通过传过来的工序id查询工序物料
				this.$http.post("http://localhost:8080/Erp-web/procedure-module/selectByParentId.do", "parentId=" + this.procedure.id)
					.then(res => {
						res.data.forEach(item => {
							if(item.realAmount==null){
								item.realAmount=0;
							}
							this.$set(item, "thisAmount", 0);
							if(item.renewAmount-item.amount>0){
								this.$set(item, "replenish", item.renewAmount-item.amount);
							}else{
								this.$set(item, "replenish", 0);
							}
							
						})
						this.gridData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			},
			back() {
				this.$router.go(-1);
			}
		},
		mounted() {
			this.procedure = this.$route.query.rows; //生产工序表数据
			this.manufacture = this.$route.query.manufacture; //生产总表数据
			this.proceduringDto.manufactureId = this.manufacture.id;
			this.proceduringDto.procedureId = this.procedure.id;
			this.initialize();

		}
	}
</script>

<style scoped>
	.el-col {
		margin: 12px;
	}
</style>
