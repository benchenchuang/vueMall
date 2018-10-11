<template>
    <div>
        <swiper v-if="shop.banner_images" :options="swiperOption" class='swiper'>
            <swiper-slide  v-for="(item,index) in shop.banner_images" :key='index'>
                <a :href="item.url"><img :src="imgUrl+item"></a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="head_area">
            <div class="flex_box">
                <div class="flex_item">
                    <h2 class="title">{{shop.name}}</h2>
                    <p class="sub_title">{{shop.sub_title}}</p>
                </div>
                
                <div class="flex_love love" v-if="collect.length" @click="cancelShop(collect[0].id)">
                    <i class="fa fa-heart"></i>
                    <p class="heart_tip">{{shop.love_count}}</p>
                </div>
                <div class="flex_love" v-else @click="collectShop">
                    <i class="fa fa-heart"></i>
                    <p class="heart_tip">{{shop.love_count}}</p>
                </div>
            </div>
            <div>
                <span class="price">{{shop.price | myCurrency}}</span>
                <span class="sale">剩余数量:{{shop.stock}}</span>
            </div>
        </div>

        <div class="detail">
            <h3 class="model_title">产品详情</h3>
            <div v-html="shop.detail"></div>
        </div>

        <footer class="footer">
            <div class="footer_controls flex_box">
                <a class="flex_item add_cart" href="javascript:void(0);" @click="addCart"><i class="fa fa-shopping-cart"></i>加入购物车</a>
                <router-link :to="{name:'makeOrder',query:{item:checkArr}}"  class="flex_item buy_shop">立即购买</router-link>
            </div>
        </footer>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    components:{
        swiper,
        swiperSlide
    },
    data(){
        return{
            imgUrl:Axios.imgUrl,
            collect:[],
            shop:{},
            swiperOption: {
                pagination: '.swiper-pagination',
                autoplay: 3000,
                slidesPerView: 1,
                paginationClickable: true,
                spaceBetween: 0,
                loop:true,
                pagination: {
                    el: '.swiper-pagination'
                },
            },
            checkArr:''
        }
    },
    created(){
        let productId=this.$route.params.id;
        let userId=this.Cookie.getCookie('userId') || '';
        this.productId=productId;
        this.userId=userId;
        this.getDetail(productId,userId);
    },
    filters:{
        myCurrency(val){
            return '￥'+Number(val).toFixed(2);
        }
    },
    methods:{
        getDetail(id,userId){
            let that=this;
            Axios.getProduct({params:{id:id,userId:userId}}).then(res=>{
                console.log(res);
                if(res.status==2){
                    that.collect=res.data.collect;
                    that.shop=res.data.shop;
                    let checkArr=[{product_id:that.shop.id,title:that.shop.name,count:1,pic:that.shop.banner_images[0],price:that.shop.price}];
                    that.checkArr=JSON.stringify(checkArr);
                }else{
                    this.$toast(res.data)
                }
            });
        },
        collectShop(){
            let that=this;
            let data={
                id:that.shop.id,
                userId:that.userId
            };
            Axios.collectShop(data).then(res=>{
                this.$toast(res.data);
                if(res.status==2){
                    that.getDetail(that.productId,that.userId)
                }
            });
        },
        cancelShop(id){
            let that=this;
            Axios.cancelShop({id:id}).then(res=>{
                this.$toast(res.data);
                if(res.status==2){
                    that.getDetail(that.productId,that.userId)
                }
            })
        },
        addCart(){
            let shopId=this.shop.id;
            let token=this.Cookie.getCookie('authorizon');
            Axios.addCart({id:shopId,token:token,quantity:1}).then(res=>{
                this.$toast(res.data);
            })
        }
    }
}
</script>
<style scoped>
.footer{
    width: 100%;
    height: 12vw;
}
.footer_controls{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 12vw;
    line-height: 12vw;
    text-align: center;
}
.footer_controls a{
    color: #fff;
    font-size: 4vw;
}
.footer_controls .fa{
    font-size: 5vw;
    margin-right: 1vw;
}
.add_cart{
    background: #35cdc4;
}
.buy_shop{
    background: #e9524a;
}
.swiper,
.swiper img{
    width: 100%;
    height: 60vw;
}
.head_area{
    padding: 4vw;
    background: #fff;
    border-bottom: 2vw solid #f5f5f5;
}
.head_area .title{
    font-size: 4.5vw;
    color: #333;
}
.head_area .sub_title{
    font-size: 3.5vw;
    color: #999;
}
.head_area .price{
    margin-top: 1vw;
    font-size: 5vw;
    color: #dd2e2e;
}
.flex_love{
    margin-left: 3vw;
    width:12vw;
    text-align: center;
}
.flex_love .fa,
.flex_love .heart_tip{
    color: #999;
}
.flex_love .fa{
    font-size: 5vw;
}
.flex_love .heart_tip{
    font-size: 3.5vw;
}
.flex_love.love .fa{
    color: #dd2e2e;
}
.sale{
    float: right;
    font-size: 3.5vw;
    color: #999;
}
.detail{
    padding: 4vw;
    background: #fff;
}
.model_title{
    font-size: 4.5vw;
    color: #999;
    margin-bottom: 3vw;
}
</style>


