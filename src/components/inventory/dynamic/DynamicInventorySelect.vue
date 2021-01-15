<template>
	<div id="box">
		<el-card shadow="always">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">库存管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/' }">动态库存管理</el-breadcrumb-item>
				<el-breadcrumb-item>动态库存查询</el-breadcrumb-item>
			</el-breadcrumb>
			<br />
			<div id="body">
				<el-form label-width="80px">
					<el-row>
						<el-col :span="3">
							<div class="grid-content bg-purple-dark">
								<p>请选择产品分类</p>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content bg-purple-dark">
								<el-cascader :props="SetKesDept" clearable v-model="value" class="btn" :options="options"></el-cascader>
							</div>
						</el-col>
						<el-col :push="2" :span="3">
							<div class="grid-content bg-purple-dark">
								<p>请选择产品</p>
							</div>
						</el-col>
						<el-col :push="1" :span="4">
							<div class="grid-content bg-purple-dark">
								<!-- <el-select v-model="select1" placeholder="请选择" class="btn">
									<el-option v-for="item in commodity" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select> -->
								<el-select v-model="select1">
									<el-option v-if="data.productId!=commodity.productId" :key="data.id" v-for="data in commodity" :label="data.productName"
									 :value="data.productId"></el-option>
								</el-select>
							</div>
						</el-col>
						<el-col :span="1" :push="5">
							<el-button @click="open" type="primary" class="btn2">查询</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<hr />
			<div>
				<span>
					当前库存总数：{{num1}}件, 当前库存上限报警产品种类数：{{num2}}种, 库存下限报警产品种类数：{{num3}}种
				</span>
			</div>
			<hr />
			<div>
				<el-table :data="tableData" style="width: 100%">
					<!-- firstKindName: '231232',//一级产品分类
						secondKindName: '电脑',//二级产品分类
						thirdKindName: '商品',//三级产品分类
						productId: '01/电子',//产品编号
						productName:'',//产品名称
						amount: '01/计算机',//库存数量
						maxAmount: "11", //安全库存上限
						minAmount: "", //安全库存下限制 -->
					<el-table-column prop="productId" label="产品编号" width="150px">
					</el-table-column>
					<el-table-column prop="firstKindName" label="I级产品分类">
					</el-table-column>
					<el-table-column prop="secondKindName" label="II级产品分类">
					</el-table-column>
					<el-table-column prop="thirdKindName" label="III级产品分类">
					</el-table-column>
					<el-table-column prop="productName" label="产品名称">
					</el-table-column>
					<el-table-column prop="amount" label="库存数量">
					</el-table-column>
					<el-table-column prop="maxAmount" label="安全库存上限">
					</el-table-column>
					<el-table-column prop="minAmount" label="安全库存下限">
					</el-table-column>
					<el-table-column prop="assembletable" label="操作">
						<template slot-scope="scope">
							<el-button type="text">
								<el-button type="text" @click="back(scope.row)">查看库存</el-button>
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
		</el-card>
		<el-drawer title="库存明细单" :visible.sync="drawer" :with-header="false" :size="size">
			<p style="float: inherit;">库存明细单</p>
			<br />
			<el-form>
				<el-row>
					<el-col :span="8" :push='1'>
						<el-form-item label="产品编号 ">
							<span>1111</span>
						</el-form-item>
					</el-col>
					<el-col :span="8" :push='7'>
						<el-form-item label="产品名称">
							<span>2222</span>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<el-table :data="gridData">
				<template>
					<el-table-column property="id" label="序号"></el-table-column>
					<el-table-column property="name" label="库房名称 "></el-table-column>
					<el-table-column property="describe" label="存储地址编号"></el-table-column>
					<el-table-column property="id" label="存储地址名称"></el-table-column>
					<el-table-column property="name" label="存储单元简称 "></el-table-column>
					<el-table-column property="describe" label="当前库存数量"></el-table-column>
				</template>
			</el-table>
			<br />
			<el-button @click="drawer=false" style="float: right;margin-right: 20px;">关闭窗口</el-button>
		</el-drawer>

	</div>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {

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

				//抽屉
				size: "800px",
				drawer: false,
				//抽屉table
				gridData: [{
					id: '2016-05-01',
					name: '王小虎',
					describe: 'dsd'
				}],

				//数据统计
				num1: '',
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
				//级联选择器
				value: [], //v-model
				options: [],
				//表格1
				tableData: [{

				}],
				//商品
				select1: "",
			}
		},
		methods: {
			//查看
			back(row) {
				this.drawer = true;
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
				this.$message("哦吼，你完了")
				console.log(this.value)
				console.log(this.select1)
				this.$http.post("http://localhost:8080/Erp-web/cell/selCell.do","kindid="+this.value+"&productId="+this.select1)
					.then(res => {
						if (res.data != null) {
							this.tableData = res.data;
							
						} else {
							alert('错误');
						}
					})
					.catch(err => {
						console.log(err)
					})
				
				
			},
			getAll() {
				this.$http.post("http://localhost:8080/Erp-web/cell/getAll.do")
					.then(res => {
						if (res.data != null) {
							this.num1 = res.data.length;
							this.tableData = res.data;
							this.commodity=res.data;
							res.data.forEach(item => {
								if (item.amount >= item.maxAmount) {
									this.num2 += 1;
								}
								if (item.amount <= item.minAmount) {
									this.num3 += 1;
								}
							})
						} else {
							alert('错误');
						}
					})
					.catch(err => {
						console.log(err)
					})
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
		},
		mounted() {
			this.selectOptions();
			this.getAll();
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
		width: 225px;
		margin-top: 3px;
	}

	form {
		font-size: 15px;
	}

	.btn2 {
		font-size: 13px;
		width: 120px;
		font: #C1CAD3;
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
</style>
