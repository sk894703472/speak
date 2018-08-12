<template>
  <div id="comments">
    <ul class="c-nav clearfix">
      <li @click="updateCom(0)" class="nav-item" :class="{'c-active':nowTag==0}">全部</li>
      <li @click="updateCom(index+1)" class="nav-item" :class="{'c-active':nowTag==index+1}" v-for="(item,index) in tags">{{item}}</li>
    </ul>
    <ul class="c-content">
      <li v-for="(item,index) in comments" class="com-item">
        <router-link class="a-item" :to="{path:'/maincontent',query:{'idx':item._id}}">
          <span class="c-left">
            <span class="avatar" v-for="(us,idx) in user" v-if="us.username==item.username">
              <img :src="us.avatar" width="30" height="30" style="vertical-align: middle;">
            </span>
          <span>{{item.username}}</span>
          <!-- <span class="kind"></span> -->
          <span class="title">{{item.title}}</span></span>
          <span><span class="likeNum">{{item.likeNum}}</span>/<span class="comNum">{{item.commentsNum}}</span>
          <span class="date">{{item.date}}</span></span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
const axios = require('axios');
export default {
  data (){
    return{
      comments:{},
      tag:0,
      user:{}
    }
  },
  computed:{
    nowTag(){
      return this.tag
    }
  },
  props:{
    tags:{}
  },
  created(){
    axios.get('/api/comments')
      .then((response) => {
        response = response.data
        console.log(response)
        this.comments = response.com
        this.user = response.user
        this.computeDate(this.comments)

        console.log(this.comments)
      })
      .catch(function (error) {
        console.log(error);
      });

  },
  methods:{
    updateCom (tag) {
      this.tag = tag
      console.log(this.tag)
      let urlCom = 'api/comments?tag='+tag
      console.log(urlCom)
      axios.get(urlCom)
      .then((response) => {
        response = response.data
        this.comments = response.com
        this.user = response.user
        this.computeDate(this.comments)
      })
      .catch((error) => {
        console.log(error)
      });
    },
    computeDate(com){
      let nowdate = new Date()
      let nowdateArr = [nowdate.getFullYear(),nowdate.getMonth()+1,nowdate.getDate(),nowdate.getHours(),nowdate.getMinutes()]
      for(let idx in com){
        let date = com[idx].date.map(function(i){
          return Number(i)
        })
        if(nowdateArr[0]>date[0]){
          this.comments[idx].date = (nowdateArr[0]-date[0])+"年前"
        }else if(nowdateArr[1]>date[1]){
          this.comments[idx].date = (nowdateArr[1]-date[1])+"月前"
        }else if(nowdateArr[2]>date[2]){
          this.comments[idx].date = (nowdateArr[2]-date[2])+"天前"
        }else{
          if(date[4]<10){
            this.comments[idx].date = "今天 "+date[3]+":0"+date[4]
          }else{
            this.comments[idx].date = "今天 "+date[3]+":"+date[4]
          }
        }
      }
    }
  }
}
</script>

<style>
  #comments{
    float: left;
    min-width: 760px;
    flex: 1 1 auto;
    background-color: rgba(255,255,255,0.9);
    margin: 8px 8px 0 40px;
  }
  .c-nav{
    width: 100%;
    background-color: rgb(246,246,246);
    height: 40px;
    line-height: 30px;
  }
  .c-nav .nav-item{
    float: left;
    margin: 5px 15px;
    padding: 0 8px;
    border-radius: 3px;
    cursor: pointer;
  }
  .c-nav .c-active{
    background-color: #00BFFF;
  }
  .c-content{
    width: 100%;
  }
  .com-item{
    height: 50px;
    padding: 0 10px;
    line-height: 50px;
    border-bottom: 1px solid rgb(240,240,240);
  }
  .a-item{
    display: flex;
    justify-content: space-between;
  }
  .com-item .c-left{
    width: 70%;
  }
  .com-item .title{
    display: inline-block;
    width: 83%;
    height: 18px;
    line-height: 21px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
