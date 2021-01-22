<template>
	<div id="box">
		<el-card shadow="always">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">采购管理</el-breadcrumb-item>
				<el-breadcrumb-item>
					<a href="/">采购调度管理</a>
				</el-breadcrumb-item>
				<el-breadcrumb-item >制定采购执行单</el-breadcrumb-item>
			</el-breadcrumb>
			<br />
			<!-- <div>
				<span>
				等待执行的生产派工单总数：{{num1}}例, 正在执行的生产派工单总数：{{num2}}例, 完成的生产派工单总数：{{num3}}例
				</span>
			</div> -->
			<el-table :data="tableData" border>
				<el-table-column prop="purchaseqplan.purchaseqNo" label="计划单编号">
				</el-table-column>
				<el-table-column prop="productNo" label="产品编号">
				</el-table-column>
				<el-table-column prop="productName" label="产品名称">
				</el-table-column>
				<el-table-column prop="quantity" label="采购数量">
				</el-table-column>
				
				<el-table-column prop="describe" label="描述">
				</el-table-column>
				<el-table-column prop="purchaseqplan.purchaseqRegistranttime" label="计划登记时间">
				</el-table-column>
				
				<el-table-column prop="assembletable" label="操作">
					<template slot-scope="scope">
						<el-button type="text">
							<el-button type="text" @click="back(scope.row)">生成执行计划单</el-button>
						</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination style="margin-top: 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page="currentPage4" :page-sizes="[5, 7, 9]" :page-size="3" layout="total, sizes, prev, pager, next, jumper"
			 :total="10">
			</el-pagination>

		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData:[],
				currentPage4:5
			}
		},
		methods: {
			//制定采购执行单
			back(row) {
				console.log(row);
				 /* location.href = "#/purchaseOrderInfo" ; */
				 this.$router.push({
				 	path: '/purchaseOrderinfo',
				 	query: {
				 		row: row
				 	}
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
			selectAllAndPlandetail(){
				this.$http.post(this.$api+"/plandetail/selectAllAndPurchaseqplan")
					.then(res => {
						if (res.data != null) {
							
							this.tableData=res.data;
						} else {
							console.log('selUsers错误');
						}
					})
					.catch(err => {
						console.log(err)
					})
			}
			
		},
		mounted() {
			this.selectAllAndPlandetail();
		}
	}
</script>

<style scoped>
	#box>>>.el-table th {
		background-color: #F2F8FD;
		text-align: center;
	}

	/deep/.el-table .cell {
		padding-right: 0px;
		margin: 0px;
	}
	
	/deep/.el-table th {
		background-color: #F2F8FD;
		text-align: center;
	}
	
	/deep/.el-table td {
		padding: 0px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	/deep/.el-table tr {
		padding: 0px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	
	.el-table{
		margin-top: 30px;
	}
</style>
