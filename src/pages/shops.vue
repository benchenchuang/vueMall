<template>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <shop-list :shops="shops"></shop-list>
        <p class="tip" v-show="load">加载中...</p>
        <p class="tip" v-if="shops.length" v-show="end">已经是最后了...</p>
        <p class="tip" v-else>暂无商品...</p>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js';
import shopList from '../components/shop_list';
export default {
    components:{
        shopList
	},
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
        document.title=this.$route.query.name;
        let sort=this.$route.params.sort;
        this.sort=sort;
        this.loadMore();
    },
    methods:{
        loadMore(){
            let that=this;
            that.load=true;
            that.busy=true;
            that.page++;
            if(that.page>that.allPage){
                that.end=true;
                that.load=false;
            }else{
                Axios.getProducts({params:{page:that.page,limit:that.limit,sort:that.sort}}).then(res=>{
                    that.allPage=res.data.totalPages;
                    res.data.shops.forEach(element => {
                        that.shops.push(element);
                    });
                    this.busy=false;
                    that.load=false;
                });
            }
            
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


