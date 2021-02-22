<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>采购管理</el-breadcrumb-item>
				<el-breadcrumb-item>采购发票管理</el-breadcrumb-item>
				<el-breadcrumb-item>发票信息登记</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
          <el-button size="mini" type="success" plain @click="updateapprove">提交</el-button>
					<el-button size="mini" type="primary" plain @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>发票登记单</h3><br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="执行单编号">
								<span>{{this.$route.query.id}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="产品编号">
								<span>{{this.$route.query.productId}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="产品名称">
								<span>{{this.$route.query.productName}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<template>
						<el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
							<el-table-column prop="no" v-model="form.storeId" label="供应商名称">
							</el-table-column>
							<el-table-column prop="name" label="供应商编号">
							</el-table-column>
              <el-table-column  label="联系人">
              	<template slot-scope="maxCapacityAmount">
              		<el-input v-model="form.maxCapacityAmount" clearable>
              		</el-input>
              	</template>
              </el-table-column>
              <el-table-column  label="电话">
              	<template slot-scope="amount">
              		<el-input v-model="form.amount" clearable>
              		</el-input>
              	</template>
              </el-table-column>
							<el-table-column prop="addressno" label="已收到发票金额">
							</el-table-column>
							<el-table-column prop="addressname" label="本次收到金额">
							</el-table-column>
							<el-table-column prop="shortname" label="应开票金额">
								<template slot-scope="scope">
									<el-input v-model="shortname" clearable>
									</el-input>
								</template>
							</el-table-column>

						</el-table>
					</template>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="应开票总额">
								<span>{{form.checkTime}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="已收到发票总额">
								<span>{{form.checkTime}}</span>
							</el-form-item>
						</el-col>
					</el-row>
          <el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="登记人">
								<input v-model="form.checker" />
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="登记时间">
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
      this.id=this.$route.query.id;
      this.selectCellById();
      //this.shijian();
    },
		data() {
			return {
        id:0,//配置单id
        bs: '1', //设置B/N或S/N
        designer:'',//设计人
        shortname:'',//存储单元简称
				form: {
          id:0,//id
          storeId:'1',//库存编号
          productId:'',//产品编号
          productName:'',//产品名称
          firstKindId:'',//产品I级分类编号
          firstKindName:'',//产品I级分类名称
          secondKindId:'',//产品II级分类编号
          secondKindName:'',//产品II级分类名称
          thirdKindId:'',//产品III级分类编号
          thirdKindName:'',// 产品III级分类名称
          minAmount:'',//库存报警下限数
          maxAmount:'',//库存报警上限数
          maxCapacityAmount:'',//最大存储量
          amount:'',//当前存储量
          config:'',//配置要求
          register:'',//登记人
          registerTime:'',//登记时间
          checker:'',//复核人
          checkTime:'',//复核时间
          checkTag:''//审核标志：等待审核 审核通过 审核不通过
        },
				tableData: [{
					no: '1', //序号
					name: '成品库', //库房名称
					addressno: '01-01-01', //存储地址编号
					addressname: '电子-计算机-服务器 '//存储地址名称
				}]
			};
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			back() {
				location.href = "#/Safestock"
			},
      shijian(){
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth();//得到月份
        var date = now.getDate();//得到日期

        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        var time = "";
        time = year + "-" + month + "-" + date + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        this.form.checkTime=time;
      },
      selectCellById(){
        var demo = new URLSearchParams()
        demo.append("id", this.id);
        this.$http.post('http://localhost:8080/Erp-web/cell/selectCellById.do',demo)
        .then(res => {
           console.log(res);
          if(!res.data){res.data={}}
         //this.form=res.data;
          this.form.id=res.data.id;
         	this.form.storeId=res.data.storeId;
          this.form.productId=res.data.productId;
          this.form.productName=res.data.productName;
          this.form.firstKindId=res.data.firstKindId;
          this.form.firstKindName=res.data.firstKindName;
          this.form.secondKindId=res.data.secondKindId;
          this.form.secondKindName=res.data.secondKindName;
          this.form.thirdKindId=res.data.thirdKindId;
          this.form.thirdKindName=res.data.thirdKindName;
          this.form.register=res.data.register;
          this.form.registerTime=res.data.registerTime;
         	this.form.minAmount=res.data.minAmount;
          this.form.maxAmount=res.data.maxAmount;
          this.form.maxCapacityAmount=res.data.maxCapacityAmount;
          this.form.amount=res.data.amount;
          this.form.checker=res.data.checker;
          this.form.checkTime=res.data.checkTime;
          this.form.config=res.data.config;
          this.shijian();
        })
        .catch(err =>{
        	console.log(err)
        })
      },
      updateapprove(){//审核通过
            this.form.checkTag="审核通过";
            //this.form.id=this.id;
            //this.form.data.splice(20,1);
            this.$http.post("http://localhost:8080/Erp-web/cell/updateapprove.do",this.$qs.stringify(this.form))
            	.then( res => {
                       if(res.status==200){
                       			this.$message({ message: '审核完成:审核已通过！',type: 'success',duration:1000});
                            this.back();
                       	}
                     })
            	.catch(err =>{
            		console.log(err)
            	})


      },
      updateNotapproved(){//审核不通过
            this.form.checkTag="审核不通过";
            //this.form.id=this.id;
            //this.form.splice(20,1);
            this.$http.post("http://localhost:8080/Erp-web/cell/updateNotapproved.do",this.$qs.stringify(this.form))
            	.then( res => {
                       if(res.status==200){
                       			this.$message({ message: '审核完成:审核未通过！',type: 'success',duration:1000});
                            this.back();
                       	}
                     })
            	.catch(err =>{
            		console.log(err)
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
		padding-bottom: 20px;
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
