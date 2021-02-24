<template>
	<div id="ProductFileChange">
		<el-breadcrumb separator="/" style="margin-bottom: 30px;">
			<el-breadcrumb-item>采购管理</el-breadcrumb-item>
			<el-breadcrumb-item>采购发票管理</el-breadcrumb-item>
			<el-breadcrumb-item>采购成本查询</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card shadow="always" style="padding: 20px;">

			<el-form ref="searchFrom" :model="searchFrom" label-position="top" inline>
        <el-col :span="4">
        	<el-form-item label="请输入执行单编号">
        		<el-input v-model="searchFrom.purchaseqNo"  placeholder="请输入执行单编号"></el-input>
        		</el-select>
        	</el-form-item>
        </el-col>
				<el-col :span="3">
					<el-form-item label="请输入关键字">
						<el-input v-model="searchFrom.productName"  placeholder="请输入关键字"></el-input>
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
						<el-select v-model="searchFrom.type">
							<el-option label="支出发票完成" value="支出发票完成"></el-option>
						</el-select>
					</el-form-item>
				</el-col>


				<el-col :span="2">
					<el-button @click="open" type="primary" plain style="margin-top: 50px; margin-left: 20px;font-size: 13px;">查询</el-button>
				</el-col>
        <el-col :span="20" style="margin-bottom: 20px;">
        <span style="font-size: 12px; color: orange;margin-right: 20px;">符合条件的采购执行单总数 :{{number1}}例 </span>
        <span style="font-size: 12px; color: blue;">采购总成本 :{{number2}}元 </span>
        </el-col>
			</el-form>
			<div>
				<el-table :data="tableData" style="text-align: center;" border>
					<el-table-column prop="purchaseqNo" label="执行单编号" width="200px">
					</el-table-column>
					<el-table-column prop="productNo" label="产品编号">
					</el-table-column>
					<el-table-column prop="productName" label="产品名称">
					</el-table-column>
					<el-table-column prop="state" label="支出发票状态">
					</el-table-column>
          <el-table-column prop="invoicemoney" label="采购成本(元)">
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
				number1:0,
				number2:0,
				
				/* 搜索框 */
				searchFrom: {
					purchaseqNo: null,
					productName: null,
					queryTime: null,
					type: '支出发票完成',
				},
				//表格
				tableData: [],
				currentPage: 10,
				
			}
		},
		methods: {
			
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
				
				this.$http.post("http://localhost:8081/invoice/selInvoiceBydto", this.$qs.stringify(this.searchFrom))
					.then(res => {
						// console.log(res.data);
						
						console.log(this.tableData.state)
						this.tableData = res.data;
						for(var i=0;i<this.tableData.length;i++){
							this.tableData[i].state='支出发票完成';
							
							this.number2+=this.tableData[i].invoicemoney;
						}
						this.number1=res.data.length;
						
						})
					.catch(err => {
						console.log(err)
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
