<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>库存管理</el-breadcrumb-item>
				<el-breadcrumb-item>入库管理</el-breadcrumb-item>
				<el-breadcrumb-item>入库登记复核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button size="mini" type="primary" plain @click="onSubmit()">复核通过</el-button>
					<el-button size="mini" type="primary" plain @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>入库审核</h3><br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="入库单编号">
								<span>{{this.$route.query.gatherId}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="入库理由">
								<span>{{this.$route.query.reason}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="5" :push='1'>
							<el-form-item label="入库详细理由">
								<span>{{this.$route.query.reasonexact}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<template>
						<el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
							<el-table-column prop="productId" label="产品编号" width="200px">
							</el-table-column>
							<el-table-column prop="productName" label="产品名称">
							</el-table-column>
							<el-table-column prop="bankname" label="库房名称">
							</el-table-column>
							<el-table-column prop="storeaddress" label="存放地址" width="150px">
							</el-table-column>
							<el-table-column prop="amount" label="应入库件数">
							</el-table-column>
							<el-table-column prop="gatheredAmount" label="已入库件数">
							</el-table-column>
							<el-table-column  label="本次入库数量" width="110px">
								<template slot-scope="scope">
									<el-input v-model="scope.row.amount" clearable>
									</el-input>
								</template>
							</el-table-column>
						</el-table>
					</template>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="应入库总件数">
								<span>{{this.$route.query.amountSum}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="已入库总件数">
								<span>{{this.$route.query.gatheredAmountSum}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="应入库总成本">
								<span>{{this.$route.query.costPriceSum}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="已入库总成本">
								<span>{{this.zong}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="审核人">
								<el-input v-model="form.checker" clearable>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="审核时间">
								<span>{{form.checkTime}}</span>
							</el-form-item>
						</el-col>
					</el-row>

				</el-card>
			</el-form>
		</div>

	</div>
</template>

<script>
	export default {
    created() {
      this.form.id=this.$route.query.id;
      this.selectGather();
    },
		data() {
			return {
        zong:0,
        bankname: '成品库 ', //库房名称
        storeaddress: '电子-计算机-服务器', //存放地址

				form: {
          id:0,
          checkTag:'',//审核标志
          gatheredAmountSum:0,
          checkTime:'',
          checker:''
				},
				tableData: [],
        datas:{}
			};
		},
		methods: {
			onSubmit() {
				this.form.checkTag="审核通过";
        //this.form.gatheredAmountSum=this.$route.query.gatheredAmountSum;
        for(var i=0;i<this.tableData.length;i++){
          this.tableData[i].gatheredAmount=this.tableData[i].amount;//入库明细表实际入库总数
          this.form.gatheredAmountSum+=parseInt(this.tableData[i].gatheredAmount);//实际入库总数
        }

        this.$set(this.datas,'gather',this.form);
        this.$set(this.datas,'gatherDetails',this.tableData);
           console.log(this.datas);
       this.$http.post("http://localhost:8080/Erp-web/gather/updategatheredAmountSum.do",this.$qs.stringify(this.datas,{arrayFormat:'gatherDetails', allowDots: true}))
        	.then( res => {
            //console.log(this.formInline.productName);
                   if(res.status==200){
                   			this.$message({ message: '审核成功！',type: 'success',duration:1000});
                       this.back();
                   	}
                 })
        	.catch(err =>{
        		console.log(err)
        	})
			},
			back() {
				location.href = "#/Joinbankregister"
			},
      selectGather(){
        var aData = new Date();
        this.form.checkTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
        var demo = new URLSearchParams()
        demo.append("prid", this.form.id);
        this.$http.post('http://localhost:8080/Erp-web/gather-details/selectprid.do', demo).then((response) => {
                    for(var i=0;i<response.data.length;i++){
                       this.$set(response.data[i],'bankname',this.bankname);
                       this.$set(response.data[i],'storeaddress',this.storeaddress);
                    }
                    this.tableData = response.data;
                    for(var i=0;i<this.tableData.length;i++){
                     if(this.tableData[i].gatheredAmountSum==null){
                       this.tableData[i].gatheredAmountSum=0;
                     }
                      this.zong+=this.tableData[i].gatheredAmountSum* this.tableData[i].costPrice;
                    }
        				}).catch((error) => {
        					console.log(error)
        				})
      }
		}
	}
</script>

<style scoped>
	#box>>>.el-table th {
		text-align: center;
	}

	#box>>>.el-table td {
		padding: 0px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}

	.box-card {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		padding-bottom: 23px;
	}

	#buttons {
		float: right;
		margin-right: 50px;
		margin-bottom: 20px;
	}

	input {
		outline: none;
		border: none;
		border-bottom: 1px solid #000;
	}

	#box>>>.el-form-item {
		margin-bottom: 0px;
	}

	#box>>>.el-form-item__label {
		line-height: 35px;
	}

	.el-row {
		margin: 10px;
	}

	h3 {
		text-align: center;
	}

	table {
		margin-left: 3%;
	}

	table td {
		margin-left: 50px;
		display: inline-block;
	}

	#box>>>.el-form-item__content {
		line-height: 35px;
	}
</style>
