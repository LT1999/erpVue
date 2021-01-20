<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>采购管理</el-breadcrumb-item>
				<el-breadcrumb-item>供应商申请审批管理</el-breadcrumb-item>
				<el-breadcrumb-item>申请登记</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :rules="rules" :model="form" label-width="130px">
				<div id="buttons">
					<el-button type="warning" @click="table = true">添加商品</el-button>
					<el-button type="success" @click="submit()">提交</el-button>
					<el-button type="primary" @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>供应商报价单</h3><br />

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="供应商名称">
								<span>
									<!-- {{form.designId}} --></span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="供应商编号">
								<span>
									<!-- {{form.designer}} --></span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="电话">
								<input v-model="input"></input>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="拟供货时间">
								<el-date-picker v-model="value1" type="date" value-format="yyyy-MM-dd"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<template>
							<el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
								<el-table-column prop="productName" label="商品编号">
								</el-table-column>
								<el-table-column prop="type" label="商品名称">
								</el-table-column>
								<el-table-column prop="productDescribe" label="描述 ">
								</el-table-column>
								<el-table-column prop="amount" label="数量 ">
								</el-table-column>
								<el-table-column prop="amountUnit" label="单位 ">
								</el-table-column>
								<el-table-column prop="costPrice" label="单价(元) ">
								</el-table-column>
								<el-table-column prop="subtotal" label="小计(元) ">
								</el-table-column>
								<el-table-column prop="subtotal" label="折扣(%) ">
								</el-table-column>
								<el-table-column prop="caozuo" label="操作 ">
									<template slot-scope="scope">
										<el-button type="text">
											<el-button type="text" @click="del(scope.row)">删除</el-button>
										</el-button>
									</template>
								</el-table-column>
							</el-table>
						</template>
					</el-row>
					<br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="登记人" prop="changer">
								<input v-model="input"></input>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="所在区域">
								<span></span>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-col :span="21" :push='1'>
							<el-form-item label="备注" style="width: 100%;">
								<el-input style="width: 100%;" type="textarea" :autosize="{ minRows: 4, maxRows: 6}">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>

				</el-card>
			</el-form>
		</div>
		<el-drawer :visible.sync="table" direction="rtl" size="50%">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<center>
					<el-form-item label="请选择产品分类">
						<!-- <el-cascader v-model="formInline.queryClassifyId" :props="SetKesDept" ref="cascader" :options="options"></el-cascader> -->
					</el-form-item>
					<el-form-item label="">
						<el-button type="primary" @click="onSubmit">搜索</el-button>
						<el-button type="success" @click="qb">展示全部</el-button>
					</el-form-item>
				</center>
			</el-form>
			<br />
			<el-table :data="gridData" style="margin-left:5px;">
				<el-table-column prop="productId" label="产品编号"></el-table-column>
				<el-table-column prop="productName" label="产品名称"></el-table-column>
				<el-table-column prop="type" label="用途类型"></el-table-column>
				<el-table-column prop="productDescribe" label="单位"></el-table-column>
				<el-table-column prop="listPrice" label="市场单价(元)"></el-table-column>
				<el-table-column label="添加">
					<template slot-scope="scope">
						<el-button @click.native.prevent="add(scope.$index, table)" type="text" size="small">添加</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-drawer>
		<!--添加商品选择数量-->
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

