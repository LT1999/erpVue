<template>
	<div id="box">
		<el-breadcrumb style="margin-bottom: 20px;">
			<el-breadcrumb-item>产品设计</el-breadcrumb-item>
			<el-breadcrumb-item>
				产品档案管理
			</el-breadcrumb-item>
			<el-breadcrumb-item>产品档案查询</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- <el-card shadow="always"> -->
		<el-row style="margin-bottom: 10px;">
			<el-col :span="2" :push="22">
				<el-button type="primary" size="medium" @click="back()">返回</el-button>
			</el-col>
		</el-row>

		<div id="body">
			<el-tabs type="border-card">

				<el-tab-pane label="主信息">
					<div slot="header" class="clearfix">
						<span>主要信息</span>
					</div>
					<div>
						<el-form ref="form" :model="form" label-width="150px">
							<table align="center">
								<tr>
									<td>
										<el-form-item label="档案编号">
											<el-input style="width:350px;" readonly="readonly" v-model="form.productId" disabled></el-input>
										</el-form-item>
									</td>

								</tr>
								<tr>
									<td>
										<el-form-item label="产品名称">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.productName" disabled></el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="制造商">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.factoryName" disabled></el-input>
										</el-form-item>
									</td>
								</tr>

								<tr>
									<td>
										<el-form-item label="产品分类">
											<el-input v-model="form.classify" disabled style="width:350px;" :options="options"></el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="产品简称">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.productNick" disabled></el-input>
										</el-form-item>
									</td>
								</tr>
								<tr>
									<td>
										<el-form-item label="用途类型">
											<el-input v-model="form.type" style="width:  350px;" disabled clearable>
											</el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="档次级别">
											<el-input v-model="form.productClass" style="width:  350px;" disabled clearable>
											</el-input>
										</el-form-item>
									</td>
								</tr>

								<tr>
									<td>
										<el-form-item label="计量单位">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.personalUnit" disabled></el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="计量值">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.personalValue" disabled></el-input>
										</el-form-item>
									</td>
								</tr>

								<tr>
									<td>
										<el-form-item label="市场单价(元)">
											<template>
												<el-input-number style="width:  350px;" disabled v-model="form.listPrice" :precision="2" :step="0.1"
												 :max="100000"></el-input-number>
											</template>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="计划成本单价">
											<el-input-number style="width:  350px;" disabled v-model="form.realCostPrice" :precision="2" :step="0.1" :max="100000"></el-input-number>
										</el-form-item>
									</td>
								</tr>
							</table>
						</el-form>
					</div>
				</el-tab-pane>
				<el-tab-pane label="辅助信息">
					<div slot="header" class="clearfix">
						<span>辅助信息</span>
					</div>
					<div style="padding-top: 20px;">
						<el-form ref="form" :model="form" label-width="150px">
							<table align="center">
								<tr>
									<td>
										<el-form-item label="保修期">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.warranty" disabled></el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="替代品名称">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.twinName" disabled></el-input>
										</el-form-item>
									</td>
								</tr>
								<tr>
									<td>
										<el-form-item label="替代品编号">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.twinId" disabled></el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="生命周期(年)">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.lifecycle" disabled></el-input>
										</el-form-item>
									</td>
								</tr>
								<tr>
									<td>
										<el-form-item label="单位">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.amountUnit" disabled></el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="产品描述">
											<el-input type="producttextarea" disabled readonly="readonly" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.productDescribe">
											</el-input>
										</el-form-item>
									</td>
								</tr>
								<tr>
									<td>
										<el-form-item label="产品经理">
											<el-input v-model="form.responsiblePerson" disabled style="width:  350px;">
											</el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="登记人">
											<el-input style="width:  350px;"disabled v-model="form.register"></el-input>
										</el-form-item>
									</td>
								</tr>

								<tr>
									<td>
										<el-form-item label="复核人">
												<el-input style="width:  350px;" disabled  v-model="form.checker" ></el-input>
										</el-form-item>
									</td>
									<td>

										<el-form-item label="复核时间">
											<el-input style="width:  350px;" v-model="form.checkTime" disabled></el-input>
										</el-form-item>
									</td>
								</tr>
								<tr>
									<td>
										<el-form-item label="供应商集合">
											<el-input type="textarea" disabled :autosize="{ minRows: 3, maxRows: 6}" readonly="readonly" v-model="form.providerGroup">
											</el-input>
										</el-form-item>
									</td>
								</tr>
							</table>
						</el-form>
					</div>
				</el-tab-pane>
				<el-tab-pane label="全部信息">
					<div slot="header" class="clearfix">
						<span>主要信息</span>
					</div>
					<div>
						<el-form ref="form" :model="form" label-width="150px">
							<table align="center">
								<tr>
									<td>
										<el-form-item label="档案编号">
											<el-input style="width:350px;" readonly="readonly" disabled v-model="form.productId"></el-input>
										</el-form-item>
									</td>

								</tr>
								<tr>
									<td>
										<el-form-item label="产品名称">
											<el-input style="width:  350px;" readonly="readonly" disabled v-model="form.productName" clearable></el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="制造商">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.factoryName" disabled></el-input>
										</el-form-item>
									</td>
								</tr>

								<tr>
									<td>
										<el-form-item label="产品分类">
											<el-input v-model="form.classify" disabled style="width:350px;" :options="options"></el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="产品简称">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.productNick" disabled></el-input>
										</el-form-item>
									</td>
								</tr>
								<tr>
									<td>
										<el-form-item label="用途类型">
											<el-input v-model="form.type" disabled style="width:  350px;" clearable>
											</el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="档次级别">
											<el-input disabled v-model="form.productClass" style="width:  350px;" clearable >
											</el-input>
										</el-form-item>
									</td>
								</tr>

								<tr>
									<td>
										<el-form-item label="计量单位">
											<el-input style="width:  350px;" v-model="form.personalUnit" readonly="readonly" disabled></el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="计量值">
											<el-input style="width:  350px;" v-model="form.personalValue" readonly="readonly" disabled></el-input>
										</el-form-item>
									</td>
								</tr>

								<tr>
									<td>
										<el-form-item label="市场单价(元)">
											<template>
												<el-input-number style="width:  350px;" disabled v-model="form.listPrice" :precision="2" :step="1"
												 :max="100000"></el-input-number>
											</template>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="计划成本单价">
											<el-input-number style="width:  350px;" v-model="form.realCostPrice" :precision="2" :step="1" :max="100000"
											 disabled></el-input-number>
										</el-form-item>
									</td>
								</tr>
							</table>
						</el-form>
					</div>
					<div slot="header" class="clearfix">
						<span>辅助信息</span>
					</div>
					<div style="padding-top: 20px;">
						<el-form ref="form" :model="form" label-width="150px">
							<table align="center">
								<tr>
									<td>
										<el-form-item label="保修期">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.warranty" disabled></el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="替代品名称">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.twinName" disabled></el-input>
										</el-form-item>
									</td>
								</tr>
								<tr>
									<td>
										<el-form-item label="替代品编号">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.twinId" disabled></el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="生命周期(年)">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.lifecycle" disabled></el-input>
										</el-form-item>
									</td>
								</tr>
								<tr>
									<td>
										<el-form-item label="单位">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.amountUnit" disabled></el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="产品描述">
											<el-input type="producttextarea" disabled readonly="readonly" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.productDescribe">
											</el-input>
										</el-form-item>
									</td>
								</tr>
								<tr>
									<td>
										<el-form-item label="产品经理">
											<el-input v-model="form.responsiblePerson" disabled style="width:  350px;" clearable>
											</el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item label="登记人">
											<el-input style="width:  350px;" readonly="readonly" v-model="form.register" disabled></el-input>
										</el-form-item>
									</td>
								</tr>

								<tr>
									<td>
										<el-form-item label="复核人">
											<template>
												<el-input style="width:  350px;" readonly="readonly" v-model="form.checker" disabled></el-input>
											</template>
										</el-form-item>
									</td>
									<td>

										<el-form-item label="复核时间">
											<el-input style="width:  350px;" v-model="form.checkTime" :disabled="true" readonly="readonly"
											 clearable></el-input>
										</el-form-item>
									</td>
								</tr>
								<tr>
									<td>
										<el-form-item label="供应商集合">
											<el-input type="textarea" readonly="readonly" disabled :autosize="{ minRows: 3, maxRows: 6}" v-model="form.providerGroup">
											</el-input>
										</el-form-item>
									</td>
								</tr>
							</table>
						</el-form>
					</div>
				</el-tab-pane>

			</el-tabs>
		</div>
		<!-- </el-card> -->
	</div>
</template>

<script scoped>
	export default {
		data() {
			return {
				//分类
				options: [],
				//表单
				form: {}
			}
		},
		methods: {
			back() {
				location.href = "#/ProductFileChange"
			}
		},
		created() {
			this.form = this.$route.query.arr;
			this.form.classify=this.form.firstKindName+'/'+this.form.secondKindName+'/'+this.form.thirdKindName;
			/* alert(this.form.checker); */
		}
	}
</script>

<style scoped>
	.text {
		font-size: 14px;
	}

	.el-card {
		padding: 30px 0px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
	}

	.clearfix:after {
		clear: both
	}
</style>
