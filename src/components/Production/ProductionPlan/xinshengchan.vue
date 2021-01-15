<template>
	<!-- 新发生生产计划登记-->
	<div id="app">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item>生产管理</el-breadcrumb-item>
			<el-breadcrumb-item>生产计划管理</el-breadcrumb-item>
			<el-breadcrumb-item>新发生生产计划登记</el-breadcrumb-item>
		</el-breadcrumb>

		<el-row style="margin-top: 20px;">
			<el-col :span="9" style="float: right;">
				<el-button type="info" size="small">PDF打印</el-button>
				<el-button type="warning" @click="addProduct" size="small">添加产品</el-button>
				<el-button type="warning" size="small">删除产品</el-button>
				<el-button type="success" @click="submit" size="small">提交</el-button>
				<el-button type="danger" @click="" size="small">返回</el-button>
			</el-col>
		</el-row>
		<el-form :model="formInline" ref="formInline" label-width="80px" class="demo-ruleForm">

			<center style="margin-top: 10px;">

				<el-card class="box-card">
					<h4 style="margin-bottom: 60px;">生产计划单</h4>

					<el-row>
						<el-col :span="6" :push="1">
							<span style="line-height: 36px;">生产理由：新发生</span>
						</el-col>

						<el-col :span="5" :push="3">
							<el-form-item label="登记人:">
								<el-input class="inp" type="text" v-model="formInline.register"></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="5" :push="5">
							<span style="line-height: 36px;">登记时间：{{formInline.registerTime}}</span>
						</el-col>
					</el-row>

					<el-table :data="tableData" border style="width: 90%;margin: 0 auto;">
						<el-table-column label="点选" width="60">
							<template slot-scope="scope">
								<el-checkbox v-model="checked" size="mini"></el-checkbox>
							</template>
						</el-table-column>
						<el-table-column prop="productName" label="产品名称"></el-table-column>
						<el-table-column prop="productId" label="产品编号" width="150"></el-table-column>
						<el-table-column prop="productDescribe" label="描述"></el-table-column>
						<el-table-column label="数量" width="120">
							<template slot-scope="scope">
								<el-input v-model="scope.row.amount" @blur="scope.row.subtotal=scope.row.amount*scope.row.realCostPrice"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="amountUnit" label="单位"></el-table-column>
						<el-table-column prop="realCostPrice" label="单价(元)"></el-table-column>
						<el-table-column prop="subtotal" label="小计(元)"></el-table-column>
					</el-table>

					<el-row style="margin-top: 20px;">

					</el-row>
					<el-row>
						<el-col :span="21" :push='1'>
							<el-form-item label="备注" style="width: 100%;">
								<el-input style="width: 100%;" v-model="formInline.remark" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"
								 placeholder="请输入内容">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-card>
			</center>

		</el-form>

		<el-drawer :visible.sync="table" direction="rtl" size="40%">
			<el-form :inline="true" :model="formInline2" class="demo-form-inline" style="margin-left: 110px;">
				<el-form-item label="请选择产品菜单">
					<el-cascader v-model="formInline2.classification" :options="options" @change="handleChange"></el-cascader>
				</el-form-item>
				<el-button type="primary" @click="selectSubmit">搜索</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="gridData">
				<el-table-column prop="productId" label="产品编号" width="150"></el-table-column>
				<el-table-column prop="productName" label="产品名称" width="100"></el-table-column>
				<el-table-column prop="type" label="用途类型"></el-table-column>
				<el-table-column prop="amountUnit" label="单位"></el-table-column>
				<el-table-column prop="realCostPrice" label="单价"></el-table-column>
				<el-table-column label="生产">
					<template slot-scope="scope">
						<el-button @click.native.prevent="add(scope.row)" type="text" size="small">生产</el-button>
					</template>
				</el-table-column>
			</el-table>

		</el-drawer>


		<!--添加物料选择数量-->
		<!-- <el-dialog width="30%" title="数量选择" :visible.sync="innerVisible" append-to-body>
			<template>
				<el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
			</template>
			<el-button type="primary" @click="check()">确认</el-button>

		</el-dialog> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formInline2: {
					classification: ''
				},
				gridData: [],
				options: [{
					value: '01/电子',
					label: '01/电子',
					children: [{
						value: '01/计算机',
						label: '01/计算机',
						children: [{
							value: '01/服务器',
							label: '01/服务器'
						}]
					}]
				}], //联动菜单
				table: false,
				checked: false,
				formInline: {
					register: '', //登记人
					remark: '', //备注
					registerTime: '', //登记时间
				},
				tableData: [],
				applyList: [],
				applys: {},
				apply:{},
				judge: true

			}
		},
		methods: {
			addProduct() {
				this.table = true;
				this.$http.post("http://localhost:8080/Erp-web/productfile/queryKainogenesis.do")
					.then(res => {
						this.gridData = res.data;
					})
					.catch(err => {
						console.log(err)
					})

			},
			registrar() {
				var aData = new Date();
				this.formInline.registerTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
			},
			submit() {
				this.judge = true;
				this.applyList = [];
				this.tableData.forEach(item => {
					if (item.amount < 1) {
						this.judge = false;
					}
					
					this.applys = {};
					this.$set(this.applys, 'register', this.formInline.register);
					this.$set(this.applys, 'textarea', this.formInline.textarea);
					this.$set(this.applys, 'registerTime', this.formInline.registerTime);
					this.$set(this.applys, 'productId', item.productId);
					this.$set(this.applys, 'productName', item.productName);
					this.$set(this.applys, 'productDescribe', item.productDescribe);
					this.$set(this.applys, 'type', item.type);
					this.$set(this.applys, 'amount', item.amount);
					this.$set(this.applys, 'checkTag', '等待审核');
					this.$set(this.applys, 'manufactureTag', '未派工');
					this.applyList.push(this.applys);
					
				})
				this.$set(this.apply, 'applyList', this.applyList);
				if (this.judge&&this.tableData.length>0) {
					this.$http.post("http://localhost:8080/Erp-web/apply/insertApply.do", this.$qs.stringify(this.apply,{arrayFormat: 'this.applyList',allowDots: true}))
						.then(res => {
							if(res.data>0){
								this.formInline.register='';
								this.formInline.remark='';
								this.registrar();
								this.tableData=[];
								this.$message({
									message: '登记成功',
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
				} else {
					this.$message.error({
						message: '请选择产品或生产数量有误'
					});
				}
				this.judge = true;
			},
			selectSubmit() {},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			add(row) {
				this.$set(row, 'amount', 0);
				this.$set(row,'subtotal',row.amount*row.realCostPrice);
				this.$set(this.tableData, row.id, row);
			},
			handleChange(value) {
				console.log(value);
			}
		},
		mounted() {
			this.registrar();
		}
	}
</script>

<style scoped>
</style>
