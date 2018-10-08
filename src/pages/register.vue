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

        <div class="flex_box">
            <i class="fa fa-key"></i>
            <div class="flex_item">
                <input type="password" v-model="userInfo.repassword" placeholder="请输入重复密码"/>
            </div>
        </div>

        <div class="flex_box">
            <select v-model="userInfo.question">
                <option :value="item.id" v-for="(item,index) in questions" :key='index'>{{item.question}}</option>
            </select>
        </div>

        <div class="flex_box">
            <i class="fa fa-answer"></i>
            <div class="flex_item">
                <input type="text" v-model="userInfo.answer" placeholder="请输入问题答案"/>
            </div>
        </div>

        <a class="login_btn" @click="register" href="javascript:void(0);">注 册</a>
        <router-link :to="{name:'Login'}" class="link" >登录</router-link>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js';
export default {
    data(){
        return{
            userInfo:{
                role:1,
                username:'',
                password:'',
                repassword:'',
                question:'',
                answer:""
            },
            questions:[]
        }
    },
    created(){
        this.getQuestions();
        
    },
    methods:{
        getQuestions(){
            let that=this;
            Axios.getQuestions().then(res=>{
                that.questions=res.data.info;
                that.userInfo.question=that.questions[0]['id'];
            })
        },
        register(){
            let that=this;
            Axios.postRegister(this.userInfo).then(res=>{
                if(res.status==2){
                    this.$toast.center('注册成功');
                    that.$router.push({name:"Login"});
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
    .flex_box select{
        display: block;
        width: 100%;
        border: 0;
        background: none;
        text-align: center;
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


