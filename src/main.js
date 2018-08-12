import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import comments from './components/comments/comments'
import login from './components/login/login'
import register from './components/register/register'
import publish from './components/publish/publish'
import personindex from './components/personindex/personindex'
import maincontent from './components/maincontent/maincontent'
import axios from 'axios'
//Vue.use(axios)
Vue.prototype.$http = axios
Vue.use(VueResource)
Vue.use(VueRouter)

let routes = [{
	path: '/',
	component: comments
 },{
    path: '/publish',
    component:publish
 }
 ,{
    path: '/login',
    component: login
},{
    path: '/register',
    component: register
},{
    path: '/personindex',
    component: personindex
},{
    path: '/maincontent',
    component: maincontent
}]
let router = new VueRouter( {
	mode:'history',
	linkActiveClass:'active',
    routes
})
new Vue({
    router,
    ...App
}).$mount('#app')
