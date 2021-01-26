<template>
  <!-- 采购管理--采购计划管理--采购计划审核 -->
  <div id="box">
        <div id="head">
        	<el-breadcrumb separator="/">
        		<el-breadcrumb-item>采购管理</el-breadcrumb-item>
        		<el-breadcrumb-item>采购计划管理</el-breadcrumb-item>
        		<el-breadcrumb-item>采购计划审核</el-breadcrumb-item>
        	</el-breadcrumb>
        </div>

        <div id="card">
        	<el-card class="box-card">
        		<div style="padding-bottom: 10px; ">

        			<span style="font-size: 20px; color: #6275A6;">采购计划审核</span>

        			<br />
        			<span style="font-size: 12px; color: #C6C6C9;">当前等待审核的采购计划总数 :({{number}})例</span>
        		</div>
        		<div id="table" style="">
        			<el-table id="" :data="tableData" border stripe style="width: 100%" stripe>
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
        				<el-table-column label="审核">
        					<template slot-scope="scope">
        						<el-button @click="reviewButton(scope.$index,scope.row)" size="mini" type="success" plain>审核</el-button>
        					</template>
        				</el-table-column>
        			</el-table>
        		</div>

        		<div style="margin: 10px auto; width: 550px;">
        			<el-pagination background :current-page.sync="currentPage1" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
        			</el-pagination>
        		</div>

        	</el-card>
        </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.selectAllbycheck();
    },
  	data() {
  		return {
  			number:0,
  			tableData: [],
  			input: '',
  			currentPage1:1
  		}
  	},
  	methods: {
  		reviewButton(index,row){
        this.$router.push({
        	path: '/review2',query:{row:row}
        });
  		},
      selectAllbycheck(){
        this.$http.post(this.$api+"/purchaseqplan/selectAllbycheck")
        	.then( res => {
        	//alert("a");
                    this.tableData = res.data;
                    this.number=this.tableData.length;
                 })
        	.catch(err =>{
        		console.log(err)
        	})
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
