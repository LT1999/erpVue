<template>
	<div id="box">
		<el-card shadow="always">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>产品设计</el-breadcrumb-item>
				<el-breadcrumb-item>产品物料组成设计</el-breadcrumb-item>
				<el-breadcrumb-item>物料组成设计单变更</el-breadcrumb-item>
			</el-breadcrumb>
			<br />
			<div id="body">
				<el-form ref="searchFrom" inline>
					<el-row>
						<el-col :span="12">
							<el-form-item label="请输入登记时间 ">
								<el-date-picker  value-format="yyyy-MM-dd" v-model="moduleDto.times" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="1" :push="9">
							<el-button @click="open" type="primary" plain class="btn2">查询</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="请选择产品分类 ">
								<el-cascader v-model="moduleDto.fenlei" :props="SetKesDept" ref="cascader" class="btn" :options="options"></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="请选择商品 ">
								<el-select v-model="moduleDto.productName" placeholder="请选择" class="btn">
									<el-option v-for="item in commodity" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="请选择设计单状态 ">
								<el-select v-model="moduleDto.checkTag" placeholder="请选择" class="btn">
									<el-option label="等待审核" value="等待审核"></el-option>
									<el-option label="审核通过" value="审核通过"></el-option>
									<el-option label="审核不通过" value="审核不通过"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div>
				<span>
					等待执行的设计单总数：{{num1}}例, 正在执行的设计单总数：{{num2}}例, 完成的设计单总数：{{num3}}例
				</span>
			</div>
			<div>
				<el-table :data="tableData" style="text-align: center;" border>
					<el-table-column prop="designId" label="设计单编号" width="180px">
					</el-table-column>
					<el-table-column prop="productId" label="产品编号">
					</el-table-column>
					<el-table-column prop="productName" label="产品名称">
					</el-table-column>
					<el-table-column prop="checkTag" label="审核状态">
					</el-table-column>
					<el-table-column prop="designer" label="设计人">
					</el-table-column>
					<el-table-column prop="designer" label="登记时间">
					</el-table-column>
					<el-table-column prop="costPriceSum" label="物料总成本">
					</el-table-column>
					<el-table-column prop="assembletable" label="操作" width="248px">
						<template slot-scope="scope">
							<el-button type="text">
								<el-button type="danger" size="mini" plain @click="zpb(scope.row)">装配表</el-button>
								<el-button type="success" size="mini" plain @click="back(scope.row)">查看</el-button>
								<el-button type="warning" size="mini" plain @click="back2(scope.row)">变更</el-button>
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block">
				<el-pagination style="margin-top: 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :page-sizes="[5, 7, 9]" :page-size="3" layout="total, sizes, prev, pager, next, jumper" :total="10">
				</el-pagination>
			</div>
			<el-drawer title="物料信息" :visible.sync="drawer" :with-header="false" :size="size">
				<el-table :data="tableData2" style="width: 100%">
					<el-table-column prop="productId" label="物料编号" width="150px">
					</el-table-column>
					<el-table-column prop="productName" label="物料名称">
					</el-table-column>
					<el-table-column prop="type" label="用途类型">
					</el-table-column>
					<el-table-column prop="productDescribe" label="描述">
					</el-table-column>
					<el-table-column prop="amount" label="数量">
					</el-table-column>
					<el-table-column prop="amountUnit" label="单位">
					</el-table-column>
					<el-table-column prop="costPrice" label="单价（元）">
					</el-table-column>
					<el-table-column prop="subtotal" label="小计（元）">
					</el-table-column>
				</el-table>
			</el-drawer>
		</el-card>
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
				//抽屉
				size: "800px",
				drawer: false,
				//数据统计
				num1: 0,
				num2: 0,
				num3: 0,
				//商品
				commodity: [],
				//时间
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				
				options: [],
				
				//表格2
				tableData2: [],
				//表格1
				tableData: [],
				moduleDto:{
					//级联选择器
					fenlei: [],
					times:[],
					checkTag:null,//设计单状态
					productName:null//商品
				}
			}
		},
		methods: {
			zpb(row){
				//根据商品id查询物料明细表
				this.$http.post("http://localhost:8080/Erp-web/module-details/findwlById.do", "id=" + row.id)
					.then(res => {
						this.tableData2 = res.data;
					})
					.catch(err => {
						console.log(err)
					});
				this.drawer = true;
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
			selectsp(){
				this.$http.post("http://localhost:8080/Erp-web/module/getAllsp.do")
					.then(res => {
						res.data.forEach(item=>{
							this.commodity.push({"value":item.productName,"lable":item.productName});
						});
					})
					.catch(err => {
						console.log(err)
					})
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
			//查看
			back(row) {
				this.$router.push({
					path: '/MaterialCompositionChangeInfo',
					query: {
						arr: row
					}
				});
			},
			//变更
			back2(row) {
				this.$router.push({
					path: '/MaterialCompositionChanges',
					query: {
						arr: row
					}
				});
			},
			//删除
			del(row) {
				this.$confirm('是否删除该产品档案?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//分页
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			handleEdit(index, row) {
				this.$message(index + "-" + row);
			},
			handleDelete(index, row) {
				this.$message(index + "-" + row);
			},
			//查询按钮
			open() {
				console.log(this.moduleDto);
				this.$http.post("http://localhost:8080/Erp-web/module/findAllsp.do",this.$qs.stringify(this.moduleDto))
					.then(res => {
						console.log(res.data);
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
				
			},
			selectAll() {
				this.$http.post("http://localhost:8080/Erp-web/module/getAll.do")
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					});
				this.$http.post("http://localhost:8080/Erp-web/module/countdd.do")
					.then(res => {
						this.num1 = res.data;
					})
					.catch(err => {
						console.log(err)
					});
				this.$http.post("http://localhost:8080/Erp-web/module/countzz.do")
					.then(res => {
						this.num2 = res.data;
					})
					.catch(err => {
						console.log(err)
					});
				this.$http.post("http://localhost:8080/Erp-web/module/countwc.do")
					.then(res => {
						this.num3 = res.data;
					})
					.catch(err => {
						console.log(err)
					});
			}
		},
		mounted() {
			this.selectsp();
			this.selectAll();
			this.selectOptions();
		}
	}
</script>

<style scoped>
	span {
		font-size: 8px;
	}

	table {
		margin: 3px;
	}

	.txt {
		width: 125px;
		color: #64696D;
	}

	.btn {
		width: 210px;
		margin-top: 3px;
	}

	form {
		font-size: 15px;
	}

	#box>>>.el-table th {
		text-align: center;
	}

	#box>>>.el-table td {
		padding: 0px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}

	.btn2 {
		font-size: 13px;
		width: 120px;
		font: #C1CAD3;
	}
</style>
