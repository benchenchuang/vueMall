<template>
    <div class="person">
        <div class="person_head">
            <img v-if="info.avatar" class="avatar" :src="imgUrl+info.avatar">
            <img v-else class="avatar" src="../assets/avatar.jpg">
            <p class="name">{{info.username}}</p>
        </div>
        <div class="person_about">
            <router-link :to="{name:'AddressList',params:{userId:info.id}}" class="about_item"><i class="fa fa_icon fa-map-marker"></i>我的地址<i class="fa fa-angle-right"></i></router-link>
            <router-link :to="{name:'Collect',params:{userId:info.id}}" class="about_item"><i class="fa fa_icon fa-heart"></i>我的收藏<i class="fa fa-angle-right"></i></router-link>
        </div>

        <a class="get_out" @click="getOut" href="javascript:void(0);">退出登录</a>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js';
export default {
    data(){
        return {
            imgUrl:Axios.imgUrl,
            info:{}
        }
    },
    created(){
        let token=this.Cookie.getCookie('authorizon');
        this.getUser(token);
    },
    methods:{
        getUser(token){
            let that=this;
            Axios.getUser({params:{token:token}}).then(res=>{
                if(res.status==2){
                    that.info=res.data.info;
                }
            })
        },
        getOut(){
            this.Cookie.setCookie('authorizon');
            this.$router.push({
                path:"/login",
                query: {redirect: this.$router.currentRoute.fullPath}
            });
        }
    }
}
</script>
<style>
body{
    background: #f5f5f5;
}
.person_about{
    margin-top: 4vw;
    padding: 0 4vw;
    background: #fff;
}
.person_about .about_item{
    display: block;
    height: 12vw;
    line-height: 12vw;
    border-bottom: 1px solid #e4e4e4;
}
.person_about .about_item:last-child{
    border-bottom: none;
}
.about_item .fa_icon{
    width: 6vw;
    text-align: center;
    display: inline-block;
    margin-right: 2vw;
    font-size: 4vw;
    color: #999;
}
.fa-angle-right{
    float: right;
    margin-top: 4vw;
    font-size: 4vw;
    color: #aaa;
}
.person_head{
    padding: 4vw 0;
    text-align: center;
    background: #fff;
}
.person_head .avatar{
    display: block;
    margin: 2vw auto;
    width: 20vw;
    height: 20vw;
    border-radius: 100%;
}
.person_head .name{
    font-size: 4vw;
    color: #666;
}
.get_out{
    margin: 4vw;
    display: block;
    height: 10vw;
    line-height: 10vw;
    text-align: center;
    color: #fff;
    background:#e9524a;
    border-radius: 2vw;
}

</style>


