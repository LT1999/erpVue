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
						<el-col :span="7" :push='1'>
							<el-form-item label="供应商名称:">
								<span>{{form.supplierName}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="供应商编号:">
								<span>{{form.supplierNo}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<template>
							<el-table :data="dto.offers" style="margin-left: 8%; width: 85%;" border>
								<el-table-column prop="goodsNo" label="商品编号">
								</el-table-column>
								<el-table-column prop="goodsName" label="商品名称">
								</el-table-column>
								<el-table-column prop="goodsDescribe" label="描述 ">
								</el-table-column>
								<el-table-column label="数量 ">
									<span>1</span>
								</el-table-column>
								<el-table-column prop="goodsPrice" label="单价(元) ">
								</el-table-column>
								<el-table-column prop="goodsPrice" label="小计(元) ">
								</el-table-column>
								<el-table-column prop="goodsDiscount" label="折扣(%)">
									<span>100</span>
								</el-table-column>
								<el-table-column prop="caozuo" label="操作">
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
						<el-col :span="7" :push='1'>
							<el-form-item label="所在区域:">
								<span>{{form.supplierArea}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="电话:">
								<span>{{form.supplierPhone}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form ref="reg" :rules="rules" :model="reg" label-width="130px">
						<el-row>
							<el-col :span="7" :push='1'>
								<el-form-item label="登记人:" prop="registrar">
									<input v-model="reg.registrar"></input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
					<br />
				</el-card>
			</el-form>
		</div>
		<el-drawer :visible.sync="table" direction="rtl" size="50%">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<center>
					<el-form-item label="请选择产品分类">
						<el-cascader @change="handleChange" v-model="formInline.queryClassifyId" ref="cascader" :options="options" :props="SetKesDept"></el-cascader>
					</el-form-item>
					<el-form-item label="">
						<el-button type="primary" @click="onSubmit()">搜索</el-button>
						<el-button type="success" @click="qb()">展示全部</el-button>
					</el-form-item>
				</center>
			</el-form>
			<br />
			<el-table :data="gridData" style="margin-left:5px;">
				<el-table-column prop="productId" label="产品编号"></el-table-column>
				<el-table-column prop="productName" label="产品名称"></el-table-column>
				<el-table-column label="商品折扣(%)"><span>100</span></el-table-column>
				<el-table-column prop="productDescribe" label="商品描述"></el-table-column>
				<el-table-column prop="realCostPrice" label="单价(元)"></el-table-column>
				<el-table-column label="添加">
					<template slot-scope="scope">
						<el-button @click.native.prevent="add(scope.$index, table)" type="text" size="small">添加</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-drawer>
	</div>
</template>

<script>
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
				options: [],
				formInline: {
					queryClassifyId: []
				},
				rules: {
					registrar: [{
						required: true,
						message: '请填写登记人',
						trigger: 'blur'
					}]
				},
				table: false,
				index: -1,
				form: {},
				gridData: [],
				reg: {
					//登记人
					registrar: ''
				},
				//登记时间
				registrartime: '',
				//供应商主键
				supplierId: 0,
				dto: {
					offers: []
				},
				shuzu: []
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
			onSubmit() {
				this.$http.post("http://localhost:8080/Erp-web/productfile/findProductfilewl.do")
					.then(res => {
						this.gridData = res.data;
					})
					.catch(err => {
						console.log(err)
					});
			},
			submit() {
				var aData = new Date();
				this.registrartime = aData.getFullYear() + "-" +
					(aData.getMonth() + 1) + "-" +
					aData.getDate() + " " +
					aData.getHours() + ":" +
					aData.getMinutes() + ":" +
					aData.getSeconds();
				this.dto.offers.forEach(item => {
					item.registrartime = this.registrartime;
					item.registrar = this.reg.registrar;
					item.supplierId = this.supplierId;
					item.goodsDiscount = 100;
					item.goodsDescribe = '暂无';
					item.checkMark="未审核";
				});
				this.$refs.reg.validate((valid) => {
					if (valid) {
						this.$http.post(this.$api + "/offer/delSupplierId" + "?supplierId=" + this.supplierId)
							.then(res => {
								console.log(this.dto.offers);
								this.$http.post(this.$api + "/offer/insert", this.$qs.stringify(this.dto, {
										arrayFormat: 'offers',
										allowDots: true
									}))
									.then(res => {
										if (res.data > 0) {
											this.$message({
												message: '已提交！',
												type: 'success'
											});
										}
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
			add(index) {
				this.index = index;
				this.shuzu.goodsNo = this.gridData[this.index].productId;
				this.shuzu.goodsName = this.gridData[this.index].productName
				this.shuzu.goodsDescribe = this.gridData[this.index].productDescribe
				this.shuzu.goodsPrice = this.gridData[this.index].realCostPrice
				//把数据添加到数组末尾
				this.dto.offers.push(this.shuzu);
				this.shuzu = [];
				//关闭所有模态框
				this.num = 1;
				this.table = false,
					this.innerVisible = false
			},
			//删除
			del(row) {
				this.$confirm('是否删除该商品?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.dto.offers = this.dto.offers.filter((items) => {
						return items.goodsNo != row.goodsNo;
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			qb() {
				this.$http.post("http://localhost:8080/Erp-web/productfile/findwl.do")
					.then(res => {
						this.gridData = res.data;
					})
					.catch(err => {
						console.log(err)
					});
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
			},
			handleChange() {

			}
		},
		created() {
			this.form = this.$route.query.arr;
			this.supplierId = this.form.id;
			this.selectOptions();
			this.qb();
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
