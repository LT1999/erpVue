<template>
  <!-- 采购管理--采购计划管理--新发生采购计划登记 -->
  <div id="app">
    <div id="head">
    	<el-breadcrumb separator="/">
    		<el-breadcrumb-item>采购管理</el-breadcrumb-item>
    		<el-breadcrumb-item>采购计划管理</el-breadcrumb-item>
    		<el-breadcrumb-item>新发生采购计划登记</el-breadcrumb-item>
    	</el-breadcrumb>
    </div>
    <br />
    <el-divider></el-divider>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div id="butt">
          <el-form-item>
            <div id="butt2">
              <el-button type="info" size="medium">PDF打印</el-button>
              <el-button type="warning" size="medium" @click="table = true">添加</el-button>
              <el-button type="warning" size="medium">删除</el-button>
              <el-button type="success" size="medium" @click="onSubmit">确认</el-button>
              <el-button type="danger" size="medium" @click="back()">返回</el-button>
            </div>
          </el-form-item>
        </div>

        <center>
          <div id="kp">
            <el-card class="box-card">
              <h4>采购计划单</h4>
              <br />
              <el-row>
              	<el-col :span="8" :push='1'>
              		<el-form-item label="采购理由:">
              			<span>{{formInline.purchaseqReason}}</span>
              		</el-form-item>
              	</el-col>
              	<el-col :span="8" :push='5'>
              		<el-form-item label="供货时间:">
              			<el-date-picker v-model="formInline.purchaseqSupplytime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              		</el-form-item>
              	</el-col>
              </el-row>
              <br />

              <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="点选" width="60">
                  <template slot-scope="scope">
                    <el-checkbox v-model="checked" size="mini"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="productName" label="产品名称" width="150"></el-table-column>
                <el-table-column prop="productNo" label="产品编号" width="200"></el-table-column>
                <el-table-column prop="describe" label="描述" width="150"></el-table-column>
                <el-table-column label="数量" width="80">
                	<template slot-scope="scope">
                		<el-input v-model="scope.row.quantity" @change="sumzje(scope.row,scope.$index)"></el-input>
                	</template>
                </el-table-column>
                <el-table-column prop="unit" label="单位" width="80"></el-table-column>
                <el-table-column prop="price" label="计划成本单价(元)" width="120"></el-table-column>
                <el-table-column prop="subtotal" label="小计(元)">
                	<template slot-scope="scope">
                    <el-input :disabled="true"  v-model="scope.row.subtotal" clearable></el-input>
                  </template>
                </el-table-column>
              </el-table>
              <br />
              <div>
                <el-form-item label="登记人:">
                  <el-input class="inp2" type="text" v-model="formInline.purchaseqRegistrant"></el-input>
                </el-form-item>
                <el-form-item label="登记时间:">
                  <el-input class="inp2" :disabled="true" type="text" v-model="formInline.purchaseqRegistranttime"></el-input>
                </el-form-item>
              </div>
              <br />
              <div class="sp1">
                <el-form-item label="备注:">
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容" v-model="formInline.purchaseqRemark"></el-input>
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
          <el-form-item label="请选择产品分类">
            <el-cascader v-model="formInline.classification" :options="options" @change="handleChange"></el-cascader>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <br />
      <el-table :data="gridData">
        <el-table-column prop="productId" label="产品编号" width="170px" ></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="type" label="用途类型"></el-table-column>
        <el-table-column prop="personalUnit" label="单位"></el-table-column>
        <el-table-column prop="costPrice" label="计划成本单价"></el-table-column>
        <el-table-column label="采购">
          <template slot-scope="scope">
            <el-button @click.native.prevent="add(scope.row)" type="text" size="small">采购</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

  </div>
</template>

<script>
  export default {
    created() {
      this.selectProduct();
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
          purchaseqNo:'',//编号
          purchaseqTotalprices:0,//总价格
          purchaseqTotalquantity:0,//总数量
          purchaseqReason:'新发生',//采购理由
          purchaseqSupplytime:'',//供货时间
          purchaseqRegistrant:'',//登记人
          purchaseqRegistranttime:'',//登记时间
          purchaseqRemark:'',//备注
          checkMark:'未审核'//审核标志
        },
        tableData: [],
        datas:{}
      }
    },
    methods: {
      onSubmit() {
        var now = new Date();
        this.formInline.purchaseqSupplytime+=" " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        //alert(this.formInline.purchaseqSupplytime);
        this.$set(this.datas,'purchaseqplan',this.formInline);
        this.$set(this.datas,'plandetails',this.tableData);
				console.log(this.datas)
        this.$http.post(this.$api+"/purchaseqplan/insertPruchaseqplan",this.$qs.stringify(this.datas,{arrayFormat:'plandetails', allowDots: true}))
        	.then( res => {
                   if(res.status==200){
                   			this.$message({ message: '提交成功！',type: 'success',duration:1000});
                        this.$router.go(-1);
                   	}
                 })
        	.catch(err =>{
        		console.log(err)
        	})

      },
      handleChange(value) {
        console.log(value);
      },
      add(row) {
        //把数据添加到数组末尾
       this.tableData.push({
       productName:row.productName,//产品名称
       productNo:row.productId,//产品id
       describe:row.productDescribe,//描述
       unit:row.amountUnit,//单位
       price:row.costPrice,//单价
       quantity:0,//数量
       subtotal:0,//小计
       dispatch:'未调度'
       });
     /*  this.formInline.purchaseqTotalquantity+=row.quantity;
	   
	   alert(isNaN(this.formInline.purchaseqTotalprices))
	   alert(row.subtotal)
       this.formInline.purchaseqTotalprices=this.formInline.purchaseqTotalprices+parseInt(row.subtotal);
	   alert(isNaN(this.formInline.purchaseqTotalprices)) */
        //关闭所有模态框
        this.table = false
      },
      selectProduct(){
        this.$http.post("http://localhost:8080/Erp-web/productfile/findwl.do")
        	.then( res => {
        	//alert("a");
                    this.gridData = res.data;
                 })
        	.catch(err =>{
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
        this.formInline.purchaseqRegistranttime=time;
      },
      sumzje(row,index){
        this.tableData[index].subtotal=parseInt(this.tableData[index].price)*parseInt(row.quantity);
        this.sum+=parseInt(row.quantity);
        this.formInline.purchaseqTotalquantity=this.sum;
        this.formInline.purchaseqTotalprices+=parseInt(this.tableData[this.index].subtotal);
        //alert(this.formInline.purchaseqTotalquantity);
        //alert(this.formInline.purchaseqTotalprices);
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
