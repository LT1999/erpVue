<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>产品设计</el-breadcrumb-item>
				<el-breadcrumb-item>产品档案管理</el-breadcrumb-item>
				<el-breadcrumb-item>产品档案登记复核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>


		<div id="fome">
			<el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="220px" class="demo-ruleForm">
				<div id="butt">
					<el-form-item>
						<div id="butt2">
							<el-button type="success" plain size="medium" @click="onSubmit('form')">复核通过</el-button>
							<el-button type="primary" plain size="medium" @click="back()">返回</el-button>
						</div>
					</el-form-item>
				</div>
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>主信息</span>
					</div>
					<el-form-item label="产品编号" prop="productId">
						<el-input disabled v-model="form.productId"></el-input>
					</el-form-item>
					<el-form-item label="产品名称" prop="productName">
						<el-input v-model="form.productName"></el-input>
					</el-form-item>
					<el-form-item label="制造商">
						<el-input v-model="form.factoryName"></el-input>
					</el-form-item>
					<el-form-item label="用途类型" prop="type">
						<el-select v-model="form.type" placeholder="用途类型">
							<el-option label="商品" value="商品"></el-option>
							<el-option label="物料" value="物料"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="分类">
						<el-cascader v-model="classify" clearable ref="cascader" :options="options" @change="handleChange"></el-cascader>
					</el-form-item>

					<el-form-item label="产品简介">
						<el-input v-model="form.productNick"></el-input>
					</el-form-item>
					<el-form-item label="档次级别" prop="productClass">
						<el-select v-model="form.productClass" placeholder="档次级别">
							<el-option label="高档" value="高档"></el-option>
							<el-option label="中档" value="中档"></el-option>
							<el-option label="低档" value="低档"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="计量单位">
						<el-input v-model="form.personalUnit"></el-input>
					</el-form-item>
					<el-form-item label="计量值">
						<el-input v-model="form.personalValue"></el-input>
					</el-form-item>
					<el-form-item label="市场单价" prop="listPrice">
						<el-input v-model="form.listPrice"></el-input>
					</el-form-item>
					<el-form-item label="成本单价" prop="realCostPrice">
						<el-input v-model="form.realCostPrice"></el-input>
					</el-form-item>


				</el-card>
				<br />
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>辅助信息</span>
					</div>
					<el-form-item label="保修期">
						<el-input v-model="form.warranty"></el-input>
					</el-form-item>
					<el-form-item label="替代名称">
						<el-input v-model="form.twinName"></el-input>
					</el-form-item>
					<el-form-item label="替代编号">
						<el-input v-model="form.twinId"></el-input>
					</el-form-item>
					<el-form-item label="生命周期">
						<el-input v-model="form.lifecycle"></el-input>
					</el-form-item>
					<el-form-item label="单位">
						<el-input v-model="form.amountUnit"></el-input>
					</el-form-item>
					<el-form-item label="产品经理">
						<el-input v-model="form.responsiblePerson"></el-input>
					</el-form-item>

					<el-form-item label="供应商">
						<el-input v-model="form.providerGroup"></el-input>
					</el-form-item>

					<el-form-item label="产品描述">
						<el-input v-model="form.productDescribe" style="width: 206px;" type="textarea" placeholder="请输入内容">
						</el-input>
					</el-form-item>

					<el-form-item label="登记人" prop="register">
						<el-input v-model="form.register"></el-input>
					</el-form-item>
					<el-form-item label="复核人" prop="checker">
						<el-input v-model="form.checker"></el-input>
					</el-form-item>
				</el-card>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				classify:[],
				ruleForm: {
					id: 0,
					productId: '',
					productName: '', //产品名称
					factoryName: '', //制造商
					type: '', //用途类型
					firstKindId: '', // '产品I级分类ID
					firstKindName: '', //'产品I级分类名称
					secondKindId: '', //'产品II级分类ID
					secondKindName: '', //产品II级分类名称
					thirdKindId: '', //'产品III级分类ID
					thirdKindName: '', //产品III级分类名称
					productNick: '', //产品简介
					productClass: '', //档次级别
					personalUnit: '', //计量单位
					personalValue: '', //计量值
					listPrice: '', //市场单价
					realCostPrice: '', //成本单价
					warranty: '', //保修期
					twinName: '', //替代品名称
					twinId: '', //替代品编号
					lifecycle: '', //生命周期
					amountUnit: '', //单位
					responsiblePerson: '', //产品经理
					providerGroup: '', //供应商
					productDescribe: '', //产品描述
					register: '', //登记人
					registerTime: '', //建档时间,
					changeTag: "未变更",
					/* changer:'', */
					/* changeTime:'', */
					priceChangeTag: '未变更',
					/* fileChangeAmount:'0', */
					deleteTag: "未删除",
					designModuleTag: "未设计",
					designProcedureTag: '未设计',
					designCellTag: '未设计',
					checkTag: '等待审核',
					checker: '',
					checkTime: '',
					costPrice: ''
				},
				//联动菜单
				options: [],
				
				form: {},
				rules: {
					productName: [{
						required: true,
						message: '请输入产品名称',
						trigger: 'blur'
					}],
					productClass: [{
						required: true,
						message: '请选择档次级别',
						trigger: 'blur'
					}],
					checker: [{
						required: true,
						message: '请填写复核人',
						trigger: 'blur'
					}],
					register: [{
						required: true,
						message: '请填写登记人',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请选择产品用途',
						trigger: 'change'
					}],
					listPrice: [{
						required: true,
						message: '请填写市场单价',
						trigger: 'blur'
					}],
					realCostPrice: [{
						required: true,
						message: '请填写成本单价',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			handleChange() {
				var value = this.$refs['cascader'].getCheckedNodes()[0].path;
				var label = this.$refs['cascader'].getCheckedNodes()[0].pathLabels;
				this.form.firstKindId = value[0];
				this.form.secondKindId = value[1];
				this.form.thirdKindId = value[2];
				this.form.firstKindName = label[0];
				this.form.secondKindName = label[1];
				this.form.thirdKindName = label[2];
			},
			selectOptions() { //页面加载执行的获取联动数据的一级分类
				this.$http.post("http://localhost:8080/Erp-web/config-file-kind/findAll.do")
					.then(res => {
						console.log(res.data);
						this.options = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			},
			onSubmit(form) {
				this.$delete(this.form,"changer");
				this.$delete(this.form,"changeTime");
				this.$delete(this.form,"fileChangeAmount");
				this.$delete(this.form,"deleteTime");
				this.form.checkTag = "审核通过";
				this.form.changeTag = "未变更";
				this.form.priceChangeTag = "未变更";
				this.form.deleteTag = "未删除";
				this.form.designModuleTag = "未设计";
				this.form.designProcedureTag = "未设计";
				this.form.designCellTag = "未设计";
				/* this.ruleForm.id = this.form.id;
				
				this.ruleForm.checker = this.form.checker;
				this.ruleForm.fileChangeAmount = 0;
				this.ruleForm.registerTime = this.form.registerTime;
				this.ruleForm.register = this.form.register;
				this.ruleForm.productDescribe = this.form.productDescribe;
				this.ruleForm.providerGroup = this.form.providerGroup;
				this.ruleForm.responsiblePerson = this.form.responsiblePerson;
				this.ruleForm.amountUnit = this.form.amountUnit;
				this.ruleForm.lifecycle = this.form.lifecycle;
				this.ruleForm.twinId = this.form.twinId;
				this.ruleForm.twinName = this.form.twinName;
				this.ruleForm.warranty = this.form.warranty;
				this.ruleForm.realCostPrice = this.form.realCostPrice;
				this.ruleForm.listPrice = this.form.listPrice;
				this.ruleForm.personalUnit = this.form.personalUnit;
				this.ruleForm.personalValue = this.form.personalValue;
				this.ruleForm.productClass = this.form.productClass;
				this.ruleForm.productNick = this.form.productNick;
				this.ruleForm.type = this.form.type;
				this.ruleForm.factoryName = this.form.factoryName;
				this.ruleForm.productName = this.form.productName;
				this.ruleForm.productId = this.form.productId; */
				
				console.log(this.form);
				var aData = new Date();
				this.form.checkTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.$http.post("http://localhost:8080/Erp-web/productfile/fhProductfile.do", this.$qs.stringify(this.form))
							.then(res => {
								this.$message({
									message: '已复核！',
									type: 'success'
								});
								location.href = "#/ProductreView"
							})
							.catch(err => {
								console.log(err)
							})
					} else {
						return false;
					}
				});
			},
			back() {
				location.href = "#/ProductreView"
			}
		},
		created() {
			
			this.form = this.$route.query.arr;
			
			console.log(this.form);
			this.classify=[this.form.firstKindId,this.form.secondKindId,this.form.thirdKindId];
			console.log(this.classify);
		},
		mounted() {
			this.selectOptions();
		}
	}
</script>

<style scoped>
	#registration {
		color: #2c3e50;
		margin-top: 20px;
	}

	.el-cascader,
	.el-select {
		width: 206.4px;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 100%;
		margin: 0px;
	}

	#out {
		width: 100%;
		margin: 0 auto;

	}

	.el-form {
		margin: 0 auto;
		width: 100%;
	}

	#butt {
		float: right;
	}

	.box-card {
		width: 100%;

	}
</style>
