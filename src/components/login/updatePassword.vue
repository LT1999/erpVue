<template>
	<div class="updatePassword">
		<el-row type="flex" justify="center">
			<el-col :span="16" >
				<el-card class="box-card">
				  
				
				
				<el-steps :active="active" space="650px" style="" align-center>
				  <el-step title="步骤 一" icon="el-icon-user" description="请输入用户名与密码"></el-step>
				  <el-step title="步骤 二" icon="el-icon-edit" description="请输入新密码"></el-step>
				  <el-step title="步骤 三" icon="el-icon-circle-check" description="修改完成"></el-step>
				</el-steps>
				<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
					<div v-if="active==1" class="step-main">
						<el-col :span="12" :push="5">
							<el-form-item prop="userName" label="用户名">
								<el-input  v-model="form.userName" placeholder="用户名"/>
						  	</el-form-item>
						  	<br />
						  	<el-form-item  prop="userPassword" label="密码">
								<el-input  type="password" v-model="form.userPassword" placeholder="密码"></el-input>
							</el-form-item>
						</el-col>
					</div>
					<div class="step-main" v-if="active==2">
						<el-col :span="12" :push="5">
							
							<el-form-item prop="newPassword" label="新密码">
								<el-input  v-model="form.newPassword" placeholder="新密码"/>
						  	</el-form-item>
						  		<br />
						  	<el-form-item  prop="confirmPassword" label="确认密码">
								<el-input  type="password" v-model="form.confirmPassword" placeholder="确认密码"></el-input>
							</el-form-item>
							
						</el-col>
					</div>
					<div v-if="active==3">
						<router-link to="/" tag="h2" style="text-align: center;margin-top: 100px;">
						<a style="text-decoration: none;color: #67C23A;">
							<i class="el-icon-circle-check"></i>
							&nbsp;修改成功，点击返回登录
						</a>	
						</router-link>
					
				</div>
					
					
					
				</el-form>
				
				<router-link to="/" tag="el-button" v-show="active==1" class="button" style="width: 90px;">返回</router-link>
				<el-button  v-show="active<3 && active!=1" @click="previous" class="button">上一步</el-button>
				<el-button  v-show="active<2" @click="next" class="button">下一步</el-button>
				<el-button  v-show="active==2" @click="onSubmit" class="button">提交</el-button>
			</el-card>
			</el-col>
			
		</el-row>
	</div>
	
	
</template>

<script>
	export default {
		data(){
			
			/*自定义表单验证*/
			var validateName = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入用户名'));
		        } else if(value.length < 3){
		        	callback(new Error('长度要大于 3 个字符'));
		        }else{
		        	callback();
		        }
		    };
			var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          	callback(new Error('请输入密码'));
		        } else{
		        	callback();
		        }
		    };
		    var validateConfirm=(rule,value,callback)=>{
		    	 if (value === '') {
		          	callback(new Error('请再次输入密码'));
		        }  else if (value !== this.form.newPassword) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		    };
		    
		   /* 数据*/
			return{
				active:1,/*步骤条起始位置*/
				form:{/*表单*/
					userName:"",
					userPassword:"",
					newPassword:"",
					confirmPassword:""
				},
				rules:{/*表单验证*/
					userName:{ validator: validateName, trigger: 'blur' },
			        userPassword:{ validator: validatePass, trigger: 'blur' },
			        newPassword:{ validator: validatePass, trigger: 'blur' },
			        confirmPassword:{validator: validateConfirm, trigger: 'blur'},
			       
				}
			}
		},

    methods: {
      	next() {
      		/*异步查询用户密码正确,在异步成功修改active++,修改密码提交表单*/
	        if (this.active==1) {
	        	alert("验证用户名密码是否正确");
	        }
	        if (this.active++ > 2){
	        	this.active=0;
	        }
	        
      	},
      	previous(){
      		
      		if(this.active-- < 0){
      			this.active=1;
      		}
      	},
      	onSubmit() {
	        alert("修改密码");
	        this.active++;
	    }
      
    }
		
	}
	
</script>

<style scoped>
	.step-main{
		 margin-top: 60px;
		 padding: 50px;
		 padding-bottom: 30px;
	}
	.box-card{
		padding: 50px;
		min-height: 60%;
		margin-top: 30px;
	}
	.updatePassword{
		height: 720px;
		background-color: #F0F8FF;
	}
	.button{
		/*margin-top: 200px;*/
		margin-left:230px ;
	}
	.demo-ruleForm{
		min-height: 300px;
	}
	.updatePassword >>> h2{
		color: #67C23A;
		font-weight: 300;
	}
</style>