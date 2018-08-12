<template>
  <div id="maincontent">
    <div class="header">
      <h3>{{thisComments.title}}</h3>
      <img :src="thisUser.avatar" width="30" height="30">
      <span>{{thisComments.username}}</span>
      <span class="date">{{thisComments.date}}</span>
    </div>
    <div class="content" v-html="thisComments.content">
    </div>
    <div class="operate">
        <span class="btn-item" @click="opeLike">
          <span>{{thisComments.likeNum}}</span>
          <a class="likeBtn btn" :class="{actived:thisLikeNum}"></a>
        </span>
        <span class="btn-item">
          <span>{{thisComments.commentsNum}}</span>
          <a class="commBtn btn"></a>
        </span>
        <span class="btn-item" v-if="showDelete">
          <a href="">删除</a>
        </span>
    </div>
    <div class="publishcom">
        <form>
          <input type="text" name="com" class="input" v-model="submitRev" autofocus="">
          <input type="button" name="submit" value="提交" class="submit" @click="submitReview">
        </form>
    </div>
    <div class="review">
      <ul class="review-item">
        <li v-for="item in thisComments.comments">
          <span>{{item.username}}</span><span>说：</span>
          <span>{{item.message}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
const qs = require('qs');

export default {
  data(){
    return{
      thisComments:{},
      thisUser:{},
      submitRev:"",
      thisLikeNum:0
    }
  },
  computed:{
    showDelete(){
      if(this.thisUser.username == this.loginMsg.username){
        return true
      }
      return false
    }
  },
  created(){
    let query = this.$route.query;
    let reqUrl = `/api/maincontent?idx=${query.idx}`;
    console.log(reqUrl)
    axios.get(reqUrl)
      .then((response) => {
        console.log(response.data)
        this.thisComments = response.data.com
        this.thisUser = response.data.user[0]
        this.computeDate(response.data.com)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  beforeDestroy(){
    let params = qs.stringify({'article':this.thisComments._id,'likeNum':this.thisComments.likeNum})
    axios.post('/api/submitLike',params)
          .then((response) => {
          })
          .catch((err) => {
            console.log(err)
          })
  },
  props:{
    loginMsg:{}
  },
  methods:{
    computeDate(com){
      let nowdate = new Date()
      let nowdateArr = [nowdate.getFullYear(),nowdate.getMonth()+1,nowdate.getDate(),nowdate.getHours(),nowdate.getMinutes()]
        let date = com.date.map(function(i){
          return Number(i)
        })
        if(nowdateArr[0]>date[0]){
          this.thisComments.date = (nowdateArr[0]-date[0])+"年前"
        }else if(nowdateArr[1]>date[1]){
          this.thisComments.date = (nowdateArr[1]-date[1])+"月前"
        }else if(nowdateArr[2]>date[2]){
          this.thisComments.date = (nowdateArr[2]-date[2])+"天前"
        }else{
          if(date[4]<10){
            this.thisComments.date = "今天 "+date[3]+":0"+date[4]
          }else{
            this.thisComments.date = "今天 "+date[3]+":"+date[4]
          }
        }
    },
    opeLike(){
      if(this.thisLikeNum==0){
        this.thisLikeNum = 1
        this.thisComments.likeNum++
      }else{
        this.thisLikeNum = 0
        this.thisComments.likeNum--
      }
      console.log(this.thisLikeNum)
    },
    submitReview(){
      if(!this.loginMsg){
        alert("请先登录")
      }else if(!this.submitRev){
        alert("请保证评论不为空")
      }else{
        let params = qs.stringify({'message':this.submitRev,'username':this.loginMsg.username,"article":this.thisComments._id})
        axios.post('/api/submitReview',params)
          .then((response) => {
            if(response.data.msgcode == 0){
              alert("评论成功")
            }
            this.submitRev=""
            this.thisComments.comments = response.data.comm.comments
            this.thisComments.commentsNum = response.data.comm.commentsNum
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style>
  #maincontent{
    float: left;
    min-width: 760px;
    flex: 1 1 auto;
    background-color: rgba(255,255,255,0.9);
    margin: 8px 8px 0 40px;
  }
  #maincontent .header{
    padding: 10px;
    background-color: #fff;
  }
  #maincontent .header h3{
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    margin: 0 0;
  }
  #maincontent .header img{
    vertical-align: middle;
  }
  #maincontent .header .date{
    float: right;
  }
  #maincontent .content,
  #maincontent .review{
    padding: 10px 20px;
  }
  #maincontent .operate{
    background-color: #fff;
    padding: 2px 10px;
  }
  #maincontent .operate .btn-item{
    display: inline-block;
    width: 30%;
    text-align: center;
    padding: 5px 0;
  }
  #maincontent .operate .btn-item:hover{
    background-color: rgba(245,240,245);
  }
  #maincontent .operate .likeBtn{
    background: url('../../common/images/heart.png') no-repeat;
  }
  #maincontent .operate .actived{
    background: url('../../common/images/heart-active.png') no-repeat;
  }
  #maincontent .operate .commBtn{
    background: url('../../common/images/comm.png') no-repeat;
  }
  #maincontent .operate .btn{
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: bottom;
    -webkit-background-size: 16px 16px;
    background-size: 16px 16px;
  }

  #maincontent .publishcom{
    background-color: #fff;
    padding: 5px 10px;
  }
  #maincontent .publishcom .input{
    width: 90%;
    height: 30px;
    border: 2px solid rgba(240,240,240,0.9);
  }
  #maincontent .publishcom .submit{
    width: 8%;
    height: 30px;
  }
</style>
