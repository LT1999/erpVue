<template>
	<div class="login">

		<!--容器-->
		<el-row>

			<el-col :span="14" :push="5">
				<el-container>
					<el-main>
						<!--登录框-->
						<div class="login-main">
							<h2>欢迎回来</h2>
							<el-form ref="form" :rules="rules" :model="form" label-width="80px" label-position="top">
								<el-form-item label="用户名" prop="userName">
									<el-col :span="12" :push="6" style="padding: 0px;">
										<el-input v-model="form.userName"></el-input>
									</el-col>
								</el-form-item>
								<el-form-item label="密码" prop="password">
									<el-col :span="12" :push="6" style="padding: 0px;">
										<el-input type="password" v-model="form.password"></el-input>
									</el-col>
								</el-form-item>

								<el-form-item>
									<el-button type="warning" round @click="onSubmit(form)"> 登 录 </el-button>
								</el-form-item>
							</el-form>
						</div>

					</el-main>

					<el-aside class="login-bgimg">
						 <h2 style="font-size: 30px; color: white;margin-top: 190px; font-weight: 500;">E&emsp;R&emsp;P</h2>
						<p style="font-size: 20px;color: white;">企业管理信息化管理系统</p>
						
					</el-aside>

				</el-container>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			var validateName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入用户名'));
				} else if (value.length < 3) {
					callback(new Error('长度要大于 3 个字符'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			return {
				form: {
					userName: "",
					password: ""
				},
				rules: {
					userName: {
						validator: validateName,
						trigger: 'blur'
					},
					password: {
						validator: validatePass,
						trigger: 'blur'
					}
				}
			}
		},
		methods: {
			onSubmit() {
				this.$refs.form.validate((valid) => {
					if (valid) {

						this.login();

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			login() {

				this.$http.post("http://localhost:8080/Erp-web/users/login.do", this.$qs.stringify(this.form))
					.then(res => {
						if (res.data.length === 1) {
							// alert("欢迎您！"+res.data[0].userName);
							this.$message({
								type: 'success',
								message: "欢迎您！" + res.data[0].userName
							});
							window.sessionStorage.setItem("val", JSON.stringify(res.data));
							this.$router.push({
								path: '/main',
								query: {
									val: res.data
								}
							});
						} else if (res.data.length == 0) {
							this.$message({
								type: 'error',
								message: "请检查密码或帐户是否正确"
							});

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
	.login {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #E9EEF3;
	}

	* {
		margin: 0;
		padding: 0px;
	}

	h2 {
		margin: 30px;
		margin-top: 70px;
	}

	.register {
		border: 2px white solid;
		color: white;
		display: inline-block;
		border-radius: 50px;
		line-height: 30px;
		min-width: 100px;
		font-size: 17px;
		font-weight: 300;
		margin-top: 250px;
	}

	a {
		font-size: 13px;
		color: #C0C4CC;
		text-decoration: underline;
	}

	.login-main {
		margin-bottom: 80px;
	}






	.login>>>.el-container {
		box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
	}

	.login>>>.el-aside {
		background-image: url(../../assets/login/雪山.jpg);
		background-size: cover;
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		padding: 30px;
	}

	.login>>>.el-main {
		background-color: white;
		color: #333;
		text-align: center;
		height: 564px;
	}

	.login>>>.el-row {
		margin-top: 50px;
	}

	.login>>>.el-input input {
		border: none;
		border-bottom: 1px solid #000;
		border-radius: 0;
		text-align: center;
		font-size: 17px;
		color: #000000;
	}

	.login>>>.el-form-item__error {
		left: 145px;
	}

	.login>>>.el-form-item__label {
		line-height: 20px;
		margin-top: 40px;
		font-size: 13px;
		color: #C0C4CC;
	}

	.login>>>.el-button {
		margin-top: 60px;
		width: 280px;
	}

	.login>>>.el-form--label-top .el-form-item__label {
		padding: 0px;
	}
</style>
