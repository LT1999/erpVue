<template>
	<div id="app">
		<div>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>产品设计</el-breadcrumb-item>
				<el-breadcrumb-item>产品物料组成设计</el-breadcrumb-item>
				<el-breadcrumb-item>制定物料组成设计单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-divider></el-divider>
		<el-form inline ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">

			<div id="butt">
				<el-row>
					<el-col :span="5">
						<el-form-item>
							<span>至少要有一种物料(数量可为0)</span>
						</el-form-item>
					</el-col>
					<el-col :span="9" :push="10">
						<el-form-item>
							<div id="butt2">
								<el-button type="warning" @click="table = true">添加物料</el-button>
								<el-button type="warning" @click="del">删除物料</el-button>
								<el-button type="success" @click="submit">提交</el-button>
								<el-button type="danger" @click="back">返回</el-button>
							</div>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
			<el-card class="box-card">
				<center>
					<h4>物料组成设计单</h4>
				</center>
				<br />
				<el-row>
					<el-col :span="12">
						<el-form-item label="产品名称:">
							<el-input type="text" v-model="ruleForm.productName" style="width: 21.875rem;" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="产品编号:">
							<el-input type="text" v-model="ruleForm.productId" style="width: 21.875rem;" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-table :data="wl" @selection-change="handleSelectionChange" tooltip-effect="dark" border style="width: 100%">
					<el-table-column label="删除勾选" type="selection" width="55">
					</el-table-column>
					<el-table-column prop="productId" label="物料编号" width="180"></el-table-column>
					<el-table-column prop="productName" label="物料名称" width="100"></el-table-column>
					<el-table-column prop="type" label="用途类型" width="100"></el-table-column>
					<el-table-column prop="productDescribe" label="描述" width="150"></el-table-column>
					<el-table-column prop="amount" label="数量" width="80"></el-table-column>
					<el-table-column prop="amountUnit" label="单位" width="50"></el-table-column>
					<el-table-column prop="listPrice" label="市场单价(元)" width="150"></el-table-column>
					<el-table-column prop="subtotal" label="小计(元)"></el-table-column>
				</el-table>
				<br />
				<el-row>
					<el-col :span="12">
						<el-form-item label="设计人:" prop="designer">
							<input type="text" v-model="ruleForm.designer" style="width: 21.875rem;"></input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="登记人:" prop="register">
							<input type="text" v-model="ruleForm.register" style="width: 21.875rem;"></input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="设计要求">
					<el-input type="textarea" style="width: 21.875rem;" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容"
					 v-model="ruleForm.moduleDescribe"></el-input>
				</el-form-item>
			</el-card>
		</el-form>
		<el-drawer :visible.sync="table" direction="rtl" size="50%">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<center>
					<el-form-item label="请选择产品分类">
						<el-cascader v-model="formInline.queryClassifyId" :props="SetKesDept" ref="cascader" :options="options" @change="handleChange"></el-cascader>
					</el-form-item>
					<el-form-item label="">
						<el-button type="primary" @click="onSubmit">搜索</el-button>
						<el-button type="success" @click="qb">展示全部</el-button>
					</el-form-item>
				</center>
			</el-form>
			<br />
			<el-table :data="gridData" style="margin-left:5px;">
				<el-table-column prop="productId" label="物料编号" width="150"></el-table-column>
				<el-table-column prop="productName" label="物料名称" width="100"></el-table-column>
				<el-table-column prop="type" label="用途类型" width="100"></el-table-column>
				<el-table-column prop="productDescribe" label="描述" width="100"></el-table-column>
				<el-table-column prop="amountUnit" label="单位" width="50"></el-table-column>
				<el-table-column prop="listPrice" label="市场单价(元)" width="150"></el-table-column>
				<el-table-column label="添加">
					<template slot-scope="scope">
						<el-button @click.native.prevent="add(scope.$index, table)" type="text" size="small">添加</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-drawer>

		<!--添加物料选择数量-->
		<el-dialog width="30%" title="数量选择" :visible.sync="innerVisible" append-to-body>
			<center>
				<template>
					<el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
				</template>
				&emsp;
				<el-button type="primary" @click="check()">确认</el-button>
			</center>
		</el-dialog>
	</div>
</template>

