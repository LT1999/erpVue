<template>
	<div id="registration">
		<el-breadcrumb>
			<el-breadcrumb-item>采购管理</el-breadcrumb-item>
			<el-breadcrumb-item>供应商档案管理</el-breadcrumb-item>
			<el-breadcrumb-item>供应商档案变更</el-breadcrumb-item>
		</el-breadcrumb>

		<div id="out">
			<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="220px" class="demo-ruleForm">
				<div id="butt">
					<el-form-item>
						<div id="butt2">
							<el-button type="success" plain size="medium" @click="submitForm">确认变更</el-button>
							<el-button type="danger" plain size="medium" @click="resetForm">重置</el-button>
						</div>
					</el-form-item>
				</div>
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>主信息</span>
					</div>
					<el-form-item label="供应商名称" prop="supplierName">
						<el-input v-model="ruleForm.supplierName"></el-input>
					</el-form-item>
					<el-form-item label="地址">
						<el-input v-model="ruleForm.supplierAddress"></el-input>
					</el-form-item>
					<el-form-item label="分类" prop="classify">
						<el-cascader v-model="ruleForm.classify" clearable ref="cascader" :options="options" :props="SetKesDept" @change="handleChange"></el-cascader>
					</el-form-item>
					<el-form-item label="所在区域" prop="supplierArea">
						<el-select placeholder="所在区域" v-model="ruleForm.supplierArea">
							<el-option label="中国" value="中国"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="供应商曾用名">
						<el-input v-model="ruleForm.supplierUsedname"></el-input>
					</el-form-item>
					<el-form-item label="开户银行">
						<el-input v-model="ruleForm.supplierOpenAccount"></el-input>
					</el-form-item>
					<el-form-item label="银行账号">
						<el-input v-model="ruleForm.supplierBankaccount"></el-input>
					</el-form-item>
					<el-form-item label="网址">
						<el-input v-model="ruleForm.supplierUrl"></el-input>
					</el-form-item>
					<el-form-item label="优质级别">
						<el-select placeholder="档次级别" v-model="ruleForm.supplierQualityRank">
							<el-option label="高档" value="高档"></el-option>
							<el-option label="中档" value="中档"></el-option>
							<el-option label="低档" value="低档"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="电话" prop="supplierPhone">
						<el-input v-model="ruleForm.supplierPhone"></el-input>
					</el-form-item>
					<el-form-item label="传真">
						<el-input v-model="ruleForm.supplierFax"></el-input>
					</el-form-item>
					<el-form-item label="邮政编码">
						<el-input v-model="ruleForm.supplierPostalcode"></el-input>
					</el-form-item>
		
				</el-card>
				<br />
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>联系人信息</span>
					</div>
					<el-form-item label="第一联系人">
						<el-input v-model="ruleForm.supplierFirstlinkmanName"></el-input>
					</el-form-item>
					<el-form-item label="部门">
						<el-input v-model="ruleForm.supplierFirstlinkmanSector"></el-input>
					</el-form-item>
					<el-form-item label="职务">
						<el-input v-model="ruleForm.supplierFirstlinkmanPost"></el-input>
					</el-form-item>
					<el-form-item label="手机号码">
						<el-input v-model="ruleForm.supplierFirstlinkmanPhone"></el-input>
					</el-form-item>
					<el-form-item label="邮箱">
						<el-input v-model="ruleForm.supplierFirstlinkmanEmail"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-select placeholder="请选择" v-model="ruleForm.supplierFirstlinkmanSex">
							<el-option label="男" value="男"></el-option>
							<el-option label="女" value="女"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="第二联系人">
						<el-input v-model="ruleForm.supplierSecondlinkmanName"></el-input>
					</el-form-item>
					<el-form-item label="部门">
						<el-input v-model="ruleForm.supplierSecondlinkmanSector"></el-input>
					</el-form-item>
					<el-form-item label="职务">
						<el-input v-model="ruleForm.supplierSecondlinkmanPost"></el-input>
					</el-form-item>
					<el-form-item label="手机号码">
						<el-input v-model="ruleForm.supplierSecondlinkmanPhone"></el-input>
					</el-form-item>
					<el-form-item label="邮箱">
						<el-input v-model="ruleForm.supplierSecondlinkmanEmail"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-select placeholder="请选择" v-model="ruleForm.supplierSecondlinkmanSex">
							<el-option label="男" value="男"></el-option>
							<el-option label="女" value="女"></el-option>
						</el-select>
					</el-form-item>
				</el-card>
				<br />
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>动态信息</span>
					</div>
					<el-form-item label="登记人">
						<el-input v-model="ruleForm.supplierRegistrant"></el-input>
					</el-form-item>
					<el-form-item label="登记时间">
						<el-input v-model="ruleForm.supplierRegistrationtime" readonly="readonly"></el-input>
					</el-form-item>
					<el-form-item label="采购人">
						<el-input v-model="ruleForm.supplierBuyer"></el-input>
					</el-form-item>
					<el-form-item label="采购人编号">
						<el-input v-model="ruleForm.supplierBuyerNo"></el-input>
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
					
				},
				rules: {
					supplierName: [{
						required: true,
						message: '请填写供应商名称',
						trigger: 'blur'
					}],
					supplierPhone: [{
						required: true,
						message: '请输入电话',
						trigger: 'blur'
					}],
					classify: [{
						required: true,
						message: '请选分类',
						trigger: 'change'
					}],
					supplierArea: [{
						required: true,
						message: '请选择所在区域',
						trigger: 'change'
					}],
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
				this.ruleForm.checkMark='未审核';
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						this.$http.post("http://localhost:8081/supplierfiles/updateByPrimaryKey", this.$qs.stringify(this.ruleForm))
							.then(res => {
								this.$message({
									message: '档案变更成功，需要重新审核！',
									type: 'success'
								});
								location.href = "#/InfoChange"

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
		created() {
			this.ruleForm = this.$route.query.arr;
			//this.Form.classify = [this.Form.firstKindId, this.Form.secondKindId, this.Form.threeKindId];
			this.ruleForm.classify = this.ruleForm.firstKindName + '/' + this.ruleForm.secondKindName + '/' + this.ruleForm.threeKindName;
			console.log(this.ruleForm.threeKindName)
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
