<template>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <shop-list :shops="collects"></shop-list>
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
            collects:[],
            busy:false,
            load:true,
            end:false
        }
    },
    created(){
        let userId=this.$route.query.userId;
        this.userId=userId;
        this.loadMore();
    },
    methods:{
        loadMore(){
            let that=this;
            Axios.getCollects({params:{userId:this.userId}}).then(res=>{
                that.collects=res.data.collects;
            });
            
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


