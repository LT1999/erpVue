<template>
  <!-- 采购管理--采购计划管理--采购计划查询 -->
  <div id="box">
      <div id="head">
      	<el-breadcrumb separator="/">
      		<el-breadcrumb-item>采购管理</el-breadcrumb-item>
      		<el-breadcrumb-item>采购计划管理</el-breadcrumb-item>
      		<el-breadcrumb-item>采购计划查询</el-breadcrumb-item>
      	</el-breadcrumb>
      </div>
      <br />
      <el-divider></el-divider>
      <div id="sel">
        <el-card class="box-card">
          <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="请输入计划单编号:">
                 <el-input  type="text" v-model="formInline.bh"></el-input>
              </el-form-item>
              <el-form-item label="请输入关键字:">
                 <el-input  type="text" v-model="formInline.gjz"></el-input>
              </el-form-item>
              <el-form-item label="请选择计划状态:">
                <el-select v-model="formInline.zt" placeholder="请选择">
                  <el-option label="等待" value="等待"></el-option>
                  <el-option label="未通过" value="未通过"></el-option>
                  <el-option label="通过" value="通过"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="请输入登记时间">
                <el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期"
                  end-placeholder="结束日期"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
      <div>
      	<span>
      	当前推荐单总数：{{num1}}例
      	</span>
      </div>
      <br />
      <div>
         <el-card class="box-card">
              <div>
              	<el-table :data="tableData" style="width: 100%">
              		<el-table-column prop="purchaseqNo" label="采购计划编号">
              		</el-table-column>
              		<el-table-column prop="purchaseqTotalquantity" label="采购总数">
              		</el-table-column>
              		<el-table-column prop="purchaseqTotalprices" label="采购总价">
              		</el-table-column>
              		<el-table-column prop="purchaseqRegistrant" label="登记人">
              		</el-table-column>
              		<el-table-column prop="purchaseqRegistranttime" label="登记时间">
              		</el-table-column>
              		<el-table-column prop="purchaseqRemark" label="备注">
              		</el-table-column>
                  <el-table-column prop="checkMark" label="审核标志">
                  </el-table-column>
              	</el-table>
              </div>
         </el-card>
      </div>

  </div>
</template>

<script>
  export default {
    created() {
     this.selectAll();
    },
    data() {
      return {
        num1:1,
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
        currentPage4: 1,
        formInline:{
          ly: '',
          time: '',
          bh:'',
          gjz:'',
          zt:''
        },
        tableData: []

      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      selectAll(){
        this.$http.post(this.$api+"/purchaseqplan/selectAll")
        	.then( res => {
                    this.tableData = res.data;
                    this.num1=this.tableData.length;
                 })
        	.catch(err =>{
        		console.log(err)
        	})
      }
    }
  }
</script>

<style>
</style>
