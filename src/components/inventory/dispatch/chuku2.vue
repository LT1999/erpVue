<template>
<div id="app">
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>出入库调度管理</el-breadcrumb-item>
      <el-breadcrumb-item>制定出库单</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-divider></el-divider>
  <div id="butt">
    <el-row>
      <el-button type="danger" @click="back()">返回</el-button>
    </el-row>
  </div>
  <br />
  <center>
    <div id="kp">
    <el-card class="box-card">
      <h4>出库调度单</h4>
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
        	<el-table-column prop="productId" label="产品编号" width="150"></el-table-column>
        	<el-table-column prop="amount" label="应出库件数" width="150"></el-table-column>
        	<el-table-column prop="paidAmount" label="已出库件数" width="150"></el-table-column>
        	<el-table-column prop="cf" label="存放地址集合" width="150"></el-table-column>
        	<el-table-column label="调度">
        		 <template slot-scope="scope">
        	 	<el-button size="mini" type="success" @click="handleEdit(scope.$index,scope.row)">调度</el-button>
        	 </template>
        	</el-table-column>
        </el-table>
      </div>
      <br />
      <div>
      <span class="sp3">应出库总件数：{{this.$route.query.amountSum}}</span><span>已出库总件数：{{this.$route.query.paidAmountSum}}</span>
      </div>
      <br />
    </el-card>
    </div>
  </center>

</div>
</template>

<script>
  export default {
    created() {
      this.selectPayDetailsAll();
    },
    data() {
      return {
        id:0,
        gridData:[],
        pay:{
          productId:'',
          parentId:0
        }

      }
    },methods:{
      selectPayDetailsAll(){
        this.id=this.$route.query.id;
        var demo = new URLSearchParams()
        demo.append("prid", this.id);
        this.$http.post('http://localhost:8080/Erp-web/pay-details/selectPayDetailsAll.do', demo).then((response) => {
        						this.gridData = response.data;
                    for(var i=0;i<this.gridData.length;i++){
                           //alert("hhh");
                           this.pay.productId=this.gridData[i].productId;
                           this.pay.parentId=this.gridData[i].parentId;
                           this.$http.post("http://localhost:8080/Erp-web/pay-details/selectpaidAmount.do",this.$qs.stringify(this.pay)).then( res =>{
                                      console.log(res.data);
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
      handleEdit(index,row){
        this.$router.push({
        	path: '/chuku3',query:{gid:this.$route.query.id,payId:this.$route.query.payId,id:row.id,productName:row.productName,productId:row.productId,amount:row.amount,subtotal:row.subtotal
         ,costPrice:row.costPrice,paidAmount:row.paidAmount,reasonexact:this.$route.query.reasonexact,reason:this.$route.query.reason}
        });
      },
      back(){
        location.href = "#/chuku"
      }

    }
  }
</script>

<style scoped>
  #butt {
    width: 500px;
    margin-left: 820px;
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
  	margin-right: 415px;
  }
  .sp3{
  	margin-right: 550px;
  }
  .sp4{
  	margin-right: 515px;
  }
</style>
