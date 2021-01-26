<template>
  <!-- 产品供应商推荐登记审核-->
  <div id="box">
      <div id="head">
      	<el-breadcrumb separator="/">
      		<el-breadcrumb-item>采购管理</el-breadcrumb-item>
      		<el-breadcrumb-item>产品供应商推荐管理</el-breadcrumb-item>
      		<el-breadcrumb-item>产品供应商推荐登记审核</el-breadcrumb-item>
      	</el-breadcrumb>
      </div>
	<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button size="mini" type="primary" plain @click="approve">复核通过</el-button>
					<el-button size="mini" type="primary" plain @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>供应商推荐单</h3><br />
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="推荐单编号">
								<span>{{this.$route.query.id}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="产品名称">
								<span>{{this.$route.query.productName}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="产品编号">
								<span>{{this.$route.query.productNo}}</span>
							</el-form-item>
						</el-col>
					</el-row>

					<template>
						<el-table :data="tableData" style="width: 100%" border>
							<el-table-column prop="id" label="序号">
							</el-table-column>
							<el-table-column prop="supplierNo" label="供应商编号">
							</el-table-column>
							<el-table-column prop="supplierName" label="供应商名称">
							</el-table-column>
							<el-table-column prop="supplierArea" label="所在地区">
							</el-table-column>
							<el-table-column prop="supplierQualityRank" label="优质级别">
							</el-table-column>
							<el-table-column prop="supplierPhone" label="电话">
							</el-table-column>
						</el-table>
					</template>

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="审核人">
								<input v-model="form.auditor" />
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='5'>
							<el-form-item label="审核时间">
								<span>{{form.auditorTime}}</span>
							</el-form-item>
						</el-col>
					</el-row>


					<el-row>
						<el-col :span="21" :push='1'>
							<el-form-item label="审核意见" style="width: 100%;">
								<el-input style="width: 100%;" v-model="form.remark" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容">
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
      this.form.id=this.$route.query.id;
      this.form.productId=this.$route.query.productId;
      this.form.productNo=this.$route.query.productNo;
      this.form.productName=this.$route.query.productName;
      this.form.productType=this.$route.query.productType;
      this.form.productGrade=this.$route.query.productGrade;
      this.form.registrar=this.$route.query.registrar;
      this.form.registrartime=this.$route.query.registrartime;
      this.shijian();
      this.selectByParentId();

    },
		data() {
			return {
        id:0,
        thback:1, //是否退回
        backtime: '', //退回时间
				form: {
         id:0,
         productId:'',//产品主键
         productNo:'',//产品编号
         productName:'',//产品名称
         productType:'',//用途类型
         productGrade:'',//档次级别
         registrar:'',//登记人
         registrartime:'',//登记时间
         auditor:'',//审核人
         auditorTime:'',//审核时间
         checkMark:''//审核标志
				},
				tableData: []
			};
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			back() {
				location.href = "#/audit"
			},
      shijian(){
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth();//得到月份
        var date = now.getDate();//得到日期
        var hh = new Date().getHours();
        var mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
        var ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        var time = "";
        time = year + "-" + month + "-" + date+" "+hh+":"+mf+":"+ss;
        this.form.auditorTime=time;
      },
      selectByParentId(){
        this.id=this.$route.query.id;
        var demo = new URLSearchParams()
        demo.append("parentId", this.id);
        this.$http.post(this.$api+'/recommenddetail/selectByParentId', demo).then((response) => {
        						this.tableData = response.data;
        				}).catch((error) => {
        					console.log(error)
        				})
      },
       approve(){//审核通过
       this.form.checkMark="已审核";
       this.$http.post(this.$api+"/recommend/updateByPrimaryKey",this.$qs.stringify(this.form))
       	.then( res => {
                  if(res.status==200){
                  			this.$message({ message: '审核完成:审核已通过！',type: 'success',duration:1000});
                       this.back();
                  	}
                })
       	.catch(err =>{
       		console.log(err)
       	})
       }/* ,
       selectCellByPid(){
         for(var i=0;i<this.tableData.length;i++){
           var demo = new URLSearchParams()
           demo.append("prid", this.tableData[i].productId);
           this.$http.post('http://localhost:8080/Erp-web/cell/selectCellByPid.do', demo).then((response) => {
                  for(var i=0;i<this.tableData.length;i++){
                       this.$set(this.tableData[i],'stockcount',response.data);
                  }
           				}).catch((error) => {
           					console.log(error)
           				})
         }
       } */
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
