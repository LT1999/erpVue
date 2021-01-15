<template>
	<div id="roleManagement">
		<!-- 面包屑 -->
		<el-breadcrumb>
			<el-breadcrumb-item>系统权限</el-breadcrumb-item>
			<el-breadcrumb-item>菜单管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card">
			<!-- 搜索栏 -->
			<el-form :inline="true" :model="searchForm" class="demo-form-inline" size="medium">
				<el-row>
					<el-col :span="12" :push="8">
						<el-form-item label="菜单名">
							<el-input v-model="searchForm.title" placeholder="菜单名"></el-input>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" @click="searchSubmit">查询</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<el-row>
				<el-col :span="24">
					<el-button type="success" plain size="small" class="operation" @click="addMenu">新增菜单</el-button>
					<el-button type="danger" plain size="small" class="operation" @click="deleteMenu">批量删除</el-button>
				</el-col>
			</el-row>

			<!-- 表格 -->
			<template>
				<el-table :data="tableData" border style="width: 100%" @selection-change="checkChange">
					<el-table-column type="selection"></el-table-column>
					<el-table-column prop="id" label="ID">
					</el-table-column>
					<el-table-column prop="title" label="菜单名" width="150px">
					</el-table-column>
					<el-table-column prop="parentId" label="父菜单">
					</el-table-column>
					<el-table-column prop="index" label="链接">
					</el-table-column>
					<el-table-column prop="icon" label="图标">
						<template slot-scope="scope">
							<i :class="scope.row.icon"></i>
						</template>
					</el-table-column>
					<el-table-column prop="status" label="状态">
						<template slot-scope="scope">
							<el-button size="mini" type="success" @click="updateStatus(scope.row)" v-if="scope.row.status=='正常'">{{scope.row.status}}</el-button>
							<el-button size="mini" type="danger" @click="updateStatus(scope.row)" v-else>{{scope.row.status}}</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="note" label="备注">
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="scope">
							<el-button type="text" @click="updateMenu(scope.row)">
								<i class="el-icon-edit"></i><!-- 编辑 -->
							</el-button>
							<el-button @click="deleteRow(scope.row)" type="text">
								<i class="el-icon-delete"></i><!-- 删除 -->
							</el-button>
						</template>
					</el-table-column>

				</el-table>
			</template>

			<!-- 分页 -->

			<!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
			 :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" layout="sizes, prev, pager, next, jumper" :total="total">
			</el-pagination> -->

		</el-card>

		<el-form :model="menuForm" ref="menuForm" :rules="rules">
			<el-dialog :title="title" :visible.sync="FormWindow" width="38%" top="3%" :before-close="reset">
				<el-form-item label="菜单名：" label-width="120px">
					<span v-if="menuForm.id!=null && menuForm.id!=''">{{menuForm.title}}</span>
					<el-input v-else v-model="menuForm.title" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="父级菜单：" label-width="120px">
					<el-select v-model="menuForm.parentId">
						<el-option label="无父级菜单" value="0"></el-option>
						<el-option v-if="data.id!=menuForm.id" :key="data.id" v-for="data in tableData" :label="data.title" :value="data.id"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="链接路径：" label-width="120px">
					<el-input v-model="menuForm.index" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="图标：" label-width="120px">
					<el-input v-model="menuForm.icon" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="状态：" label-width="120px">
					<el-select v-model="menuForm.status" placeholder="请选择状态">
						<el-option label="正常" value="正常"></el-option>
						<el-option label="禁用" value="禁用"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注：" label-width="120px" style="width: 90%;">
					<el-input style="width:90%;" v-model="menuForm.note" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"
					 placeholder="请输入内容">
					</el-input>
				</el-form-item>
				<div slot="footer" class="dialog-footer">
					<el-button @click="reset">取 消</el-button>
					<el-button type="primary" @click="Submit">确 定</el-button>
				</div>
			</el-dialog>


		</el-form>


	</div>
</template>

