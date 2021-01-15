<template>
  <div id="box">
    <div id="head">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>库存管理</el-breadcrumb-item>
        <el-breadcrumb-item>出库管理</el-breadcrumb-item>
        <el-breadcrumb-item>出库登记复核</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div id="card">
      <el-form ref="form" :model="form" label-width="130px">
        <div id="buttons">
          <el-button size="mini" type="primary" plain @click="onSubmit">复核通过</el-button>
          <el-button size="mini" type="primary" plain @click="back()">返回</el-button>
        </div>
        <el-card class="box-card">
          <h3>出库申请单</h3><br />
          <el-row>
            <el-col :span="8" :push='1'>
              <el-form-item label="出库单编号">
                <span>{{this.$route.query.payId}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push='5'>
              <el-form-item label="出库理由">
                <span>{{this.$route.query.reason}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="5" :push='1'>
              <el-form-item label="出库详细理由">
                <span>{{this.$route.query.reasonexact}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <template>
            <el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
              <el-table-column prop="productId" label="产品编号" width="180px">
              </el-table-column>
              <el-table-column prop="productName" label="产品名称">
              </el-table-column>
              <el-table-column prop="bankname" label="库房名称">
              </el-table-column>
              <el-table-column prop="storeaddress" label="存放地址">
              </el-table-column>
              <el-table-column prop="amount" label="应出库件数">
              </el-table-column>
              <el-table-column prop="paidAmount" label="已出库件数">
              </el-table-column>
              <el-table-column label="本次出库数量">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.amount" clearable>
                  </el-input>
                </template>
              </el-table-column>
            </el-table>
          </template>

          <el-row>
            <el-col :span="8" :push='1'>
              <el-form-item label="应出库总件数">
                <span>{{this.$route.query.amountSum}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push='5'>
              <el-form-item label="已出库总件数">
                <span>{{this.shu}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :push='1'>
              <el-form-item label="应出库总金额">
                <span>{{this.$route.query.costPriceSum}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push='5'>
              <el-form-item label="已出库总金额">
                <span>{{this.zong}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8" :push='1'>
              <el-form-item label="审核人">
               <el-input v-model="form.checker" clearable>
               </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :push='5'>
              <el-form-item label="审核时间">
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
      this.form.id = this.$route.query.id;
      this.form.reasonexact = this.$route.query.reasonexact;
      this.selectPayDetailsAll();
    },
    data() {
      return {
        zong: 0,
        shu: 0,
        bankname: '成品库 ', //库房名称
        storeaddress: '电子-计算机-服务器', //存放地址

        form: {
          id: 0,
          checkTag: '', //审核标志
          paidAmountSum: 0,
          reasonexact: '',
          checker:'',
          checkTime:''
        },
        tableData: [],
        datas: {}
      };
    },
    methods: {
      onSubmit() {
        this.form.checkTag = "审核通过";
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].paidAmount = this.tableData[i].amount; //出库明细表实际出库总数
          this.form.paidAmountSum += parseInt(this.tableData[i].paidAmount); //实际出库总数
        }

        this.$set(this.datas, 'pay', this.form);
        this.$set(this.datas, 'payDetails', this.tableData);
        console.log(this.datas);
        this.$http.post("http://localhost:8080/Erp-web/pay/updatePayPaidAmount.do", this.$qs.stringify(this.datas, {
            arrayFormat: 'payDetails',
            allowDots: true
          }))
          .then(res => {
            //console.log(this.formInline.productName);
            if (res.status == 200) {
              this.$message({
                message: '审核成功！',
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
      back() {
        location.href = "#/Outbankregister"
      },
      selectPayDetailsAll() {
        var aData = new Date();
        this.form.checkTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
        var demo = new URLSearchParams()
        demo.append("prid", this.form.id);
        this.$http.post('http://localhost:8080/Erp-web/pay-details/selectPayDetails.do', demo).then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            this.$set(response.data[i], 'bankname', this.bankname);
            this.$set(response.data[i], 'storeaddress', this.storeaddress);
          }
          this.tableData = response.data;
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].paidAmount == null) {
              this.tableData[i].paidAmount = 0;
            }
            this.shu += this.tableData[i].paidAmount;
            this.zong += this.tableData[i].paidAmount * this.tableData[i].costPrice;
          }
        }).catch((error) => {
          console.log(error)
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
