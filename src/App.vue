<template>
  <div id="app">
    <keep-alive>
	   <router-view v-if="this.$route.meta.keepAlive" class="router-view"></router-view>
	</keep-alive>
	<router-view v-if="!this.$route.meta.keepAlive" class="router-view"></router-view>
  </div>
</template>
<script>
	
export default {
	
}
</script>

<style>
	
	html,body,#app{
	  height: 100%;
}
</style>