<template>
	<!--制定工序物料设计单 -->
	<div id="app">

			<el-breadcrumb >
				<el-breadcrumb-item>生产管理</el-breadcrumb-item>
				<el-breadcrumb-item>工序物料设计</el-breadcrumb-item>
				<el-breadcrumb-item>制定工序物料设计单 </el-breadcrumb-item>
			</el-breadcrumb>

		<el-card class="box-card">
			<el-table :data="tableData" stripe style="width: 90%;margin: 0 auto;">
				<el-table-column prop="designId" label="工序设计编号" width="150"></el-table-column>
				<el-table-column prop="productId" label="产品编号"width="150"></el-table-column>
				<el-table-column prop="productName" label="产品名称"></el-table-column>
				<el-table-column prop="designer" label="设计人"></el-table-column>
				<el-table-column prop="registerTime" label="登记时间"></el-table-column>
				<el-table-column prop="costPriceSum" label="工时成本"></el-table-column>
				<el-table-column label="制定">
					<template slot-scope="scope">
						<el-button size="mini" @click="setMaterial(scope.row)">制定</el-button>
					</template>
				</el-table-column>
			</el-table>


			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
			 :page-sizes="[3, 5, 8]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="1">
			</el-pagination>


		</el-card>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentPage4: 4,
				tableData: []
			}
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			setMaterial(row) {
				this.$router.push({
					path: '/wuliao2',
					query: {
						rows: row
					}
				});
			},
			selectByModule() {
				this.$http.post("http://localhost:8080/Erp-web/design-procedure/selectByModule.do")
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		mounted() {
			this.selectByModule();
		}
	}
</script>

<style scoped>
	.box-card{
		margin-top: 40px;
		padding: 20px;
	}
	#app >>>.el-table th,#app >>>.el-table td{
		text-align: center;
	}
	.el-pagination{
		width: 45%;
		margin: 20px auto;
	}
</style>
