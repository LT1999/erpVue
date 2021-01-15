<template>
	<div id="box">
		<el-card shadow="always">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">生产管理</el-breadcrumb-item>
				<el-breadcrumb-item>
					<a href="/">生产计划管理</a>
				</el-breadcrumb-item>
				<el-breadcrumb-item>生产计划查询</el-breadcrumb-item>
			</el-breadcrumb>
			<br />
			<div id="body">
				<form>
					<table style="border-radius:initial;">
						<tr>
							<td class="txt">请输入登记时间</td>
							<td colspan="3">
								<el-checkbox-group>
									<el-date-picker style="width: 190px;" v-model="value2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
									</el-date-picker>

									<el-link disabled>&emsp;&nbsp;至&emsp;</el-link>

									<el-date-picker style="width: 190px;" v-model="value3" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
									</el-date-picker>

									<el-link disabled> （YYYY-MM-DD）</el-link>
									<el-button @click="open" type="primary" class="btn2" style="margin-left:60px;">查询</el-button>
								</el-checkbox-group>
							</td>
						</tr>

						<tr>
							<td class="txt">请输入关键字</td>
							<td>
								<el-input v-model="value" placeholder="请输入内容" class="btn"></el-input>
							</td>
							<td class="txt">请选择计划单状态</td>
							<td>
								<el-select v-model="select2" placeholder="请选择" class="btn">
									<el-option label="等待" value="1"></el-option>
									<el-option label="执行" value="2"></el-option>
									<el-option label="完成" value="3"></el-option>
								</el-select>
							</td>
						</tr>
					</table>
				</form>
			</div>
			<hr />
			<div>
				<span>
				等待审核的生产计划总数：{{num1}}例, 未通过的生产计划总数：{{num2}}例, 通过的生产计划总数：{{num3}}例
				</span>
			</div>
			<hr />
			<div>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="designorderid" label="生产计划编号">
					</el-table-column>
					<el-table-column prop="productid" label="计划制定人">
					</el-table-column>
					<el-table-column prop="productname" label="登记人">
					</el-table-column>
					<el-table-column prop="newtime" label="登记时间">
					</el-table-column>
					<el-table-column prop="money" label="备注">
					</el-table-column>
					<el-table-column prop="designorderstate" label="计划单状态">
					</el-table-column>
					<el-table-column prop="assembletable" label="操作">
						<template slot-scope="scope">
							<el-button type="text">
								<el-button type="text" @click="back">查看</el-button>
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block">
				<el-pagination style="margin-top: 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 7, 9]" :page-size="3" layout="total, sizes, prev, pager, next, jumper" :total="10">
				</el-pagination>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//抽屉
				size:"800px",
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
				tableData2:[{
					
				}],
				//表格1
				tableData: [{
						designorderid: '231232',
						productid: '电脑',
						productname: '商品',
						designorderstate: '01/电子',
						auditstate: '01/计算机',
						man:"11",//设计人
						newtime:"",//登记时间
						money:""//物料总成本
					},
					{
						designorderid: '020200021',
						productid: '电脑',
						productname: '商品',
						designorderstate: '01/电子',
						auditstate: '01/计算机',
						man:"11",//设计人
						newtime:"",//登记时间
						money:""//物料总成本
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
			back(){
				location.href="#/ProductionPlanSelectInfo"
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
	span {
		font-size: 8px;
	}
	
	table {
		margin: 3px;
	}
	
	.txt {
		width: 125px;
		color: #64696D;
	}
	
	.btn {
		width: 285px;
		margin-top:3px;
	}
	
	form {
		font-size: 15px;
	}
	
	.btn2 {
		font-size: 13px;
		width: 120px;
		font: #C1CAD3;
	}
</style>