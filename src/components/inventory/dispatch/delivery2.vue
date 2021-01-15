<template>
  <!-- 入库调度单-->
<div id="app">
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>出入库调度管理</el-breadcrumb-item>
      <el-breadcrumb-item>制定入库单</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-divider></el-divider>
  <div id="butt">
    <el-row>
      <el-button type="danger" @click=" back()">返回</el-button>
    </el-row>
  </div>
  <br />
  <center>
    <div id="kp">
    <el-card class="box-card">
      <h4>入库调度单</h4>
      <br />
      <div>
      <span class="sp1">入库单编号：{{this.$route.query.gatherId}}</span>
      </div>
      <br />
      <div>
      <span class="sp2">入库理由：{{this.$route.query.reason}}</span><span>入库详细理由：{{this.$route.query.reasonexact}}</span>
      </div>
      <br />
      <div>
        <el-table :data="gridData">
        	<el-table-column prop="id" label="序号" width="100"></el-table-column>
        	<el-table-column prop="productName" label="产品名称" width="150"></el-table-column>
        	<el-table-column prop="productId" label="产品序号" width="150"></el-table-column>
        	<el-table-column prop="amount" label="应入库件数" width="150"></el-table-column>
        	<el-table-column prop="gatheredAmount" label="已入库件数" width="150"></el-table-column>
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
      <span class="sp3">应入库总件数：{{this.$route.query.amountSum}}</span><span>已入库总件数：{{this.$route.query.gatheredAmountSum}}</span>
      </div>
      <br />
      <div>
      <span class="sp3">应入库总成本：{{this.$route.query.costPriceSum}}</span><span>已入库总成本：{{this.zong}}</span>
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
      this.selectGather();
    },
    data() {
      return {
        zong:0,
        id:0,
        gridData:[]

      }
    },
    methods:{
      selectGather(){
        this.id=this.$route.query.id;
        var demo = new URLSearchParams()
        demo.append("prid", this.id);
        this.$http.post('http://localhost:8080/Erp-web/gather-details/selectGather.do', demo).then((response) => {
        						this.gridData = response.data;
                    for(var i=0;i<this.gridData.length;i++){
                     /* if(this.gridData[i].gatheredAmountSum==null){
                       this.gridData[i].gatheredAmountSum=0;
                     }
                      this.zong+=this.gridData[i].gatheredAmountSum* this.gridData[i].costPrice; */
                          var demo2 = new URLSearchParams()
                          demo2.append("proid", this.gridData[i].productId);
                          this.$http.post('http://localhost:8080/Erp-web/cell/selectamount.do', demo2).then((response) => {
                                         for(var i=0;i<this.gridData.length;i++){
                                           this.gridData[i].gatheredAmount=response.data;
                                         }

                          				}).catch((error) => {
                          					console.log(error)
                                  })
                        //this.zong+=this.gridData[i].gatheredAmountSum* this.gridData[i].costPrice;

                      }
        				}).catch((error) => {
        					console.log(error)
        				})
      },
      handleEdit(index,row){
        this.$router.push({
        	path: '/delivery3',query:{gid:this.$route.query.id,gatherId:this.$route.query.gatherId,id:row.id,productName:row.productName,productId:row.productId,amount:row.amount,subtotal:row.subtotal
         ,costPrice:row.costPrice,gatheredAmountSum:this.$route.query.gatheredAmountSum,zong:this.zong,gatheredAmount:row.gatheredAmount }
        });
      },
      back(){
        location.href = "#/delivery"
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
