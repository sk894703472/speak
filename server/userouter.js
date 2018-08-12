let express = require('express')
let schema = require('./schema.js')
let router = express.Router()
router.get('/user',function (req,res) {
	schema.user.find(function (err,user) {
		if(err){
			return res.status(500).send('Server error.')
		}
		console.log(user)
	})
	// new schema.user({
	// 	username:"lcy",
	// 	password:"123321"
	// }).save(function (err,ret) {
	// 	if(err){
	// 		return res.status(500).send('Server error.')
	// 	}
	// 	console.log(ret)
	// })
})
router.get('/',function (req,res) {
	let user = req.session.user
	res.send(user)
})
router.post('/login',function (req,res) {
	console.log(req.body)
	//0-登录成功
	//1-请输入账号密码
	//2-密码错误
	//3-用户不存在
	if(!req.body.username||!req.body.psd){
		res.send({msgcode:1})
		return
	}else{
		schema.user.findOne({
			username:req.body.username
		},function (err,user) {
			try{
				console.log(user)
				if(user.password == req.body.psd){
					req.session.user = user
					res.send({
						msgcode:0,
						user:req.session.user
					})
				}else{
					res.send({msgcode:2})
				}
			}catch(err){
				return res.status(500).send({
					msgcode:3
				})
			}
		})
	}
})
router.get('/editLogin',function (req,res) {
	req.session.user = null
	res.redirect('/login')
})
router.post('/register',function (req,res) {
	console.log(req.body)
	//0-登录成功
	//1-用户名已存在
		schema.user.findOne({
			username:req.body.username
		},function (err,data) {
			if(err){
				return res.status(500).send('Server error')
			}
			if(data){
				return res.status(200).send({
					msgcode:1
				})
			}
			new schema.user(req.body).save(function (err,user) {
				if(err){
					return res.status(500).send('Server error')
				}
				res.status(200).send({
					msgcode:0
				})
			})
		})
})
router.post('/updateUser',function (req,res) {
	console.log(req.body)
	//0-登录成功
	//1-用户名已存在
		schema.user.findByIdAndUpdate(req.body._id,req.body,function (err) {
			if(err) {
				return res.status(500).send({
					msgcode:1
				})
			}
			res.send({
				msgcode:0
			})
		})
})
module.exports = router