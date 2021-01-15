<template>
	<div id="userManagement">
		<!-- 面包屑 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">系统权限</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card">
			<!-- 搜索栏 -->
			<el-form :inline="true" :model="searchForm" class="demo-form-inline" size="medium">
				<el-row>
					<el-col :span="16" :push="4">
						<el-form-item label="用户名">
							<el-input v-model="searchForm.userName" placeholder="用户名"></el-input>
						</el-form-item>
						<el-form-item label="状态">
							<el-select v-model="searchForm.status" placeholder="状态">
								<el-option label="全部" value="全部"></el-option>
								<el-option label="正常" value="正常"></el-option>
								<el-option label="禁用" value="禁用"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="searchSubmit">查询</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<el-row>
				<el-col :span="24">
					<el-button type="success" plain size="small" class="operation" @click="FormWindow=true">新增用户</el-button>
					<el-button type="danger" plain size="small" class="operation" @click="deleteUser">批量删除</el-button>
				</el-col>
			</el-row>

			<!-- 表格 -->
			<template>
				<el-table :data="tableData" border style="width: 100%" @selection-change="checkChange">
					<el-table-column type="selection" width="99px"></el-table-column>
					<el-table-column prop="id" label="ID">
					</el-table-column>
					<el-table-column prop="userName" label="用户名">
					</el-table-column>
					<el-table-column prop="status" label="状态">
						<template slot-scope="scope">
							<el-button size="mini" type="success" @click="updateStatus(scope.row)" v-if="scope.row.status=='正常'">{{scope.row.status}}</el-button>
							<el-button size="mini" type="danger" @click="updateStatus(scope.row)" v-if="scope.row.status=='禁用'">{{scope.row.status}}</el-button>
						</template>
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
			<!-- <el-row>
				<er-col :span="11" :push="6" style="border: 1px solid seagreen;"> -->
			<!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
			 :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" layout="sizes, prev, pager, next, jumper" :total="total">
			</el-pagination> -->
			<!-- 	</er-col>
			</el-row> -->
		</el-card>

		<!--修改,新增-->
		<el-form :model="userForm" ref="userform" :rules="rules">
			<el-dialog :title="title" :visible.sync="FormWindow" width="36%" top="3%" :before-close="reset">
				<el-form-item prop="userName" label="用户名：" label-width="120px">
					<span v-if="userForm.id!=null && userForm.id!=''">{{userForm.userName}}</span>
					<el-input @blur="userNameChange" v-else v-model="userForm.userName" auto-complete="off"></el-input>

				</el-form-item>
				<el-form-item label="密码：" prop="userPassword" label-width="120px">
					<el-input v-model="userForm.password" type="password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码：" prop="confirmPassword" label-width="120px">
					<el-input v-model="userForm.confirmPassword" type="password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色：" label-width="120px">
					<el-button type="primary" plain @click="setRoles">设置</el-button>
				</el-form-item>
				<el-form-item label="状态：" label-width="120px">
					<el-select v-model="userForm.status" placeholder="请选择状态">
						<el-option label="正常" value="正常"></el-option>
						<el-option label="禁用" value="禁用"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="密保问题：" prop="problem" label-width="120px">
					<el-input v-model="userForm.problem" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="答案：" prop="answer" label-width="120px">
					<el-input  v-model="userForm.answer" auto-complete="off"></el-input>
				</el-form-item>


				<div slot="footer" class="dialog-footer">
					<el-button @click="close">取 消</el-button>
					<el-button type="primary" @click="Submit">确 定</el-button>
				</div>
				<!-- 设置菜单 -->
			</el-dialog>
			<el-dialog title="设置角色" :before-close="closeQx" :visible.sync="setRoleVisible" width="40%" style="padding: 20px;">
				<el-transfer :titles="['未拥有角色','已拥有角色']" v-model="role" :data="transferValue"></el-transfer>
				<div slot="footer" class="dialog-footer">
					<el-button @click="closeQx">取 消</el-button><!--  -->
					<el-button type="primary" @click="RolesSubmit">确 定</el-button>
				</div>
			</el-dialog>
		</el-form>
		<!--新增用户-->
		<!-- <el-dialog title=" 新 增 用 户 " :visible.sync="addFormWindow" width="50%" top="3%">
			<el-form :model="userForm" ref="userform" :rules="rules">
				<el-form-item label="用户名：" prop="userName" label-width="120px">
					<el-input v-model="userForm.userName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码：" prop="userPassword" label-width="120px">
					<el-input v-model="userForm.password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码：" prop="confirmPassword" label-width="120px">
					<el-input v-model="userForm.confirmPassword" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态：" label-width="120px">
					<el-select v-model="userForm.status" placeholder="请选择状态">
						<el-option label="正常" value="正常"></el-option>
						<el-option label="禁用" value="禁用"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="角色：" label-width="120px">
					<el-transfer :titles="['未拥有角色','已拥有角色']" v-model="userForm.role" :data="transferValue"></el-transfer>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addclose">取 消</el-button>
				<el-button type="primary" @click="addSubmit">确 定</el-button>
			</div>
		</el-dialog> -->


	</div>
