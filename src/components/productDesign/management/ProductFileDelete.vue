<template>
	<div id="box">
		<el-card shadow="always">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>产品设计</el-breadcrumb-item>
				<el-breadcrumb-item>产品档案管理</el-breadcrumb-item>
				<el-breadcrumb-item>产品档案删除与恢复</el-breadcrumb-item>
			</el-breadcrumb>
			<br />
			<div id="body">
				<el-form>
					<el-row>
						<el-col :span="15">
							<el-form-item label="请输入删除时间 ">
								<el-date-picker value-format="yyyy-MM-dd" v-model="searchFrom.queryTime" type="daterange" range-separator="至" start-placeholder="开始日期"
								 end-placeholder="结束日期"></el-date-picker>

							</el-form-item>
						</el-col>
						<el-col :span="1" :push="4">
							<el-button @click="open" plain type="primary" class="btn2">查询</el-button>

						</el-col>
					</el-row>

					<el-row>
						<el-col :span="11">
							<el-form-item label="请选择产品分类 ">
								<el-cascader v-model="searchFrom.queryClassifyId" class="btn" :props="SetKesDept" ref="cascader" :options="options"></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="11">
							<el-form-item label="请选择产品用途类型">
								<el-select v-model="searchFrom.type" placeholder="请选择" class="btn">
									<el-option label="商品" value="商品"></el-option>
									<el-option label="物料" value="物料"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div>
				<el-table :data="tableData" style="text-align: center;" border>
					<el-table-column prop="productId" label="产品编号" width="200px">
					</el-table-column>
					<el-table-column prop="productName" label="产品名称">
					</el-table-column>
					<el-table-column prop="type" label="用途类型">
					</el-table-column>
					<el-table-column prop="firstKindName" label="I级分类">
					</el-table-column>
					<el-table-column prop="secondKindName" label="II级分类">
					</el-table-column>
					<el-table-column prop="thirdKindName" label="III级分类">
					</el-table-column>
					<el-table-column prop="responsiblePerson" label="产品经理">
					</el-table-column>
					<el-table-column prop="review" label="操作" width="180px">
						<template slot-scope="scope">
							<el-button type="danger" size="mini" plain @click="del(scope.row)"> 永久删除 </el-button>
							<el-button type="success" size="mini" plain @click="ins(scope.row)"> 恢复 </el-button>

						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block">
				<el-pagination style="margin-top: 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :page-sizes="[5, 7, 9]" :page-size="3" layout="total, sizes, prev, pager, next, jumper" :total="10">
					<el-link to="#/ProductFileDeleteInfo">删除管理</el-link>
				</el-pagination>
			</div>
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
				/* 搜索框 */
				searchFrom: {
					queryClassifyId: null,
					queryTime: null,
					type: null
				},
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
				//恢复
				form: {
					fileChangeAmount: 0,
					checkTag: '等待审核',
					deleteTag: '未删除',
					id: ''
				},
				//级联选择器
				value: [],
				options: [],
				//表格
				tableData: []
			}
		},
		methods: {
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
				this.$http.post("http://localhost:8080/Erp-web/productfile/findProductfileCondition2.do", this.$qs.stringify(this.searchFrom))
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					});
			},
			//恢复
			ins(row) {
				this.form.fileChangeAmount = row.fileChangeAmount;
				this.form.id = row.id;
				this.$confirm('是否恢复该产品档案?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post("http://localhost:8080/Erp-web/productfile/updProductfileById.do", this.$qs.stringify(this.form))
						.then(res => {
							this.selectTable();
							this.$message({
								type: 'success',
								message: '成功恢复!'
							});
						})
						.catch(err => {
							this.$message({
								type: 'danger',
								message: '恢复失败!'
							});
							console.log(err)
						})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消恢复'
					});
				});
			},
			selectTable() {
				this.$http.post("http://localhost:8080/Erp-web/productfile/findProductDelete.do")
					.then(res => {
						this.tableData = res.data;
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
			//删除
			del(row) {
				 this.$confirm('是否永久删除该产品档案?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post("http://localhost:8080/Erp-web/productfile/delProductfileById.do", "id=" +row.id)
						.then(res => {
							this.selectTable();
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
						})
						.catch(err => {
							console.log(err)
						});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			} 
		},
		mounted() {
			this.selectTable();
			this.selectOptions();
		}
	}
</script>

<style scoped>
	table {
		margin: 3px;
	}

	.txt {
		width: 150px;
		color: #64696D;
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

	.btn {
		width: 350px;
	}

	form {
		font-size: 15px;
	}

	.btn2 {
		font-size: 13px;
		width: 120px;
		font: #C1CAD3;
	}
</style>
