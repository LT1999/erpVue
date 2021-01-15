<template>
	<div id="app">
		<div>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>产品设计</el-breadcrumb-item>
				<el-breadcrumb-item>产品物料组成设计</el-breadcrumb-item>
				<el-breadcrumb-item>制定物料组成设计单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-divider></el-divider>
		<div id="sel">
			<el-card class="box-card">
					<el-form :inline="true" :model="searchFrom" class="demo-form-inline">
						<el-form-item label="请选择产品分类">
							<el-cascader v-model="searchFrom.queryClassifyId" :props="SetKesDept" ref="cascader" :options="options"></el-cascader>
						</el-form-item>
						<el-form-item label="请选择建档时间">
							<el-date-picker value-format="yyyy-MM-dd" v-model="searchFrom.queryTime" type="daterange" range-separator="至" start-placeholder="开始日期"
							 end-placeholder="结束日期"></el-date-picker>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" plain @click="onSubmit" style="width: 100px;">搜索</el-button>
						</el-form-item>
					</el-form>

					<el-table :data="tableData" stripe style="text-align: center;" border>>
						<el-table-column prop="productId" label="产品编号"></el-table-column>
						<el-table-column prop="productName" label="产品名称"></el-table-column>
						<el-table-column prop="productClass" label="档次级别"></el-table-column>
						<el-table-column prop="firstKindName" label="Ⅰ级分类"></el-table-column>
						<el-table-column prop="secondKindName" label="Ⅱ级分类"></el-table-column>
						<el-table-column prop="thirdKindName" label="Ⅲ级分类"></el-table-column>
						<el-table-column prop="type" label="用途类型"></el-table-column>
						<el-table-column label="制定设计单">
							<template slot-scope="scope">
								<el-button size="mini" @click="handleEdit(scope.row)">制定设计单</el-button>
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
				options: [], //联动菜单
				/* 搜索框 */
				searchFrom: {
					queryClassifyId: null,
					queryTime: null,
					type:null
				},
				tableData: []
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
			onSubmit() {
				this.$http.post("http://localhost:8080/Erp-web/productfile/findProductfileCondition.do",this.$qs.stringify(this.searchFrom))
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			},
			handleEdit(row) {
				this.$router.push({path: '/Productchanges2',query:{arr:row}});
			},
			selectsp(){
				this.$http.post("http://localhost:8080/Erp-web/productfile/findsp.do")
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		mounted() {
			this.selectsp();
			this.selectOptions();
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
