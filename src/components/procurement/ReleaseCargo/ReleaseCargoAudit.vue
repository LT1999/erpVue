<template>
	<div id="ProductFileChange">
		<el-breadcrumb separator="/" style="margin-bottom: 30px;">
			<el-breadcrumb-item>采购管理</el-breadcrumb-item>
			<el-breadcrumb-item>放货管理</el-breadcrumb-item>
			<el-breadcrumb-item>放货审核</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card shadow="always" style="padding: 20px;">

			<div>
				<span style="font-size: 12px; color: #C6C6C9;float: left;">当前等待审核的申请单总数 :{{number}}例 </span>
				<el-table :data="tableData" style="text-align: center;" border>
					<el-table-column prop="purchaseqNo" label="采购单编号" width="200px">
					</el-table-column>
					<el-table-column prop="purchasedetailList[0].supplierNo" label="供应商编号">
					</el-table-column>
					<el-table-column prop="purchasedetailList[0].supplierName" label="供应商名称">
					</el-table-column>
					<el-table-column prop="productNo" label="商品编号">
					</el-table-column>
					<el-table-column prop="productName" label="商品名称">
					</el-table-column>
					<el-table-column prop="checkReleaseCargo" label="放货数量">
					</el-table-column>>
					<el-table-column prop="releaseCargo" label="已放货数量">
					</el-table-column>
					<el-table-column prop="review" label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click.prevent="ReleaseCargoAudits(scope.row)" type="warning" plain>
								审核
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
				tableData: [],
				currentPage: 10,
				number: 0
			}
		},
		methods: {
			selectAll() {
				this.$http.post(this.$api + "/purchase/selectReleaseCargoCheck")
					.then(res => {
						this.tableData = res.data;
						this.number = this.tableData.length;
					})
					.catch(err => {
						console.log(err)
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
			handleChange() {

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
			ReleaseCargoAudits(row) {
				console.log(row);
				this.$router.push({
					path: '/ReleaseCargoAudits',
					query: {
						arr: row
					}
				});
			}
		},
		mounted() {
			this.selectAll();
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
