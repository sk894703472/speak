<template>
  <div id="publish">
  	<div class="publishOperate">
  		<input type="text" v-model="title" placeholder="请输入标题。。。" class="input">
  		<select v-model="kind">
  			<option v-for="(item,index) in tags" v-model="kind">{{item}}</option>
  		</select>
  		<input type="button" value="提交" @click="testUI"  class="submit">
  	</div>
  	<div class="publishText">
	    <vue-ueditor-wrap class="V-textarea" v-model="publishMsg" :config="myConfig"></vue-ueditor-wrap>
    </div>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
const axios = require('axios');
const qs = require('qs');

export default {
	data(){
		return {
			publishMsg:"",
			kind:"",
			title:"",
			myConfig: {
	            // 你的UEditor资源存放的路径,相对于打包后的index.html
	            UEDITOR_HOME_URL: './static/UEditor/',
	            // 编辑器不自动被内容撑高
	            autoHeightEnabled: false,
	            // 初始容器高度
	            initialFrameHeight: '400',
	            // 初始容器宽度
	            initialFrameWidth: '100%',
	            // 关闭自动保存
	            enableAutoSave: false
	        }
		}
	},
	props:{
		loginMsg:{},
		tags:{}
	},
    components: {
        VueUeditorWrap
    },
    methods:{
    	testUI(){
    		let kindNum = this.tags.indexOf(this.kind)
    		let date = new Date()
    		console.log(date)
    		let dateArr = [date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes()]
    		if(!this.loginMsg.username){
    			alert("请您先登录")
    			return
    		}else if(kindNum<0){
    			alert("请选择文章类型")
    			return
    		}else if(!this.title){
    			alert("请输入标题")
    			return
    		}else if(!this.publishMsg){
    			alert("请保证文章有内容")
    			return
    		}
    		let params = qs.stringify({
    			'username':this.loginMsg.username,
    			'kind':kindNum,
    			'title':this.title,
    			'content':this.publishMsg,
    			'date':dateArr.toString()
    		})
    		console.log(params)
    		axios.post('/api/publisharticle',params)
    			.then((response) => {
    				console.log(response)
    			})
    			.catch((err) => {
    				console.log(err)
    			})
    	}
    }
}
</script>

<style>
#publish{
	min-width: 760px;
    flex: 1 1 auto;
	float: left;
	margin: 8px 8px 0 40px;
}
.V-textarea{
	width: 100%;
	background-color: #fff;
}
.publishOperate{
	padding: 10px;
}
.publishOperate .input{
	width: 60%;
	height: 30px;
	text-align: center;
}
.publishOperate select,
.publishOperate .submit{
	height: 30px;
	width: 80px;
}
.publishOperate .submit{
	float: right;
}
</style>
