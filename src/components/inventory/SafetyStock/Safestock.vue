<template>

	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>库存管理</el-breadcrumb-item>
				<el-breadcrumb-item>安全库存配置管理</el-breadcrumb-item>
				<el-breadcrumb-item>安全库存配置单复核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div id="card">
			<el-card class="box-card">
				<div style="padding-bottom: 10px; ">
					<span style="font-size: 20px; color: #6275A6;">安全库存配置单复核</span>

					<br />
					<span style="font-size: 12px; color: #C6C6C9;">当前等待复核的配置单总数 :({{number}})例</span>
				</div>
				<div id="table" style="">
					<el-table id="" :data="tableData" border stripe style="width: 100%" stripe>
						<el-table-column prop="id" label="配置单编号" width="200px">
						</el-table-column>
						<el-table-column prop="productId" label="产品编号" width="200px">
						</el-table-column>
						<el-table-column prop="productName" label="产品名称">
						</el-table-column>
						<el-table-column prop="productfile.type" label="用途类型">
						</el-table-column>
						<el-table-column prop="firstKindName" label="I级分类">
						</el-table-column>
						<el-table-column prop="secondKindName" label="II级分类">
						</el-table-column>
						<el-table-column prop="thirdKindName" label="III级分类">
						</el-table-column>
						<el-table-column prop="registerTime" label="登记时间" width="180px">
						</el-table-column>
						<el-table-column prop="review" label="复核">
							<template slot-scope="scope">
								<el-button @click="reviewButton(scope.$index,scope.row)" size="mini" type="success" plain>复核</el-button>
              </template>
						</el-table-column>
					</el-table>
				</div>

				<div style="margin: 10px auto; width: 550px;">
					<el-pagination background :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
					</el-pagination>
				</div>

			</el-card>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				number: '',
				tableData: [],
				input: '',
				currentPage1: 5,
				currentPage2: 5,
				currentPage3: 5,
				currentPage4: 4
			}
		},
    mounted() {
      this.selectCount();
      this.selectSafestock();
    },
		methods: {
			reviewButton(index,row){
				this.$router.push({
					path: '/Safestock-info',query:{id:row.id,productId:row.productId,productName:row.productName}
				});
			},
      selectSafestock(){
        this.$http.post("http://localhost:8080/Erp-web/cell/selectSafestock.do")
          		.then(res => {
          			this.tableData=res.data;
          		})
          		.catch(err =>{
          			console.log(err)
          		})
      },
      selectCount(){
        this.$http.post("http://localhost:8080/Erp-web/cell/selectCount.do")
          		.then(res => {
          			this.number=res.data;
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
	.el-table td, .el-table th {
            text-align: center;
        }
    #box>>>.el-card__body {
    	padding:30px;
    }
</style>
