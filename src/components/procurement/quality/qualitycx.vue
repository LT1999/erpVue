<template>
	<!--采购管理--采购质量控制管理--质检结果查询 -->
	<div id="app">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>采购管理</el-breadcrumb-item>
				<el-breadcrumb-item>采购质量控制管理</el-breadcrumb-item>
				<el-breadcrumb-item>质检结果查询</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<br />
		<el-divider></el-divider>

		<!-- <div id="sel">
        <el-card class="box-card">
          <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="执行单编号:">
                 <el-input  type="text" v-model="formInline.bh"></el-input>
              </el-form-item>
              <el-form-item label="关键字:">
                 <el-input  type="text" v-model="formInline.gjz"></el-input>
              </el-form-item>
              <el-form-item label="执行单状态:">
                <el-select v-model="formInline.zt" placeholder="请选择">
                  <el-option label="等待" value="等待"></el-option>
                  <el-option label="未通过" value="未通过"></el-option>
                  <el-option label="通过" value="通过"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="执行单登记时间">
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
      	其中等待质检的执行单总数：{{num1}}例, 其中正在质检的执行单总数：{{num2}}例, 其中质检完成的执行单总数：{{num3}}例
      	</span>
      </div>
      <br /> -->
		<div>
			<el-card class="box-card">
				<div>
					<el-table :data="tableData" style="width: 100%">
						<el-table-column prop="purchaseqNo" label="执行单编号">
						</el-table-column>
						<el-table-column prop="productNo" label="产品编号">
						</el-table-column>
						<el-table-column prop="productName" label="产品名称">
						</el-table-column>
						<el-table-column prop="purchaseQuantity" label="采购数量">
						</el-table-column>
						<el-table-column prop="qualifiedQuantity" label="已收合格数量">
							<template slot-scope="scope">
								<span v-if="scope.row.qualifiedQuantity == '' || scope.row.qualifiedQuantity==null">
									0
								</span>
								<span v-else>
									{{scope.row.qualifiedQuantity}}
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="amountSum" label="未收数量" :formatter="Unreceived">
						</el-table-column>
						<el-table-column prop="amountSum" label="质检状态">
							<template slot-scope="scope">
								<span v-if="scope.row.qualifiedQuantity == scope.row.purchaseQuantity">
									质检完成
								</span>
								<span v-else>
									质检进行中
								</span>
							</template>
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
			// this.selectPayTag();
		},
		data() {
			return {
				/* num1:1,
				num2:2,
				num3:3,
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
				}, */
				tableData: []

			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			initialize() {
				this.$http.post(this.$api + "/purchase/selectAll")
					.then(res => {
						this.tableData = res.data;
					})
					.catch(err => {
						console.log(err)
					})
			},
			Unreceived(row) {
				return parseInt(row.purchaseQuantity) - row.qualifiedQuantity;
			}
		},
		mounted() {
			this.initialize();
		}
	}
</script>

<style>
</style>
