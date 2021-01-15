<template>
	<div id="app">
		<div>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">库存管理</el-breadcrumb-item>
				<el-breadcrumb-item>出库申请管理</el-breadcrumb-item>
				<el-breadcrumb-item>出库申请登记</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-divider></el-divider>
		<div>
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<div id="butt">
					<el-form-item>
						<div id="butt2">
							<el-button type="info" size="medium">PDF打印</el-button>
							<el-button type="warning" size="medium" @click="table = true">添加产品</el-button>
							<el-button type="warning" size="medium">删除产品</el-button>
							<el-button type="success" size="medium" @click="onSubmit">提交</el-button>
						</div>
					</el-form-item>
				</div>

				<center>
					<div id="kp">
						<el-card class="box-card">
							<h4>出库申请单</h4>
							<br />
							<div>
								<el-form-item label="出库人:">
									<el-input v-model="formInline.storer"></el-input>
								</el-form-item>
								<el-form-item label="出库理由:">
									<el-select v-model="formInline.reason" placeholder="请选择">
										<el-option label="赠送" value="赠送"></el-option>
										<el-option label="内部借领" value="内部借领"></el-option>
										<el-option label="其他借领" value="其他借领"></el-option>
									</el-select>
								</el-form-item>
							</div>

							<div>
								<el-form-item label="是否归还:">
									<!-- prop="set" -->
									<el-select v-model="formInline.th" placeholder="请选择">
										<el-option label="是" value="是"></el-option>
										<el-option label="否" value="否"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="归还时间:">
									<el-input v-model="formInline.sj"></el-input>
								</el-form-item>
							</div>
							<el-table :data="tableData" border style="width: 100%">
								<el-table-column label="点选" width="60">
									<template slot-scope="scope">
										<el-checkbox v-model="checked" size="mini"></el-checkbox>
									</template>
								</el-table-column>
								<el-table-column prop="productName" label="产品名称" width="150"></el-table-column>
								<el-table-column prop="productId" label="产品编号" width="200"></el-table-column>
								<el-table-column prop="productDescribe" label="描述" width="110"></el-table-column>
								<el-table-column label="数量" width="150">
									<template slot-scope="scope">
										<el-input @change="sumlll(scope.row)" v-model="scope.row.amount" clearable></el-input>
									</template>
								</el-table-column>
								<el-table-column prop="amountUnit" label="单位" width="80"></el-table-column>
								<el-table-column prop="costPrice" label="成本单价(元)" width="120"></el-table-column>
								<el-table-column prop="subtotal" label="小计(元)">
								</el-table-column>
							</el-table>
							<br />
							<div>
								<el-form-item label="总件数:">
									<el-input class="inp2" v-model="formInline.amountSum"></el-input>
								</el-form-item>
								<el-form-item label="总金额:">
									<el-input class="inp2" v-model="formInline.costPriceSum"></el-input>
								</el-form-item>
							</div>
							<div>
								<el-form-item label="登记人:">
									<el-input class="inp2" type="text" v-model="formInline.register"></el-input>
								</el-form-item>
								<el-form-item label="登记时间:">
									<el-input class="inp2" :disabled="true" type="text" v-model="formInline.registerTime"></el-input>
								</el-form-item>
							</div>
							<br />
							<div class="sp1">
								<el-form-item label="备注:">
									<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容" v-model="formInline.remark"></el-input>
								</el-form-item>
							</div>


						</el-card>
					</div>
				</center>
			</el-form>

		</div>

		<el-drawer :visible.sync="table" direction="rtl" size="45%">
			<div>
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<el-form-item label="请选择产品菜单">
						<el-cascader v-model="formInline.classification" :options="options" @change="handleChange"></el-cascader>
					</el-form-item>
					<el-button type="primary" @click="onSubmit">搜索</el-button>
					</el-form-item>
				</el-form>
			</div>
			<br />
			<el-table :data="gridData">
				<el-table-column prop="productId" label="产品编号" width="150"></el-table-column>
				<el-table-column prop="productName" label="产品名称" width="100"></el-table-column>
				<el-table-column prop="type" label="用途类型" width="100"></el-table-column>
				<el-table-column prop="personalUnit" label="单位" width="50"></el-table-column>
				<el-table-column prop="costPrice" label="成本单价(元)" width="150"></el-table-column>
				<el-table-column label="出库">
					<template slot-scope="scope">
						<el-button @click.native.prevent="add(scope.row)" type="text" size="small">出库</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-drawer>

	</div>

</template>

