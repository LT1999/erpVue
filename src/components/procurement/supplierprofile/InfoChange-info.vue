<template>
	<div id="registration">
		<el-breadcrumb>
			<el-breadcrumb-item>采购管理</el-breadcrumb-item>
			<el-breadcrumb-item>供应商档案管理</el-breadcrumb-item>
			<el-breadcrumb-item>供应商档案查询</el-breadcrumb-item>
		</el-breadcrumb>
		<div id="out">
			<el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="220px" class="demo-ruleForm">
				<div id="butt">
					<el-form-item>
						<div id="butt2">
							<el-button type="primary" plain size="medium" @click="back">返回</el-button>
						</div>
					</el-form-item>
				</div>
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>主信息</span>
					</div>
					<el-form-item label="供应商名称">
						<el-input readonly v-model="ruleForm.supplierName"></el-input>
					</el-form-item>
					<el-form-item label="地址">
						<el-input readonly v-model="ruleForm.supplierAddress"></el-input>
					</el-form-item>
					<el-form-item label="分类">
						<el-input readonly v-model="ruleForm.classify"></el-input>
					</el-form-item>
					<el-form-item label="所在区域">
						<el-select disabled placeholder="所在区域" v-model="ruleForm.supplierArea">
							<el-option label="中国" value="中国"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="供应商曾用名">
						<el-input readonly v-model="ruleForm.supplierUsedname"></el-input>
					</el-form-item>
					<el-form-item label="开户银行">
						<el-input readonly v-model="ruleForm.supplierOpenAccount"></el-input>
					</el-form-item>
					<el-form-item label="银行账号">
						<el-input readonly v-model="ruleForm.supplierBankaccount"></el-input>
					</el-form-item>
					<el-form-item label="网址">
						<el-input readonly v-model="ruleForm.supplierUrl"></el-input>
					</el-form-item>
					<el-form-item label="优质级别">
						<el-select disabled placeholder="档次级别" v-model="ruleForm.supplierQualityRank">
							<el-option label="高档" value="高档"></el-option>
							<el-option label="中档" value="中档"></el-option>
							<el-option label="低档" value="低档"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="电话">
						<el-input readonly v-model="ruleForm.supplierPhone"></el-input>
					</el-form-item>
					<el-form-item label="传真">
						<el-input readonly v-model="ruleForm.supplierFax"></el-input>
					</el-form-item>
					<el-form-item label="邮政编码">
						<el-input readonly v-model="ruleForm.supplierPostalcode"></el-input>
					</el-form-item>

				</el-card>
				<br />
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>联系人信息</span>
					</div>
					<el-form-item label="第一联系人">
						<el-input readonly v-model="ruleForm.supplierFirstlinkmanName"></el-input>
					</el-form-item>
					<el-form-item label="部门">
						<el-input readonly v-model="ruleForm.supplierFirstlinkmanSector"></el-input>
					</el-form-item>
					<el-form-item label="职务">
						<el-input readonly v-model="ruleForm.supplierFirstlinkmanPost"></el-input>
					</el-form-item>
					<el-form-item label="手机号码">
						<el-input readonly v-model="ruleForm.supplierFirstlinkmanPhone"></el-input>
					</el-form-item>
					<el-form-item label="邮箱">
						<el-input readonly v-model="ruleForm.supplierFirstlinkmanEmail"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-select disabled placeholder="请选择" v-model="ruleForm.supplierFirstlinkmanSex">
							<el-option label="男" value="男"></el-option>
							<el-option label="女" value="女"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="第二联系人">
						<el-input readonly v-model="ruleForm.supplierSecondlinkmanName"></el-input>
					</el-form-item>
					<el-form-item label="部门">
						<el-input readonly v-model="ruleForm.supplierSecondlinkmanSector"></el-input>
					</el-form-item>
					<el-form-item label="职务">
						<el-input readonly v-model="ruleForm.supplierSecondlinkmanPost"></el-input>
					</el-form-item>
					<el-form-item label="手机号码">
						<el-input readonly v-model="ruleForm.supplierSecondlinkmanPhone"></el-input>
					</el-form-item>
					<el-form-item label="邮箱">
						<el-input readonly v-model="ruleForm.supplierSecondlinkmanEmail"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-select disabled placeholder="请选择" v-model="ruleForm.supplierSecondlinkmanSex">
							<el-option label="男" value="男"></el-option>
							<el-option label="女" value="女"></el-option>
						</el-select>
					</el-form-item>
				</el-card>
				<br />
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>动态信息</span>
					</div>
					<el-form-item label="登记人">
						<el-input readonly v-model="ruleForm.supplierRegistrant"></el-input>
					</el-form-item>
					<el-form-item label="登记时间">
						<el-input readonly v-model="ruleForm.supplierRegistrationtime"></el-input>
					</el-form-item>
					<el-form-item label="采购人">
						<el-input readonly v-model="ruleForm.supplierBuyer"></el-input>
					</el-form-item>
					<el-form-item label="采购人编号">
						<el-input readonly v-model="ruleForm.supplierBuyerNo"></el-input>
					</el-form-item>
				</el-card>

			</el-form>
		</div>

	</div>
