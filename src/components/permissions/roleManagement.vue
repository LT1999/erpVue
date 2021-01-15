<template>
	<div id="roleManagement">
		<!-- 面包屑 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">系统权限</el-breadcrumb-item>
			<el-breadcrumb-item>角色管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card">
			<!-- 搜索栏 -->
			<el-form :inline="true" :model="searchForm" class="demo-form-inline" size="medium">
				<el-row>
					<el-col :span="12" :push="8">
						<el-form-item label="角色名">
							<el-input v-model="searchForm.name" placeholder="角色名"></el-input>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" @click="searchSubmit">查询</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<el-row>
				<el-col :span="24">
					<el-button type="success" plain size="small" class="operation" @click="addRole">新增角色</el-button>
					<el-button type="danger" plain size="small" class="operation" @click="deleterole">批量删除</el-button>
				</el-col>
			</el-row>

			<!-- 表格 -->
			<template>
				<el-table :data="tableData" border style="width: 100%" @selection-change="checkChange">
					<el-table-column type="selection" width="99px"></el-table-column>
					<el-table-column prop="id" label="ID">
					</el-table-column>
					<el-table-column prop="name" label="角色名">
					</el-table-column>
					<el-table-column prop="note" label="备注">
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="scope">
							<el-button type="text" @click="updateRole(scope.row)">
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

		<el-form :model="roleForm" ref="roleform" :rules="rules">
			<el-dialog :title="title" :visible.sync="FormWindow" width="38%" top="3%" :before-close="reset">
				<el-form-item label="角色名：" label-width="120px">
					<span v-if="roleForm.id!=null && roleForm.id!=''">{{roleForm.name}}</span>
					<el-input v-else v-model="roleForm.name" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="菜单权限：" label-width="120px">
					<el-button type="primary" plain @click="setMenu">设置</el-button>
				</el-form-item>
				<el-form-item label="备注：" label-width="120px" style="width: 90%;">
					<el-input style="width:90%;" v-model="roleForm.note" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"
					 placeholder="请输入内容">
					</el-input>
				</el-form-item>
				<div slot="footer" class="dialog-footer">
					<el-button @click="close">取 消</el-button>
					<el-button type="primary" @click="Submit">确 定</el-button>
				</div>
			</el-dialog>



			<!-- <el-scrollbar style="height: 100%;"> -->
			<el-dialog title="设置菜单权限" :visible.sync="setMenuVisible" width="30%">
				<el-tree :data="treedata" check-strictly ref="tree" default-expand-all show-checkbox node-key="id" :props="defaultProps">
				</el-tree>
				<div slot="footer" class="dialog-footer">
					<el-button @click="setMenuVisible = false">取 消</el-button>
					<el-button type="primary" @click="getCheckedkeys">确 定</el-button>
				</div>
			</el-dialog>

			<!-- </el-scrollbar> -->
		</el-form>


	</div>
</template>

