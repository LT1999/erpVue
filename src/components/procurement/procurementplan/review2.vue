<template>
    <!-- 采购管理--采购计划管理--采购计划审核 -->
    <div id="box">
          <div id="head">
          	<el-breadcrumb separator="/">
          		<el-breadcrumb-item>采购管理</el-breadcrumb-item>
          		<el-breadcrumb-item>采购计划管理</el-breadcrumb-item>
          		<el-breadcrumb-item>采购计划审核</el-breadcrumb-item>
          	</el-breadcrumb>
          </div>

          <div id="card">
          		<el-form ref="form" :model="form" label-width="130px">
          			<div id="buttons">
          				<el-button size="mini" type="primary" plain @click="approve">复核通过</el-button>
          				<el-button size="mini" type="primary" plain @click="back()">返回</el-button>
          			</div>
          			<el-card class="box-card">
          				<h3>采购计划单</h3><br />
          				<el-row>
          					<el-col :span="8" :push='1'>
          						<el-form-item label="计划单编号:">
          							<span>{{this.$route.query.row.purchaseqNo}}</span>
          						</el-form-item>
          					</el-col>
          					</el-col>
          				</el-row>

          				<template>
          					<el-table :data="tableData" style="width: 100%;" border>
          						<el-table-column prop="id" label="序号">
          						</el-table-column>
          						<el-table-column prop="productNo" label="产品编号">
          						</el-table-column>
          						<el-table-column prop="productName" label="产品名称">
          						</el-table-column>
          						<el-table-column prop="quantity" label="数量">
          						</el-table-column>
                      <el-table-column prop="price" label="单价">
                      </el-table-column>
          						<el-table-column prop="subtotal" label="小计">
          						</el-table-column>
          					</el-table>
          				</template>

                  <el-row>
                  	<el-col :span="8" :push='1'>
                  		<el-form-item label="采购总数:">
                  			<span>{{this.$route.query.row.purchaseqTotalquantity}}</span>
                  		</el-form-item>
                  	</el-col>
                  	<el-col :span="8" :push='5'>
                  		<el-form-item label="采购总价:">
                  			<span>{{this.$route.query.row.purchaseqTotalprices}}</span>
                  		</el-form-item>
                  	</el-col>
                  </el-row>

          				<el-row>
          					<el-col :span="8" :push='1'>
          						<el-form-item label="审核人:">
          							<input v-model="form.auditor" />
          						</el-form-item>
          					</el-col>
          					<el-col :span="8" :push='5'>
          						<el-form-item label="审核时间:">
          							<span>{{form.auditorTime}}</span>
          						</el-form-item>
          					</el-col>
          				</el-row>


          				<el-row>
          					<el-col :span="21" :push='1'>
          						<el-form-item label="备注" style="width: 100%;">
          							<el-input style="width: 100%;" v-model="form.purchaseqRemark" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容">
          							</el-input>
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
      this.form.id=this.$route.query.row.id;
      this.form.purchaseqNo=this.$route.query.row.purchaseqNo;
      this.form.purchaseqTotalprices=this.$route.query.row.purchaseqTotalprices;
      this.form.purchaseqTotalquantity=this.$route.query.row.purchaseqTotalquantity;
      this.form.purchaseqReason=this.$route.query.row.purchaseqReason;
      this.form.purchaseqSupplytime=this.$route.query.row.purchaseqSupplytime;
      this.form.purchaseqRegistrant=this.$route.query.row.purchaseqRegistrant;
      this.form.purchaseqRegistranttime=this.$route.query.row.purchaseqRegistranttime;
      this.shijian();
      this.selectAllByParentId();

    },
  	data() {
  		return {
        id:0,
  			form: {
          id:0,
          purchaseqNo:'',//编号
          purchaseqTotalprices:0,//总价格
          purchaseqTotalquantity:0,//总数量
          purchaseqReason:'',//采购理由
          purchaseqSupplytime:'',//供货时间
          purchaseqRegistrant:'',//登记人
          purchaseqRegistranttime:'',//登记时间
          purchaseqRemark:'',//备注
          checkMark:'已审核',//审核标志
          auditor:'',//审核人
          auditorTime:''//审核时间
  			},
  			tableData: []
  		};
  	},
  	methods: {
  		onSubmit() {
  			console.log('submit!');
  		},
  		back() {
  			location.href = "#/review"
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
        time = year + "-" + month + "-" + date+ " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();;
        this.form.auditorTime=time;
      },
      selectAllByParentId(){
        this.id=this.$route.query.row.id;
        var demo = new URLSearchParams()
        demo.append("parentId", this.id);
        this.$http.post(this.$api+'/plandetail/selectAllByParentId', demo).then((response) => {
        						this.tableData = response.data;
                    this.selectCellByPid();
        				}).catch((error) => {
        					console.log(error)
        				})
      },
      approve(){//审核通过
       this.$http.post(this.$api+"/purchaseqplan/updateByPrimaryKey",this.$qs.stringify(this.form))
       	.then( res => {
                  if(res.status==200){
                  			this.$message({ message: '审核完成:审核已通过！',type: 'success',duration:1000});
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
