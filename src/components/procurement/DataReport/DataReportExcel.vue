<template>
	<div id="DataReportExcel">
		<el-breadcrumb separator="/" style="margin-bottom: 30px;">
			<el-breadcrumb-item>采购管理</el-breadcrumb-item>
			<el-breadcrumb-item>标准数据报表</el-breadcrumb-item>
			<el-breadcrumb-item>EXCEL标准数据报表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card shadow="always" style="padding: 20px;">
			<el-form ref="searchFrom" inline>
				<el-col>
					<el-form-item label="请选择数据库表的名称">
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="请选择导出格式">
						<el-select v-model="value2" placeholder="请选择">
							<el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-button @click="exportClick" type="primary" plain style=" margin-left: 20px;font-size: 13px;">导出</el-button>
				</el-col>
			</el-form>
			<div class="hello">
				<!-- <div id="histogram" style="width: 600px;height:400px;"></div> -->
				<div id="diagram" style="width: 31.25rem;height:31.25rem;margin-left:15.625rem;"></div>
				<!-- <div id="brokenLineGraph" style="width: 800px;height:400px;"></div> -->
			</div>
		</el-card>
	</div>
</template>

<script>
	var echarts = require('echarts/lib/echarts');
	// 引入柱状图
	require('echarts/lib/chart/bar');
	// 引入提示框和标题组件
	require('echarts/lib/component/tooltip');
	require('echarts/lib/component/title');
	export default {
		data() {
			return {
				options: [{
					value: '1',
					label: '供应商档案'
				}, {
					value: '2',
					label: '采购报价单'
				}, {
					value: '3',
					label: '采购执行单'
				}],
				value: '',
				option: [{
					value: '1',
					label: 'excel'
				}, {
					value: '2',
					label: 'pdf'
				}, {
					value: '3',
					label: 'xml'
				}],
				value2: '',
				legendData: '',
				seriesData: '',
				selected: '',
				name: '',
				nameList: [
					'赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施',
					'张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范',
					'彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷',
					'贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜',
					'顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成',
					'戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路',
					'娄', '危'
				],
				nameLen: ''
			}
		},
		methods: {
			bing() {
				// 基于准备好的dom，初始化echarts实例
				var bing = echarts.init(document.getElementById('diagram'));
				//绘制饼图
				var option = {
					title: {
						text: '同名数量统计',
						subtext: '纯属虚构',
						left: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					legend: {
						type: 'scroll',
						orient: 'vertical',
						right: 10,
						top: 20,
						bottom: 20,
						data: data.legendData,

						selected: data.selected
					},
					series: [{
						name: '姓名',
						type: 'pie',
						radius: '55%',
						center: ['40%', '50%'],
						data: data.seriesData,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};
				bing.setOption(option);
			},
			genData(count) {
				for (var i = 0; i < count; i++) {
					this.name = Math.random() > 0.65 ?
						this.makeWord(4, 1) + '·' + this.makeWord(3, 0) :
						this.makeWord(2, 1);
					this.legendData.push(name);
					this.seriesData.push({
						name: name,
						value: Math.round(Math.random() * 100000)
					});
					this.selected[name] = i < 6;
				}
			},
			makeWord(max, min) {
				this.nameLen = Math.ceil(Math.random() * max + min);
				for (var i = 0; i < this.nameLen; i++) {
					this.name.push(this.nameList[Math.round(Math.random() * this.nameList.length - 1)]);
				}
				console.log(this.name);
			},
			exportClick() {
				this.$axios.post("/freceipt/export", this.$qs.stringify(this.checkform), {
						responseType: 'arraybuffer'
					})
					.then(res => {
						console.log(res.data);
						if (res) {
							// _this.loading = false;
							const aLink = document.createElement("a");
							let blob = new Blob([res.data], {
								type: "application/vnd.ms-excel"
							})
							aLink.href = URL.createObjectURL(blob)
							aLink.setAttribute('download', '保单信息' + '.xlsx') // 设置下载文件名称
							aLink.click()
							this.$refs.loadElement.appendChild(aLink)
						}
					})
					.catch(error => {
						console.log(error);
					})
			}
		},
		mounted() {
			this.bing();
		}
	}
</script>

<style scoped>
	table {
		margin: 3px;
	}

	#DataReportExcel>>>.el-table th {
		text-align: center;
	}

	#DataReportExcel>>>.el-table td {
		padding: 0px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
</style>
