<template>
	<div id="ProductFileChange">
		<el-breadcrumb separator="/" style="margin-bottom: 30px;">
			<el-breadcrumb-item>采购管理</el-breadcrumb-item>
			<el-breadcrumb-item>采购发票管理</el-breadcrumb-item>
			<el-breadcrumb-item>发票信息查询</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card shadow="always" style="padding: 20px;">

			<el-form ref="searchFrom" :model="searchFrom" label-position="top" inline>
				<el-col :span="4">
					<el-form-item label="请输入执行单编号 ">
						<el-input v-model="searchFrom.purchaseqNo" placeholder="请输入执行单编号"></el-input>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item label="请输入关键字">
						<el-input v-model="searchFrom.productName" placeholder="请输入关键字"></el-input>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="9" style="margin-left: 20px;">
					<el-form-item label="请输入执行单登记时间">
						<el-date-picker v-model="searchFrom.queryTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
						 start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
					</el-form-item>
				</el-col>

				<el-col :span="4" style="margin-left: 12px;">
					<el-form-item label="请选择执行单状态">
						<el-select v-model="searchFrom.type" placeholder="请选择">
							<el-option label="未支出发票" value="未支出发票"></el-option>
							<el-option label="正在支出发票" value="正在支出发票"></el-option>
							<el-option label="支出发票完成" value="支出发票完成"></el-option>
						</el-select>
					</el-form-item>
				</el-col>


				<el-col :span="2">
					<el-button @click="open" type="primary" plain style="margin-top: 50px; margin-left: 20px;font-size: 13px;">查询</el-button>
				</el-col>
				<el-col :span="20" style="margin-bottom: 20px;">
					<span style="font-size: 12px; color: orange;margin-right: 20px;">其中未支出发票的执行单总数 :{{number1}}例 </span>
					<span style="font-size: 12px; color: green;margin-right: 20px;">其中正在支出发票的执行单总数 :{{number2}}例 </span>
					<span style="font-size: 12px; color: blue;">其中支出发票完成的执行单总数 :{{number3}}例 </span>
				</el-col>
			</el-form>
			<div>
				<el-table :data="tableData" border stripe style="width: 100%" stripe>
					<el-table-column prop="purchaseqNo" label="执行单编号" width="200px">
						<template slot-scope="scope">
							<span class="buttonText" style="cursor:pointer" @click="jup(scope.row)">{{ scope.row.purchaseqNo }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="productNo" label="产品编号">
					</el-table-column>
					<el-table-column prop="productName" label="产品名称">
					</el-table-column>
					<el-table-column prop="shouldinvoicemoney" label="应开发票总额">
					</el-table-column>
					<el-table-column prop="invoicemoney" label="已开发票金额">
					</el-table-column>
					<!-- <el-table-column prop="Noinvoice" label="未开发票总额" >
					</el-table-column> -->
					<el-table-column label="支出发票状态">
						<p v-if="this.type==1">
							未支出发票
						</p>
						<p v-if="this.type==2">
							正在支出发票
						</p>
						<p v-if="this.type==3">
							已完成发票支出
						</p>
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
			let that = this;
			return {
				number1: '',
				number2: '',
				number3: '',

				/* 搜索框 */
				searchFrom: {
					purchaseqNo: null,
					productName: null,
					queryTime: null,
					type: null,
				},
				//级联选择器
				options: [],
				//表格
				tableData: [],
				type: [],
				currentPage: 10,

			}
		},
		methods: {

			selectAll() {
				/* this.$http.post("http://localhost:8081/invoice/selectAll")
					.then(res => {

						this.tableData = res.data;
						//console.log(res.data)
						res.data.forEach(item => {
							if(item.invoicemoney==0){
								this.type.push(1);
							}
							if(item.shouldinvoicemoney>item.invoicemoney&item.invoicemoney>0){
								this.type.push(2);
							}
							if(item.shouldinvoicemoney==item.invoicemoney){
								this.type.push(3);
							}
							console.log(this.type)
						})
					})
					.catch(err => {
						console.log(err)
					}); */

				this.$http.post("http://localhost:8081/invoice/UnpaidCount")
					.then(res => {
						this.number1 = res.data;

					})
					.catch(err => {
						console.log(err)
					});
				this.$http.post("http://localhost:8081/invoice/ingCount")
					.then(res => {
						this.number2 = res.data;

					})
					.catch(err => {
						console.log(err)
					});
				this.$http.post("http://localhost:8081/invoice/overCount")
					.then(res => {
						this.number3 = res.data;

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
			//查询按钮
			open() {
				console.log(this.searchFrom);
				this.$http.post("http://localhost:8081/invoice/selInvoiceBydto", this.$qs.stringify(this.searchFrom))
					.then(res => {
						// console.log(res.data);
						this.tableData = res.data;

						res.data.forEach(item => {
							if (item.invoicemoney == 0) {
								this.type.push(1);
							}
							if (item.shouldinvoicemoney > item.invoicemoney & item.invoicemoney > 0) {
								this.type.push(2);
							}
							if (item.shouldinvoicemoney == item.invoicemoney) {
								this.type.push(3);
							}
							console.log(this.type)
						})
					})
					.catch(err => {
						console.log(err)
					});
			},
			jup(row) {
				console.log(row)
				this.$router.push({
					path: '/Invoicequery2',
					query: {
						arr: row
					}
				});
			},
			handleChange() {

			},
			ProductFileChangeInfo(row) {
				this.$router.push({
					path: '/ProductFileChangeInfo',
					query: {
						arr: row
					}
				});
			},
			ProductFileEnquiryInfo(row) {
				this.$router.push({
					path: '/ProductFileEnquiryInfo',
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
