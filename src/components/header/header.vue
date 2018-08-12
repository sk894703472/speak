<template>
  <div id="header" clearfix>
    <div class="h-content clearfix">
      <div class="h-logo">
        <img src="../../common/images/logo.png" class="logo-img">
        <span class="logo-text">论坛</span>
      </div>
      <ul class="nav">
        <router-link class="nav-item" to="/" exact>首页</router-link>
        <router-link class="nav-item" to='/publish' v-if="isShowBtn">发表</router-link>
        <router-link class="nav-item" to='/login' v-if="!isShowBtn">登录</router-link>
        <router-link class="nav-item" to='/register' v-if="!isShowBtn">注册</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    loginMsg:{}
  },
  computed:{
    isShowBtn(){
      console.log(this.loginMsg)
      if(this.loginMsg){
        return true
      }else{
        return false
      }
    }
  }
}
</script>

<style>
  #header{
    width: 100vw;
    height: 50px;
    background-color: rgba(240,240,240,0.7);
    overflow: hidden;
  }
  .h-content{
    margin: 10px 30px 10px 40px ;
    overflow: hidden;
  }
  .h-content .h-logo{
    float: left;
  }
  .h-logo .logo-img{
    vertical-align: top;
  }
  .h-logo .logo-text{
    font-size: 22px;
    font-weight: 700;
    line-height: 32px;
  }
  .h-content .nav{
    float: right;
  }
  .h-content .nav .active{
    border-bottom: 2px solid #00BFFF;
  }
  .h-content .nav-item{
    position: relative;
    float: left;
    margin-right: 20px;
    line-height: 32px;
  }
  .h-content .nav-item a{
    color: #000;
  }
</style>
