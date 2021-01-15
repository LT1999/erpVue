<template>

	<el-container>

		  <!-- 左侧 -->
		<el-aside :width="asideSize">
			<p class="logo-text" v-show="isCollapse" @click="report"> E R P 系 统 </p>
			<img src="../../assets/main/logo.jpg" class="logo-img" title="E R P 系 统" v-show="!isCollapse" @click="report"/>

			<el-menu class="el-menu-vertical-demo"  :default-active="this.$route.path" router :collapse="!isCollapse">
				  <el-submenu :index="data.id+''" v-for="data in menuData" :key="data.id" >
				    <template slot="title">
				      <i :class="data.icon"></i>
				      <span slot="title">{{data.title}}</span>
				    </template>
					<div v-for="erdata in data.menuslist">
						<el-submenu v-if="erdata.menuslist.length!=0" :index="erdata.id+''"  :key="erdata.id">
							<span slot="title"><i :class="erdata.icon"></i>{{erdata.title}}</span>
							<el-menu-item :index="sandata.index+''"  v-for="sandata in erdata.menuslist" :key="sandata.id">
								<i class="el-icon-tickets"></i>
								{{sandata.title}}
							</el-menu-item>
						</el-submenu>
					   <el-menu-item v-else :index="erdata.index+''" :key="erdata.id">
						<i :class="erdata.icon"></i>
							{{erdata.title}}
						</el-menu-item>
					</div>
				  </el-submenu>

			</el-menu>
		</el-aside>

	  <el-container >


		<!-- 头部 -->
		<el-header>
				<el-menu  class="el-menu-demo" mode="horizontal" >
				    <el-menu-item>
						<i class="el-icon-s-fold" @click="isShowLeftMenu" v-show="isCollapse"></i>
						<i class="el-icon-s-unfold" @click="isShowLeftMenu" v-show="!isCollapse"></i>
					</el-menu-item>
				    <el-menu-item style="float: right;">
							<span style="font-size: 16px;">欢迎您！{{this.val[0].userName}}</span>
							<el-link :underline="false" @click="esc"><i class="el-icon-switch-button"></i>退出系统</el-link>
					</el-menu-item>
				</el-menu>

		</el-header>

		<!--主体-->
	    <el-main><router-view/></el-main>
	  </el-container>

	</el-container>

</template>

<script>
	export default {
		data(){
			return{

				menuData:[

				],

				isCollapse:true,
				asideSize:"310px",
				val:[
					{
					userName:'',
					}
				]

			}
		},
		methods: {
			isShowLeftMenu(){
				this.isCollapse=!this.isCollapse;
				if(this.isCollapse){
					this.asideSize="310px";
				}else{
					this.asideSize="80px";
				}
			},

			esc(){
				this.$router.push({ path:'/'});
			},
			selAllMenu(){
				var userlist=JSON.parse(window.sessionStorage.getItem("val"));

				this.$http.post("http://localhost:8080/Erp-web/menus/showMenus.do","uname="+userlist[0].userName)
								.then( res => {


										if(res.data.length!=0){
											this.menuData=res.data
										}else{
											alert("错误");
										}
							    })
								.catch(err =>{
									console.log(err)
								})
			},
      report(){
         this.$router.push({path: '/report'});
      }
		},
		mounted(){
			this.val=JSON.parse(window.sessionStorage.getItem("val"));
			this.selAllMenu();

		}
	}
</script>

<style scoped>
	.horizontal-collapse-transition {
	    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
	}
	.logo-text{
		color: #4B5EA0;
		text-align: center;
		font-size: 20px;
		font-weight: 520;
	}
	.logo-img{
		width: 50px;
		height: 50px;
		display: block;
		margin: 10px auto;
		border-radius: 50%;
	}
	.el-container{
		height: 100%;
	}
	.el-header{
		border-bottom:0.5px solid #FAFAFA ;
	}
	.el-aside{
		min-width: 10px;
		border-right:0.5px solid #FAFAFA ;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	}
	.el-main{
		background-color: #EFF3F8;
		height: 100%;
		padding: 20px 50px;
	}
	.el-menu{
		border: none;
		margin-left: 8px;
	}

	.el-menu--horizontal>.el-menu-item a:hover{
		color: #4B5EA0;
	}
</style>
