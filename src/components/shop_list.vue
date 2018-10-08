<template>
    <div class="recommend">
        <router-link :to='{name:"Shop",params:{id:shop.id}}' class="shop_item" v-for="(shop,index) in shops" :key="index">
            <img v-lazy="url+shop.banner_images[0]"/>
            <p class="title">{{shop.name}}</p>
            <p class="price">价格：<span class="red">￥{{shop.price}}元</span></p>
        </router-link>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js';
export default {
    props:['shops'],
    data(){
        return {
         url:Axios.imgUrl   
        }
    }
}
</script>
<style>
.recommend{
    background: #fff;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
}
.shop_item{
    width: 50%;
    padding: 0 2vw;
    margin: 4vw 0;
    box-sizing: border-box;
}
.shop_item img{
    width: 100%;
    height: 32vw;
}
.shop_item .title{
    font-size: 4vw;
    color: #333;
    padding: 5px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.shop_item .price{
    font-size: 3.5vw;
    color: #999;
}
.price .red{
    color: #ff0000
}
</style>


