let express = require('express')
let schema = require('./schema.js')
let router = express.Router()
router.get('/comments',function (req,res) {
	console.log(req.query.tag)
	let tag = Number(req.query.tag)
	console.log(tag)
	let condition = {}
	if(!tag){
		condition = {}
	}else{
		console.log('else')
		condition = {
			kind:tag-1
		}
	}
	console.log(condition)
	schema.comments.find(condition,function (err,com) {
		if(err){
			return res.status(500).send('Server error.')
		}
		schema.user.find(function (err,user) {
			if(err){
				return res.status(500).send('Server error.')
			}
			res.send({com,user})
		})
	})
	// new schema.comments({
	// 	username:"ssssd3",
	// 	avatar:"https://avatars2.githubusercontent.com/u/17611077?v=4&s=120",
	// 	kind:3,
	// 	title:"2少时诵诗书所所多的地方反复",
	// 	content:"2随时随地是发给好友已通过法国福建师范师傅上门费收费科技热巨额罚款服了双方父母房门口打开我无法惊恐万分方面的免费模式方面无法我们库房门口未付款分明是麻烦你什么烦恼是父母对妈妈说对你父母双方说法没什么",
	// 	likeNum:123,
	// 	comments:{
	// 		username:"lcy",
	// 		content:"三三三三如果非官方"
	// 	},
	// 	date:"2018-5-8"
	// }).save(function (err,ret) {
	// 	if(err){
	// 		return res.status(500).send('Server error.')
	// 	}
	// 	console.log(ret)
	// })
})
router.get('/maincontent',function (req,res) {
	console.log(req.query.idx)
	let query = req.query
	schema.comments.findById(query.idx,function (err,com) {
		if(err){
			return res.status(500).send('Server error.')
		}
		console.log(com)
		schema.user.find({
			username:com.username
		},function (err,user) {
			if(err){
				return res.status(500).send('Server error.')
			}
			res.send({com,user})
		})
	})
})
router.post('/publisharticle',function (req,res) {
	console.log(req.body)
	let reqbody = req.body
	let params = {
		"username":reqbody.username,
		"kind":reqbody.kind,
		"title":reqbody.title,
		"content":reqbody.content,
		"date":reqbody.date.split(",")
	}
	console.log(params)
	new schema.comments(params).save(function (err,com) {
		if(err){
			console.log("skkk")
			return res.status(500).send('Server error')
		}
		res.status(200).send({
			msgcode:0
		})
	})
})
router.post('/submitReview',function (req,res) {
	let reqbody = req.body
	console.log(reqbody)
	schema.comments.findById(reqbody.article,function (err,com) {
		if(err){
			return res.status(500).send('Server error')
		}
		console.log(com.comments)
		com.comments.push({
			'username':reqbody.username,
			'message':reqbody.message
		})
		schema.comments.findByIdAndUpdate(reqbody.article,{
			comments:com.comments,
			commentsNum:com.commentsNum+1
		},function (err,com1) {
			if(err){
				return res.status(500).send('Server error')
			}
			console.log(com,"skkk")
			schema.comments.findById(reqbody.article,function (err,comm) {
				if(err){
					return res.status(500).send('Server error')
				}
				res.status(200).send({
					msgcode:0,
					comm:comm
				})
			})
		})
	})
})
router.post('/submitLike',function (req,res) {
	schema.comments.findByIdAndUpdate(req.body.article,{
		likeNum:req.body.likeNum
	},function(err,ret){
		if(err){
			return res.status(500).send('Server error')
		}
		res.status(200).send({
			msgcode:0
		})
	})
})
module.exports = router