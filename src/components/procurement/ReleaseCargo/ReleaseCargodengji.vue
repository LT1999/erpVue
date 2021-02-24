<template>
	<div id="app">
		<div>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">采购管理</el-breadcrumb-item>
				<el-breadcrumb-item>放货管理</el-breadcrumb-item>
				<el-breadcrumb-item>放货登记 </el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-divider></el-divider>
		<div id="sel">
			<el-card class="box-card">
				<div>
					<el-form :inline="true" :model="formInline" class="demo-form-inline">
						<el-form-item label="请选择供应商所供产品">
							<el-cascader v-model="formInline.classification" :options="options" @change="handleChange"></el-cascader>
						</el-form-item>
						<el-form-item label="请输入登记时间">
							<el-date-picker v-model="formInline.time" type="daterange" value-format="yyyy-mm-dd" range-separator="至"
							 start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">搜索</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-card>
		</div>
		<br />

		<div>
			<el-card class="box-card">
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="supplierNo" label="供应商编号" width="150"></el-table-column>
					<el-table-column prop="supplierName" label="供应商名称"></el-table-column>
					<el-table-column prop="supplierQualityRank" label="优质级别"></el-table-column>
					<el-table-column prop="firstKindName" label="Ⅰ级分类"></el-table-column>
					<el-table-column prop="secondKindName" label="Ⅱ级分类"></el-table-column>
					<el-table-column prop="threeKindName" label="Ⅲ级分类"></el-table-column>
					<el-table-column prop="supplierArea" label="所在区域"></el-table-column>
					<el-table-column label="登记">
						<template slot-scope="scope">
							<el-button size="mini" @click="zhiding(scope.$index,scope.row)">登记</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
						value: '电子',
						label: '电子',
						children: [{
							value: '计算机',
							label: '计算机',
							children: [{
								value: '服务器',
								label: '服务器'
							}]
						}]
					}

				], //联动菜单
				formInline: {
					time: [],
					classification: []
				},
				tableData: []
			}
		},
		methods: {
			onSubmit() {
				this.$http.post("http://localhost:8080/Erp-web/productfile/selectSafetyStock.do", this.$qs.stringify(this.formInline))
					.then(res => {
						//alert("a");
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					})

			},
			handleChange(value) {
				console.log(value);
			},
			zhiding(index, row) {
				this.$router.push({
					path: '/ReleaseCargodengji2',
					query: {row:row}
				});
			},
			initialize(){
				this.$http.post(this.$api + "/supplierfiles/selectAll")
					.then(res => {
						this.tableData = res.data;
						console.log(this.tableData);
					})
					.catch(err => {
						console.log(err)
					}); 
			}


		},
		mounted() {
			this.initialize();
		}
	}
</script>

<style scoped>
</style>
