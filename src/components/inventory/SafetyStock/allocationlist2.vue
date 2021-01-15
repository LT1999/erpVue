<template>
  <div id="app">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">库存管理</el-breadcrumb-item>
        <el-breadcrumb-item>安全库存配置管理</el-breadcrumb-item>
        <el-breadcrumb-item>制定安全库存配置单 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <div>
      <el-form :inline="true" :model="formInline"  class="demo-form-inline">
        <div id="butt">
          <el-form-item>
            <el-button type="info">PDF打印</el-button>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button type="danger"  @click="back()">返回</el-button>
          </el-form-item>
        </div>
        <center>
          <div id="kp">
            <el-card class="box-card">
              <h4>安全库存配置单</h4>
              <br />
              <span class="sp1">产品名称：{{this.$route.query.productName}}</span><span>产品编号：{{this.$route.query.productId}}</span>
              <br /><br />
              <div>
                <el-form-item label="库存报警下限数:" prop="minAmount" :rules="[{ required: true, message: '请输入库存报警下限数', trigger: 'blur' }]">
                  <el-input v-model="formInline.minAmount"></el-input>
                </el-form-item>
                <el-form-item label="库存报警上限数:" prop="maxAmount" :rules="[{ required: true, message: '请输入库存报警上限数', trigger: 'blur' }]">
                  <el-input v-model="formInline.maxAmount"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="设置B/N或S/N:">
                  <!-- prop="set" -->
                  <el-select v-model="set" placeholder="请选择">
                    <el-option label="否" value="否"></el-option>
                    <el-option label="设置B/N" value="设置B/N"></el-option>
                    <el-option label="设置S/N" value="设置S/N"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="设计人:">
                  <el-input v-model="sjr"></el-input>
                </el-form-item>
              </div>
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" v-model="formInline.storeId" label="序号" width="60"></el-table-column>
                <el-table-column prop="name" label="库房名称" width="150"></el-table-column>
                <el-table-column prop="cid" label="存储地址编号" width="130"></el-table-column>
                <el-table-column prop="cname" label="存储地址名称" width="150"></el-table-column>
                <el-table-column prop="cjc" label="存储单元简称" width="150">
                  <template slot-scope="scope">
                    <el-input  v-model="cjc" clearable></el-input>
                  </template>
                </el-table-column>
                <el-table-column  label="最大存储量" width="150">
                  <template slot-scope="maxCapacityAmount">
                   <el-input  v-model="formInline.maxCapacityAmount" clearable></el-input>
                   </template>
                </el-table-column>
                <el-table-column  label="当前存储量">
                   <template slot-scope="amount">
                   <el-input  v-model="formInline.amount" clearable></el-input>
                    </template>
                </el-table-column>
              </el-table>
              <br />
              <div>
                <el-form-item label="登记人:">
                  <el-input class="inp2" type="text" v-model="formInline.register"></el-input>
                </el-form-item>
                <el-form-item label="登记时间:">
                  <el-input :disabled="true" type="text" v-model="formInline.registerTime"></el-input>
                </el-form-item>
              </div>
              <br />
              <div class="sp1">
                <el-form-item label="配置要求:">
                  <el-input type="textarea"  style="width: 100%;" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容" v-model="formInline.config"></el-input>
                </el-form-item>
              </div>


            </el-card>
          </div>
        </center>
      </el-form>
    </div>


  </div>

</template>

<script>
  export default {
    created() {
      this.shijian();
    },
    data() {
      return {
        set:'设置B/N',//设置B/N或S/N
        sjr:'',//设计人
        cjc:'',//存储单位简称
        formInline: {
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
          //checker:'',//复核人
          //checkTime:'',//复核时间
          checkTag:'等待审核'//审核标志：等待审核 审核通过 审核不通过
        },
        tableData:[{
          id:1,
          name:'成品库',
          cid:'01-01-01',
          cname:'电子-计算机-服务器'

        }]
      }
    },
    methods: {
      onSubmit() {
        this.formInline.productId=this.$route.query.productId;
        this.formInline.productName=this.$route.query.productName;
        this.formInline.firstKindId=this.$route.query.firstKindId;
        this.formInline.firstKindName=this.$route.query.firstKindName;
        this.formInline.secondKindId=this.$route.query.secondKindId;
        this.formInline.secondKindName=this.$route.query.secondKindName;
        this.formInline.thirdKindId=this.$route.query.thirdKindId;
        this.formInline.thirdKindName=this.$route.query.thirdKindName;
        // alert(this.formInline.maxCapacityAmount);
        // alert(this.formInline.amount);
        this.$http.post("http://localhost:8080/Erp-web/cell/addCell.do",this.$qs.stringify(this.formInline))
        	.then( res => {
                   if(res.status==200){
                   			this.$message({ message: '提交成功！',type: 'success',duration:1000});
                        this.back();
                   	}
                 })
        	.catch(err =>{
        		console.log(err)
        	})

      },
      back(){
        location.href = "#/allocationlist"
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
      }
    }
  }
</script>

<style scoped>

  .box-card {
    width: 1000px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  #butt {
    width: 500px;
    margin-left: 820px;
  }

  .sp1 {
    margin-right: 400px;
  }

  /*  #span{
  	margin-left: 250px;
  }

  .inp{
  	width: 18.75rem;
  	margin-right: 340px;
  	border-bottom: 1px solid #000000;
  	border-top-width:0px ;
  	border-right-width:0px ;
  	border-left-width:0px ;
  	border-radius: 0px;
  }*/
  .inp2 {
    width: 18.75rem;
    margin-right: 100px;
    border-bottom: 1px solid #000000;
    border-top-width: 0px;
    border-right-width: 0px;
    border-left-width: 0px;
    border-radius: 0px;
  }
</style>
