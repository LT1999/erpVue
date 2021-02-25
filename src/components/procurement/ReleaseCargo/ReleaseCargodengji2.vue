<template>
  <div id="app">
    <div>
      <el-breadcrumb separator="/">
      	<el-breadcrumb-item :to="{ path: '/' }">采购管理</el-breadcrumb-item>
      	<el-breadcrumb-item>放货管理</el-breadcrumb-item>
      	<el-breadcrumb-item>放货登记 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
    	<el-form :inline="true" :model="formInline" class="demo-form-inline">
    		<div id="butt">
    			<el-form-item>
    				<div id="butt2">
    					<el-button type="info">PDF打印</el-button>
    					<el-button type="primary" @click="table = true">添加产品</el-button>
    					<el-button type="warning">删除产品</el-button>
    					<el-button type="success" @click="onSubmit">提交</el-button>
    				</div>
    			</el-form-item>
    		</div>

    		<center>
    			<div id="kp">
    				<el-card class="box-card">
    					<h4>放货登记单</h4>
    					<br />
    					<el-table :data="tableData" border style="width: 100%">
    						<el-table-column label="点选" width="60">
    							<template slot-scope="scope">
    								<el-checkbox v-model="checked" size="mini"></el-checkbox>
    							</template>
    						</el-table-column>
    						<el-table-column prop="productName" label="产品名称" width="150"></el-table-column>
    						<el-table-column prop="productNo" label="产品编号" width="200"></el-table-column>
    						<el-table-column prop="purchasedetailList[0].quantity" label="采购数量" width="150"></el-table-column>
							<el-table-column prop="releaseCargo" label="已放货数量"></el-table-column>
    						<el-table-column label="放货数量" width="80">
    							<template slot-scope="scope">
    								<el-input v-model="scope.row.checkReleaseCargo" @change="sumzje(scope.row,scope.$index)"></el-input>
    							</template>
    						</el-table-column>
    						<el-table-column prop="purchasedetailList[0].price" label="成本单价(元)" width="120"></el-table-column>
    						<el-table-column prop="subtotal1" label="小计(元)">
    						</el-table-column>
    					</el-table>
    					<br />
    					<div>
    						<el-form-item label="放货件数:">
    							<el-input class="inp2" v-model="formInline.amountSum"></el-input>
    						</el-form-item>
    						<el-form-item label="放货金额:">
    							<el-input class="inp2" v-model="formInline.costPriceSum"></el-input>
    						</el-form-item>
    						<!-- <span class="sp1">总件数:</span><span>总金额:</span> -->
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
    			<el-button type="primary">搜索</el-button>
    			</el-form-item>
    		</el-form>
    	</div>
    	<br />
    	<el-table :data="gridData">
    		<el-table-column prop="productNo" label="产品编号" width="150"></el-table-column>
    		<el-table-column prop="productName" label="产品名称" width="100"></el-table-column>
    		<el-table-column prop="purchasedetailList[0].price" label="成本单价(元)" width="150"></el-table-column>
    		<el-table-column label="登记">
    			<template slot-scope="scope">
    				<el-button @click.native.prevent="add(scope.row)" type="text" size="small">登记</el-button>
    			</template>
    		</el-table-column>
    	</el-table>
    </el-drawer>

  </div>
</template>

<script>
	export default {
		data() {
			return {
				sum: 1, //数量
				num: 0, //小计
				index: 0,
				table: false,
				checked: false,
				options: [{
						value: '电子',
						label: '电子',
						children: [{
							value: '计算机',
							label: '计算机',
							children: [{
								value: '服务器',
								label: '服务器'
							}]
						}]
					}

				], //联动菜单
				gridData: [],
				formInline: {
					gatherId: '100010909', //入库单编号
					storer: '', //入库人
					reason: '', //入库理由
					reasonexact: '', //入库详细理由
					amountSum: 0, // 总件数
					costPriceSum: 0, //总金额
					gatheredAmountSum: 0, //确认入库总件数
					remark: '', //备注
					register: '', //登记人
					registerTime: '', //登记时间
					checker: '', //复核人
					checkTime: '2020-09-09', //复核时间
					checkTag: '等待审核', //审核标志
					attemper: '', //调度人
					attemperTime: '2020-09-09', //调度时间
					storeTag: '已申请', //库存标志
				},
				tableData: [],
				dto: {
				},
				warehouse: {
					productName: '', //产品名称
					productId: '', //产品id
					productDescribe: '', //描述
					amountUnit: '', //单位
					costPrice: '', //单价
					amount: 1, //数量
					subtotal: '' //小计
				},
				b:true
				
			}
		}
		/* ,
		    computed:{
		      data(){
		                return this.formInline.tableData.filter(item=>{
		            		return item.numprice=item.realCostPrice*this.num;
		            	})
		            	return this.formInline.tableData;
		           }
		    } */
		,
		methods: {
			onSubmit() {
				var sum=this.formInline.amountSum;
				this.tableData.forEach(item => {
					if((sum +item.releaseCargo)>item.purchaseQuantity){
						 this.$message.error('请输入正确数量');
						 this.b=false;
						 return false;
					}
					
				})
				if(this.b){
					this.$set(this.dto,'purchaseList',this.tableData);
					this.$http.post(this.$api + "/purchase/updateByPrimaryKeyReleaseCargo", this.$qs.stringify(this.dto, {
							arrayFormat: 'purchaseList',
							allowDots: true
						}))
						.then(res => {
							if (res.data >0) {
								this.$message({
									message: '提交成功！',
									type: 'success',
									duration: 1000
								});
								this.$router.go(-1);
							}
						})
						.catch(err => {
							console.log(err)
						})
				}
				

			},
			handleChange(value) {
				console.log(value);
			},
			sumzje(row,index) {
				row.subtotal1=row.purchasedetailList[0].price*row.checkReleaseCargo;
				this.formInline.costPriceSum =0;
				this.formInline.amountSum =0;
				this.tableData.forEach(item => {
					if(item.checkReleaseCargo==''||item.checkReleaseCargo==null){
						item.checkReleaseCargo=0;
					}
					this.formInline.costPriceSum += item.subtotal1;
					this.formInline.amountSum += parseInt(item.checkReleaseCargo);
				})
			},
			add(row) {
				this.$set(row,"subtotal1",0);
				this.tableData.push(row);
				//关闭所有模态框;
				this.table = false;
			},
			selectAllDESIGN() {
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
			initialize(row){
				this.$http.post(this.$api + "/purchase/selectNotReleaseCargo","supplierNo="+row.supplierNo)
					.then(res => {
						this.gridData = res.data;
						console.log("手动阀手动阀");
						console.log(this.tableData);
					})
					.catch(err => {
						console.log(err)
					}); 
			}

		},
		mounted() {
			this.initialize(this.$route.query.row);
			this.shijian();
		}
	}
</script>

<style scoped>
	#butt {
		width: 500px;
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
