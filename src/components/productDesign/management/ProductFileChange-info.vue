<template>
	<div id="box">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item>产品设计</el-breadcrumb-item>
			<el-breadcrumb-item>产品档案管理</el-breadcrumb-item>
			<el-breadcrumb-item>产品档案变更</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row style="margin-bottom: 10px;">
			<el-col :span="4" :push="20">
				<el-button type="primary" size="medium" @click="onSubmit()">复核通过</el-button>
				<el-button type="primary" size="medium" @click="back()">返回</el-button>
			</el-col>
		</el-row>

		<el-form ref="form" :rules="rules" :model="form" label-width="140px" inline>
			<el-card class="box-card">

				<div slot="header" class="clearfix">
					<span>主要信息</span>
				</div>


				<el-form-item label="档案编号">
					<el-input style="width:  350px;" disabled v-model="form.productId" clearable></el-input>
				</el-form-item>
				<el-form-item label="档次级别" prop="productClass">
					<el-select v-model="form.productClass" style="width:  350px;" clearable placeholder="请选择">
						<el-option label="高档" value="高档"></el-option>
						<el-option label="中档" value="中档"></el-option>
						<el-option label="低档" value="低档"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="产品名称">
					<el-input style="width:  350px;" disabled v-model="form.productName" clearable></el-input>
				</el-form-item>
				<el-form-item label="制造商">
					<el-input style="width:  350px;" v-model="form.factoryName" clearable></el-input>
				</el-form-item>
				<el-form-item label="产品分类" prop="classify">
					<el-cascader v-model="form.classify" ref="cascader" :props="SetKesDept" style="width:350px;" @change="handleChange" :options="options"></el-cascader>
				</el-form-item>
				<el-form-item label="产品简称">
					<el-input style="width:  350px;" v-model="form.productNick" clearable></el-input>
				</el-form-item>
				<el-form-item label="计量单位">
					<el-input style="width:  350px;" v-model="form.personalUnit" clearable></el-input>
				</el-form-item>
				<el-form-item label="计量值">
					<el-input style="width:  350px;" v-model="form.personalValue" clearable></el-input>
				</el-form-item>
				<el-form-item label="用途类型">
					<el-input style="width:  350px;" disabled v-model="form.type" clearable></el-input>
				</el-form-item>
				<el-form-item label="成本单价(元)">
					<el-input style="width:  350px;" disabled v-model="form.realCostPrice" clearable></el-input>
				</el-form-item>
				<el-form-item label="市场单价(元)">
					<el-input style="width:  350px;" disabled v-model="form.listPrice" clearable></el-input>
				</el-form-item>
				<el-form-item label="计划成本单价">
					<el-input style="width:  350px;" disabled v-model="form.costPrice" clearable></el-input>
				</el-form-item>

			</el-card>

			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>辅助信息</span>
				</div>
				<el-form-item label="保修期">
					<template>
						<el-input style="width:  350px;" v-model="form.warranty"></el-input>
					</template>
				</el-form-item>
				<el-form-item label="替代品名称">
					<el-input style="width:  350px;" v-model="form.twinName"></el-input>
				</el-form-item>
				<el-form-item label="替代品编号">
					<template>
						<el-input style="width:  350px;" v-model="form.twinId" clearable></el-input>
					</template>
				</el-form-item>
				<el-form-item label="生命周期(年)">
					<el-input style="width:  350px;" v-model="form.lifecycle" clearable></el-input>
				</el-form-item>
				<el-form-item label="单位">
					<template>
						<el-input style="width:  350px;" v-model="form.amountUnit" clearable></el-input>
					</template>
				</el-form-item>
				<el-form-item label="产品描述">
					<el-input type="producttextarea" :autosize="{ minRows: 3, maxRows: 6}" style="width:  350px;" placeholder="请输入内容"
					 v-model="form.productDescribe">
					</el-input>
				</el-form-item>
				<el-form-item label="产品经理">
					<template>
						<el-input style="width:  350px;" v-model="form.responsiblePerson" clearable></el-input>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="变更人" prop="changer">
					<el-input style="width:  350px;" v-model="form.changer" clearable></el-input>
				</el-form-item>
				<el-form-item label="供应商集合">
					<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" placeholder="请输入内容" v-model="form.providerGroup">
					</el-input>
				</el-form-item>
				<!-- <el-col :span="12">
						<el-form-item label="附件">
							<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em><br>只能上传jpg/png文件，且不超过500kb</div>
							</el-upload>
						</el-form-item>
					</el-col> -->
			</el-card>
		</el-form>
	</div>
</template>

<script scoped>
	export default {
		data() {
			let that = this;
			//分类
			return {
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
				options: [],
				rules: {
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
					changer: [{
						required: true,
						message: '请填写变更人',
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
				form: {},
				ruleForm:{
					id:0,
					productId: '',
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
					changeTag: "已变更", 
					changer:'',
					changeTime:'',
					priceChangeTag: '未变更',
					fileChangeAmount:0,
					deleteTag: "未删除",
					designModuleTag: "未设计",
					designProcedureTag: '未设计',
					designCellTag: '未设计',
					checkTag: '等待审核',
					checker:'',
					checkTime:''
				}
			}
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
			onSubmit() {
				this.ruleForm.id = this.form.id;
				this.ruleForm.checkTag = "等待审核";
				this.ruleForm.checker = this.form.checker;
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
				this.ruleForm.productId = this.form.productId;
				this.ruleForm.checkTime =this.form.checkTime;
				this.ruleForm.changeTag = "已变更";
				this.ruleForm.fileChangeAmount = this.form.fileChangeAmount + 1;
				var aData = new Date();
				this.ruleForm.changeTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.$http.post("http://localhost:8080/Erp-web/productfile/fhProductfile.do", this.$qs.stringify(this.ruleForm))
							.then(res => {
								this.$message({
									message: '已变更！',
									type: 'success'
								});
								location.href = "#/ProductFileChange"
							})
							.catch(err => {
								this.$message({
									message: '变更失败！',
									type: 'error'
								});
							})
					} else {
						return false;
					}
				});
			},
			back() {
				this.$confirm('确定已保存?立即返回', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					location.href = "#/ProductFileChange"
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
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
		created() {
			this.form = this.$route.query.arr;
		},
		mounted() {
			this.selectOptions();
		}
	}
</script>

<style scoped>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.el-textarea {
		width: 350px;
		display: inline-block;
		height: 180px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
	}

	.box-card {
		width: 100%;
		margin-bottom: 20px;
	}

	.clearfix:after {
		clear: both
	}

	#card {
		margin-left: 30px;
	}
</style>
