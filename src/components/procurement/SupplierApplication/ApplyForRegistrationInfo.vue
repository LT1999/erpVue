<template>
	<div id="box">
		<el-breadcrumb style="margin-bottom: 20px;">
			<el-breadcrumb-item>采购管理</el-breadcrumb-item>
			<el-breadcrumb-item>供应商档案管理</el-breadcrumb-item>
			<el-breadcrumb-item>供应商档案查询</el-breadcrumb-item>
		</el-breadcrumb>

		<el-row style="margin-bottom: 10px;">
			<el-col :span="4" :push="20">
				<el-button type="warning" size="medium" @click="pdf()">pdf打印</el-button>
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
													<el-input style="width:350px;" v-model="form.supplierNo" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="供应商名称">
													<el-input style="width:  350px;" v-model="form.supplierName" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="地址">
													<el-input style="width:  350px;" v-model="form.supplierAddress" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="产品类别">
													<el-input disabled style="width:350px;" v-model="form.classify" :options="options"></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="所在区域">
													<el-input style="width:  350px;" v-model="form.supplierArea" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="供应商曾用名">
													<el-input style="width:  350px;" v-model="form.supplierUsedname" disabled clearable>
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="开户银行">
													<el-input style="width:  350px;" v-model="form.supplierOpenAccount" disabled clearable>
													</el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="银行账号">
													<el-input style="width:  350px;" v-model="form.supplierBankaccount" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="网址">
													<el-input style="width:  350px;" v-model="form.supplierUrl" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="优质级别">
													<template>
														<el-input style="width:  350px;" v-model="form.supplierQualityRank" readonly="readonly" disabled></el-input>
													</template>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="电话">
													<el-input style="width:  350px;" v-model="form.supplierPhone" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="传真">
													<template>
														<el-input style="width:  350px;" v-model="form.supplierFax" readonly="readonly" disabled></el-input>
													</template>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="邮政编码">
													<el-input style="width:  350px;" v-model="form.supplierPostalcode" readonly="readonly" disabled></el-input>
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
													<el-input style="width:  350px;" v-model="form.supplierFirstlinkmanName" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="部门">
													<el-input style="width:  350px;" v-model="form.supplierFirstlinkmanSector" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="职务">
													<el-input style="width:  350px;" v-model="form.supplierFirstlinkmanPost" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="手机">
													<el-input style="width:  350px;" v-model="form.supplierFirstlinkmanPhone" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="email">
													<el-input disabled style="width:  350px;" v-model="form.supplierFirstlinkmanEmail">
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="性别">
													<el-input style="width:  350px;" disabled v-model="form.supplierFirstlinkmanSex"></el-input>
												</el-form-item>
											</td>
										</tr>
									</table>
								</el-form>
								<el-form ref="form" :model="form" label-width="150px">
									<table align="center">
										<tr>
											<td>
												<el-form-item label="第二联系人">
													<el-input style="width:  350px;" disabled v-model="form.supplierSecondlinkmanName"></el-input>
												</el-form-item>
											</td>
											<td>

												<el-form-item label="部门">
													<el-input style="width:  350px;" v-model="form.supplierSecondlinkmanSector" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="职务">
													<el-input style="width:  350px;" v-model="form.supplierSecondlinkmanPost" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="手机">
													<el-input style="width:  350px;" v-model="form.supplierSecondlinkmanPhone" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="email">
													<el-input disabled style="width:  350px;" v-model="form.supplierSecondlinkmanEmail">
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="性别">
													<el-input style="width:  350px;" v-model="form.supplierSecondlinkmanSex" disabled></el-input>
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
												<el-form-item label="登记时间">
													<el-input style="width:  350px;" readonly="readonly" v-model="form.supplierRegistrationtime" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="采购人">
													<el-input v-model="form.supplierBuyer" disabled style="width:  350px;" clearable>
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="登记人">
													<el-input disabled v-model="form.supplierRegistrant" style="width:  350px;" clearable>
													</el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="复核人">
													<el-input style="width:  350px;" v-model="form.auditor" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="复核时间">
													<el-input style="width:  350px;" v-model="form.auditorTime" readonly="readonly" disabled></el-input>
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
													<el-input style="width:350px;" v-model="form.supplierNo" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="供应商名称">
													<el-input style="width:  350px;" v-model="form.supplierName" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="地址">
													<el-input style="width:  350px;" v-model="form.supplierAddress" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="产品类别">
													<el-input disabled style="width:350px;" v-model="form.classify" :options="options"></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="所在区域">
													<el-input style="width:  350px;" v-model="form.supplierArea" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="供应商曾用名">
													<el-input style="width:  350px;" v-model="form.supplierUsedname" disabled clearable>
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="开户银行">
													<el-input style="width:  350px;" v-model="form.supplierOpenAccount" disabled clearable>
													</el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="银行账号">
													<el-input style="width:  350px;" v-model="form.supplierBankaccount" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="网址">
													<el-input style="width:  350px;" v-model="form.supplierUrl" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="优质级别">
													<template>
														<el-input style="width:  350px;" v-model="form.supplierQualityRank" readonly="readonly" disabled></el-input>
													</template>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="电话">
													<el-input style="width:  350px;" v-model="form.supplierPhone" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="传真">
													<template>
														<el-input style="width:  350px;" v-model="form.supplierFax" readonly="readonly" disabled></el-input>
													</template>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="邮政编码">
													<el-input style="width:  350px;" v-model="form.supplierPostalcode" readonly="readonly" disabled></el-input>
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
													<el-input style="width:  350px;" v-model="form.supplierFirstlinkmanName" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="部门">
													<el-input style="width:  350px;" v-model="form.supplierFirstlinkmanSector" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="职务">
													<el-input style="width:  350px;" v-model="form.supplierFirstlinkmanPost" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="手机">
													<el-input style="width:  350px;" v-model="form.supplierFirstlinkmanPhone" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="email">
													<el-input disabled style="width:  350px;" v-model="form.supplierFirstlinkmanEmail">
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="性别">
													<el-input style="width:  350px;" disabled v-model="form.supplierFirstlinkmanSex"></el-input>
												</el-form-item>
											</td>
										</tr>
									</table>
								</el-form>
								<el-form ref="form" :model="form" label-width="150px">
									<table align="center">
										<tr>
											<td>
												<el-form-item label="第二联系人">
													<el-input style="width:  350px;" disabled v-model="form.supplierSecondlinkmanName"></el-input>
												</el-form-item>
											</td>
											<td>

												<el-form-item label="部门">
													<el-input style="width:  350px;" v-model="form.supplierSecondlinkmanSector" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="职务">
													<el-input style="width:  350px;" v-model="form.supplierSecondlinkmanPost" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="手机">
													<el-input style="width:  350px;" v-model="form.supplierSecondlinkmanPhone" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="email">
													<el-input disabled style="width:  350px;" v-model="form.supplierSecondlinkmanEmail">
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="性别">
													<el-input style="width:  350px;" v-model="form.supplierSecondlinkmanSex" disabled></el-input>
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
												<el-form-item label="登记时间">
													<el-input style="width:  350px;" readonly="readonly" v-model="form.supplierRegistrationtime" disabled></el-input>
												</el-form-item>
											</td>
										</tr>
										<tr>
											<td>
												<el-form-item label="采购人">
													<el-input v-model="form.supplierBuyer" disabled style="width:  350px;" clearable>
													</el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="登记人">
													<el-input disabled v-model="form.supplierRegistrant" style="width:  350px;" clearable>
													</el-input>
												</el-form-item>
											</td>
										</tr>

										<tr>
											<td>
												<el-form-item label="复核人">
													<el-input style="width:  350px;" v-model="form.auditor" readonly="readonly" disabled></el-input>
												</el-form-item>
											</td>
											<td>
												<el-form-item label="复核时间">
													<el-input style="width:  350px;" v-model="form.auditorTime" readonly="readonly" disabled></el-input>
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
			},
			pdf(){
				this.getPdf('body', "供应商档案");
			}
		},
		created() {
			this.form = this.$route.query.arr;
			this.form.classify = this.form.firstKindName + '/' + this.form.secondKindName + '/' + this.form.threeKindName;
			
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
