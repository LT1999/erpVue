<template>
	<!-- 入库调度单-->
	<div id="app">
		<div>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">库存管理</el-breadcrumb-item>
				<el-breadcrumb-item>出入库调度管理</el-breadcrumb-item>
				<el-breadcrumb-item>制定入库单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-divider></el-divider>
		<el-form :inline="true" :model="gather" class="demo-form-inline">
			<div id="butt">
				<el-form-item>
					<el-button type="info">PDF打印</el-button>
					<el-button type="primary" @click="onSubmit">提交</el-button>
					<el-button type="danger" @click="back()">返回</el-button>
				</el-form-item>
			</div>
			<br />
			<center>
				<div id="kp">
					<el-card class="box-card">
						<h4>入库调度单</h4>
						<br />
						<div>
							<span class="sp1">入库单编号：{{this.$route.query.gatherId}}</span><span>产品编号：{{this.$route.query.productId}}</span>
						</div>
						<br />
						<div>
							<span class="sp2">产品名称：{{this.$route.query.productName}}</span><span>产品单价：{{this.$route.query.costPrice}}</span>
						</div>
						<br />
						<div>
							<el-table :data="gridData">
								<el-table-column prop="id" label="序号" width="100"></el-table-column>
								<el-table-column prop="name" label="库房名称" width="150"></el-table-column>
								<el-table-column prop="cid" label="存储地址编号" width="150"></el-table-column>
								<el-table-column prop="cname" label="存储地址名称" width="150"></el-table-column>
								<el-table-column prop="cjc" label="存储单位简称" width="150"></el-table-column>
								<el-table-column prop="cls" label="当前可存放数量" width="150"></el-table-column>
								<el-table-column label="本次入库数量">
									<template slot-scope="scope">
										<el-input v-model="rk" clearable></el-input>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<br />
						<div>
							<el-form-item label="调度人:">
								<el-input class="inp2" type="text" v-model="gather.attemper"></el-input>
							</el-form-item>
							<span>调度时间：{{this.gather.attemperTime}}</span>
						</div>
						<br />
						<div>
							<span class="sp3">应入库总件数：{{this.$route.query.amount}}</span><span>已入库总件数：{{this.$route.query.gatheredAmountSum}}</span>
						</div>
						<br />
						<div>
							<span class="sp3">应入库总成本：{{this.$route.query.subtotal}}</span><span>已入库总成本：{{this.$route.query.zong}}</span>
						</div>
						<br />
					</el-card>
				</div>
			</center>
		</el-form>

	</div>
</template>

<script>
	export default {
		created() {
			this.shijian();
			this.selectMaxcon();
			this.rk = this.$route.query.amount;
			this.gather.id = this.$route.query.gid;
		},
		data() {
			return {
				id: 0, //入库明细表id
				rk: '', //入库数量
				gather: { //入库表
					id: 0,
					attemper: '', //调度人
					attemperTime: '2001-09-09', //调度时间
					storeTag: '已调度'
				},
				gridData: [{
					id: '1',
					name: '成品库 ',
					cid: '01-01-01',
					cname: '电子-计算机-服务器 ',
					cjc: '1',
					cls: 0
				}],
				datas: {}
			}
		},
		methods: {
			onSubmit() {
				var demo = new URLSearchParams()
				demo.append("id", this.$route.query.id);
				demo.append("gather.id", this.gather.id);
				demo.append("gather.attemper", this.gather.attemper);
				demo.append("gather.attemperTime", this.gather.attemperTime);
				demo.append("gather.storeTag", this.gather.storeTag);
				this.$http.post("http://localhost:8080/Erp-web/gather/updateGatherTag.do", demo)
					.then(res => {
						if (res.status == 200) {
							this.$message({
								message: '提交成功！',
								type: 'success',
								duration: 1000
							});
							this.$router.go(-2);
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			shijian() {
				var now = new Date();
				var year = now.getFullYear(); //得到年份
				var month = now.getMonth(); //得到月份
				var date = now.getDate(); //得到日期
				month = month + 1;
				if (month < 10) month = "0" + month;
				if (date < 10) date = "0" + date;
				var time = "";
				time = year + "-" + month + "-" + date;
				this.gather.attemperTime = time;
			},
			selectMaxcon() {
				var demo = new URLSearchParams()
				demo.append("prid", this.$route.query.productId)
				this.$http.post('http://localhost:8080/Erp-web/cell/selectMaxcon.do', demo)
					.then((response) => {
						console.log(this.gridData);
						this.gridData[0].cls = response.data - this.$route.query.gatheredAmount;
					}).catch((error) => {
						console.log("查询失败的原因：", error)
					})
			},
			back() {
				location.href = "#/delivery2"
			}
		}
	}
</script>

<style scoped>
	#butt {
		width: 500px;
		margin-left: 840px;
	}

	.box-card {
		width: 1000px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	}

	#span {
		margin-left: 250px;
	}

	.sp1 {
		margin-right: 500px;
	}

	.sp2 {
		margin-right: 550px;
	}

	.sp3 {
		margin-right: 550px;
	}

	.sp4 {
		margin-right: 515px;
	}

	.inp2 {
		width: 18.75rem;
		margin-right: 200px;
		border-bottom: 1px solid #000000;
		border-top-width: 0px;
		border-right-width: 0px;
		border-left-width: 0px;
		border-radius: 0px;
	}
</style>
