<template>
    <div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <ul>
                <li class="order_item" v-for="(order,index) in orders" :key="index">
                    <router-link :to="{name:'Order',params:{id:order.id}}">
                        <p class="item_cont">订单号：{{order.order_no}} <span class="fr" v-if="order.status==0">{{order.status | orderStatus}}</span><span class="fr status" v-else>{{order.status | orderStatus}}</span></p>
                        <p class="item_cont">订单金额：<span class="money">￥{{order.pay_money}}</span></p>
                        <p class="item_cont">支付方式：{{order.pay_type==1?'微信':'支付宝'}}</p>
                    </router-link>
                    <dl>
                        <dt class="flex_box" v-for="(item,i) in order.order_items" :key="i">
                            <img :src="imgUrl+item.product_image"/>
                            <div class="flex_item">
                                <p class="pro">{{item.product_name}}</p>
                                <p class="pro">单价：￥{{item.product_price}}</p>
                                <p class="pro">数量：{{item.quantity}}</p>
                            </div>
                        </dt>
                    </dl>
                    <p class="item_cont">下单时间：{{order.create_time}}</p>
                </li>
            </ul>
            <p class="tip" v-if="orders.length" v-show="load">加载中...</p>
            <p class="tip" v-if="orders.length" v-show="end">已到底...</p>
            
        </div>
        <p class="tip" v-if="!orders.length">暂无数据...</p>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js';
export default {
    data(){
        return{
            imgUrl:Axios.imgUrl,
            orders:[],
            limit:4,
            page:0,
            busy:false,
            allPage:1,
            load:true,
            end:false
        }
    },
    created(){
        let token=this.Cookie.getCookie('authorizon');
        this.token=token;
        this.loadMore();
    },
    filters:{
        orderStatus(status){
            switch(status){
                case 0:
                return '已取消';
                break;
                case 1:
                return '未付款';
                break;
                case 2:
                return '已付款';
                break;
                case 3:
                return '已发货';
                break;
                case 4:
                return '交易成功';
                break;
                case 5:
                return '交易关闭'
            }
        }
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
                Axios.orderList({params:{page:that.page,limit:that.limit,token:that.token}}).then(res=>{
                    that.allPage=res.data.totalPages;
                    if(res.data.orders.length){
                        res.data.orders.forEach(element => {
                            that.orders.push(element);
                        });
                    }
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
.fr{
    float: right;
}
.status,
.money{
    color: #ff0000;
}
.order_item{
    margin: 4vw;
    padding:4vw;
    background: #fff;
}
.order_item .item_cont{
    font-size: 4vw;
    color: #666;
}
.order_item dl{
    margin: 2vw 0;
    padding: 3vw;
    background: #f5f5f5;
}
.order_item dl img{
    width: 26vw;
    height: 20vw;
    vertical-align: top;
}
.order_item dl dt{
    margin-bottom: 2vw;
}
.order_item dl dt:last-child{
    margin-bottom: 0;
}
.order_item dl .flex_item{
    margin-left: 3vw;
    font-size: 3.5vw;
    color: #999;
    line-height: 2;
}
</style>