</template>

<script>
	export default {
		data() {
			//用户新增时验证用户名
			var validateName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入用户名'));
				} else if (value.length < 3) {
					callback(new Error('长度要大于 3 个字符'));
				} else if (this.textbool) {
					callback(new Error('用户名重复'));
					this.textbool = false
				} else {
					callback();
				}
			};

			//用户新增时验证密码
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};

			//用户新增时验证密码是否一致
			var validateConfirm = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.userForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				transferValue: [], //左侧全部角色
				setRoleVisible: false, //设置角色模态框
				FormWindow: false, //添加用户模态框
				textbool: false, //验证用户名是否重复
				title: "", //模态框标题
				role: [], //右侧选择的角色列表
				delarr: [],
				userForm: { //新增模态框中的数据
					id: '', //id
					userName: '', //用户名
					status: '', //状态
					password: '', //密码
					confirmPassword: '', //再次输入密码
					problem: '', //问题
					answer: '' //答案
				},
				rules: { //新增用户时的输入规则
					userName: {
						validator: validateName,
						trigger: 'blur'
					},
					userPassword: {
						validator: validatePass,
						trigger: 'blur'
					},
					confirmPassword: {
						validator: validateConfirm,
						trigger: 'blur'
					}
				},
				searchForm: { //搜索框的数据
					userName: "",
					status: "全部"
				},
				tableData: [], //表格中的数据（从数据库获得）
				currentPage: 5,
				/* 当前页数 */
				pagesize: 1,
				total: 20,
				/* 总条目数 */
				checkData: [] /* 获取选中的数据 */
			}
		},
		methods: {
			searchSubmit() {
				//根据条件查询
				this.$http.post("http://localhost:8080/Erp-web/users/selUsers.do", this.$qs.stringify(this.searchForm))
					.then(res => {
						if (res.data != null) {
							this.tableData = res.data;
						} else {
							console.log('selUsers错误');
						}
					})
					.catch(err => {
						console.log(err)
					})



			},
			updateStatus(row) {
				//点击按钮实现状态切换
				if (row.status == '正常') {
					row.status = "禁用";
				} else {
					row.status = "正常";
				}


				this.$http.post("http://localhost:8080/Erp-web/users/updateStatus.do", "status=" + row.status + "&id=" + row.id)
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
				//删除表中用户
				//this.tableData.splice(index, 1);
				 this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.$http.post("http://localhost:8080/Erp-web/users/delUser.do", "id=" + row.id)
						.then(res => {
							if (res.data != 0) {
								this.selAllUsers();
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
							} else {
								console.log("delUser错误");
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
				//修改用户信息
				this.userForm.id = row.id;
				this.userForm.userName = row.userName;
				this.userForm.status = row.status;
				this.userForm.password = row.password;
				this.userForm.confirmPassword = row.password;
				this.userForm.problem = row.problem;
				this.userForm.answer = row.answer;
				/* 根据id查询该用户的角色id ,将id放入this.userForm.role中*/
				this.role = [];
				this.title = " 修 改 用 户 ";
				this.FormWindow = true;

			},
			addUser() {
				//弹出模态框按钮给title赋值
				this.title = " 新 增 用 户 ";
				this.FormWindow = true;
			},
			Submit() {

				//弹出模态框 判断时修改还是新增（修改未实现）
				if (this.userForm.id != null && this.userForm.id != "") {
					this.$http.post("http://localhost:8080/Erp-web/users/updateUser.do", this.$qs.stringify(this.userForm))
						.then(res => {
							if (res.data != 0) {
								this.$message({
									type: 'success',
									message: '修改成功!'
								});
								this.delUserRole();
								this.updateUserRole();
								this.selAllUsers();
								this.reset();
							} else {
								console.log("updateUser错误");
							}
						})
						.catch(err => {
							console.log(err)
						})



				} else {
					//新增用户
					/* this.userarr.list.push(this.userForm,this.role); */
					this.$http.post("http://localhost:8080/Erp-web/users/addUser.do", this.$qs.stringify(this.userForm))
						.then(res => {
							if (res.data != 0) {
								this.$message({
									type: 'success',
									message: '新增成功!'
								});
								this.addRoles();
								this.selAllUsers();

								this.reset();
							} else {
								console.log("addUser错误");
							}
						})
						.catch(err => {
							console.log(err)
						})
					this.FormWindow = false;
				}

			},
			setRoles() {
				//查询所有角色
				this.setRoleVisible = true
				this.$http.post("http://localhost:8080/Erp-web/roles/SelAllRoles.do")
					.then(res => {
						if (res.data.length != 0) {
							for (let i = 0; i < res.data.length; i++) {

								this.transferValue.push({
									label: res.data[i].name,
									key: res.data[i].id,

								})

							}

						} 
					})
					.catch(err => {
						console.log(err)
					})
				if (this.userForm.id != null && this.userForm.id != "") {
					this.$http.post("http://localhost:8080/Erp-web/user-role/selRoleid.do", "userid=" + this.userForm.id)
						.then(res => {
							console.log(res.data)
							if (res.data.length != 0) {

								res.data.forEach(item => {
									this.role.push(item.roleId);
								})

							}
						})
						.catch(err => {
							console.log(err)
						})
				}


			},
			RolesSubmit() {
				//关闭模态框
				this.setRoleVisible = false;
				this.transferValue = [];
			},
			close() {
				//关闭模态框清空数据
				this.reset();
			},
			reset() {
				//关闭模态框清空数据
				this.userForm.id = "";
				this.userForm.userName = "";
				this.userForm.status = "";
				this.userForm.password = "";
				this.userForm.confirmPassword = "";
				this.userForm.answer = "";
				this.userForm.problem = "";
				this.role = [];
				this.FormWindow = false;
				this.transferValue = []
			},
			closeQx() {
				//关闭设置角色模态框
				this.setRoleVisible = false;
				this.transferValue = [];
			},
			handleSizeChange(val) { /* pageSize 改变时会触发 */

			},
			handleCurrentChange(val) { /* currentPage 改变时会触发 */
				console.log(`当前页: ${val}`);
			},
			checkChange(val) {
				this.checkData = val;
			},
			deleteUser() { /* 删除操作 */


				this.$confirm('此操作将永久删除所选中的用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {

					this.checkData.forEach(item => {
						this.delarr.push(item.id);
					})
					console.log(this.delarr);
					this.$http.post("http://localhost:8080/Erp-web/users/delUsers.do", "id=" + this.delarr)
						.then(res => {
							if (res.data != 0) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.selAllUsers();
							} else {
								console.log("delUsers错误");
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
			addRoles() {
				//为用户添加角色；
				var arr = "";
				for (let i = 0; i < this.role.length; i++) {

					if (i == this.role.length - 1) {
						arr += this.role[i];
					} else {
						arr += this.role[i] + '/';
					}
				}
				this.$http.post("http://localhost:8080/Erp-web/user-role/addUserRole.do", "arr=" + arr)
					.then(res => {
						if (res.data != 0) {

							this.role = [];
						} else {
							console.log("addUserRole错误");
						}
					})
					.catch(err => {
						console.log(err)
					})

			},
			selAllUsers() {
				this.$http.post("http://localhost:8080/Erp-web/users/selAllUsers.do")
					.then(res => {
						if (res.data != null) {
							this.tableData = res.data;
						} else {
							console.log("selAllUsers错误");
						}
					})
					.catch(err => {
						console.log(err)
					})

			},
			delUserRole() {
					
					this.$http.post("http://localhost:8080/Erp-web/user-role/delUserRole.do", "uid=" + this.userForm.id)
						.then(res => {
							
						})
						.catch(err => {
							console.log(err)
						})
					
					
			},
			updateUserRole() {
				console.log(this.userForm.id)
				this.$http.post("http://localhost:8080/Erp-web/user-role/updateUserRole.do", "rid=" + this.role + "&uid=" + this.userForm
						.id)
					.then(res => {
						if (res.data != 0) {
							console.log(this.role);
							this.role = [];
						} else {
							console.log("updateUserRole错误");
						}
					})
					.catch(err => {
						console.log(err)
					})

			}

		},
		mounted() {
			this.selAllUsers();
		},
		computed: {
			userNameChange() {
				this.$http.post("http://localhost:8080/Erp-web/users/selUserName.do", this.$qs.stringify(this.userForm))
					.then(res => {
						if (res.data > 0) {
							this.textbool = true;
						}
					})
					.catch(err => {
						console.log(err)
					})
			}
		}
	}
</script>

<style scoped>
	#userManagement {
		padding: 20px;
	}

	.box-card {
		padding: 20px;
	}

	#userManagement>>>.el-dialog__header {
		padding: 20px;
	}

	.operation {
		margin: 10px 10px;
	}

	.el-pagination {
		width: 45%;
		margin: 20px auto;
	}

	.dialog-footer .el-button:nth-child(2) {
		margin: 10px 30px;
	}

	.el-card {
		margin-top: 30px;
	}

	#userManagement>>>.el-dialog .el-input__inner {
		width: 342px;
	}

	#userManagement>>>.el-transfer-panel {
		width: 180px;
	}

	.el-form {
		margin-top: 10px;
	}

	#userManagement>>>.el-table th {
		background-color: #F2F8FD;
		text-align: center;
	}

	#userManagement>>>.el-table td {
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
