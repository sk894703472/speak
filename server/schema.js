var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//1.连接数据库
//指定连接的数据库不必存在，插入数据会自动创建
mongoose.connect('mongodb://localhost:27017/speak',{ useNewUrlParser: true });

//2.设计文档结构(表结构)
//字段名称就是表结构的属性名称
//值
//约束的目的是保证数据的完整性，不要有脏数据
var userSchema = new Schema({
    username:{
        type:String,
        required:true //必须有
    },
    avatar:{
        type:String,
        default:'https://avatars3.githubusercontent.com/u/17705410?v=4&s=120'
    },
    password:{
        type:String,
        required:true
    }
})
var commentsSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    kind:{
        type:Number
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    likeNum:{
        type:Number,
        default:0
    },
    commentsNum:{
        type:Number,
        default:0
    },
    comments:{
        type:Array,
        default:[]
    },
    date:{
        type:Array,
        required:true
    }
})
//3.将文档结构发布为模型
//第一个参数：传入一个大写单词字符串用来表示集合名称
//                mongoose会将大写名词字符串生成小写复数的集合名称
//第二个参数：架构Schema
//    返回值：模型构造函数
module.exports = {
    user:mongoose.model('User',userSchema),
    comments:mongoose.model('Comments',commentsSchema)
}
//4.有了文档结构模型，就可以使用这个构造函数对users集合中的数据操作