<script>
	export default {
		created() {
			this.selectGatherDetails();
			this.shijian();
		},
		data() {
			return {
				amount: 0, //
				sum: 0, //数量
				index: 0,
				table: false,
				checked: false,
				options: [{
						value: '01/电子',
						label: '01/电子',
						children: [{
							value: '01/计算机',
							label: '01/计算机',
							children: [{
								value: '01/服务器',
								label: '01/服务器'
							}]
						}]
					}

				], //联动菜单
				gridData: [],
				formInline: {
					payId: '', //出库单编号
					storer: '', //出库人
					reason: '', //出库理由
					reasonexact: '', //出库详细理由
					amountSum: 0, // 总件数
					costPriceSum: 0, //总金额
					paidAmountSum: 0, //确认出库总件数
					remark: '', //备注
					register: '', //登记人
					registerTime: '', //登记时间
					checker: '', //复核人
					checkTime: '2020-09-09', //复核时间
					checkTag: '等待审核', //审核标志
					attemper: '', //调度人
					attemperTime: '2020-09-09', //调度时间
					storeTag: '已申请' //库存标志
				},
				tableData: [],
				datas: {}
			}
		},
		methods: {
			onSubmit() {
				this.$set(this.datas, 'pay', this.formInline);
				this.tableData.forEach(item=>{
					this.$delete(item,'id');
				})
				this.$set(this.datas, 'payDetails', this.tableData);
				this.$http.post("http://localhost:8080/Erp-web/pay/addPay.do", this.$qs.stringify(this.datas, {
						arrayFormat: 'payDetails',
						allowDots: true
					}))
					.then(res => {
						console.log(this.formInline.productName);
						if (res.data >0) {
							this.$message({
								message: '提交成功！',
								type: 'success'
							});
							this.$router.go(0);
						}
					})
					.catch(err => {
						console.log(err)
					})

			},
			handleChange(value) {
				console.log(value);
			},
			add(row) {
				this.$delete(row, 'changeTag');
				this.$delete(row, 'changeTime');
				this.$delete(row, 'changer');
				this.$delete(row, 'checkTag');
				this.$delete(row, 'checkTime');
				this.$delete(row, 'checker');
				this.$delete(row, 'deleteTag');
				this.$delete(row, 'deleteTime');
				this.$delete(row, 'designCellTag');
				this.$delete(row, 'designModuleTag');
				this.$delete(row, 'designProcedureTag');
				this.$delete(row, 'factoryName');
				this.$delete(row, 'fileChangeAmount');
				this.$delete(row, 'firstKindId');
				this.$delete(row, 'firstKindName');
				this.$delete(row, 'lifecycle');
				this.$delete(row, 'listPrice');
				this.$delete(row, 'personalUnit');
				this.$delete(row, 'personalValue');
				this.$delete(row, 'priceChangeTag');
				this.$delete(row, 'productClass');

				this.$delete(row, 'productNick');
				this.$delete(row, 'providerGroup');
				this.$delete(row, 'realCostPrice');
				this.$delete(row, 'register');
				this.$delete(row, 'registerTime');
				this.$delete(row, 'responsiblePerson');

				this.$delete(row, 'secondKindId');
				this.$delete(row, 'secondKindName');
				this.$delete(row, 'thirdKindName');
				this.$delete(row, 'twinId');
				this.$delete(row, 'twinName');
				this.$delete(row, 'type');
				this.$delete(row, 'warranty');
				//alert(this.index);
				//把数据添加到数组末尾
				//this.formInline.tableData.push(this.gridData[this.index]);
				/* this.warehouse.productName= row.productName; //产品名称
				this.warehouse.productId= row.productId; //产品id
				this.warehouse.productDescribe= row.productDescribe; //描述
				this.warehouse.amountUnit= row.amountUnit; //单位
				this.warehouse.costPrice= row.costPrice; //单价
				this.warehouse.amount= 1; //数量
				this.warehouse.subtotal= row.costPrice * this.warehouse.amount; //小计 */
				this.$set(row, 'amount', 0);
				this.$set(row, 'subtotal', row.costPrice * row.amount);
				this.$set(this.tableData, row.id, row);
				console.log(this.tableData);
				
				//关闭所有模态框;
				this.table = false;
				//alert(this.gridData.realCostPrice); 
				/* this.index = index;
				 //把数据添加到数组末尾
				this.tableData.push({
				productName:this.gridData[this.index].productName,//产品名称
				productId:this.gridData[this.index].productId,//产品id
				productDescribe:this.gridData[this.index].productDescribe,//描述
				amountUnit:this.gridData[this.index].amountUnit,//单位
				costPrice:this.gridData[this.index].realCostPrice,//单价
				amount:0,//数量
				subtotal:0//小计
				});
				this.formInline.amountSum+=this.tableData[this.index].amount;
				this.formInline.costPriceSum+=parseInt(this.tableData[this.index].subtotal);
				 //关闭所有模态框
				 this.table = false */
			},
			selectGatherDetails() {
				this.$http.post("http://localhost:8080/Erp-web/productfile/selectAllDESIGN.do")
					.then(res => {
						//alert("a");
						this.gridData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			},
			shijian() {
				var now = new Date();
				var year = now.getFullYear(); //得到年份
				var month = now.getMonth(); //得到月份
				var date = now.getDate(); //得到日期
				month = month + 1;
				if (month < 10) month = "0" + month;
				if (date < 10) date = "0" + date;
				var time = "";
				time = year + "-" + month + "-" + date;
				this.formInline.registerTime = time;
			},
			sumlll(row) {
				this.tableData[row.id].subtotal = parseInt(row.amount) * row.costPrice;
				this.formInline.costPriceSum = 0;
				this.formInline.amountSum = 0;
				this.tableData.forEach(item => {
					this.formInline.costPriceSum = this.formInline.costPriceSum + item.subtotal;
					this.formInline.amountSum = parseInt(this.formInline.amountSum) + parseInt(item.amount);
				})
			}

		}
	}
</script>

<style scoped>
	#butt {
		width: 450px;
		margin-left: 680px;
	}

	.box-card {
		width: 1000px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	}

	.sp1 {
		margin-right: 400px;
	}

	>>>.inp2>.el-input__inner {
		width: 18.75rem;
		margin-right: 200px;
		border-bottom: 1px solid #000000;
		border-top-width: 0px;
		border-right-width: 0px;
		border-left-width: 0px;
		border-radius: 0px;
	}
</style>
