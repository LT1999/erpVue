<template>
	<div id="ProductFileChange">
		<el-breadcrumb separator="/" style="margin-bottom: 30px;">
			<el-breadcrumb-item>采购管理</el-breadcrumb-item>
			<el-breadcrumb-item>供应商申请审批管理</el-breadcrumb-item>
			<el-breadcrumb-item>申请处理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card shadow="always" style="padding: 20px;">

			<div>
				<span style="font-size: 12px; color: #C6C6C9;float: left;">当前等待审核的报价单总数 :{{number}}例 </span>
				<el-table :data="tableData" style="text-align: center;" border>
					<el-table-column prop="1" label="报价单编号" width="200px">
					</el-table-column>
					<el-table-column prop="2" label="供应商名称">
					</el-table-column>
					<el-table-column prop="3" label="电话">
					</el-table-column>
					<el-table-column prop="4" label="拟供货时间">
					</el-table-column>
					<el-table-column prop="5" label="报价总额">
					</el-table-column>
					<el-table-column prop="review" label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click.prevent="RequestDisposes(scope.row)" type="warning" plain>
								处理
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
			return {
				//表格
				tableData: [{1:"1",2:"2",3:"3",4:"4",5:"5"}],
				currentPage: 10,
				number:''
			}
		},
		methods: {
			selectAll() {
				/* this.$http.post("http://localhost:8080/Erp-web/productfile/findAllProductfile.do")
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					}); */
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
			handleChange() {

			},
			RequestDisposes(row) {
				this.$router.push({
					path: '/RequestDisposes',
					query: {
						arr: row
					}
				});
			}
		},
		mounted() {
			/* this.selectAll(); */
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
