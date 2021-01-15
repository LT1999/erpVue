<template>
	<!-- 制定生产派工单-->
	<div id="app">
		<el-breadcrumb separator="/" style="margin-bottom: 20px;">
			<el-breadcrumb-item>生产管理</el-breadcrumb-item>
			<el-breadcrumb-item>生产调度管理</el-breadcrumb-item>
			<el-breadcrumb-item>制定生产派工单</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- <span>当前等待派工的生产计划总数：x例</span>

      <span>当前等待派工的生产计划明细总数：X例</span> -->

		<el-card class="box-card">

			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="请选择产品菜单">
					<el-cascader v-model="formInline.classification" :options="options" @change="handleChange"></el-cascader>
				</el-form-item>
				<el-form-item label="请选择建档时间">
					<el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">搜索</el-button>
				</el-form-item>
			</el-form>

		</el-card>

		<el-card class="box-card" style="margin-top: 20px;">

			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="applyId" label="计划单编号" width="150"></el-table-column>
				<el-table-column prop="productId" label="产品编号" width="150"></el-table-column>
				<el-table-column prop="productName" label="产品名称"></el-table-column>
				<el-table-column prop="productDescribe" label="描述"></el-table-column>
				<el-table-column prop="amount" label="数量"></el-table-column>
				<!-- <el-table-column prop="ck" label="出库单编号集合"></el-table-column> -->
				<el-table-column prop="checkTime" label="审核时间"></el-table-column>
				<el-table-column label="生产派工单">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.row)">生产派工单</el-button>
					</template>
				</el-table-column>
			</el-table>


			<!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
            :page-sizes="[3, 5, 8]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="1">
          </el-pagination> -->

		</el-card>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
					value: '01/电子',
					label: '01/电子',
					children: [{
						value: '01/计算机',
						label: '01/计算机',
						children: [{
							value: '01/服务器',
							label: '01/服务器'
						}]
					}]
				}], //联动菜单
				formInline: {
					time: '',
					classification: []
				},
				tableData: []
			}
		},
		methods: {
			handleChange() {},
			onSubmit() {},
			handleEdit(row){
				this.$router.push({
					path: '/paigong2',
					query: {
						rows: row
					}
				});
			},
			selectDispatch(){
				this.$http.post("http://localhost:8080/Erp-web/apply/selectDispatch.do")
					.then(res => {
						this.tableData=res.data;
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		mounted() {
			this.selectDispatch();
		}
	}
</script>

<style scoped>
</style>
