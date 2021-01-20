<template>
	<div id="box">
		<el-breadcrumb style="margin-bottom: 20px;">
			<el-breadcrumb-item>采购管理</el-breadcrumb-item>
			<el-breadcrumb-item>供应商档案管理</el-breadcrumb-item>
			<el-breadcrumb-item>供应商档案查询</el-breadcrumb-item>
		</el-breadcrumb>

		<el-row style="margin-bottom: 10px;">
			<el-col :span="4" :push="20">
				<el-button type="warning" size="medium">打印</el-button>
				<el-button type="primary" size="medium" @click="back()">返回</el-button>
			</el-col>
		</el-row>

		<div id="body">
			<el-tabs type="border-card">

				<el-tab-pane label="主信息">
					<el-container>
						<el-header>主信息</el-header>
						<el-main>
							<div>
								<el-form ref="form" :model="form" label-width="150px">
									<table align="center">
										<tr>
											<td>
												<el-form-item label="档案编号">
													<el-input style="width:350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>

										</tr>
										<tr>
											<td>
												<el-form-item label="供应商名称">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="地址">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="产品类别">
													<el-input disabled style="width:350px;" :options="options"></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="所在区域">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="供应商曾用名">
													<el-input style="width:  350px;" disabled clearable>
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="开户银行">
													<el-input style="width:  350px;" disabled clearable>
													</el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="银行账号">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="网址">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="优质级别">
													<template>
														<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
													</template>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="电话">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="传真">
													<template>
														<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
													</template>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="邮政编码">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
									</table>
								</el-form>
							</div>
						</el-main>
					</el-container>

				</el-tab-pane>
				<el-tab-pane label="联系人信息">

					<el-container>
						<el-header>联系人信息</el-header>
						<el-main>
							<div style="padding-top: 20px;">
								<el-form ref="form" :model="form" label-width="150px">
									<table align="center">
										<tr>
											<td>
												<el-form-item label="第一联系人">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="部门">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="职务">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="办公电话">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="手机">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="家庭电话">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="email">
													<el-input disabled style="width:  350px;">
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="性别">
													<el-input style="width:  350px;" disabled></el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="第二联系人">
													<el-input style="width:  350px;" disabled></el-input>
												</el-form-item>
											</td>
											<td>

												<el-form-item label="部门">
													<el-input style="width:  350px;" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="职务">
													<el-input style="width:  350px;" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="办公电话">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="手机">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="家庭电话">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="email">
													<el-input disabled style="width:  350px;">
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="性别">
													<el-input style="width:  350px;" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
									</table>
								</el-form>
							</div>
						</el-main>
					</el-container>
				</el-tab-pane>
				<el-tab-pane label="动态信息">
					<el-container>
						<el-header>动态信息</el-header>
						<el-main>
							<div>
								<el-form ref="form" :model="form" label-width="150px">
									<table align="center">
										<tr>
											<td>
												<el-form-item label="可供应产品集合">
													<el-input type="textarea" readonly="readonly" disabled :autosize="{ minRows: 3, maxRows: 6}">
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="开票信息">
													<el-input type="textarea" readonly="readonly" disabled :autosize="{ minRows: 3, maxRows: 6}">
													</el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="交易次数累计">
													<el-input style="width:  350px;" readonly="readonly" disabled v-model="form.productName" clearable></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="退货次数累计">
													<el-input style="width:  350px;" readonly="readonly" v-model="form.factoryName" disabled></el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="供货额累计">
													<el-input v-model="form.classify" disabled style="width:350px;" :options="options"></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="退货额累计">
													<el-input style="width:  350px;" readonly="readonly" v-model="form.productNick" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="平均供货周期">
													<el-input v-model="form.type" disabled style="width:  350px;" clearable>
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="档案变更累计">
													<el-input disabled v-model="form.productClass" style="width:  350px;" clearable>
													</el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="联络次数累计">
													<el-input style="width:  350px;" v-model="form.personalUnit" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="档案附件">
													<el-input style="width:  350px;" v-model="form.personalValue" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="推荐供应产品集合  ">
													<el-input type="textarea" readonly="readonly" disabled :autosize="{ minRows: 3, maxRows: 6}">
													</el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="最近交易时间">
													<el-input style="width:  350px;" readonly="readonly" disabled v-model="form.productName" clearable></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="最近联络时间">
													<el-input style="width:  350px;" readonly="readonly" v-model="form.factoryName" disabled></el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="最近变更时间">
													<el-input v-model="form.classify" disabled style="width:350px;" :options="options"></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="登记时间">
													<el-input style="width:  350px;" readonly="readonly" v-model="form.productNick" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="采购人">
													<el-input v-model="form.type" disabled style="width:  350px;" clearable>
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="登记人">
													<el-input disabled v-model="form.productClass" style="width:  350px;" clearable>
													</el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="复核人">
													<el-input style="width:  350px;" v-model="form.personalUnit" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="复核时间">
													<el-input style="width:  350px;" v-model="form.personalValue" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
									</table>
								</el-form>
							</div>
						</el-main>
					</el-container>

				</el-tab-pane>
				<el-tab-pane label="全部信息">
					<el-container>
						<el-header>主信息</el-header>
						<el-main>
							<div>
								<el-form ref="form" :model="form" label-width="150px">
									<table align="center">
										<tr>
											<td>
												<el-form-item label="档案编号">
													<el-input style="width:350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="邮政编码">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="供应商名称">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="地址">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="产品类别">
													<el-input disabled style="width:350px;" :options="options"></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="所在区域">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="供应商曾用名">
													<el-input style="width:  350px;" disabled clearable>
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="开户银行">
													<el-input style="width:  350px;" disabled clearable>
													</el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="银行账号">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="网址">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="优质级别">
													<template>
														<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
													</template>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="电话">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="传真">
													<template>
														<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
													</template>
												</el-form-item>
											</td>
										</tr>
									</table>
								</el-form>
							</div>
						</el-main>
					</el-container>
					<el-container>
						<el-header>联系人信息</el-header>
						<el-main>
							<div style="padding-top: 20px;">
								<el-form ref="form" :model="form" label-width="150px">
									<table align="center">
										<tr>
											<td>
												<el-form-item label="第一联系人">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="部门">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="职务">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="办公电话">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="手机">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="家庭电话">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="email">
													<el-input disabled style="width:  350px;">
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="性别">
													<el-input style="width:  350px;" disabled></el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="第二联系人">
													<el-input style="width:  350px;" disabled></el-input>
												</el-form-item>
											</td>
											<td>

												<el-form-item label="部门">
													<el-input style="width:  350px;" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="职务">
													<el-input style="width:  350px;" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="办公电话">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="手机">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="家庭电话">
													<el-input style="width:  350px;" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="email">
													<el-input disabled style="width:  350px;">
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="性别">
													<el-input style="width:  350px;" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
									</table>
								</el-form>
							</div>
						</el-main>
					</el-container>
					<el-container>
						<el-header>动态信息</el-header>
						<el-main>
							<div>
								<el-form ref="form" :model="form" label-width="150px">
									<table align="center">
										<tr>
											<td>
												<el-form-item label="可供应产品集合">
													<el-input type="textarea" readonly="readonly" disabled :autosize="{ minRows: 3, maxRows: 6}">
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="开票信息">
													<el-input type="textarea" readonly="readonly" disabled :autosize="{ minRows: 3, maxRows: 6}">
													</el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="交易次数累计">
													<el-input style="width:  350px;" readonly="readonly" disabled v-model="form.productName" clearable></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="退货次数累计">
													<el-input style="width:  350px;" readonly="readonly" v-model="form.factoryName" disabled></el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="供货额累计">
													<el-input v-model="form.classify" disabled style="width:350px;" :options="options"></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="退货额累计">
													<el-input style="width:  350px;" readonly="readonly" v-model="form.productNick" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="平均供货周期">
													<el-input v-model="form.type" disabled style="width:  350px;" clearable>
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="档案变更累计">
													<el-input disabled v-model="form.productClass" style="width:  350px;" clearable>
													</el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="联络次数累计">
													<el-input style="width:  350px;" v-model="form.personalUnit" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="档案附件">
													<el-input style="width:  350px;" v-model="form.personalValue" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="推荐供应产品集合  ">
													<el-input type="textarea" readonly="readonly" disabled :autosize="{ minRows: 3, maxRows: 6}">
													</el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="最近交易时间">
													<el-input style="width:  350px;" readonly="readonly" disabled v-model="form.productName" clearable></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="最近联络时间">
													<el-input style="width:  350px;" readonly="readonly" v-model="form.factoryName" disabled></el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="最近变更时间">
													<el-input v-model="form.classify" disabled style="width:350px;" :options="options"></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="登记时间">
													<el-input style="width:  350px;" readonly="readonly" v-model="form.productNick" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="采购人">
													<el-input v-model="form.type" disabled style="width:  350px;" clearable>
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="登记人">
													<el-input disabled v-model="form.productClass" style="width:  350px;" clearable>
													</el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="复核人">
													<el-input style="width:  350px;" v-model="form.personalUnit" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="复核时间">
													<el-input style="width:  350px;" v-model="form.personalValue" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
									</table>
								</el-form>
							</div>
						</el-main>
					</el-container>
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
				location.href = "#/ApplyForRegistration"
			}
		},
		created() {
			/* this.form = this.$route.query.arr;
			this.form.classify=this.form.firstKindName+'/'+this.form.secondKindName+'/'+this.form.thirdKindName; */

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

	.el-header {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
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
