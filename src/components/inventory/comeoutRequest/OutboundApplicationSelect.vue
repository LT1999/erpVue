<template>
	<div id="box">
		<el-card shadow="always">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>库存管理</el-breadcrumb-item>
				<el-breadcrumb-item>出库申请管理</el-breadcrumb-item>
				<el-breadcrumb-item>出库申请查询</el-breadcrumb-item>
			</el-breadcrumb>
			<br />
			<div id="body">
				<form>
					<table style="border-radius:initial;">
						<tr>
							<td class="txt">请输入登记时间</td>
							<td colspan="5">
								<el-checkbox-group>
									<el-date-picker style="width: 230px;" v-model="value2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
									</el-date-picker>

									<el-link disabled>&emsp;&nbsp;至&emsp;</el-link>

									<el-date-picker style="width: 230px;" v-model="value3" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
									</el-date-picker>

									<el-link disabled> （YYYY-MM-DD）</el-link>
									<el-button @click="open" type="primary" class="btn2" style="margin-left:400px;">查询</el-button>
								</el-checkbox-group>
							</td>
						</tr>

						<tr>
							<td class="txt">请输入申请单编号</td>
							<td>
								<el-input v-model="value4"  placeholder="请输入内容" class="btn"></el-input>
							</td>
							<td class="txt">请输入关键字</td>
							<td>
								<el-input v-model="value5"  placeholder="请输入内容" class="btn"></el-input>
							</td>
							<td class="txt">请选择申请单状态</td>
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
				等待执行的申请单总数：{{num1}}例, 正在执行的申请单总数：{{num2}}例, 完成的申请单总数：{{num3}}例
				</span>
			</div>
			<hr />
			<div>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="payId" label="申请单编号">
					</el-table-column>
					<el-table-column prop="reason" label="出库理由">
					</el-table-column>
					<el-table-column prop="registerTime" label="登记时间">
					</el-table-column>
					<el-table-column prop="amountSum" label="总件数">
					</el-table-column>
					<el-table-column prop="storeTag" label="申请单状态">
					</el-table-column>
					<el-table-column prop="checkTag" label="审核状态">
					</el-table-column>
					<el-table-column prop="auditstate" label="借领状态">
					</el-table-column>
					<el-table-column prop="assembletable" label="归还状态">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
								<el-button @click="ckback(scope.$index,scope.row)" size="mini" type="success" plain>查看</el-button>
							</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block">
				<el-pagination style="margin-top: 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 7, 9]" :page-size="3" layout="total, sizes, prev, pager, next, jumper" :total="1">
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
        select2:'1',
        currentPage:1,
				//抽屉
				size:"800px",
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
				//申请单编号
				value4:"",
				//关键字
				value5:"",
				//时间
				value2: '',
				value3: '',
				//表格1
				tableData: [],
			}
		},
		methods: {
			//查看
			ckback(index,row){
        this.$router.push({
        	path: '/OutboundApplicationSelectInfo',query:{id:row.id,payId:row.payId,storer:row.storer,reason:row.reason,checker:row.checker,checkTime:row.checkTime,checkTag:row.checkTag,
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
