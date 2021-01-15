<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">库存管理</el-breadcrumb-item>
				<el-breadcrumb-item>
					<a href="/">入库管理</a>
				</el-breadcrumb-item>
				<el-breadcrumb-item>入库查询</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :model="form" label-width="130px">
				<div id="buttons">
					<el-button type="primary" @click="">打印</el-button>
					<el-button type="primary" @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>入库单</h3><br />

					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="入库单编号">
								<span>{{this.$route.query.gatherId}}</span>
							</el-form-item>
						</el-col>

					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="入库理由">
								<span>{{this.$route.query.reason}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='6'>
							<el-form-item label="入库详细理由">
								<span>{{this.$route.query.reasonexact}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<template>
							<el-table :data="tableData" style="margin-left: 8%; width: 80%;" border>
								<el-table-column prop="productName" label="产品名称 ">
								</el-table-column>
								<el-table-column prop="productId" label="产品编号 " width="180px">
								</el-table-column>
								<el-table-column prop="materialtype" label="库房名称">
								</el-table-column>
								<el-table-column prop="amount" label="应入库数量  ">
								</el-table-column>
								<el-table-column prop="amount" label="已入库数量">
								</el-table-column>
								<el-table-column prop="subtotal" label="应入库小计">
								</el-table-column>
								<el-table-column prop="subtotal" label="已入库小计">
								</el-table-column>
								<el-table-column label="操作">
									<template slot-scope="scope">
											<el-button @click="chakan(scope.row)" size="mini" type="success" plain>查看</el-button>
									</template>
								</el-table-column>
							</el-table>
						</template>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="应入库总件数">
								<span>{{this.$route.query.amountSum}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="应入库总金额">
								<span>{{this.$route.query.costPriceSum}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="已入库总件数">
								<span>{{this.$route.query.amountSum}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="已入库总金额">
								<span>{{this.$route.query.costPriceSum}}</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8" :push='1'>
							<el-form-item label="复核人 ">
								<span>{{this.$route.query.checker}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8" :push='7'>
							<el-form-item label="复核时间">
								<span>{{this.$route.query.checkTime}}</span>
							</el-form-item>
						</el-col>
					</el-row>
				</el-card>
			</el-form>
		</div>
		<el-drawer title="入库单明细" :visible.sync="drawer" :with-header="false" :size="size">
			<el-table :data="gridData">
				<template>
					<el-table-column property="id" label="序号 "></el-table-column>
					<el-table-column property="name" label="库房名称"></el-table-column>
					<el-table-column property="describe" label="存储地址编号"></el-table-column>
					<el-table-column prop="materialprice" label="入库时间 "></el-table-column>
					<el-table-column property="name" label="本次入库数量"></el-table-column>
					<el-table-column property="describe" label="本次入库成本"></el-table-column>
					<el-table-column prop="materialprice" label="序列号集合 "></el-table-column>
				</template>
			</el-table>
			<br />
			<el-button @click="drawer=false"style="float: right;margin-right: 20px;">关闭窗口</el-button>
		</el-drawer>
	</div>
</template>

<script>
	export default {
    created() {
      this.selectGather();
    },
		data() {
			return {
        materialtype:'成品库',
        id:0,
				//抽屉
				drawer: false,
				size: "900px",
				//抽屉table
				gridData: [],//抽屉
				form: {},
				tableData: []//表格
			};
		},
		methods: {
			//查看
			chakan(row) {
				this.drawer = true;
			},
			//返回
			back() {
				location.href = "#/WarehouseQueries"
			},
      selectGather(){
        this.id=this.$route.query.id;
        var demo = new URLSearchParams()
        demo.append("prid", this.id);
        this.$http.post('http://localhost:8080/Erp-web/gather-details/selectGather.do', demo).then((response) => {
        						for(var i=0;i<response.data.length;i++){
                      this.$set(response.data[i],"materialtype",this.materialtype);
                    }
                    this.tableData = response.data;
        				}).catch((error) => {
        					console.log(error)
        				})
      }
		}
	}
</script>

<style scoped>
	.box-card {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		padding-bottom: 23px;
	}

	#buttons {
		float: right;
		margin-right: 50px;
		margin-bottom: 5px;
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

	#box>>>.el-table td,
	.el-table th {
		padding: 0px 0;
	}
</style>
