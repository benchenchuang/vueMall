<template>
    <div class="template">
        <p class="status" v-if="leftTimes">付款剩余时间：{{leftTime}}</p>
        <p class="status" v-else>{{order.status | orderStatus}}</p>
        <div class="order_item_list">
            <ul>
                <li class="flex_box" v-for="(item,index) in orderItem" :key="index">
                    <img :src="imgUrl+item.product_image"/>
                    <div class="flex_item">
                        <p>{{item.product_name}}</p>
                        <p class="count">数量：{{item.quantity}}</p>
                        <p class="price">价格：{{item.product_price}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="order_info">
            <div class="info flex_box">
                <span>收件人姓名：</span>
                <span class="flex_item">{{order.ship_name}}</span>
            </div>
            <div class="info flex_box">
                <span>收件人电话：</span>
                <span class="flex_item">{{order.ship_phone}}</span>
            </div>
            <div class="info flex_box">
                <span>收件地址：</span>
                <span class="flex_item">{{order.ship_address}}</span>
            </div>
        </div>

        <div class="order_info">
            <div class="info flex_box">
                <span>订单号：</span>
                <span class="flex_item">{{order.order_no}}</span>
            </div>
            <div class="info flex_box">
                <span>下单时间：</span>
                <span class="flex_item">{{order.create_time}}</span>
            </div>
            <div class="info flex_box">
                <span>支付方式：</span>
                <span class="flex_item">{{order.pay_type==1?'微信':"支付宝"}}</span>
            </div>
            <div class="info flex_box">
                <span>订单总价：</span>
                <span class="flex_item">{{order.pay_money}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js'
export default {
    data(){
        return{
            imgUrl:Axios.imgUrl,
            order:{},
            orderItem:[],
            leftTime:'15分00秒',
            leftTimes:''
        }
    },
    created(){
        let id=this.$route.params.id;
        this.getOrder(id);
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
        getOrder(id){
            let that=this;
            Axios.orderDetail({params:{id:id}}).then(res=>{
                console.log(res);
                if(res.status==2){
                    that.order=res.data.order;
                    that.orderItem=res.data.orderItem;
                    if(res.data.order.status==1){
                    let time=new Date(that.order.create_time).toLocaleString();
                    let startTime= new Date(time.replace("-","/"));
                    let subMins=15;
                    startTime.setMinutes(startTime.getMinutes()+subMins,startTime.getSeconds(),0);
                    
                    // let nowTime=new Date(new Date().toLocaleString().replace("-","/"));
                    // let leftTime=(startTime.getTime()-nowTime.getTime())/1000;
                    // let leftMinutes=parseInt(leftTime/60%60);
                    // let leftSeconds=parseInt(leftTime%60);
                    // that.leftTimes=leftTime;
                    // that.leftTime=that.setDouble(leftMinutes)+'分'+that.setDouble(leftSeconds)+'秒';

                    that.interval = setInterval(() => {
                            let nowTime=new Date(new Date().toLocaleString().replace("-","/"));
                            let leftTime=(startTime.getTime()-nowTime.getTime())/1000;
                            let leftMinutes=parseInt(leftTime/60%60);
                            let leftSeconds=parseInt(leftTime%60);
                            that.leftTimes=leftTime;
                            that.leftTime=that.setDouble(leftMinutes)+'分'+that.setDouble(leftSeconds)+'秒';
                            if(leftTime<=0){
                                Axios.orderStatus({id:res.data.order.id,status:0,items:res.data.orderItem}).then(res=>{
                                    console.log(res);
                                });
                                clearInterval(that.interval);
                                that.getOrder(id);
                            }
                        }, 1000)
                    }
                }else{
                    this.$toast('获取信息失败')
                }
            })
        },
        setDouble(num){
            return num<10?'0'+num:num;
        }
    }
}
</script>
<style scoped>
    .template{
        background: #f5f5f5;
    }
    .status{
        width: 100%;
        height: 15vw;
        line-height: 15vw;
        font-size: 4vw;
        color: #fff;
        text-align: center;
        background: #f98f04;
    }
    .order_item_list,
    .order_info{
        margin: 4vw 0;
        padding: 0 4vw;
        background: #fff;
    }
    .order_item_list li{
        padding: 4vw 0;
        border-bottom: 1px solid #e4e4e4;
    }
    .order_item_list li:last-child{
        border-bottom: 0;
    }
    .order_item_list li img{
        width: 30vw;
        height: 24vw;
    }
    .order_item_list li .flex_item{
        margin-left: 4vw;
        font-size: 4vw;
        color: #333;
    }
    .count{
        color: #999;
    }
    .price{
        color: #f98f04;
    }
    .info{
        font-size: 4vw;
        height: 12vw;
        line-height: 12vw;
        color: #999;
        border-bottom: 1px solid #e4e4e4;
    }
    .info:last-child{
        border-bottom: none;
    }
    .info .flex_item{
        text-align: right;
        color: #666;
    }
</style>
