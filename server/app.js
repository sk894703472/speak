let express = require('express')
let app = express()
let fs = require('fs')
let session = require('express-session')
let userouter = require('./userouter')
let comrouter = require('./comrouter')
let bodyParser = require('body-parser')

//配置body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(session({
	secret:'scffjvvndcmdkk',
	resave:false,
	saveUninitialized:false
}))
app.use(userouter)
app.use(comrouter)
app.listen(3300,function (){
	console.log('running...')
})