<script>
	export default {
		data() {
			var validateName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入菜单名'));
				} else {
					callback();
				}
			};

			return {
				title: "",
				FormWindow: false,
				menuForm: {
					id: '',
					title: '',
					parentId: '',
					index: '',
					icon: '',
					status: '',
					note: ''
				},
				rules: {
					menuName: {
						validator: validateName,
						trigger: 'blur'
					}
				},
				searchForm: {
					title: ""
				},
				tableData: [],
				currentPage: 5,
				/* 当前页数 */
				pagesize: 1,
				total: 20,
				/* 总条目数 */
				checkData: [],
				/* 获取选中的数据 */
				delarr: [],
				/* 要删除的id数组 */
			}
		},
		methods: {
			searchSubmit() {

				this.$http.post("http://localhost:8080/Erp-web/menus/selMenuByname.do", "title=" + this.searchForm.title)
					.then(res => {
						if (res.data.length != 0) {
							this.tableData = res.data
						} else {
							console.log("selMenuByname错误");
						}
					})
					.catch(err => {
						console.log(err)
					})



			},
			updateStatus(row) {
				if (row.status == '正常') {
					row.status = "禁用";
				} else {
					row.status = "正常";
				}

				this.$http.post("http://localhost:8080/Erp-web/menus/updateStatus.do", "status=" + row.status + "&id=" + row.id)
					.then(res => {
						if (res.data != 0) {

						} else {
							console.log("updateStatus错误");
						}
					})
					.catch(err => {
						console.log(err)
					})





			},
			deleteRow(row) {
				this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {

					this.$http.post("http://localhost:8080/Erp-web/menus/delMenu.do", "mid=" + row.id)
						.then(res => {
							if (res.data != 0) {
								this.selAllMenus();
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
							} else {
								console.log("delMenu错误");
							}
						})
						.catch(err => {
							console.log(err)
						})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			updateMenu(row) {
				this.menuForm.id = row.id;
				this.menuForm.title = row.title;
				this.menuForm.parentId = row.parentId;
				this.menuForm.index = row.index;
				this.menuForm.icon = row.icon;
				this.menuForm.status = row.status;
				this.menuForm.note = row.note;
				this.title = " 修 改 菜 单 ";
				this.FormWindow = true;

			},
			addMenu() {
				this.title = " 新 增 菜 单 ";
				this.FormWindow = true;
			},
			Submit() {
				if (this.menuForm.id != null && this.menuForm.id != "") {
					this.$http.post("http://localhost:8080/Erp-web/menus/updateMenu.do", this.$qs.stringify(this.menuForm))
						.then(res => {
							if (res.data != 0) {
								this.$message({
									type: 'success',
									message: '修改成功!'
								});
								this.selAllMenus();
								this.reset();
							} else {
								console.log("updateMenu错误");
							}
						})
						.catch(err => {
							console.log(err)
						})



				} else {
					this.$http.post("http://localhost:8080/Erp-web/menus/addMenus.do", this.$qs.stringify(this.menuForm))
						.then(res => {
							if (res.data != 0) {
								this.$message({
									type: 'success',
									message: '新增成功!'
								});
								this.selAllMenus();
								this.reset();
							} else {
								console.log("addMenus错误");
							}
						})
						.catch(err => {
							console.log(err)
						})
				}

			},
			close() {
				this.reset();
			},
			reset() {
				/* 关闭弹窗清空form表单 */
				this.menuForm.id = "";
				this.menuForm.title = "";
				this.menuForm.parentId = "0";
				this.menuForm.index = "";
				this.menuForm.icon = "";
				this.menuForm.status = "正常";
				this.menuForm.note = "";
				this.title = "";
				this.FormWindow = false;
			},
			handleSizeChange(val) { /* pageSize 改变时会触发 */

			},
			handleCurrentChange(val) { /* currentPage 改变时会触发 */
				console.log('当前页: ${val}');
			},
			checkChange(val) {
				this.checkData = val;
			},
			deleteMenu() { /* 批量删除操作 */
				this.$confirm('此操作将永久删除所选中的菜单, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {

					this.checkData.forEach(item => {
						this.delarr.push(item.id);
					})

					this.$http.post("http://localhost:8080/Erp-web/menu-role/delMenus.do", "mid=" + this.delarr)
						.then(res => {
							if (res.data.length != 0) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.selAllMenus();
							} else {
								console.log("delMenus错误");
							}
						})
						.catch(err => {
							console.log(err)
						})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			selAllMenus() {
				this.$http.post("http://localhost:8080/Erp-web/menus/selAll.do")
					.then(res => {
						if (res.data.length != 0) {
							this.tableData = res.data
						} else {
							console.log("selAll错误");
						}
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		mounted() {
			this.selAllMenus();
		}
	}
</script>

<style scoped>
	#roleManagement {
		padding: 20px;
	}

	.box-card {
		padding: 20px;
	}

	#roleManagement>>>.el-dialog__header {
		padding: 20px;
	}

	.operation {
		margin: 10px 10px;
	}

	.el-pagination {
		width: 45%;
		margin: 20px auto;
	}

	#roleManagement>>>.el-dialog__body {
		padding: 20px 10px;
	}

	#roleManagement>>>.el-checkbox__label {
		font-size: 12px;
		margin: 0px;
	}

	#roleManagement>>>.el-transfer-panel__body {
		height: 150px;

	}

	#roleManagement>>>.el-transfer-panel__list {
		height: 150px;
	}

	.dialog-footer .el-button:nth-child(2) {
		margin: 10px 65px;
	}

	.el-card {
		margin-top: 30px;
	}

	#roleManagement>>>.el-dialog .el-input__inner {
		width: 342px;
	}

	#roleManagement>>>.el-transfer-panel {
		width: 180px;
	}

	.el-form {
		margin-top: 10px;
	}

	#roleManagement>>>.el-table th {
		background-color: #F2F8FD;
		text-align: center;
	}

	#roleManagement>>>.el-table td {
		padding: 0px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}

	.el-alert {
		padding: 0px;
		min-width: 10px;
	}
</style>
