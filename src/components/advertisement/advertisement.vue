<template>
  <div id="advertisement">
   <div class="userinfo clearfix">
    <div v-if="isLogin" class="nickname">{{loginMsg.username}}</div>
    <div class="hellotext"><span>欢迎访问!</span><span v-if="!isLogin">请登录</span></div>
    <div class="personTarget" v-if="isLogin">
      <router-link to="/personindex" exact>主页</router-link>
      <a href="/api/editLogin">退出</a>
    </div>
   </div>
   <ul class="ad">
    <li><a target="_block" href="https://0x7.me/UDyj"><img src="https://dn-cnode.qbox.me/Fv9R31Y6ySKKJi95ldk9TRkJ7o5O" width="300" height="80"></a></li>
    <li><a target="_block" href="https://www.ucloud.cn"><img src="https://dn-cnode.qbox.me/FlajCCXkxZaOsuWp3k0iaiqfrJaS" width="300" height="80"></a></li>
    <li><a target="_block" href="https://www.aliyun.com"><img src="https://dn-cnode.qbox.me/Fn4D6BhOTz1IswvmzeZ1q7QW1ls_" width="300" height="80"></a></li>
    <li><a target="_block" href="https://render.alipay.com/"><img src="https://render.alipay.com/p/s/taobaonpm_click/image_25" width="300" height="80"></a></li>
   </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  props:{
    loginMsg:{
    }
  },
  components:{

  },
  computed:{
    isLogin(){
      console.log(this.loginMsg,"sk")
      if(this.loginMsg.username){
        return true
      }
      return false
    }
  }
}
</script>

<style>
  #advertisement{
    float: left;
    flex: 0 0 auto;
    margin:10px 50px 10px 0;
  }
  .userinfo{
    width: 300px;
    height: 80px;
    background-color: rgba(255,255,255,0.9);
    margin-bottom: 10px;
  }
  .userinfo .nickname,
  .userinfo .hellotext,
  .userinfo .personTarget
  {
    width: 100%;
    text-align: center;
    margin-top: 7px;
  }
  .ad li{
    margin-bottom: 10px;
  }
</style>
