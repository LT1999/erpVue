<template>
  <div id="box">
    <div id="head">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>库存管理</el-breadcrumb-item>
        <el-breadcrumb-item>入库申请管理</el-breadcrumb-item>
        <el-breadcrumb-item>出库申请登记审核</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div id="card">
      <el-form ref="form" :model="form" label-width="130px">
        <div id="buttons">
          <el-button size="mini" type="primary" plain @click="notapproved">复核不通过</el-button>
          <el-button size="mini" type="primary" plain @click="approve">复核通过</el-button>
          <el-button size="mini" type="primary" plain @click="back()">返回</el-button>
        </div>
        <el-card class="box-card">
          <h3>出库申请单</h3><br />
          <el-row>
            <el-col :span="8" :push='1'>
              <el-form-item label="申请单编号">
                <span>{{this.$route.query.payId}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push='5'>
              <el-form-item label="出库人">
                <span>{{this.$route.query.storer}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>

            <el-col :span="8" :push='1'>
              <el-form-item label="是否归还">
                <el-select v-model="thback" style="width:  170px;" clearable placeholder="请选择">
                  <el-option label="是" value="0"></el-option>
                  <el-option label="否" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push='5'>
              <el-form-item label="归还时间">
                <template>
                  <div class="block">
                    <el-date-picker v-model="backtime" type="date" placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </template>
              </el-form-item>

            </el-col>
          </el-row>

          <el-row>
            <el-col :span="5" :push='1'>
              <el-form-item label="出库理由">
                <span>{{this.$route.query.reason}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <template>
            <el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
              <el-table-column prop="id" label="序号">
              </el-table-column>
              <el-table-column prop="productName" label="商品名称">
              </el-table-column>
              <el-table-column prop="productId" label="商品编号" width="200px">
              </el-table-column>
              <el-table-column prop="stockcount" label="当前库存数量" width="120px">
              </el-table-column>
              <el-table-column prop="amount" label="数量">
              </el-table-column>
              <el-table-column prop="amountUnit" label="单位">
              </el-table-column>
              <el-table-column prop="costPrice" label="成本单位(元)" width="120px">
              </el-table-column>
              <el-table-column prop="subtotal" label="小计(元)">
              </el-table-column>
            </el-table>
          </template>

          <el-row>
            <el-col :span="8" :push='1'>
              <el-form-item label="总件数">
                <span>{{this.$route.query.amountSum}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push='5'>
              <el-form-item label="总金额">
                <span>{{this.$route.query.costPriceSum}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :push='1'>
              <el-form-item label="登记人">
                <input v-model="form.register" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :push='5'>
              <el-form-item label="登记时间">
                <span>{{this.$route.query.registerTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8" :push='1'>
              <el-form-item label="审核人">
                <input v-model="form.checker" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :push='5'>
              <el-form-item label="审核时间">
                <span>{{form.checkTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="21" :push='1'>
              <el-form-item label="备注" style="width: 100%;">
                <el-input style="width: 100%;" v-model="form.remark" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"
                  placeholder="请输入内容">
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
      this.form.id = this.$route.query.id;
      this.form.register = this.$route.query.register; //登记人
      this.form.remark = this.$route.query.remark; //备注
      this.shijian();
      this.selectPayDetailsAll();

    },
    data() {
      return {
        id: 0,
        thback: 1, //是否退回
        backtime: '', //退回时间
        form: {
          id: 0,
          register: '',
          remark: '',
          checker: '', //审核人
          checkTime: '', //审核时间,
          checkTag: ''
        },
        tableData: []
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      back() {
        location.href = "#/outregister"
      },
      shijian() {
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth(); //得到月份
        var date = now.getDate(); //得到日期
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        var time = "";
        time = year + "-" + month + "-" + date + " ";
        this.form.checkTime = time;
      },
      selectPayDetailsAll() {
        this.id = this.$route.query.id;
        var demo = new URLSearchParams()
        demo.append("prid", this.id);
        this.$http.post('http://localhost:8080/Erp-web/pay-details/selectPayDetailsAll.do', demo).then((response) => {
          this.tableData = response.data;
          this.selectCellByPid();
        }).catch((error) => {
          console.log(error)
        })
      },
      notapproved() { //审核不通过
        this.form.checkTag = "审核不通过";
        //alert(this.form.changeTag);
        this.$http.post("http://localhost:8080/Erp-web/pay/updatePay.do", this.$qs.stringify(this.form))
          .then(res => {
            if (res.status == 200) {
              this.$message({
                message: '审核完成:审核不通过！',
                type: 'success',
                duration: 1000
              });
              this.back();
            }
          })
          .catch(err => {
            console.log(err)
          })

      },
      approve() { //审核通过
        this.form.checkTag = "审核通过";
        //alert(this.form.changeTag);
        console.log(this.form);
        this.$http.post("http://localhost:8080/Erp-web/pay/updatePay.do", this.$qs.stringify(this.form))
          .then(res => {
            if (res.status == 200) {
              this.$message({
                message: '审核完成:审核已通过！',
                type: 'success',
                duration: 1000
              });
              this.back();
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      selectCellByPid() {
        for (var i = 0; i < this.tableData.length; i++) {
          var demo = new URLSearchParams()
          demo.append("prid", this.tableData[i].productId);
          this.$http.post('http://localhost:8080/Erp-web/cell/selectCellByPid.do', demo).then((response) => {
            for (var i = 0; i < this.tableData.length; i++) {
              this.$set(this.tableData[i], 'stockcount', response.data);
            }
          }).catch((error) => {
            console.log(error)
          })
        }
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
