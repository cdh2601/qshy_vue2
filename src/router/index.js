import Vue from 'vue'
import VueRouter from 'vue-router'
import Front from '@/components/Front'
import Search from '@/components/Front/Main/Search'
import OpenAiPage from '@/components/Front/Main/OpenAiPage'
import Home from '@/components/Front/Main/Home/index.vue'
import Community from '@/components/Front/Main/Community'
import Recommend from '@/components/Front/Main/Recommend'
import Tourism from '@/components/Front/Main/Tourism'
import About from '@/components/Front/Main/About'
import Person from '@/components/Front/Main/Person'
import Setting from '@/components/Front/Main/Person/content/Setting'
import colRoute from '@/components/Front/Main/Person/content/Collect/colRoute'
import colScienic from '@/components/Front/Main/Person/content/Collect/colScienic'
import colStragety from '@/components/Front/Main/Person/content/Collect/colStragety'
import myRoute from '@/components/Front/Main/Person/content/myRoute'
import myStragety from '@/components/Front/Main/Person/content/myStragety'


import Detail from '@/components/Front/Main/Detail'
import SearchStrategy from '@/components/Front/Main/SearchStrategy'
import StrategyDetails from '@/components/Front/Main/StrategyDetails'
import Earth from '@/components/Front/Main/Earth'
import makeRoute from '@/components/Front/Main/Recommend/ContentAll/makeRoute'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ResetPassword from '@/components/resetPassword'
import routeMsg from '@/components/Front/Main/Recommend/ContentAll/routeMsg'
// import { component } from 'vue/types/umd'
// 写攻略组件
import writeStrategy from '@/components/Front/Main//Community/content/writeStrategy'
// 轻松沪游协议
import protocol from '@/components/Front/Main//Community/content/writeStrategy/content/protocol'
//全局搜索
import searchAll from '@/components/Front/Main/searchAll'
Vue.use(VueRouter)

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {
        }, () => {
        })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {
        }, () => {
        })
    }
}

const routes = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/front",
        name: "Front",
        component: Front,
        children: [
            {
                path: "/home",
                name: "Home",
                component: Home
            },
            {
                path: "/search",
                name: "Search",
                component: Search
            },
            {
                path: "/openAiPage",
                name: "OpenAiPage",
                component: OpenAiPage
            },
            {
                path:'/detail/:scenicId',
                component:Detail,
            },
            {
                path: "/community",
                name: "Community",
                component: Community
            },
            {
                path: "/recommend",
                name: "Recommend",
                component: Recommend,
            },
            {
                path: "/tourism",
                name: "Tourism",
                component: Tourism
            },
            {
                path: "/about",
                name: "About",
                component: About
            },
            {
                path: "/person",
                name: "Person",
                component: Person,
                redirect:'/setting',
                children:[
                    {
                        path:'/setting',
                        component:Setting
                    },
                    {
                        path:'/colRoute',
                        name: "colRoute",
                        component: colRoute
                    },
                    {
                        path:'/colScienic',
                        name: "colScienic",
                        component: colScienic
                    },
                    {
                        path:'/colStragety',
                        name: "colStragety",
                        component: colStragety
                    },
                    {
                        path:'/myStragety',
                        name: "myStragety",
                        component: myStragety
                    },
                    {
                        path:'/myRoute',
                        name: "myRoute",
                        component: myRoute
                    },
                ]
            },
            {
                path: "/searchStrategy",
                name: "SearchStrategy",
                component: SearchStrategy
            },
            {
                path: "/strategyDetails/:strategyId",
                name: "StrategyDetails",
                component: StrategyDetails
            },
            {
                path: "/earth",
                name: "Earth",
                component: Earth
            },
            {
                path: "/makeRoute",
                name: "makeRoute",
                component: makeRoute
            },
            {
                path: "/routeMsg/:routeId/:obj",
                name: "routeMsg",
                component: routeMsg
            },
            {
                path: "/writeStrategy/:strategyId/:obj",
                name: "writeStrategy",
                component: writeStrategy
            },
            {
                path: "/protocol",
                name: "protocol",
                component: protocol
            },
            {
                path: "/searchAll",
                name: "searchAll",
                component: searchAll
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/resetPassword",
        name: "ResetPassword",
        component: ResetPassword
    }
]

let router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior() {
        return {x: 0, y: 0}
    }
})
// 白名单
const whiteList = ['/person'];
router.beforeEach(async (to, from, next) => {
    // 验证是否登录
    const tokenStr = JSON.parse(sessionStorage.getItem("userInfo"));
    // 登录还访问登录界面 就跳转到网站首页
    if (tokenStr != null && to.path === "/login") {
        return next("/")
    } else {
        // 如果to.path 不包含在白名单内，放行
        if (!whiteList.includes(to.path)) {
            next(); // 放行
        } else {
            if (!tokenStr) {
                return next("/login")
            } else {
                next();
            }
        }
    }

})

// router.beforeEach( async(to,from,next)=>{
//     let token = store.state.user.token
//     let name = store.state.user.userInfo.name
//     if(token){
//         if(to.path=='/login'||to.path=='/register'){
//             next('/')
//         }else{
//             if(name){
//               next()
//             }else{
//              try {
//                 await store.dispatch('getUserInfo')
//                 next()
//              } catch (error) {//token失效重新登录
//                 await store.dispatch('userLogout')
//                 next('/login')
//              }
//             }
//         }
//     }else{
//         let toPath=to.path;
//         if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
//             next('/login?redirect='+toPath)
//         }else{
//             next()
//         }
//     }
// })

export default router;