<script>
	export default {
		data() {
			var validateName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入角色名'));
				} else {
					callback();
				}
			};

			return {
				treedata: [],
				num: [],
				treepid: '',
				lazy: true,
				delarr: [],
				defaultProps: {
					children: 'menuslist',
					label: 'title',
					value: 'id'
				},
				title: "",
				setMenuVisible: false,
				FormWindow: false,
				roleForm: {
					id: '',
					name: '',
					note: "",
					menu: ['1', '2']
				},
				rules: {
					roleName: {
						validator: validateName,
						trigger: 'blur'
					}
				},
				searchForm: {
					name: ""
				},
				tableData: [],
				currentPage: 5,
				/* 当前页数 */
				pagesize: 1,
				total: 20,
				/* 总条目数 */
				checkData: [],
				/* 获取选中的数据 */
				checkedKeys: [],
				setCheckedKey: []
			}
		},
		methods: {
			searchSubmit() {
				this.$http.post("http://localhost:8080/Erp-web/roles/SelRolesByName.do", this.$qs.stringify(this.searchForm))
					.then(res => {
						if (res.data.length != 0) {
							this.tableData = res.data
						}else {
							console.log("SelRolesByName错误");
						}
					})
					.catch(err => {
						console.log(err)
					})

			},
			deleteRow(row) {
				//this.tableData.splice(index, 1);
				this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {

					this.$http.post("http://localhost:8080/Erp-web/roles/delRole.do", "rid=" + row.id)
						.then(res => {
							if (res.data != 0) {
								this.selAll();
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
							} else {
								console.log("delRole错误");
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

			updateRole(row) {
				this.roleForm.id = row.id;
				this.roleForm.name = row.name;
				this.roleForm.note = row.note;
				/* 根据id查询该角色的角色id ,将id放入this.roleForm.role中*/
				this.roleForm.menu = [5, 6];
				this.title = " 修 改 角 色 ";
				this.FormWindow = true;

			},
			addRole() {
				this.title = " 新 增 角 色 ";
				this.FormWindow = true;
			},
			setMenu() {
				this.setMenuVisible = true;
				this.selAllMenus();
				if (this.roleForm.id != null && this.roleForm.id != "") {
					this.$http.post("http://localhost:8080/Erp-web/menu-role/SelMenuId.do", "roleId=" + this.roleForm.id)
						.then(res => {
							this.treedata = [];

							if (res.data.length != 0) {
								res.data.forEach(item => {
									this.setCheckedKey.push(item.menuId);
								})
								console.log();
								this.$refs.tree.setCheckedKeys(this.setCheckedKey);
							}else {
								console.log("SelMenuId错误");
							}
						})
						.catch(err => {
							console.log(err)
						})
				}

			},
			Submit() {
				if (this.roleForm.id != null && this.roleForm.id != "") {

					this.$http.post("http://localhost:8080/Erp-web/roles/updateRole.do", this.$qs.stringify(this.roleForm))
						.then(res => {
							if (res.data != 0) {

								this.updateMenuRole();
								this.selAll();

								this.$message({
									type: 'success',
									message: '修改角色成功!'
								});
								this.reset();
							} else {
								console.log("updateRole错误");
							}
						})
						.catch(err => {
							console.log(err)
						})



				} else {

					this.$http.post("http://localhost:8080/Erp-web/roles/AddRoles.do", this.$qs.stringify(this.roleForm))
						.then(res => {
							if (res.data != 0) {
								this.AddMenuRole();
								this.selAll();
								console.log(this.$refs.tree.getCheckedKeys());
								this.$message({
									type: 'success',
									message: '新增角色成功!'
								});
								this.reset();
							} else {
								console.log("AddRoles错误");
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
				this.setCheckedKey = [];
				this.$refs.tree.setCheckedKeys([]);
				this.roleForm.id = "";
				this.roleForm.name = "";
				this.roleForm.note = "";
				/* this.$nextTick(() => {
					this.$refs.tree.setCheckedKeys(list)
				}); */
				/* 取消树控件选中 */
				this.FormWindow = false;
			},
			handleSizeChange(val) { /* pageSize 改变时会触发 */

			},
			handleCurrentChange(val) { /* currentPage 改变时会触发 */
				console.log(`当前页: ${val}`);
			},
			checkChange(val) {
				this.checkData = val;
			},
			deleterole() { /* 批量删除操作 */


				this.$confirm('此操作将永久删除所选中的角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {

					this.checkData.forEach(item => {
						this.delarr.push(item.id);
					})

					this.checkData.forEach(item => {
						this.delarr.push(item.id);
					})
					this.$http.post("http://localhost:8080/Erp-web/roles/delRoles.do", "rid=" + this.delarr)
						.then(res => {
							if (res.data != 0) {
								this.$message({
									type: 'success',
									message: '批量删除成功!'
								});
								this.selAll();
							} else {
								console.log("delRoles错误");
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
			getCheckedkeys() {
				/* 获取树选中的key */
				this.roleForm.menu = this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys());

				this.setMenuVisible = false;
			},
			AddMenuRole() {
				var str = "";
				for (let i = 0; i < this.roleForm.menu.length; i++) {

					if (i == this.roleForm.menu.length - 1) {
						str += this.roleForm.menu[i];
					} else {
						str += this.roleForm.menu[i] + '/';
					}
				}

				this.$http.post("http://localhost:8080/Erp-web/menu-role/AddMenuRole.do", "str=" + str)
					.then(res => {
						if (res.data != 0) {

						}  else {
							console.log("AddMenuRole错误");
						} 
					})
					.catch(err => {
						console.log(err)
					})

			},

			updateMenuRole() {
				var str = "";
				for (let i = 0; i < this.roleForm.menu.length; i++) {

					if (i == this.roleForm.menu.length - 1) {
						str += this.roleForm.menu[i];
					} else {
						str += this.roleForm.menu[i] + '/';
					}
				}

				this.$http.post("http://localhost:8080/Erp-web/menu-role/updateMenuRole.do", "rid=" + this.roleForm.id + "&str=" +
						str)
					.then(res => {

						if (res.data != 0) {

						} else {
							console.log("updateMenuRole错误");
						}
					})
					.catch(err => {
						console.log(err)
					})

			},


			selAll() {
				this.$http.post("http://localhost:8080/Erp-web/roles/SelAllRoles.do")
					.then(res => {
						if (res.data.length != 0) {
							this.tableData = res.data
						} else {
							console.log("SelAllRoles错误");
						} 
					})
					.catch(err => {
						console.log(err)
					})
			},
			selAllMenus() {
				this.$http.post("http://localhost:8080/Erp-web/menus/selAllParent.do")
					.then(res => {
						if (res.data.length != 0) {
							this.treedata = res.data
						} else {
							console.log("selAllParent错误");
						}
					})
					.catch(err => {
						console.log(err)
					})

			},
			
			
			//设置角色菜单权限
						caidan(row){
							this.ids=row.id;
							this.xsVisible=true;
						},
				     	 loadnode(node,resolve){
				     	 	//this.dialogFormVisibles=true;  
				            //如果展开第一级节点，从后台加载一级节点列表
				            if(node.level==0)
				            {
				                this.loadfirstnode(resolve);
				            }
				            //如果展开其他级节点，动态从后台加载下一级节点列表
				            if(node.level>=1)
				            {
				                this.loadchildnode(node,resolve);
				            }
				        },
				        //加载第一级节点
				        loadfirstnode(resolve){         	
				            this.$http.post("http://localhost:8080/erp/menus/loadMenus.do")
				                .then((item) => {
				                    resolve(item.data);
				                    console.log(item.data);
				                })
				        },
				        //刷新树组件
				        refreshtree(){
				            this.$http.post("http://localhost:8080/erp/menus/loadMenus.do")
				                .then((response) => {
				                	console.log(response.data);
				                	this.datas = response.data;
				                })
				        },
			        //加载节点的子节点集合
			        loadchildnode(node,resolve){        	
			        	//alert(node.data.id);
			           this.$http.post('http://localhost:8080/erp/menus/selectMenusIsNotNull.do?pid='+node.data.id)
			                .then((item) => {
			                    resolve(item.data);
			                    this.$http.post("http://localhost:8080/erp/menus/loadMenus.do","roleId="+this.ids)
				                .then((response) => {
				                    console.log(response.data);
				                    if (item.data.length) {
											this.$nextTick(function() {
											item.data.forEach(items => {
											for(var i=0;i<response.data.length;i++){																	
											//如果数据中的id == this.roles[i].id的话 让这一列选中
											 if (items.id == response.data[i].id) {
												this.$refs.tree.setChecked(items,true,false)
													    }
													  }
												})
											})
										}
				                })
			                })
			        },
			
			
			
			
			
			
			
			
		},

		mounted() {
			this.selAll();
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

	/* .el-scrollbar__wrap {
	   overflow-x: hidden;
	} */

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


	.is-leaf.el-tree-node_expand-icon {
		display: none;
	}
</style>