<script scope>
	export default {
		data() {
			let that = this;
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
				form: {
					designId: '', //设计编号
					productId: '', //产品编号
					productName: '', //产品名称
					firstKindId: '', //产品I级分类编号
					firstKindName: '', //产品I级分类名称
					secondKindId: '', //产品II级分类编号
					secondKindName: '', //产品II级分类名称
					thirdKindId: '', //产品III级分类编号
					thirdKindName: '', //产品III级分类名称
					designer: '', //设计人
					moduleDescribe: '', //设计要求
					costPriceSum: 0, //物料总成本
					register: '', //登记人
					registerTime: '', //登记时间
					checker: '', //复核人
					/* checkTime:'', //复核时间 */
					changer: '', //变更人
					/* changeTime: '', //变更时间 */
					checkTag: '', // 审核标志: 等待审核 审核通过 审核不通过
					changeTag: '' //变更标志: 未变更 已变更
				},
				rules: {
					register: [{
						required: true,
						message: '请填写登记人',
						trigger: 'blur'
					}],
					designer: [{
						required: true,
						message: '请填写设计人',
						trigger: 'blur'
					}]
				},
				ruleForm: [], //
				wl: [],
				options: [], //联动菜单
				table: false,
				dto: {
					parentid: 0,
					moduleDetails: [],
				},
				checked: false,
				gridData: [],
				innerVisible: false,
				index: -1,
				num: 1,
				formInline: {
					queryClassifyId: ''
				},
				arr: {
					id:0,
					designModuleTag: '已设计'
				},
				id: []
			}
		},
		methods: {
			submit() {
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						this.dto.moduleDetails = this.wl;
						this.form.designer = this.ruleForm.designer;
						this.form.register = this.ruleForm.register;
						this.form.moduleDescribe = this.ruleForm.moduleDescribe;
						this.form.productName = this.ruleForm.productName;
						this.form.productId = this.ruleForm.productId;
						this.form.firstKindId = this.ruleForm.firstKindId;
						this.form.firstKindName = this.ruleForm.firstKindName;
						this.form.secondKindId = this.ruleForm.secondKindId;
						this.form.secondKindName = this.ruleForm.secondKindName;
						this.form.thirdKindId = this.ruleForm.thirdKindId;
						this.form.thirdKindName = this.ruleForm.thirdKindName;
						this.form.changeTag = "未变更";
						this.form.checkTag = "等待审核";
						this.wl.forEach(item => {
							this.form.costPriceSum += item.subtotal;
						});
						this.arr.id = this.ruleForm.id;
						var aData = new Date();
						this.form.registerTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
						this.$http.post("http://localhost:8080/Erp-web/module/addModule.do", this.$qs.stringify(this.form))
							.then(res => {
								this.$http.post("http://localhost:8080/Erp-web/productfile/fhProductfile.do", this.$qs.stringify(this.arr))
									.then(res => {

									})
									.catch(err => {
										console.log(err)
									});
								this.$http.post("http://localhost:8080/Erp-web/module-details/addModuleDetails.do", this.$qs.stringify(this.dto, {
										arrayFormat: 'moduleDetails',
										allowDots: true
									}))
									.then(res => {
										this.$message({
											type: 'success',
											message: '提交成功!等待复核...'
										});
									})
									.catch(err => {
										console.log(err)
									});
							})
							.catch(err => {
								console.log(err)
							});
					} else {
						return false;
					}
				});
			},
			onSubmit() {
				this.$http.post("http://localhost:8080/Erp-web/productfile/findProductfilewl.do",this.$qs.stringify(this.formInline))
					.then(res => {
						this.gridData = res.data;
					})
					.catch(err => {
						console.log(err)
					});
			},
			qb() {
				this.selectwl();
			},
			back() {
				this.$router.push({
					path: '/Productchanges'
				});
			},
			selectwl() {
				this.$http.post("http://localhost:8080/Erp-web/productfile/findwl.do")
					.then(res => {
						this.gridData = res.data;
					})
					.catch(err => {
						console.log(err)
					});
			},
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
			handleSelectionChange(val) {
				val.forEach(item => {
					this.id.push(item.id);
				});
			},
			del() {
				this.id.forEach(item => {
					this.wl = this.wl.filter((items) => {
						return items.id != item;
					})
				});
				this.id = [];
			},
			add(index) {
				this.index = index;
				this.innerVisible = true;
			},
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
			check() {

				this.gridData[this.index].amount = this.num; //修改数量
				this.gridData[this.index].subtotal = this.num * this.gridData[this.index].listPrice;
				/* 	alert(this.gridData[this.index].subtotal); */
				//把数据添加到数组末尾
				this.wl.push(this.gridData[this.index]);
				//关闭所有模态框
				this.num = 1;
				this.table = false,
					this.innerVisible = false
			},
			handleChange(value) {
				console.log(value);
			}
		},
		mounted() {
			this.selectwl();
			this.selectOptions();
			this.dto.parentid=this.ruleForm.productId;
		},
		created() {
			this.ruleForm = this.$route.query.arr;
		}
	}
</script>

<style scoped>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		margin-top: 20px;
	}

	input {
		outline: none;
		border: none;
		border-bottom: 1px solid #000;
	}

	.el-textarea {
		width: 400px;
		display: inline-block;
		height: 180px;
	}
</style>