<script>
	export default {
		data() {
			let that = this;
			return {
				/* SetKesDept: { //联动菜单配置
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
				}, */
				formInline: {
					queryClassifyId: ''
				},
				rules: {
					changer: [{
						required: true,
						message: '请填写登记人',
						trigger: 'blur'
					}]
				},
				input: '',
				//级联选择器
				value: [],
				options: [],
				table: false,
				index: -1,
				num: 1,
				//对话框
				innerVisible: false,
				radio: '1', //未通过
				form: {},
				form2: {
					changeTime: '',
					id: 0,
					changer: '',
					designer: '',
					changeTag: '已变更',
					checkTag: '等待审核',
					costPriceSum: 0
				},
				tableData: [],
				gridData: [{
					productId: '1',
					productName: '2',
					type: '3',
					productDescribe: '4',
					listPrice: '5'
				}],
				id: 0,
				dto: {
					parentid: 0,
					moduleDetails: [],
				},
			};
		},
		methods: {
			onSubmit() {
				/* this.$http.post("http://localhost:8080/Erp-web/productfile/findProductfilewl.do")
					.then(res => {
						this.gridData = res.data;
					})
					.catch(err => {
						console.log(err)
					}); */
			},
			selectsp() {
				/* this.$http.post("http://localhost:8080/Erp-web/productfile/findsp.do")
					.then(res => {
						this.gridData = res.data;
					})
					.catch(err => {
						console.log(err)
					}); */
			},
			check() {
				this.gridData[this.index].amount = this.num; //修改数量
				this.gridData[this.index].subtotal = this.num * this.gridData[this.index].listPrice;
				//把数据添加到数组末尾
				this.tableData.push(this.gridData[this.index]);
				//关闭所有模态框
				this.num = 1;
				this.table = false,
					this.innerVisible = false,
					this.tableData.forEach(item => {
						this.form.costPriceSum += item.subtotal;
					});
			},
			/* async getSta(id) { //懒加载联动数据
				const data = await this.$http.post("http://localhost:8080/Erp-web/config-file-kind/selectAllConfigFileKind.do",
						"pId=" + id)
					.then((res) => {
						return res.data;
					})
					.catch((res) => {
						console.log(res)
					})
				return data;
			}, */
			submit() {
				this.dto.moduleDetails = this.tableData;
				this.dto.parentid = this.form.id;
				this.form2.id = this.form.id;
				this.form2.changer = this.form.changer;
				this.form2.designer = this.form.designer;
				this.tableData.forEach(item => {
					this.form2.costPriceSum += item.subtotal;
				});
				var aData = new Date();
				this.form2.changeTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
				/* this.$refs.form.validate((valid) => {
					if (valid) {
						this.$http.post("http://localhost:8080/Erp-web/module/updModuleId.do", this.$qs.stringify(this.form2))
							.then(res => {
								this.id = this.form.id;
								this.$http.post("http://localhost:8080/Erp-web/module-details/delModuleDetails.do", "id=" + this.id)
									.then(res => {

										this.$http.post("http://localhost:8080/Erp-web/module-details/addModuleDetails.do", this.$qs.stringify(
												this.dto, {
													arrayFormat: 'moduleDetails',
													allowDots: true
												}))
											.then(res => {
												this.$message({
													message: '已变更！',
													type: 'success'
												});

											})
											.catch(err => {
												console.log(err)
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
				}); */
			},
			add(index) {
				this.index = index;
				this.innerVisible = true;
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
			//提交
			onsubmit() {
				alert("提交");
			},
			//删除
			del(row) {
				this.$confirm('是否删除该商品?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.tableData = this.tableData.filter((items) => {
						return items.id != row.id;
					});
					this.form.costPriceSum -= row.subtotal;
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			qb() {
				/* this.selectsp(); */
			},
			back() {
				this.$confirm('确定已保存?立即返回', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					location.href = "#/ApplyForRegistration"
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});

			},
			ins() {
				this.dialogVisible = false;
				this.value = [];
			}
		},
		mounted() {
			/* this.selectsp();
			this.selectOptions();
			this.$http.post("http://localhost:8080/Erp-web/module-details/findwlById.do", "id=" + this.id)
				.then(res => {
					this.tableData = res.data;
				})
				.catch(err => {
					console.log(err)
				});
				this.dto.parentid=this.form.productId; */
		},
		created() {
			/* this.form = this.$route.query.arr;
			this.id = this.form.id; */
			/* this.selectsp(); */
		}
	}
</script>

<style scoped>
	.box-card {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		padding-bottom: 23px;
	}

	#buttons {
		float: right;
		margin-right: 50px;
		margin-bottom: 20px;
	}

	input {
		outline: none;
		border: none;
		border-bottom: 1px solid #000;
		width: 15.75rem;
	}

	#card>>>.el-date-picker {
		outline: none;
		border: none;
		border-bottom: 1px solid #000;
		width: 15.75rem;
	}

	#box>>>.el-form-item {
		margin-bottom: 0px;
	}

	#box>>>.el-form-item__label {
		line-height: 35px;
	}

	.el-row {
		margin: 10px;
	}

	h3 {
		text-align: center;
	}

	table {
		margin-left: 3%;
	}

	table td {
		margin-left: 50px;
		display: inline-block;
	}

	#box>>>.el-form-item__content {
		line-height: 35px;
	}
</style>
