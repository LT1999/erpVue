<template>
   <!-- 采购管理--产品供应商推荐管理--产品供应商推荐变更-->
   <div id="app">
     <div id="head">
     	<el-breadcrumb separator="/">
     		<el-breadcrumb-item>采购管理</el-breadcrumb-item>
     		<el-breadcrumb-item>产品供应商推荐管理</el-breadcrumb-item>
     		<el-breadcrumb-item>产品供应商推荐变更</el-breadcrumb-item>
     	</el-breadcrumb>
     </div>
     <br />
     <el-divider></el-divider>

     <div>
       <el-form :inline="true" :model="formInline" class="demo-form-inline">
         <div id="butt">
           <el-form-item>
             <div id="butt2">
               <el-button type="warning" size="medium" @click="table = true">新添加</el-button>
               <el-button type="warning" size="medium">新删除</el-button>
               <el-button type="success" size="medium" @click="onSubmit">重新提交</el-button>
               <el-button type="danger" size="medium" @click="back()">返回</el-button>
             </div>
           </el-form-item>
         </div>

         <center>
           <div id="kp">
             <el-card class="box-card">
               <h4>供应商推荐单</h4>
               <br />
               <div>
               <label class="sp1">推荐单编号：xxxx<!-- {{this.$route.query.payId}} --></label><label>推荐人：xxxxxx<!-- {{this.$route.query.productId}} --></label>
               </div>
               <br />
               <div>
               <label class="sp1">产品名称：xxxx<!-- {{this.$route.query.payId}} --></label><label>产品编号：xxxxxx<!-- {{this.$route.query.productId}} --></label>
               </div>
               <el-table :data="tableData" border style="width: 100%">
                 <el-table-column label="点选" width="60">
                   <template slot-scope="scope">
                     <el-checkbox v-model="checked" size="mini"></el-checkbox>
                   </template>
                 </el-table-column>
                 <el-table-column prop="productName" label="供应商编号" width="150"></el-table-column>
                 <el-table-column prop="productId" label="供应商名称" width="200"></el-table-column>
                 <el-table-column prop="productDescribe" label="所在地" width="110"></el-table-column>
                 <el-table-column prop="amount" label="优质级别" width="150"></el-table-column>
                 <el-table-column prop="amountUnit" label="电话" width="80"></el-table-column>
                 <el-table-column prop="costPrice" label="联系人" width="120"></el-table-column>
                <el-table-column  label="删除">
                	<template slot-scope="scope">
                			<el-button @click="" size="mini" type="success" plain>删除</el-button>
                		</template>
                </el-table-column>
               </el-table>
               <br />
               <div>
                 <el-form-item label="变更人:">
                   <el-input class="inp2" type="text" v-model="formInline.register"></el-input>
                 </el-form-item>
                 <el-form-item label="变更时间:">
                   <el-input class="inp2" :disabled="true" type="text" v-model="formInline.registerTime"></el-input>
                 </el-form-item>
               </div>
               <br />
               <div class="sp1">
                 <el-form-item label="推荐要求:">
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
                 <el-form-item label="请选择供应商产品分类">
                   <el-cascader v-model="formInline.classification" :options="options" @change="handleChange"></el-cascader>
                 </el-form-item>
                 <el-form-item label="请输入采购人编号">
                   <el-input  type="text" v-model="formInline.registerTime"></el-input>
                 </el-form-item>
                 <el-button type="primary" @click="onSubmit">搜索</el-button>
                 </el-form-item>
               </el-form>
             </div>
             <br />
             <el-table :data="gridData">
               <el-table-column prop="productId" label="供应商编号" width="100"></el-table-column>
               <el-table-column prop="productName" label="供应商名称" width="100"></el-table-column>
               <el-table-column prop="type" label="级别" width="70"></el-table-column>
               <el-table-column prop="personalUnit" label="Ⅰ级分类" width="100"></el-table-column>
               <el-table-column prop="costPrice" label="Ⅱ级分类" width="100"></el-table-column>
               <el-table-column prop="costPrice" label="Ⅲ级分类" width="100"></el-table-column>
               <el-table-column prop="costPrice" label="所在区域" width="100"></el-table-column>
               <el-table-column label="添加">
                 <template slot-scope="scope">
                   <el-button @click.native.prevent="add(scope.$index, table)" type="text" size="small">添加</el-button>
                 </template>
               </el-table-column>
             </el-table>
           </el-drawer>

   </div>
</template>

<script>
  export default {
    created() {
      //this.selectGatherDetails();
      this.shijian();
    },
    data() {
      return {
        amount:0,//
        sum:0,//数量
        index:0,
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
          payId:'',//出库单编号
          storer:'',//出库人
          reason:'',//出库理由
          reasonexact:'',//出库详细理由
          amountSum:0,// 总件数
          costPriceSum:0,//总金额
          paidAmountSum:0,//确认出库总件数
          remark:'',//备注
          register:'',//登记人
          registerTime:'',//登记时间
          checker:'',//复核人
          checkTime:'2020-09-09',//复核时间
          checkTag:'等待审核',//审核标志
          attemper:'',//调度人
          attemperTime:'2020-09-09',//调度时间
          storeTag:'已申请'//库存标志
        },
        tableData: [],
        datas:{}
      }
    },
    methods: {
      onSubmit() {
        this.$set(this.datas,'pay',this.formInline);
        this.$set(this.datas,'payDetails',this.tableData);
        this.$http.post("http://localhost:8080/Erp-web/pay/addPay.do",this.$qs.stringify(this.datas,{arrayFormat:'payDetails', allowDots: true}))
        	.then( res => {
            console.log(this.formInline.productName);
                   if(res.status==200){
                   			this.$message({ message: '提交成功！',type: 'success',duration:1000});
                        this.$router.go(0);
                   	}
                 })
        	.catch(err =>{
        		console.log(err)
        	})

      },
      handleChange(value) {
        console.log(value);
      },
      add(index) {
        this.index = index;
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
        this.table = false
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
      shijian(){
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth();//得到月份
        var date = now.getDate();//得到日期
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        var time = "";
        time = year + "-" + month + "-" + date+ " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        this.formInline.registerTime=time;
      },
      sumlll(amount,index){
        this.tableData[index].subtotal=this.tableData[index].costPrice*parseInt(amount);
        this.sum+=parseInt(amount);
        this.formInline.amountSum=this.sum;
        this.formInline.costPriceSum+=parseInt(this.tableData[this.index].subtotal);
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
