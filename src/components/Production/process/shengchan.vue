<template>
	<div id="app">
		<div>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">生产管理</el-breadcrumb-item>
				<el-breadcrumb-item>产品生产工序设计</el-breadcrumb-item>
				<el-breadcrumb-item>制定产品生产工序设计单 </el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-divider></el-divider>
		<div id="sel">
			<el-card class="box-card">

				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<el-form-item label="请选择产品菜单">
						<el-cascader v-model="formInline.queryClassifyId" clearable ref="cascader" :options="options" :props="SetKesDept"
						 @change="handleChange"></el-cascader>
					</el-form-item>
					<el-form-item label="请选择建档时间">
						<el-date-picker v-model="formInline.queryTime" value-format="yyyy-MM-dd" type="daterange" range-separator="至"
						 start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="medium" @click="onSubmit">搜索</el-button>
					</el-form-item>
				</el-form>

			</el-card>
		</div>
		<br />

		<div>
			<el-card class="box-card">
				<el-table :data="tableData" stripe style="width: 100%" border>
					<el-table-column prop="productId" label="产品编号" width="150px"></el-table-column>
					<el-table-column prop="productName" label="产品名称"></el-table-column>
					<el-table-column prop="productClass" label="档次级别"></el-table-column>
					<el-table-column prop="firstKindName" label="Ⅰ级分类"></el-table-column>
					<el-table-column prop="secondKindName" label="Ⅱ级分类"></el-table-column>
					<el-table-column prop="thirdKindName" label="Ⅲ级分类"></el-table-column>
					<el-table-column prop="responsiblePerson" label="产品经理"></el-table-column>
					<el-table-column label="制定设计单">
						<template slot-scope="scope">
							<el-button size="mini" type="success" plain @click="shengchan(scope.row)">
								制定设计单
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination 
				@size-change="handleSizeChange" 
				@current-change="handleCurrentChange" 
				:current-page.sync="currentPage"
				:page-sizes="[5, 10, 15, 20]" 
				:page-size="pagesize" 
				layout="sizes, prev, pager, next, jumper" 
				:total="total">
				</el-pagination>

			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				currentPage4: 4,
				options: [], //联动菜单
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
				formInline: { //条件搜索
					queryTime: [], //时间值
					queryClassifyId: [] //联动菜单值
				},
				tableData: [], //表格数据
				currentPage: 1,/* 当前页数 */
				pagesize: 5,/* 页面大小 */
				total: 0/* 总条目数 */
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
			selectProcess() { //获取表格数据
				this.$http.post("http://localhost:8080/Erp-web/productfile/selectProductfile.do", this.$qs.stringify(this.formInline))
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			},
			onSubmit() { //搜索条件查询
				this.selectProcess();
			},
			handleChange(value) {
				console.log(value);
			},
			handleSizeChange(size){
				this.pagesize = size;
				this.selectAll(this.input,this.currentPage, this.pagesize);
			},
			handleCurrentChange(val) { /* currentPage 改变时会触发 */
				console.log(`当前页: ${val}`);
			},
			shengchan(row){
				this.$router.push({
					path: '/shengchanInfo',
					query:{rows:row}
				});
			}

		},
		mounted() {
			this.selectOptions();
			this.selectProcess();
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

	.el-form-item {
		margin-bottom: 0px;
	}
	.el-pagination {
		width: 45%;
		margin: 20px auto;
	}
</style>
