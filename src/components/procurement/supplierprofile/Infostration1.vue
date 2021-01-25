<template>
  <div id="registration">
    <el-breadcrumb>
      <el-breadcrumb-item>采购管理</el-breadcrumb-item>
      <el-breadcrumb-item>供应商档案管理</el-breadcrumb-item>
      <el-breadcrumb-item>供应商档案登记</el-breadcrumb-item>
    </el-breadcrumb>

    <div id="out">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="220px" class="demo-ruleForm">
        <div id="butt">
          <el-form-item>
            <div id="butt2">
              <el-button type="success" plain size="medium" @click="submitForm">立即创建</el-button>
              <el-button type="danger" plain size="medium" @click="resetForm">重置</el-button>
            </div>
          </el-form-item>
        </div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>主信息</span>
          </div>
          <el-form-item label="供应商名称" prop="supplierName">
            <el-input v-model="ruleForm.supplierName"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="ruleForm.supplierAddress"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="classify">
            <el-cascader v-model="ruleForm.classify" clearable ref="cascader" :options="options" :props="SetKesDept"
              @change="handleChange"></el-cascader>
          </el-form-item>
          <el-form-item label="所在区域" prop="supplierArea">
            <el-select v-model="ruleForm.supplierArea" placeholder="所在区域">
              <el-option label="中国" value="中国"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商曾用名">
            <el-input v-model="ruleForm.supplierUsedname"></el-input>
          </el-form-item>
          <el-form-item label="开户银行">
            <el-input v-model="ruleForm.supplierOpenAccount"></el-input>
          </el-form-item>
          <el-form-item label="银行账号">
            <el-input v-model="ruleForm.supplierBankaccount"></el-input>
          </el-form-item>
          <el-form-item label="网址">
            <el-input v-model="ruleForm.supplierUrl"></el-input>
          </el-form-item>
          <el-form-item label="优质级别" prop="supplierQualityRank">
            <el-select v-model="ruleForm.supplierQualityRank" placeholder="档次级别">
              <el-option label="高档" value="高档"></el-option>
              <el-option label="中档" value="中档"></el-option>
              <el-option label="低档" value="低档"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="ruleForm.supplierPhone"></el-input>
          </el-form-item>
          <el-form-item label="传真">
            <el-input v-model="ruleForm.supplierFax"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码">
            <el-input v-model="ruleForm.supplierPostalcode"></el-input>
          </el-form-item>

        </el-card>
        <br />
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>联系人信息</span>
          </div>
          <el-form-item label="第一联系人">
            <el-input v-model="linkman.man1.linkmanName"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="linkman.man1.linkmanSector"></el-input>
          </el-form-item>
          <el-form-item label="职务">
            <el-input v-model="linkman.man1.linkmanPost"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="linkman.man1.linkmanPhone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="linkman.man1.linkmanEmail"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="linkman.man1.linkmanSex"></el-input>
          </el-form-item>
          <el-form-item label="第二联系人">
            <el-input v-model="linkman.man2.linkmanName"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="linkman.man2.linkmanSector"></el-input>
          </el-form-item>
          <el-form-item label="职务">
            <el-input v-model="linkman.man2.linkmanPost"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="linkman.man2.linkmanPhone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="linkman.man2.linkmanEmail"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="linkman.man2.linkmanSex"></el-input>
          </el-form-item>
        </el-card>
        <br />
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>动态信息</span>
          </div>
          <el-form-item label="登记人">
            <el-input v-model="ruleForm.supplierRegistrant" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="登记时间">
            <!-- <el-input v-model="ruleForm.supplierRegistrationtime"></el-input> -->
            <span>{{ruleForm.supplierRegistrationtime}}</span>
          </el-form-item>
          <el-form-item label="采购人">
            <el-input v-model="ruleForm.supplierBuyer"></el-input>
          </el-form-item>
          <el-form-item label="采购时间">
            <el-input v-model="ruleForm.supplierBuyerNo"></el-input>
          </el-form-item>
        </el-card>

      </el-form>
    </div>

  </div>
</template>

