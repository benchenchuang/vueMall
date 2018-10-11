<template>
    <div class="form">
        <div class="flex_box">
            <i class="fa fa-user"></i>
            <div class="flex_item">
                <input type="text" v-model="userInfo.username" placeholder="请输入用户名"/>
            </div>
        </div>
        <div class="flex_box">
            <i class="fa fa-key"></i>
            <div class="flex_item">
                <input type="password" v-model="userInfo.password" placeholder="请输入登录密码"/>
            </div>
        </div>

        <a class="login_btn" @click="login" href="javascript:void(0);">登 录</a>
        <router-link class="link" :to="{name:'Register'}">注册</router-link>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js';
export default {
    data(){
        return{
            userInfo:{
                type:1,
                username:'',
                password:''
            }
        }
    },
    methods:{
        login(){
            let that=this;
            let redirect = decodeURIComponent(this.$route.query.redirect || '/');
            Axios.postLogin(this.userInfo).then(res=>{
                if(res.status==2){
                    this.$toast.center('登录成功');
                    this.Cookie.setCookie('authorizon',res.data.token,1);
                    this.Cookie.setCookie('userId',res.data.userId.id,1);
                    this.$router.push({
                        path: redirect
                    })
                }else{
                    this.$toast.center(res.data);
                }
            })
        }
    }
}
</script>
<style scoped>
body{
    background: #fff
}
    .form{
        margin-top: 10vw;
        padding: 10vw 8vw;
    }
    .form .flex_box{
        margin: 4vw 0;
        height: 12vw;
        width: 100%;
        background: #f1f1f1;
        border-radius: 12vw;
    }
    .flex_box i{
        margin-left: 3vw;
        font-size: 5vw;
        color: #aaa;
        line-height: 12vw;
    }
    .flex_item input{
        padding-left: 2vw;
        box-sizing: border-box;
        display: block;
        width: 100%;
        height: 12vw;
        line-height: 12vw;
    }
    .login_btn{
        margin-top: 10vw;
        display: block;
        width: 100%;
        height: 12vw;
        line-height: 12vw;
        text-align: center;
        font-size: 4vw;
        color: #fff;
        background: #333;
        border-radius: 12vw;
    }
    .link{
        display: block;
        margin: 4vw;
        font-size: 4vw;
        color: #999;
        text-align: center;
    }
</style>


