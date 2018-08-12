<template>
  <div id="app">
    <v-header :loginMsg="loginMsg"></v-header>
    <content class="clearfix main">
      <router-view v-on:listenToChildEvent="showMessageFromChild" :loginMsg="loginMsg" :tags="tags"></router-view>
      <v-ad :loginMsg="loginMsg" v-if='isShowAD'></v-ad>
    </content>
    <footer></footer>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import comments from './components/comments/comments.vue'
import advertisement from './components/advertisement/advertisement.vue'
const axios = require('axios');

export default {
  data(){
    return {
      loginMsg:{},
      clientWidth:0,
      tags:["二手","实习","问答"]
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
  },
  components:{
    'v-header':header,
    'v-comments':comments,
    'v-ad':advertisement
  },
  methods:{
    showMessageFromChild(data){
      this.loginMsg = data
      console.log(data)
    }
  },
  computed:{
    isShowAD(){
      if(this.clientWidth <= 1100) {
        return false
      }else{
        return true
      }
    }
  },
  mounted (){
    this.clientWidth = document.body.clientWidth
    window.onresize = ()=>{
      this.clientWidth = document.body.clientWidth
    }
  }
}
</script>

<style>
  #app{
    width: 100%;
    background-image: url('http://bbs.crsky.com/1236983883/Mon_1401/25_184488_884fdfaaf4faf20.jpg');
    background-position: center bottom;
    background-repeat: no-repeat;
    background-color: rgb(235,235,235);
    min-height: 100vh;
  }
  .main{
    display: flex;
  }
</style>