<script scoped>
  export default {
    mounted() {
      alert("safd");
      this.selectOptions();
      this.time();
    },
    data() {
      /* let that = this; */
      return {
        options: [],
        //联动菜单
       /* SetKesDept: { //联动菜单配置
          value: 'id',
          label: 'kindName',
          lazy: true,
          async lazyLoad(node, resolve) {
            const {
              level,
              data
            } = node;
            let id;
            if (data) {
              id = data.id;
            }
            if (data) {
              const temp = await that.getSta(id);
              temp.forEach(item => {
                item.value = item.id;
                item.label = item.kindName;
                item.leaf = level >= 2;
              })
              resolve(temp);
            }
          }
        },
 */
        ruleForm: {
          supplierNo: null,
          supplierName: '', //供应商名称
          supplierAddress: '', //供应商地址
          supplierQualityRank: '', //优质级别
          classify: '',
          firstKindId: '', // '产品I级分类ID
          firstKindName: '', //'产品I级分类名称
          secondKindId: '', //'产品II级分类ID
          secondKindName: '', //产品II级分类名称
          thirdKindId: '', //'产品III级分类ID
          thirdKindName: '', //产品III级分类名称
          supplierArea: '', //所在区域
          supplierUsedname: '', //供应商曾用名
          supplierOpenAccount: '', //开户银行
          supplierBankaccount: '', //银行账号
          supplierUrl: '', //网址
          supplierPhone: '', //电话
          supplierFax: '', //传真
          supplierPostalcode: '', //邮政编码
          supplierRegistrant: this.val[0].userName, //登记人
          supplierRegistrationtime: '', //登记时间
          supplierBuyer: '', //采购人
          supplierBuyerNo: '', //采购人编号
          checkMark: '未审核' //审核标志
        },
        linkman: {
          man1: [{
            linkmanName: '',
            linkmanSector: '',
            linkmanPost: '',
            linkmanPhone: '',
            linkmanEmail: '',
            linkmanSex: ''
          }],
          man2: [{
            linkmanName: '',
            linkmanSector: '',
            linkmanPost: '',
            linkmanPhone: '',
            linkmanEmail: '',
            linkmanSex: ''
          }],
        },
        val: [{
          userName: '',
        }],
        rules: {
          supplierName: [{
            required: true,
            message: '请填写供应商名称',
            trigger: 'blur'
          }],
          supplierPhone: [{
            required: true,
            message: '请输入电话',
            trigger: 'blur'
          }],
          classify: [{
            required: true,
            message: '请选分类',
            trigger: 'blur'
          }],
          supplierArea: [{
            required: true,
            message: '请选择所在区域',
            trigger: 'change'
          }],
          /*type: [{
          	required: true,
          	message: '请选择产品用途',
          	trigger: 'change'
          }],
          listPrice: [{
          	required: true,
          	message: '请填写市场单价',
          	trigger: 'blur'
          }],
          realCostPrice: [{
          	required: true,
          	message: '请填写成本单价',
          	trigger: 'blur'
          }],
          costPrice: [{
          	required: true,
          	message: '请填写计划成本单价',
          	trigger: 'blur'
          }] */
        },
        classification: []
      }
    },
    methods: {
      /* async getSta(id) { //懒加载联动数据
        const data = await this.$http.post(
            "http://localhost:8080/Erp-web/config-file-kind/selectAllConfigFileKind.do",
            "pId=" + id)
          .then((res) => {
            return res.data;
          })
          .catch((res) => {
            console.log(res)
          })
        return data;
      }, */
      selectOptions() { //页面加载执行的获取联动数据的一级分类
        this.$http.post("http://localhost:8080/Erp-web/config-file-kind/selectAllConfigFileKind.do")
          .then(res => {
            this.options = res.data;
          })
          .catch(err => {
            console.log(err)
          })
      },
      submitForm() {

        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$http.post(this.$api + "/supplierfiles/insert.do", this.$qs.stringify(this.ruleForm))
              .then(res => {
                if (res.data < 0) {
                  this.$message({
                    message: '创建成功！',
                    type: 'success'
                  });

                }
              })
              .catch(err => {
                console.log("添加失败" + err);
              });
            this.$http.post(this.$api + "/linkman/insert.do", this.$qs.stringify(this.linkman))
              .then(res => {
                if (res.data == 2) {
                  this.$message({
                    message: '创建成功！',
                    type: 'success'
                  });

                }
              })
              .catch(err => {
                console.log("添加失败" + err);
              });
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$nextTick(() => {
          this.$refs.ruleForm.resetFields();
          this.ruleForm = {};

        })
      },
      handleChange() {
        var value = this.$refs['cascader'].getCheckedNodes()[0].path;
        var label = this.$refs['cascader'].getCheckedNodes()[0].pathLabels;
        this.ruleForm.firstKindId = value[0];
        this.ruleForm.secondKindId = value[1];
        this.ruleForm.thirdKindId = value[2];

        this.ruleForm.firstKindName = label[0];
        this.ruleForm.secondKindName = label[1];
        this.ruleForm.thirdKindName = label[2];
      },
      time() {
        alert("sdaf")
        var aData = new Date();
        this.ruleForm.supplierRegistrationtime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
        this.val = JSON.parse(window.sessionStorage.getItem("val"));
        console.log(this.ruleForm);
      }
    }

  }
</script>

<style scoped>
  #registration {
    color: #2c3e50;
    margin-top: 20px;
  }

  .el-cascader,
  .el-select {
    width: 206.4px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    margin: 0px;
  }

  #out {
    width: 100%;
    margin: 0 auto;

  }

  .el-form {
    margin: 0 auto;
    width: 100%;
  }

  #butt {
    width: 200px;
    float: right;
  }
</style>
