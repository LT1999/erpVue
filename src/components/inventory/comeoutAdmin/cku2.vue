<template>
  <div id="app">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">库存管理</el-breadcrumb-item>
        <el-breadcrumb-item>出库管理</el-breadcrumb-item>
        <el-breadcrumb-item>出库登记</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <el-form :inline="true" :model="gather"  class="demo-form-inline">
    <div id="butt">
      <el-form-item>
        <el-button type="info">PDF打印</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="danger" @click="back()">返回</el-button>
      </el-form-item>
    </div>
    <br />
    <center>
      <div id="kp">
      <el-card class="box-card">
        <h4>出库登记</h4>
        <br />
        <div>
        <span class="sp1">出库单编号：{{this.$route.query.payId}}</span>
        </div>
        <br />
        <div>
        <span class="sp2">出库理由：{{this.$route.query.reason}}</span><span>出库详细理由：{{this.$route.query.reasonexact}}</span>
        </div>
        <br />
        <div>
          <el-table :data="gridData">
            <el-table-column prop="id" label="序号" width="100"></el-table-column>
            <el-table-column prop="productName" label="产品名称" width="150"></el-table-column>
            <el-table-column prop="productId" label="产品序号" width="150"></el-table-column>
            <el-table-column prop="amount" label="应出库件数" width="150"></el-table-column>
            <el-table-column prop="paidAmount" label="已出库件数" width="150"></el-table-column>
            <el-table-column prop="cf" label="存放地址集合" width="150"></el-table-column>
            <el-table-column prop="subtotal" label="小计" ></el-table-column>
          </el-table>
        </div>
        <br />
        <div>
          <span class="sp2">调度人：{{this.$route.query.attemper}}</span><span>调度时间：{{this.$route.query.attemperTime}}</span>
        </div>
        <br />
        <div>
        <span class="sp3">出库总件数：{{this.$route.query.amountSum}}</span><span>出库总金额：{{this.$route.query.costPriceSum}}</span>
        </div>
        <br />
        <div>
          <el-form-item label="登记人:">
            <el-input class="inp2" type="text" v-model="gather.register"></el-input>
          </el-form-item>
        </div>
      </el-card>
      </div>
    </center>
    </el-form>

  </div>
</template>

<script>
  export default {
    created() {
      this.gather.id=this.$route.query.id;
      this.selectPayDetailsAll();
    },
    data() {
      return {
        id:0,//入库明细表id
        gather:{
          id:0,
          register:'',//登记人
          storeTag:'已登记',
          checkTag:'等待审核'
        },
        gridData:[],
        datas:{},
        pay:{
          parentId:0,
          productId:''
        }
      }
    },
    methods: {
      onSubmit() {
        this.$set(this.datas,'pay',this.gather);
        this.$set(this.datas,'payDetails',this.gridData);
        this.$http.post("http://localhost:8080/Erp-web/pay/updatePayTag2.do",this.$qs.stringify(this.datas,{arrayFormat:'payDetails', allowDots: true}))
        	.then( res => {
            //console.log(this.formInline.productName);
                   if(res.status==200){
                   			this.$message({ message: '登记成功！',type: 'success',duration:1000});
                        this.$router.go(-1);
                   	}
                 })
        	.catch(err =>{
        		console.log(err)
        	})
      },
      selectPayDetailsAll(){
        this.id=this.$route.query.id;
        var demo = new URLSearchParams()
        demo.append("prid", this.id);
        this.$http.post('http://localhost:8080/Erp-web/pay-details/selectPayDetails.do', demo).then((response) => {
        						this.gridData = response.data;
                   for(var i=0;i<this.gridData.length;i++){
                          //alert("hhh");
                          this.pay.productId=this.gridData[i].productId;
                          this.pay.parentId=this.gridData[i].parentId;
                          this.$http.post("http://localhost:8080/Erp-web/pay-details/selectpaidAmount.do",this.$qs.stringify(this.pay)).then( res =>{
                                      for(var i=0;i<this.gridData.length;i++){
                                        this.gridData[i].paidAmount=res.data;
                                      }
                                   })
                          	.catch(err =>{
                          		console.log(err)
                          	})
                    }
        				}).catch((error) => {
        					console.log(error)
        				})
      },
      back(){
        location.href = "#/cku"
      }
    }
  }
</script>

<style scoped>
  #butt {
    width: 500px;
    margin-left: 840px;
  }
  .box-card {
    	width: 1000px;
    	box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
  #span{
  	margin-left: 250px;
  }
  .sp1{
  	margin-right: 500px;
  }
  .sp2{
  	margin-right: 550px;
  }
  .sp3{
  	margin-right: 550px;
  }
  .sp4{
  	margin-right: 615px;
  }
  .inp2 {
    width: 18.75rem;
    margin-right: 200px;
    border-bottom: 1px solid #000000;
    border-top-width: 0px;
    border-right-width: 0px;
    border-left-width: 0px;
    border-radius: 0px;
  }
</style>
