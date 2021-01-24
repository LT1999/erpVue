<template>
	<div id="registration">
		<el-breadcrumb>
			<el-breadcrumb-item>产品设计</el-breadcrumb-item>
			<el-breadcrumb-item>产品档案管理</el-breadcrumb-item>
			<el-breadcrumb-item>产品档案登记</el-breadcrumb-item>
		</el-breadcrumb>

		<div id="out">
			<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="220px" class="demo-ruleForm">
				<div id="butt">
					<el-form-item>
						<div id="butt2">
							<el-button type="success" plain size="medium" @click="submitForm">立即创建</el-button>
							<el-button type="danger" plain size="medium" @click="resetForm">重置</el-button>
						</div>
					</el-form-item>
				</div>
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>主信息</span>
					</div>
					<el-form-item label="产品名称" prop="productName">
						<el-input v-model="ruleForm.productName"></el-input>
					</el-form-item>
					<el-form-item label="登记人" prop="register">
						<el-input v-model="ruleForm.register"></el-input>
					</el-form-item>
					
					<el-form-item label="制造商">
						<el-input v-model="ruleForm.factoryName"></el-input>
					</el-form-item>
					<el-form-item label="用途类型" prop="type">
						<el-select v-model="ruleForm.type" placeholder="用途类型">
							<el-option label="商品" value="商品"></el-option>
							<el-option label="物料" value="物料"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="分类" prop="classify">
						<el-cascader v-model="ruleForm.classify" 
						clearable ref="cascader" :options="options" 
						:props="SetKesDept" @change="handleChange"></el-cascader>
					</el-form-item>

					<el-form-item label="产品简介">
						<el-input v-model="ruleForm.productNick"></el-input>
					</el-form-item>
					<el-form-item label="档次级别" prop="productClass">
						<el-select v-model="ruleForm.productClass" placeholder="档次级别">
							<el-option label="高档" value="高档"></el-option>
							<el-option label="中档" value="中档"></el-option>
							<el-option label="低档" value="低档"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="计量单位">
						<el-input v-model="ruleForm.personalUnit"></el-input>
					</el-form-item>
					<el-form-item label="计量值">
						<el-input v-model="ruleForm.personalValue"></el-input>
					</el-form-item>
					<el-form-item label="市场单价" prop="listPrice">
						<el-input v-model="ruleForm.listPrice"></el-input>
					</el-form-item>
					<el-form-item label="成本单价" prop="realCostPrice">
						<el-input v-model="ruleForm.realCostPrice"></el-input>
					</el-form-item>
					<el-form-item label="计划成本单价" prop="costPrice">
						<el-input v-model="ruleForm.costPrice"></el-input>
					</el-form-item>

				</el-card>
				<br />
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>辅助信息</span>
					</div>
					<el-form-item label="保修期">
						<el-input v-model="ruleForm.warranty"></el-input>
					</el-form-item>
					<el-form-item label="替代名称">
						<el-input v-model="ruleForm.twinName"></el-input>
					</el-form-item>
					<el-form-item label="替代编号">
						<el-input v-model="ruleForm.twinId"></el-input>
					</el-form-item>
					<el-form-item label="生命周期">
						<el-input v-model="ruleForm.lifecycle"></el-input>
					</el-form-item>
					<el-form-item label="单位">
						<el-input v-model="ruleForm.amountUnit"></el-input>
					</el-form-item>
					<el-form-item label="产品经理">
						<el-input v-model="ruleForm.responsiblePerson"></el-input>
					</el-form-item>

					<el-form-item label="供应商">
						<el-input v-model="ruleForm.providerGroup"></el-input>
					</el-form-item>

					<el-form-item label="产品描述">
						<el-input v-model="ruleForm.productDescribe" style="width: 206px;" type="textarea" placeholder="请输入内容">
						</el-input>
					</el-form-item>
				</el-card>
			</el-form>
		</div>

	</div>
</template>

<script scoped>
	export default {
		data() {
			let that = this;
			return {
				options: [],
				//联动菜单
				SetKesDept: { //联动菜单配置
					value: 'id',
					label: 'kindName',
					lazy: true,
					async lazyLoad(node, resolve) {
						const {
							level,
							data
						} = node;
						let id;
						if (data) {
							id = data.id;
						}
						if (data) {
							const temp = await that.getSta(id);
							temp.forEach(item => {
								item.value = item.id;
								item.label = item.kindName;
								item.leaf = level >= 2;
							})
							resolve(temp);
						}
					}
				},

				ruleForm: {
					productId: null,
					productName: '', //产品名称
					factoryName: '', //制造商
					type: '', //用途类型
					classify: '',
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
					costPrice: '', //计划成本单价
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
					checkTag: '等待审核'
					/* checker:'', */
					/* checkTime:'', */
				},
				rules: {
					productName: [{
						required: true,
						message: '请输入产品名称',
						trigger: 'blur'
					}],
					classify: [{
						required: true,
						message: '请选择分类',
						trigger: 'change'
					}],
					productClass: [{
						required: true,
						message: '请选择档次级别',
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
					}],
					costPrice: [{
						required: true,
						message: '请填写计划成本单价',
						trigger: 'blur'
					}]
				},
				classification: []
			};
		},
		methods: {
			async getSta(id) { //懒加载联动数据
				const data = await this.$http.post("http://localhost:8080/Erp-web/config-file-kind/selectAllConfigFileKind.do",
						"pId=" + id)
					.then((res) => {
						return res.data;
					})
					.catch((res) => {
						console.log(res)
					})
				return data;
			},
			selectOptions() { //页面加载执行的获取联动数据的一级分类
				this.$http.post("http://localhost:8080/Erp-web/config-file-kind/selectAllConfigFileKind.do")
					.then(res => {
						this.options = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			},
			submitForm() {
				var aData = new Date();
				this.ruleForm.registerTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						this.$http.post("http://localhost:8080/Erp-web/productfile/addproductfile.do", this.$qs.stringify(this.ruleForm))
							.then(res => {
								this.$message({
									message: '创建成功！',
									type: 'success'
								});

							})
							.catch(err => {
								console.log("添加失败" + err);
							});
					} else {
						return false;
					}
				});
			},
			resetForm() {
				this.$nextTick(() => {
					this.$refs.ruleForm.resetFields();
					this.ruleForm = {};
				})
			},
			handleChange() {
				var value = this.$refs['cascader'].getCheckedNodes()[0].path;
				var label = this.$refs['cascader'].getCheckedNodes()[0].pathLabels;
				this.ruleForm.firstKindId = value[0];
				this.ruleForm.secondKindId = value[1];
				this.ruleForm.thirdKindId = value[2];

				this.ruleForm.firstKindName = label[0];
				this.ruleForm.secondKindName = label[1];
				this.ruleForm.thirdKindName = label[2];
			}
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
		width: 200px;
		float: right;
	}
</style>
