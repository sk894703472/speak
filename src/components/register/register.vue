<template>
  <div id="register">
    <div class="r-content">
      <h3>用户注册</h3>
      <div>
        <form>
          <div class="from-item">
            <label for="username">用户名:</label>
            <input type="text" v-model="username" id="username">
          </div>
          <div class="from-item">
            <label for="psd">密码:</label>
            <input type="password" v-model="psd" id="psd">
          </div>
          <div class="from-item">
            <label for="rpsd">密码:</label>
            <input type="password" v-model="rpsd" id="rpsd">
          </div>
          <div class="from-button">
            <input type="button" value="提交"  @click="reqRegister">
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
      rpsd:""
    }
  },
  methods:{
    reqRegister(){
      if(this.psd != this.rpsd){
        alert("请保持密码输入一致")
        return
      }else if(!this.psd || !this.username || !this.rpsd){
        alert("请输入信息完整")
        return
      }else{
        let params = qs.stringify({'username':this.username,'password':this.psd})
        console.log(this.username,this.psd,this.rpsd)
        axios.post('/api/register',params)
        .then((response) => {
          console.log(response.data)
          if(response.data.msgcode == 0){
            alert("注册成功，请登录")
          }else if(response.data.msgcode == 1){
            alert("用户已存在")
          }
        })
        .catch(function (error) {
          console.log(err)
        });
       }
    }
  }
}
</script>

<style>
  #register{
    float: left;
    min-width: 760px;
    flex: 1 1 auto;
    margin: 8px 8px 0 40px;
    height: 579px;
    display: flex;
  }
  .r-content{
    position: relative;
    width: 320px;
    height: 350px;
    margin: auto;
    border-radius: 10px;
    padding: 50px 0 0 0;
    background-color: rgba(255,255,255,0.8);
  }
  .r-content h3{
    text-align: center;
    font-size: 25px;
    font-weight: 500;
  }
  .r-content .from-item{
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
