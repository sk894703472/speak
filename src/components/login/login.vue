<template>
  <div id="login">
     <div class="l-content">
      <h3>用户登录</h3>
      <div>
        <form>
          <div class="from-item">
            <label for="username">用户名:</label>
            <input type="text" name="username" id="username" v-model="username">
          </div>
          <div class="from-item">
            <label for="psd">密码:</label>
            <input type="password" name="psd" id="psd" v-model="psd">
          </div>
          <div class="from-button">
            <input type="button" value="提交" @click="reqLogin">
            <input type="reset" value="重置">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
const qs = require('qs');

export default {
  data(){
    return{
      username:"",
      psd:"",
      loginMsg:{}
    }
  },
  methods:{
    reqLogin(){
      let params = qs.stringify({'username':this.username,'psd':this.psd})
      axios.post('/api/login',params)
      .then((response) => {
        let msgcode = response.data.msgcode
        if(msgcode == 0){
          alert("登录成功")
          this.loginMsg=response.data.user
          window.location.pathname = '/'
        }else if(msgcode == 1){
          alert("请输入用户名和密码")
        }else if(msgcode == 2){
          alert("密码错误")
        }else if(msgcode == 3){
          alert("用户不存在")
        }
        this.$emit("listenToChildEvent",this.loginMsg)
      })
      .catch(function (error) {
        console.log(error)
      });
    }
  }
}
</script>

<style>
  #login{
    float: left;
    min-width: 760px;
    flex: 1 1 auto;
    margin: 8px 8px 0 40px;
    height: 579px;
    display: flex;
  }
  .l-content{
    position: relative;
    width: 320px;
    height: 350px;
    margin: auto;
    border-radius: 10px;
    padding: 50px 0 0 0;
    background-color: rgba(255,255,255,0.8);
  }
  .l-content h3{
    text-align: center;
    font-size: 25px;
    font-weight: 500;
  }
  .l-content .from-item{
    margin: 30px;
  }
  .from-item input{
    width: 190px;
    height: 25px;
    border-radius: 5px;
    position: absolute;
    right: 35px;
  }
  .from-button{
    text-align: center;
    margin-top: 40px;
  }
  .from-button input{
    display: inline-block;
    width: 120px;
    height: 30px;
    background-color: #00BFFF;
    border-radius: 5px;
  }
</style>
