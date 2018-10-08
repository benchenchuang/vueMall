<template>
    <div class="home_wrap">
        <swiper v-if="banners.length" :options="swiperOption" class='swiper'>
	        <swiper-slide  v-for="(item,index) in banners" :key='index'>
	        		<a :href="item.link"><img :src="url+item.image"></a>
	        </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
	     </swiper>

        <div class="sorts">
            <router-link :to='{name:"Shops",params:{sort:sort.id},query:{name:sort.sort_name}}' class="sort_item" v-for="(sort,index) in sorts" :key="index" >
                <div v-lazy-container="{ selector: 'img'}">
                    <img :data-src="url+sort.sort_image" data-loading="../../static/nav_loading.jpg"/>
                </div>
                <p>{{sort.sort_name}}</p>
            </router-link>
        </div>

        <shop-list :shops="shops"></shop-list>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import * as Axios from '../utils/axios.js';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import shopList from '../components/shop_list';
export default {
    components:{
			swiper,
            swiperSlide,
            shopList
	},
    data(){
        return{
            swiperOption: {
                notNextTick: true,
                loop: true,
                autoplay: true,
                pagination: {
                    el: '.swiper-pagination'
                },
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                slidesPerView: 1,
            },
            url:Axios.imgUrl,
            banners:[],
            sorts:[],
            shops:[]
        }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted(){
       this.getHome();
    },
    methods:{
        async getHome(){
            let that=this;
            await Axios.getHome().then(res=>{
                that.banners=res.data.banners;
                that.sorts=res.data.sorts;
                that.shops=res.data.shops;
            });
        }
    }
}
</script>
<style>
body{
    background: #f5f5f5;
}
.swiper img{
    width: 100%;
    height: 50vw;
}
.sorts{
    margin:4vw 0;
    padding: 2vw 0;
    background: #fff;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    text-align: center;
}
.sort_item{
    margin: 2vw 0;
    width: 25%;
}
.sort_item img{
    width: 15vw;
    height: 15vw;
    border-radius: 100%;
}
.sort_item p{
    margin-top: 2vw;
    font-size: 3.5vw;
    color: #999;
}
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


