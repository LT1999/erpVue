<template>
	<div id="box">
		<div id="head">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>采购管理</el-breadcrumb-item>
				<el-breadcrumb-item>放货管理</el-breadcrumb-item>
				<el-breadcrumb-item>放货审核</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div id="card">
			<el-form ref="form" :rules="rules" :model="form" label-width="130px">
				<div id="buttons">
					<el-button type="success" @click="submit('已审核')">通过</el-button>
					<el-button type="warning" @click="submit('审核未通过')">未通过</el-button>
					<el-button type="primary" @click="back()">返回</el-button>
				</div>
				<el-card class="box-card">
					<h3>放货登记单</h3><br />
					<el-form ref="form2" :rules="rules" :model="form2" label-width="130px">
						<el-row>
							<el-col :span="8" :push='1'>
								<el-form-item label="申请单编号">
									<span>{{form2.supplierName}}</span>
								</el-form-item>
							</el-col>
							<el-col :span="8" :push='6'>
								<el-form-item label="审核人" prop="auditor">
									<input></input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8" :push='1'>
								<el-form-item label="分类">
									<span>{{form2.supplierName}}</span>
								</el-form-item>
							</el-col>
							<el-col :span="8" :push='6'>
								<el-form-item label="放货人">
									<span>{{form2.supplierName}}</span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8" :push='1'>
								<el-form-item label="采购人">
									<span>{{form2.supplierName}}</span>
								</el-form-item>
							</el-col>
							<el-col :span="8" :push='6'>
								<el-form-item label="入库理由">
									<span>{{form2.supplierName}}</span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8" :push='1'>
								<el-form-item label="是否归还">
									<el-select v-model="value">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8" :push='6'>
								<el-form-item label="归还时间">
									 <el-date-picker  v-model="value1" type="date" placeholder="选择日期"> </el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<template>
								<el-table :data="tableData" style="margin-left: 8%; width: 85%;" border>
									<el-table-column prop="1" label="序号">
									</el-table-column>
									<el-table-column prop="2" label="商品名称 ">
									</el-table-column>
									<el-table-column prop="3" label="商品编号">
									</el-table-column>
									<el-table-column prop="4" label="当前库存数量">
									</el-table-column>
									<el-table-column prop="count" label="数量">
										<input></input>
									</el-table-column>
									<el-table-column prop="3" label="单位">
									</el-table-column>
									<el-table-column prop="4" label="单价(元)">
									</el-table-column>
									<el-table-column prop="5" label="小计(元)">
									</el-table-column>
								</el-table>
							</template>
						</el-row>
						<el-row>
							<el-col :span="8" :push='1'>
								<el-form-item label="总件数">
									<span>{{form2.supplierName}}</span>
								</el-form-item>
							</el-col>
							<el-col :span="8" :push='6'>
								<el-form-item label="总金额">
									<span>{{form2.supplierName}}</span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8" :push='1'>
								<el-form-item label="登记人">
									<span>{{form2.supplierName}}</span>
								</el-form-item>
							</el-col>
							<el-col :span="8" :push='6'>
								<el-form-item label="登记时间">
									<span>{{form2.supplierName}}</span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="21" :push="1">
								<el-form-item label="备注" style="width: 100%;">
									<el-input style="width: 100%;" v-model="form.supplierName" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

					</el-form>
				</el-card>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
					value: '是',
					label: '是'
				}, {
					value: '否',
					label: '否'
				}],
				value: '',
				value1:'',
				rules: {
					auditor: [{
						required: true,
						message: '请填写审核人',
						trigger: 'blur'
					}]
				},
				form: {},
				form2: {'supplierName':'2020-2-2'},
				tableData: [{
					1: 1,
					2: 2,
					3: 3,
					4: 4,
					5: 5,
					'count': 3
				}]

			};
		},
		methods: {
			submit(check) {
				this.$refs.form2.validate((valid) => {
					if (valid) {
						this.$confirm('确认审核结果?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							var aData = new Date();
							this.form.auditorTime = aData.getFullYear() + "-" +
								(aData.getMonth() + 1) + "-" +
								aData.getDate() + " " +
								aData.getHours() + ":" +
								aData.getMinutes() + ":" +
								aData.getSeconds();
							/* this.$http.post(this.$api + "/offer/updateByPrimaryKey", this.$qs.stringify(this.form))
								.then(res => {
									if (res.data > 0) {
										this.$message({
											message: '审核成功！',
											type: 'success'
										});
										location.href = "#/ReleaseCargoAudit";
									}
								})
								.catch(err => {
									console.log(err)
								}); */
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消'
							});
						});
					} else {
						return false;
					}
				});
			},
			back() {
				this.$confirm('审核已完成?立即返回', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					location.href = "#/ReleaseCargoAudit"
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			selsup() {
				/* this.$http.post(this.$api + "/supplierfiles/selectByPrimaryKey", "id=" + this.form.supplierId)
					.then(res => {
						this.form2 = res.data;
					})
					.catch(err => {
						console.log(err)
					}); */
			}
		},
		mounted() {
			/* this.tableData.push(this.form); */
		},
		created() {
			/* this.form.goodsDiscount=this.$route.query.arr.goodsDiscount;
			this.form.goodsSubtotal=this.$route.query.arr.goodsSubtotal;
			this.form.goodsPrice=this.$route.query.arr.goodsPrice;
			this.form.goodsDescribe=this.$route.query.arr.goodsDescribe;
			this.form.goodsName=this.$route.query.arr.goodsName;
			this.form.offerNo=this.$route.query.arr.offerNo;
			this.form.auditor=this.$route.query.arr.auditor;
			this.form.id=this.$route.query.arr.id; */
			this.form2 = this.$route.query.arr;
			this.selsup();
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
		margin-bottom: 20px;
	}

	input {
		outline: none;
		border: none;
		border-bottom: 1px solid #000;
		width: 12.5rem;
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
</style>
