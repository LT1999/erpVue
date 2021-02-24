<template>
	<div id="ProductFileChange">
		<el-breadcrumb separator="/" style="margin-bottom: 30px;">
			<el-breadcrumb-item>采购管理</el-breadcrumb-item>
			<el-breadcrumb-item>放货管理</el-breadcrumb-item>
			<el-breadcrumb-item>放货查询</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card shadow="always" style="padding: 20px;">

			<el-form ref="searchFrom" :model="searchFrom" label-position="top" inline>
				<el-col :span="9" style="margin-left: 20px;">
					<el-form-item label="请输入登记时间">
						<el-date-picker  v-model="searchFrom.queryTime" type="daterange" value-format="yyyy-MM-dd"
						      range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
					</el-form-item>
				</el-col>

				<el-col :span="6" style="margin-left: 12px;">
					<el-form-item label="请选择供应商所供产品分类">
						<el-cascader v-model="searchFrom.queryClassifyId" :props="SetKesDept" ref="cascader" :options="options"></el-cascader>
					</el-form-item>
				</el-col>

				<el-col :span="5">
					<el-form-item label="请输入采购人编号">
						<el-input v-model="searchFrom.type" ></el-input>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="2">
					<el-button @click="open" type="primary" plain style="margin-top: 50px; margin-left: 20px;font-size: 13px;">查询</el-button>
				</el-col>
			</el-form>
			<div>
				<el-table :data="tableData" style="text-align: center;" border>
					<el-table-column prop="supplierNo" label="供应商编号" width="200px">
					</el-table-column><!-- 点击供应商编号要跳转到供应商档案查询 -->
					<el-table-column prop="supplierName" label="供应商名称">
					</el-table-column>
					<el-table-column prop="firstKindName" label="I级分类">
					</el-table-column>
					<el-table-column prop="secondKindName" label="II级分类">
					</el-table-column>
					<el-table-column prop="threeKindName" label="III级分类">
					</el-table-column>
					<el-table-column prop="supplierBuyer" label="采购人">
					</el-table-column>
					<el-table-column prop="supplierBuyer" label="放货余额">
					</el-table-column>
					<el-table-column prop="review" label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="success" plain @click="selInfoChange(scope.row)">
								查看
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block">
				<el-pagination style="margin-top: 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page="currentPage" :page-sizes="[5, 7, 9]" :page-size="3" layout="total, sizes, prev, pager, next, jumper"
				 :total="10">
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
				//时间
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				/* 搜索框 */
				searchFrom: {
					queryClassifyId: null,
					queryTime: null,
					type: null
				},
				//级联选择器
				options: [],
				//表格
				tableData: [],
				currentPage: 10,
				//删除
				form: {
					checkTag:'审核不通过',
					deleteTag: '已删除',
					id: '',
					deleteTime: ''
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
			/* selectAll() {
				this.$http.post("http://localhost:8080/Erp-web/productfile/findAllProductfile.do")
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					});
			}, */
			//删除
			del(row) {
				console.log(row.id)
				this.$confirm('是否删除此供应商档案?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post("http://localhost:8081/supplierfiles/delByid", this.$qs.stringify(row))
						.then(res => {
							this.open();
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								
						})
						.catch(err => {
							this.$message({
								type: 'danger',
								message: '删除失败!'
							});
							console.log(err)
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
				//console.log(this.searchFrom);
				this.$http.post("http://localhost:8081/supplierfiles/selectChang", this.$qs.stringify(this.searchFrom))
					.then(res => {
						//console.log(res.data)
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					}); 
			},
			handleChange() {

			},
			Changeinfo(row) {
				this.$router.push({path: '/InfoChange2',query:{arr:row}});
			},
			selInfoChange(row) {
				
				//console.log(row);
				this.$router.push({
					path: '/InfoChange-info',
					query: {
						arr: row
					}
				});
			}
		},
		mounted() {
			//this.selectAll();
			this.selectOptions();
		}
	}
</script>

<style scoped>
	table {
		margin: 3px;
	}

	#ProductFileChange>>>.el-table th {
		text-align: center;
	}

	#ProductFileChange>>>.el-table td {
		padding: 0px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
</style>
