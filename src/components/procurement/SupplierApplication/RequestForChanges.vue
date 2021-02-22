<template>
	<div id="ApplyForRegistration">
		<el-breadcrumb separator="/" style="margin-bottom: 30px;">
			<el-breadcrumb-item>采购管理</el-breadcrumb-item>
			<el-breadcrumb-item>供应商申请审批管理</el-breadcrumb-item>
			<el-breadcrumb-item>申请查询-变更</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card shadow="always" style="padding: 20px;">

			<el-form  label-position="left" inline style="margin-top:10px;">
				<el-col :span="12" :push="4">
					<el-form-item label="请输入登记时间">
						<el-date-picker v-model="queryTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
						 start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="5" :push="4">
					<el-button @click="open()" plain type="primary" style="font-size: 13px;">查询</el-button>
				</el-col>
			</el-form>
			<div>
				<div style="margin-top:80px">
				<span style="font-size: 12px; color: #C6C6C9;float: left;">其中等待审核的报价单总数:{{number1}}例 </span>
				<span style="font-size: 12px; color: #C6C6C9;float: left;margin-left: 1.25rem;">其中已审核的报价单总数:{{number2}}例 </span>
				<span style="font-size: 12px; color: #C6C6C9;float: left;margin-left: 1.25rem;">其中处理完成的报价单总数:{{number3}}例 </span>
				<br />
				</div> 
				<el-table :data="tableData" style="text-align: center;" border>
					<el-table-column prop="offerNo" label="报价单编号" width="200px">
					</el-table-column>
					<el-table-column prop="supplierNo" label="供应商序号">
					</el-table-column>
					<el-table-column prop="goodsName" label="商品名称">
					</el-table-column>
					<el-table-column prop="goodsSubtotal" label="报价总额">
					</el-table-column>
					<el-table-column prop="checkMark" label="审核状态">
					</el-table-column>
					<el-table-column prop="review" label="操作" width="150px">
						<template slot-scope="scope">
							<el-button size="mini" type="success" plain @click="RequestForChangeslook(scope.row)">
								查看
							</el-button>
							<el-button size="mini" @click.prevent="RequestForChangesInfo(scope.row)" type="warning" plain>
								变更
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
				dto1:{
					dto: {
						time1: null,
						time2:null
					}
				},
				queryTime:[],
				//表格
				tableData: [],
				currentPage: 10,
				number1: 0,
				number2: 0,
				number3: 0
			}
		},
		methods: {
			
			count() { //页面加载执行的获取联动数据的一级分类
				this.$http.post(this.$api + "/offer/count1")
					.then(res => {
						this.number1 = res.data;
					})
					.catch(err => {
						console.log(err)
					})
				this.$http.post(this.$api + "/offer/count2")
					.then(res => {
						this.number2 = res.data;
					})
					.catch(err => {
						console.log(err)
					})
				this.$http.post(this.$api + "/offer/count3")
					.then(res => {
						this.number3 = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			},
			selectAll() {
				this.$http.post(this.$api + "/offer/selectAll")
					.then(res => {
						this.tableData = res.data;
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
				if (this.queryTime != null && this.queryTime.length != 0) {
				this.dto1.dto.time1=this.queryTime[0];
				this.dto1.dto.time2=this.queryTime[1];
				}
				this.$http.post(this.$api+"/offer/findtime", this.$qs.stringify(this.dto1))
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					}); 
			},
			handleChange() {

			},
			RequestForChangeslook(row) {
				this.$router.push({
					path: '/RequestForChangeslook',
					query: {
						arr: row
					}
				});
			},
			RequestForChangesInfo(row) {
				this.$router.push({
					path: '/RequestForChangesInfo',
					query: {
						arr: row
					}
				});
			}
		},
		mounted() {
			this.selectAll();
			this.count();
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