</template>

<script scoped>
	export default {
		data() {
			let that = this;
			return {
				ruleForm: {
					supplierNo: null,
					supplierName: '', //供应商名称
					supplierAddress: '', //供应商地址
					supplierQualityRank: '', //优质级别
					classify: '',
					firstKindId: '', // '产品I级分类ID
					firstKindName: '', //'产品I级分类名称
					secondKindId: '', //'产品II级分类ID
					secondKindName: '', //产品II级分类名称
					threeKindId: '', //'产品III级分类ID
					threeKindName: '', //产品III级分类名称
					supplierArea: '', //所在区域
					supplierUsedname: '', //供应商曾用名
					supplierOpenAccount: '', //开户银行
					supplierBankaccount: '', //银行账号
					supplierFirstlinkmanName: '', //第一联系人姓名
					supplierFirstlinkmanSector: '', //第一联系人部门
					supplierFirstlinkmanPost: '', //第一联系人职务
					supplierFirstlinkmanPhone: '', //第一联系人手机号码
					supplierFirstlinkmanEmail: '', //第一联系人邮箱
					supplierFirstlinkmanSex: '', //第一联系人性别

					supplierSecondlinkmanName: '', //第二联系人姓名
					supplierSecondlinkmanSector: '', //第二联系人部门
					supplierSecondlinkmanPost: '', //第二联系人职务
					supplierSecondlinkmanPhone: '', //第二联系人手机号码
					supplierSecondlinkmanEmail: '', //第二联系人邮箱
					supplierSecondlinkmanSex: '', //第二联系人性别
					supplierUrl: '', //网址
					supplierPhone: '', //电话
					supplierFax: '', //传真
					supplierPostalcode: '', //邮政编码
					supplierRegistrant: '', //登记人
					supplierRegistrationtime: '', //登记时间
					supplierBuyer: '', //采购人
					supplierBuyerNo: '', //采购人编号
					checkMark: '未审核' //审核标志
				},
				classification: []
			};
		},
		methods: {
			back() {
				location.href = "#/InfoChange"
			}
		},
		created() {
			this.ruleForm = this.$route.query.arr;
			//this.Form.classify = [this.Form.firstKindId, this.Form.secondKindId, this.Form.threeKindId];
			this.ruleForm.classify = this.ruleForm.firstKindName + '/' + this.ruleForm.secondKindName + '/' + this.ruleForm.threeKindName;
			console.log(this.ruleForm.threeKindName)
		},
	}
</script>

<style scoped>
	#registration {
		color: #2c3e50;
		margin-top: 20px;
	}

	.el-cascader,
	.el-select {
		width: 206.4px;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
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
		width: 100%;
		margin: 0px;
	}

	#out {
		width: 100%;
		margin: 0 auto;

	}

	.el-form {
		margin: 0 auto;
		width: 100%;
	}

	#butt {
		width: 80px;
		float: right;
	}
</style>
