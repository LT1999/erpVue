<template>
	<div id="pdfDom">
		<el-breadcrumb separator="/" style="margin-bottom: 30px;">
			<el-breadcrumb-item>采购管理</el-breadcrumb-item>
			<el-breadcrumb-item>标准数据报表</el-breadcrumb-item>
			<el-breadcrumb-item>EXCEL标准数据报表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card shadow="always" style="padding: 20px;">
			<el-form ref="searchFrom" inline>
				<el-col>
					<el-form-item label="请选择数据库表的名称">
						<el-select v-model="value" placeholder="请选择" @change="selectChang">
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
					<a id="exportExcel"></a>
					<el-button @click="exportClick()" type="primary" plain style=" margin-left: 20px;font-size: 13px;">导出</el-button>
				</el-col>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import XLSX from 'xlsx'

	export default {
		data() {
			return {
				elExport: '',
				options: [{
					value: '1',
					label: '供应商档案'
				}, {
					value: '2',
					label: '供应商报价单'
				}, {
					value: '3',
					label: '采购总单'
				}],
				value: '',
				option: [{
					value: '1',
					label: 'excel'
				}, {
					value: '2',
					label: 'xml'
				}],
				value2: '',
				datalist: '',
				name: ''
			}
		},
		methods: {
			selectlist1() {
				this.$http.post(this.$api + "/supplierfiles/selectAll")
					.then(res => {
						console.log(res.data);
						this.datalist = res.data;
						this.name = "供应商档案";
					})
					.catch(error => {
						console.log(error);
					})
			},
			selectlist2() {
				this.$http.post(this.$api + "/offer/selectAll")
					.then(res => {
						console.log(res.data);
						this.datalist = res.data;
						this.name = "供应商报价单";
					})
					.catch(error => {
						console.log(error);
					})
			},
			selectlist3() {
				this.$http.post(this.$api + "/purchase/selectAll")
					.then(res => {
						console.log(res.data);
						this.datalist = res.data;
						this.name = "采购总单";
					})
					.catch(error => {
						console.log(error);
					})
			},
			selectChang() {

				if (this.value == 1) {
					this.selectlist1();
				} else if (this.value == 2) {
					this.selectlist2();
				} else if (this.value == 3) {
					this.selectlist3();
				}
			},
			exportClick() {
				if (this.value2 == 1) {
					if (this.value == "") {
						this.$message({
							message: '请选择需打印的表',
							type: 'warning'
						});
					}else{
						this.excel(this.datalist);
					}
				} else if (this.value2 == 2) {
					if (this.value == "") {
						this.$message({
							message: '请选择需打印的表',
							type: 'warning'
						});
					}else{
						this.exportXml();
					}
				} else {
					this.$message({
						message: '请选择打印格式',
						type: 'warning'
					});
				}
			},
			exportXml() {
				// 这里遍历数据，排好我们上面需要的xml格式
				console.log(this.datalist.map)
				let arr = this.datalist.map((item) => { //该处中的datalist是从后台获取数据保存的集合
					let json = {};
					json.yi= item.id; //purchaseplanId、register、registerTime、dispatch是datalist中的属性名
					json.er= item.Supplier_No;
					json.san= item.Supplier_Name;
					json.si= item.Supplier_Address;
					//			        let ipArr = item.ipmac.split(";");
					//			        ipArr.map((val) => {
					//			          json.macs.mac.push({
					//			            _addr: val,
					//			          });
					//			        });
					return json;
				});
				let obj = {
					bwlist: {
						_type: "white",
						acc: arr,
					},
				};
				console.log(obj) // 2222
				// 调用$x2js 将我们的json数据转换成xml数据格式
				let xml = this.$x2js.js2xml(obj);
				// console.log(xml) // 下面就是我们想要的xml文件的数据格式了
				//  <bwlist type="white">
				//		<acc account="0020047843">
				//			<ips />
				//			<macs>
				//				<mac addr="1C872CCC0400" />
				//				<mac addr="308D99148364" />
				//			</macs>
				//		 </acc>
				//	 </bwlist>
				let url = window.URL.createObjectURL(
					new Blob([xml], {
						type: "text/xml"
					})
				);
				console.log(url)
				// 这里会生成一个url   blob:http://www.ceshi.com:111/5a8d3b47-a3e9-40ba-8341-ebb2016fe5f8

				// 然后就可以创建a标签 最后下载下来了
				let link = document.createElement("a");
				link.style.display = "none";
				link.href = url;
				link.setAttribute("download", this.name);
				document.body.appendChild(link);
				link.click();
			},
			excel(rs) {
				let data = [{}]
				for (let k in rs[0]) {
					data[0][k] = k
				}
				data = data.concat(rs)
				console.table(data);
				this.exportExcel(data, this.name)
			},
			// 导出 Excel
			exportExcel(json, downName, type) {
				// 获取列名
				let keyMap = []
				for (let k in json[0]) {
					keyMap.push(k)
				}

				// 用来保存转换好的json
				let tmpdata = []
				json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
					v: v[k],
					position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
				}))).reduce((prev, next) => prev.concat(next)).forEach(function(v) {
					tmpdata[v.position] = {
						v: v.v
					}
				})

				let outputPos = Object.keys(tmpdata) // 设置区域，比如表格从A1到D10
				let tmpWB = {
					SheetNames: ['mySheet'], // 保存的表标题
					Sheets: {
						'mySheet': Object.assign({},
							tmpdata, // 内容
							{
								'!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
							})
					}
				}
				// 创建二进制对象写入转换好的字节流
				let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB, {
						bookType: (type === undefined ? 'xlsx' : type),
						bookSST: false,
						type: 'binary'
					} // 这里的数据是用来定义导出的格式类型
				))], {
					type: ''
				})

				this.elExport.download = downName + '.xlsx' // 下载名称
				this.elExport.href = URL.createObjectURL(tmpDown) // 绑定a标签到新创建对象超链接
				this.elExport.click() // 模拟点击实现下载

				// 释放，用 URL.revokeObjectURL() 释放
				setTimeout(() => URL.revokeObjectURL(tmpDown), 100)
			},
			// 字符串转字符流
			s2ab(s) {
				var buf = new ArrayBuffer(s.length)
				var view = new Uint8Array(buf)
				for (var i = 0; i !== s.length; ++i) {
					view[i] = s.charCodeAt(i) & 0xFF
				}
				return buf
			},
			// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
			getCharCol(n) {
				let s = ''
				let m = 0
				while (n > 0) {
					m = n % 26 + 1
					s = String.fromCharCode(m + 64) + s
					n = (n - m) / 26
				}
				return s
			}
		},
		mounted() {
			this.elExport = document.getElementById('exportExcel');
		}
	}
</script>

<style scoped>

</style>
