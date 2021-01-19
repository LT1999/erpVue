<template>
	<div id="box">
		<el-card shadow="always">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">采购管理</el-breadcrumb-item>
				<el-breadcrumb-item>
					<a href="/">采购调度管理</a>
				</el-breadcrumb-item>
				<el-breadcrumb-item>制定采购执行单</el-breadcrumb-item>
			</el-breadcrumb>
			<br />
			<!-- <div>
				<span>
				等待执行的生产派工单总数：{{num1}}例, 正在执行的生产派工单总数：{{num2}}例, 完成的生产派工单总数：{{num3}}例
				</span>
			</div> -->

			<el-table :data="tableData" border>
				<el-table-column prop="designorderid" label="计划单编号">
				</el-table-column>
				<el-table-column prop="productid" label="产品编号">
				</el-table-column>
				<el-table-column prop="productname" label="产品名称">
				</el-table-column>
				<el-table-column prop="newtime" label="采购数量">
				</el-table-column>
				
				<el-table-column prop="designorderstate" label="描述">
				</el-table-column>
				<el-table-column prop="money" label="计划登记时间">
				</el-table-column>
				
				<el-table-column prop="assembletable" label="操作">
					<template slot-scope="scope">
						<el-button type="text">
							<el-button type="text" @click="back">生成执行计划单</el-button>
						</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination style="margin-top: 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page="currentPage4" :page-sizes="[5, 7, 9]" :page-size="3" layout="total, sizes, prev, pager, next, jumper"
			 :total="10">
			</el-pagination>

		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//抽屉
				size: "800px",
				drawer: false,
				//数据统计
				num1: 1,
				num2: 2,
				num3: 3,
				//商品
				commodity: [{
					value: '1',
					label: '黄金糕'
				}, {
					value: '2',
					label: '双皮奶'
				}, {
					value: '3',
					label: '蚵仔煎'
				}, {
					value: '4',
					label: '龙须面'
				}, {
					value: '5',
					label: '北京烤鸭'
				}],
				//时间
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				//时间
				value2: '',
				value3: '',
				//表格2
				tableData2: [{

				}],
				//表格1
				tableData: [{
						designorderid: '231232',
						productid: '电脑',
						productname: '商品',
						designorderstate: '01/电子',
						auditstate: '01/计算机',
						man: "11", //设计人
						newtime: "", //登记时间
						money: "" //物料总成本
					},
					{
						designorderid: '020200021',
						productid: '电脑',
						productname: '商品',
						designorderstate: '01/电子',
						auditstate: '01/计算机',
						man: "11", //设计人
						newtime: "", //登记时间
						money: "" //物料总成本
					}
				],
				//商品
				select1: "",
				//设计单状态
				select2: ""
			}
		},
		methods: {
			//查看
			back() {
				location.href = "#/purchaseOrderInfo"
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
				this.$message("哦吼，你完了")
			}
		}
	}
</script>

<style scoped>
	#box>>>.el-table th {
		background-color: #F2F8FD;
		text-align: center;
	}

	/deep/.el-table .cell {
		padding-right: 0px;
		margin: 0px;
	}
	
	/deep/.el-table th {
		background-color: #F2F8FD;
		text-align: center;
	}
	
	/deep/.el-table td {
		padding: 0px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	/deep/.el-table tr {
		padding: 0px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	
	.el-table{
		margin-top: 30px;
	}
</style>
