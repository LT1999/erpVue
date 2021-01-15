<template>
	<!-- 生产登记-->
	<div id="app">
		<div>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">生产管理</el-breadcrumb-item>
				<el-breadcrumb-item>内部生产管理</el-breadcrumb-item>
				<el-breadcrumb-item>生产登记(责任人控制)</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-divider></el-divider>
		<div>
			<span>当前等待登记的生产派工单总数：{{tableData.length}}例</span>
			<br /><br />
		</div>
		<div>
			<el-card class="box-card">
				<div>
					<el-table :data="tableData" stripe style="width: 100%">
						<el-table-column prop="manufactureId" label="生产派工单编号" width="150"></el-table-column>
						<el-table-column prop="productId" label="产品编号" width="150"></el-table-column>
						<el-table-column prop="productName" label="产品名称"></el-table-column>
						<el-table-column prop="amount" label="数量"></el-table-column>
						<el-table-column prop="designer" label="工单制定人"></el-table-column>
						<el-table-column prop="checkTime" label="审核时间"></el-table-column>
						<el-table-column label="登记">
							<template slot-scope="scope">
								<el-button size="mini" @click="handleEdit(scope.row)">登记</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<!-- <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
            :page-sizes="[3, 5, 8]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="1">
          </el-pagination>
        </div> -->
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: []
			}
		},
		methods: {
			handleEdit(row) {
				this.$router.push({
					path: '/dengji2',
					query: {
						rows: row
					}
				});
			},
			initialize(){
				this.$http.post("http://localhost:8080/Erp-web/manufacture/selectUnrecorded.do")
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		mounted() {
			this.initialize();
		}
	}
</script>

<style scoped>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		margin-top: 20px;
	}
</style>
