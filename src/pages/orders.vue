<template>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div>
            <p class="tip" v-show="load">加载中...</p>
            <p class="tip" v-show="end">暂无内容...</p>
        </div>
        <p class="tip">暂无内容...</p>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js';
export default {
    data(){
        return{
            shops:[],
            limit:10,
            page:0,
            busy:false,
            allPage:1,
            load:true,
            end:false
        }
    },
    created(){
       this.loadMore();
    },
    methods:{
        loadMore(){

        }
    }
}
</script>
<style>
body{
    background: #f5f5f5;
}
.tip{
    font-size: 4vw;
    margin: 2vw auto;
    color: #999;
    text-align: center;
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


