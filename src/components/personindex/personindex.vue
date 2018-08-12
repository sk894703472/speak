<template>
  <div id="personindex">
    <div class="p-content">
      <h3>用户主页</h3>
     <div>
      <form>
          <div class="from-item">
            <input type="hidden" id="id" name="id" v-model="loginMsg._id">
          </div>
          <div class="from-item">
            <label for="username">用户名:</label>
            <input type="text" id="username" name="username" v-model="loginMsg.username">
          </div>
          <div class="from-item">
            <label for="psd">密码:</label>
            <input type="password" id="psd" name="psd" v-model="loginMsg.password">
          </div>
          <div class="from-button">
            <input type="button" value="提交" @click="updateUser">
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
      loginMsg:{}
    }
  },
  methods:{
    updateUser(){
      if(!this.loginMsg.password || !this.loginMsg.username){
        alert("请输入信息完整")
        return
      }else{
        let params = qs.stringify(this.loginMsg)
        axios.post('/api/updateUser',params)
        .then((response) => {
          console.log(response.data)
          if(response.data.msgcode == 0){
            alert("更新成功，请登录")
          }else if(response.data.msgcode == 1){
            alert("更新出错,请重试")
          }
        })
        .catch(function (error) {
          console.log(err)
        });
       }
    }
  },
  created(){
    axios.get('/api/')
      .then((response) => {
        response = response.data
        this.loginMsg = response
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>

<style>
  #personindex{
    float: left;
    min-width: 760px;
    flex: 1 1 auto;
    margin: 8px 8px 0 40px;
    height: 579px;
    display: flex;
  }
  .p-content{
    position: relative;
    width: 320px;
    height: 350px;
    margin: auto;
    border-radius: 10px;
    padding: 50px 0 0 0;
    background-color: rgba(255,255,255,0.8);
  }
  .p-content h3{
    text-align: center;
    font-size: 25px;
    font-weight: 500;
  }
  .p-content .from-item{
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
