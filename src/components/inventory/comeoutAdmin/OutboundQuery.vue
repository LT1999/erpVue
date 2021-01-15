<template>
	<div id="box">
		<el-card shadow="always">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">库存管理</el-breadcrumb-item>
				<el-breadcrumb-item>
					<a href="/">出库管理</a>
				</el-breadcrumb-item>
				<el-breadcrumb-item>出库查询</el-breadcrumb-item>
			</el-breadcrumb>
			<br />
			<div id="body">
					<el-row>
						<el-col :span="3">
								<p>请输入出库时间</p>
						</el-col>
						<el-col :span="6">
								<el-date-picker style="width: 230px;" v-model="value2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
								</el-date-picker>
								<span>&emsp;&emsp;至</span>
						</el-col>
						<el-col :span="5">
								<el-date-picker style="width: 230px;" v-model="value3" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
								</el-date-picker>
						</el-col>
						<el-col :span="3">
								<el-link disabled> <p>（YYYY-MM-DD）</p></el-link>
						</el-col>
						<el-col :span="1" :push="4">
								<el-button @click="open" type="primary" class="btn2">查询</el-button>

						</el-col>
					</el-row>
					<el-row>
						<el-col :span="3">
							<div class="grid-content bg-purple"><p>请输入出库单编号</p></div>
						</el-col>
						<el-col :span="5">
							<div class="grid-content bg-purple">
								<el-input v-model="value4" placeholder="请输入内容" class="btn"></el-input>
							</div>
						</el-col>
						<el-col :span="3">
							<div class="grid-content bg-purple"><p>请输入关键字</p></div>
						</el-col>
						<el-col :span="5">
							<div class="grid-content bg-purple">
								<el-input v-model="value5" placeholder="请输入内容" class="btn"></el-input>
							</div>
						</el-col>
						<el-col :span="3">
							<div class="grid-content bg-purple"><p>请选择出库单状态</p></div>
						</el-col>
						<el-col :span="5">
							<div class="grid-content bg-purple">
								<el-select v-model="value4" placeholder="请选择" class="btn">
									<el-option label="等待" value="1"></el-option>
									<el-option label="执行" value="2"></el-option>
									<el-option label="完成" value="3"></el-option>
								</el-select>
							</div>
						</el-col>
					</el-row>
			</div>
			<hr />
			<div>
				<span>
				等待执行的出库单总数：{{num1}}例, 正在执行的出库单总数：{{num2}}例, 完成的出库单总数：{{num3}}例
				</span>
			</div>
			<hr />
			<div>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="payId" label="出库单编号">
					</el-table-column>
					<el-table-column prop="reason" label="出库理由">
					</el-table-column>
					<el-table-column prop="registerTime" label="登记时间">
					</el-table-column>
					<el-table-column prop="amountSum" label="应出库总件数">
					</el-table-column>
					<el-table-column prop="amountSum" label="已出库总件数">
					</el-table-column>
					<el-table-column prop="checkTag" label="出库单状态">
					</el-table-column>
					<el-table-column  label="操作">
						<template slot-scope="scope">
								<el-button @click="ckback(scope.$index,scope.row)" size="mini" type="success" plain>查看</el-button>
							</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block">
				<el-pagination style="margin-top: 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"  :page-sizes="[5, 7, 9]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="1">
				</el-pagination>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
    created() {
      this.selectPayAll();
    },
		data() {
			return {
				//抽屉
				size: "800px",
				drawer: false,
				//数据统计
				num1: 1,
				num2: 2,
				num3: 3,
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
				//编号
				value4: "",
				//关键字
				value5: "",
				//时间
				value2: '',
				value3: '',
				//表格2
				tableData2: [{

				}],
				//表格1
				tableData: [],
			}
		},
		methods: {
			//查看
			ckback(index,row) {
        this.$router.push({
        	path: '/OutboundQueryInfo',query:{id:row.id,payId:row.payId,storer:row.storer,reason:row.reason,checker:row.checker,checkTime:row.checkTime,checkTag:row.checkTag,
          amountSum:row.amountSum,costPriceSum:row.costPriceSum,remark:row.remark,register:row.register,registerTime:row.registerTime}
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
				this.$message("哦吼，你完了")
			},
     selectPayAll(){
       this.$http.post("http://localhost:8080/Erp-web/pay/selectPayAll.do")
       	.then( res => {
                   this.tableData = res.data;
                   this.number=this.tableData.length;
                })
       	.catch(err =>{
       		console.log(err)
       	})
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
		width: 225px;
		margin-top: 3px;
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
