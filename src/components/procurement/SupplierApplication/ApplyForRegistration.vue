<template>
	<div id="ApplyForRegistration">
		<el-breadcrumb separator="/" style="margin-bottom: 30px;">
			<el-breadcrumb-item>采购管理</el-breadcrumb-item>
			<el-breadcrumb-item>供应商申请审批管理</el-breadcrumb-item>
			<el-breadcrumb-item>申请登记</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card shadow="always" style="padding: 20px;">

			<el-form ref="searchFrom" :model="searchFrom" label-position="top" inline>
				<el-col :span="9" style="margin-left: 20px;">
					<el-form-item label="请输入登记时间">
						<el-date-picker v-model="searchFrom.queryTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
						 start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
					</el-form-item>
				</el-col>

				<el-col :span="6" style="margin-left: 12px;">
					<el-form-item label="请选择供应商所供产品分类">
						<el-cascader v-model="searchFrom.queryClassifyId" :props="SetKesDept" ref="cascader" :options="options"></el-cascader>
					</el-form-item>
				</el-col>

				<el-col :span="2">
					<el-button @click="open()" type="primary" plain style="margin-top: 50px; margin-left: 20px;font-size: 13px;">查询</el-button>
				</el-col>
			</el-form>
			<div>
				<el-table :data="tableData" style="text-align: center;" border>
					<el-table-column prop="supplierNo" label="供应商编号" width="200px">
					</el-table-column>
					<el-table-column prop="supplierName" label="供应商名称">
					</el-table-column>
					<el-table-column prop="supplierQualityRank" label="优质级别">
					</el-table-column>
					<el-table-column prop="firstKindName" label="I级产品">
					</el-table-column>
					<el-table-column prop="secondKindName" label="II级产品">
					</el-table-column>
					<el-table-column prop="threeKindName" label="III级产品">
					</el-table-column>
					<el-table-column prop="supplierArea" label="所在区域">
					</el-table-column>
					<el-table-column prop="review" label="操作" width="200px">
						<template slot-scope="scope">
							<el-button size="mini" type="success" plain @click="ApplyForRegistrationInfo(scope.row)">
								查看
							</el-button>
							<el-button size="mini" @click.prevent="ApplyForRegistrations(scope.row)" type="warning" plain>
								登记
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
					queryClassifyId: [],
					queryTime: []
				},
				dto: {
					time1:null,
					time2:null,
					fl1: 0,
					fl2: 0,
					fl3: 0
				},
				number: '',
				//级联选择器
				options: [],
				//表格
				tableData: [],
				currentPage: 10
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
				
				if (this.searchFrom.queryTime != null && this.searchFrom.queryTime.length>0) {
					this.dto.time1 = this.searchFrom.queryTime[0];
					this.dto.time2 = this.searchFrom.queryTime[1];
				}else{
					this.dto.time1 = "";
					this.dto.time2 = "";
				};
				/* this.$set(this.dto,'time1',this.searchFrom.queryTime[0]);
				this.$set(this.dto,'time2',this.searchFrom.queryTime[1]);
				this.$set(this.dto,'fl1',this.searchFrom.queryClassifyId[0]);
				this.$set(this.dto,'fl2',this.searchFrom.queryClassifyId[1]);
				this.$set(this.dto,'fl3',this.searchFrom.queryClassifyId[2]); */
				this.dto.fl1 = this.searchFrom.queryClassifyId[0];
				this.dto.fl2 = this.searchFrom.queryClassifyId[1];
				this.dto.fl3 = this.searchFrom.queryClassifyId[2];
				this.$http.post(this.$api + "/supplierfiles/findss", this.$qs.stringify(this.dto, {
						allowDots: true
					}))
					.then(res => {
						console.log(res.data);
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					});
			},
			selectAll() {
				this.$http.post(this.$api + "/supplierfiles/findCheck")
					.then(res => {
						console.log(res.data);
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					});
			},
			handleChange() {

			},
			ApplyForRegistrationInfo(row) {
				this.$router.push({
					path: '/ApplyForRegistrationInfo',
					query: {
						arr: row
					}
				});
			},
			ApplyForRegistrations(row) {
				this.$router.push({
					path: '/ApplyForRegistrations',
					query: {
						arr: row
					}
				});
			}
		},
		mounted() {
			this.selectAll();
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
