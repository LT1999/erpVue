<template>
  <div id="app">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">库存管理</el-breadcrumb-item>
        <el-breadcrumb-item>入库管理</el-breadcrumb-item>
        <el-breadcrumb-item>入库登记</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <div id="sel">
      <el-card class="box-card">
        <div>
          <el-form :inline="true" :model="formInline"  ref="formInline" class="demo-form-inline">
            <el-form-item label="请选择入库理由:">
              <el-select v-model="formInline.ly" placeholder="请选择">
                <el-option label="生产入库" value="生产入库"></el-option>
                <el-option label="采购入库" value="采购入库"></el-option>
                <el-option label="委外入库" value="委外入库"></el-option>
                <el-option label="内部调入" value="内部调入"></el-option>
                <el-option label="内部调出" value="内部调出"></el-option>
                <el-option label="库存初始" value="库存初始"></el-option>
                <el-option label="赠送" value="赠送"></el-option>
                <el-option label="内部借领" value="内部借领"></el-option>
                <el-option label="其他借领" value="其他借领"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="请选择建档时间">
              <el-date-picker v-model="formInline.time"  type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">搜索</el-button>
              <el-button type="primary" @click="">开始</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <br />
    <div>
      <el-card class="box-card">
        <div>
          <el-table :data="tableData"  style="width: 100%">
            <el-table-column prop="gatherId" label="入库单编号" width="200"></el-table-column>
            <el-table-column prop="reason" label="入库理由" width="180"></el-table-column>
            <el-table-column prop="reasonexact" label="入库详情理由" width="180"></el-table-column>
            <el-table-column prop="registerTime" label="登记时间" width="180"></el-table-column>
            <el-table-column prop="amountSum" label="总件数" width="180"></el-table-column>
            <el-table-column prop="costPriceSum" label="总金额(元)" width="180"></el-table-column>
            <el-table-column label="入库登记">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="handleEdit(scope.$index,scope.row)">入库登记</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
            :page-sizes="[3, 5, 8]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="1">
          </el-pagination>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
  export default {
    created() {
      this.selectcheckTag();
    },
    data() {
      return {
        currentPage4: 4,
        formInline: {
          ly: '',
          time: ''
        },
        tableData: []
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      selectcheckTag(){
        this.$http.post("http://localhost:8080/Erp-web/gather/selectGathertag.do")
        	.then( res => {
                    this.tableData = res.data;
                 })
        	.catch(err =>{
        		console.log(err)
        	})
      },
      handleEdit(index,row){
        this.$router.push({
        	path: '/ruku2',query:{id:row.id,gatherId:row.gatherId,storer:row.storer,register:row.register,remark:row.remark,attemper:row.attemper,attemperTime:row.attemperTime,
          reason:row.reason,registerTime:row.registerTime,amountSum:row.amountSum,costPriceSum:row.costPriceSum}
        });
      }
    }
  }
</script>


  <style scoped>
  	#box {
  		height: 100%;
  	}

  	#place {
  		font-size: 15px;
  		color: blue;
  	}

  	.text {
  		font-size: 14px;
  	}
  	#box>>>.el-table th {
  		text-align: center;
  	}

  	#box>>>.el-table td {
  		padding: 0px;
  		height: 50px;
  		line-height: 50px;
  		text-align: center;
  	}

  	#card {
  		margin-top: 30px;
  		/*margin-left: 3%;*/
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
  		width: 100%
  	}

  	.el-table .warning-row {
  		background: oldlace;
  	}

  	.el-table .success-row {
  		background: oldlace;
  	}

  	.el-table td,
  	.el-table th {
  		text-align: center;
  	}

  	#box>>>.el-card__body {
  		padding: 30px;
  	}
  </style>
