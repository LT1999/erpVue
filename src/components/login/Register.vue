<template>
	<div class="register">
		
		<!--容器-->
		<el-row >
 			<el-col :span="10" :push="7">
 				<el-container>
		  			<el-main>
		  				<!--注册框-->
					  	<div class="register-main">
					  		<h2> 立 即 注 册 </h2>
					  		<el-col :span="18" :push="1">
					  		<el-form ref="form" :rules="rules" :model="form" label-width="120px">
					  			<el-form-item prop="userName">
								   	<el-input prefix-icon="el-icon-user"  v-model="form.userName" placeholder="用户名"></el-input>
					  			</el-form-item>
					  			
								<el-form-item  prop="userPassword">
								   	<el-input  prefix-icon="el-icon-lock" type="password" v-model="form.userPassword" placeholder="密码"></el-input>
								</el-form-item>
								
								<el-form-item  prop="confirmPassword">
									<el-input prefix-icon="el-icon-lock" type="password" v-model="form.confirmPassword" placeholder="确认密码"></el-input>
								</el-form-item>
								
								
								
								<el-form-item prop="issue" >
								   	<el-input prefix-icon="el-icon-s-opportunity" v-model="form.issue" placeholder="确认身份的问题"></el-input>
					  			</el-form-item>
					  			
					  			
					  			<el-form-item prop="answer">
								   	<el-input prefix-icon="el-icon-key" v-model="form.answer" placeholder="确认身份的答案"></el-input>
					  			</el-form-item>
								
								
								<el-form-item>
									
								    <el-button type="warning" round @click="onSubmit(form)"> 注 册 </el-button>
								    <el-button type="warning" round @click="onReset()" > 重 置 </el-button>
								</el-form-item>
						  	</el-form>
						  	<router-link to="/" tag="a" class="login" style="text-decoration: none;color: lightskyblue;">
				  				<p style="margin-bottom: 20px;margin-left: 20px;">  已 有 帐 号</p>
				  			</router-link>
						  	</el-col>
					  	</div>
					  	
		  			</el-main>
			  			
			  			
			  			
				</el-container>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data(){
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
		        }  else if (value !== this.form.userPassword) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		    };
		    var validateIssue=(rule,value,callback)=>{
		    	 if (value === '') {
		          	callback(new Error('请输入问题'));
		        } else {
		          callback();
		        }
		    };
		    var validateAnswer=(rule,value,callback)=>{
		    	 if (value === '') {
		          	callback(new Error('请输入答案'));
		        } else {
		          callback();
		        }
		    };
			return {
				form:{
					userName:"",
					userPassword:"",
					confirmPassword:"",
					issue:"",
					answer:""
				},
				rules:{
					userName:{ validator: validateName, trigger: 'blur' },
			        userPassword:{ validator: validatePass, trigger: 'blur' },
			        confirmPassword:{validator: validateConfirm, trigger: 'blur'},
			        issue:{validator: validateIssue, trigger: 'blur'},
			        answer:{validator: validateAnswer, trigger: 'blur'}
				}
			}
		},
		methods: {
	      onSubmit() {
			  console.log(this.$refs.form);
			    this.$refs.form.validate((valid) => {
		         	if (valid) {
		           		alert('submit!');
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
	      },
	      onReset(){
	      	this.$refs.form.resetFields();
	      }
	      
	      
	    }
	}
</script>


<style scoped>
	.register {
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
    margin-top: 40px;
    margin-bottom: 20px;
    text-align: center;
}


a {
    font-size: 14px;
}

.register-main {
    margin-bottom: 80px;
}





.register>>>.el-container {
    box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
}

/* .register>>>.el-aside {
    background-image: url(../../assets/login/薄雾森林3.jpg);
    background-size: cover;
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    padding: 30px;
} */

.register>>>.el-main {
    background-color: white;
    color: #333;
}

.register>>>.el-row {
    margin-top: 40px;
}

.register>>>.el-input {
    margin: 0px;
    padding: 0px;
}

.register>>>.el-form-item__content {}

.register>>>.el-button {
    margin-bottom: 20px;
    margin-left: 40px;
    width: 120px;

}

.register>>>.el-form-item {

    margin-top: 40px;
}

</style>