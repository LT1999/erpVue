<template>
	
	<div class="ForgetPassword">
		<el-row type="flex" justify="center">
			<el-col :span="18" >
				<el-card class="box-card">
				  
				
				
				<el-steps :active="active"  align-center>
				  <el-step title="步骤 一" icon="el-icon-user" description="请输入用户名"></el-step>
				  <el-step title="步骤 二" icon="el-icon-edit" description="请输入答案"></el-step>
				   <el-step title="步骤 三" icon="el-icon-edit" description="重置密码"></el-step>
				  <el-step title="步骤 四" icon="el-icon-circle-check" description="修改完成"></el-step>
				</el-steps>
				<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
					<div v-if="active==1" class="step-main">
						<el-col :span="11" :push="6">
							<el-form-item prop="userName" label="用户名">
								<el-input  v-model="form.userName" placeholder="用户名"/>
						 	</el-form-item>
						</el-col>
					</div>
					<div class="step-main" v-if="active==2">
						<el-col :span="12" :push="5">
							
							<label class="answer">{{answer}}</label>
						  	<el-form-item  prop="answer">
								<el-input v-model="form.answer" placeholder="请输入答案"></el-input>
							</el-form-item>
							
						</el-col>
					</div>
					
					<div class="step-main" v-if="active==3">
						<el-col :span="11" :push="6">
							
							<el-form-item prop="newPassword" label="新密码">
								<el-input  v-model="form.newPassword" placeholder="新密码"/>
						  	</el-form-item>
						  		<br />
						  	<el-form-item  prop="confirmPassword" label="确认密码">
								<el-input  type="password" v-model="form.confirmPassword" placeholder="确认密码"></el-input>
							</el-form-item>
							
						</el-col>
					
					</div>
					
					<div v-if="active==4">
						<router-link to="/" tag="h2" style="text-align: center;margin-top: 100px;">
						<a style="text-decoration: none;color: #67C23A;">
							<i class="el-icon-circle-check"></i>
							&nbsp;重置密码成功，点击返回登录
						</a>	
						</router-link>
					
					</div>
					
					
					
				</el-form>
				
				
				<router-link to="/" tag="el-button" v-show="active==1" class="button" style="width: 90px;">返回</router-link>
				<el-button  v-show="active<4 && active!=1" @click="previous" class="button">上一步</el-button>
				<el-button  v-show="active<3" @click="next" class="button">下一步</el-button>
				<el-button  v-show="active==3" @click="onSubmit" class="button">提交</el-button>
				
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
			var validateAnswer = (rule, value, callback) => {
		        if (value === '') {
		          	callback(new Error('请输入答案'));
		        } else{
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
			
			return{
				active:1,
				answer:"你的问题？",
				form:{
					userName:"",
					newPassword:"",
					confirmPassword:"",
					answer:""
				},
				rules:{/*表单验证*/
					userName:{ validator: validateName, trigger: 'blur' },
			        validateAnswer:{ validator: validatePass, trigger: 'blur' },
			        newPassword:{ validator: validatePass, trigger: 'blur' },
			        confirmPassword:{validator: validateConfirm, trigger: 'blur'},
			       
				}
			}
		},

	    methods: {
	      	next() {
		        if (this.active==1) {
		        	alert("查询用户忘记密码的问题");
		        }else if(this.active==2){
		        	alert("判断答案是否正确");
		        }
		        
		        if (this.active++ > 3){
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
		margin-left:280px ;
	}
	.demo-ruleForm{
		min-height: 300px;
	}
	.ForgetPassword >>> h2{
		color: #67C23A;
		font-weight: 300;
	}
	.answer{
		margin-left: 100px;
		margin-bottom: 20px;
		display: inline-block;
	}
</style>