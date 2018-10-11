<template>
    <div>
        <div class="user_address flex_box">
            <router-link :to="{path:'/address/list',query:{item:itemString}}" class="flex_item" v-if="address.id">
                <p class="txt">{{address.ship_name}}  {{address.ship_phone}}</p>
                <p class="txt">{{address.ship_address}}</p>
            </router-link>
            <router-link :to="{path:'/address/list',query:{item:itemString}}" class="flex_item" v-else>
                <p class="address_tip">请选择收货地址</p>
            </router-link>
            <i class="fa fa-angle-right"></i>
        </div>

        <div class="item_box">
            <div class="item flex_box" v-for="(shop,index) in item" :key="index">
                <img class="cart_img" :src="imgUrl+shop.pic"/>
                <div class="item_detail flex_item">
                    <h3 class="title">{{shop.title}}</h3>
                    <p>价格：<span class="price">￥{{shop.price}}</span></p>
                    <p>数量：<span class="price">{{shop.count}}</span></p>
                </div>
            </div>
        </div>

        <div class="pay_box">
            <div class="flex_box pay_item">
                <i class="fa fa-check-square"></i>
                <p class="flex_item">
                    <i class="fa fa-weixin"></i>
                    <span>微信支付</span>
                </p>
            </div>
        </div>

        <footer class="cart_footer">
            <div class="cart_fixed flex_box">
                <a href="javascript:void(0);" @click="createOrder" class="flex_item make_order">确定支付(￥{{all_money}})</a>
            </div>
        </footer>

    </div>
</template>
<script>
import * as Axios from '../utils/axios.js'
export default {
    data(){
        return{
            imgUrl:Axios.imgUrl,
            itemString:'',
            item:[],
            address:{},
            pay_type:1,
            all_money:0
        }
    },
    created(){
        let item=this.$route.query.item;
        this.addressId=this.$route.query.address;
        this.item=JSON.parse(item);
        let allMoney=0;
        this.item.forEach(item=>{
            allMoney+=item.price*item.count;
        });
        this.all_money=allMoney;
        this.itemString=item;
        this.getUserAddress();
    },
    methods:{
        getUserAddress(){
            let that=this;
            Axios.getAddressList().then(res=>{
                let addressList=res.data.address
                if(that.addressId){
                    addressList.forEach(item => {
                        if(item.id==that.addressId){
                            that.address=item;
                        }
                    });
                }else{
                    if(addressList.length){
                        addressList.forEach(item => {
                            if(item.checked){
                                that.address=item;
                            }
                        });
                    }
                }
            })
        },
        createOrder(){
            Axios.addOrder({ship_id:this.address.id,item:this.item,pay_type:this.pay_type,status:1}).then(res=>{
               if(res.status==2){
                   this.$router.push({path:"/orders"});
               }else{
                   this.$toast(res.data)
               }
            })
        }
    }
}
</script>
<style>
body{
    background: #f5f5f5;
}
.user_address{
    padding: 4vw;
    background: #fff;
}
.user_address .txt{
    font-size: 4vw;
    color: #666;
}
.user_address .fa{
    padding-top: 2vw;
    font-size: 5vw;
    color: #aaa;
}
.address_tip{
    font-size: 4vw;
    color: #999
}
.item_box,
.pay_box{
    margin-top: 4vw;
    padding: 0 4vw;
    background: #fff;
}
.item_box .item,
.pay_box .pay_item{
    padding: 4vw 0;
    border-bottom: 1px solid #e4e4e4;
}
.item_box .item:last-child,
.pay_box .pay_item:last-child{
    border-bottom: none;
}
.item .cart_img{
    margin-right: 4vw;
    width: 30vw;
    height: 24vw;
}
.item .price{
    color: #e9524a;
}
.pay_item{
    font-size: 4vw;
}
.pay_item .flex_item{
    margin-left: 3vw;
    color: #666;
}
.pay_item .flex_item .fa{
    color:#49de3e;
}
.item_check .fa-check-square,
.fa-check-square{
    color:#e9524a; 
}
.footer{
    width: 100%;
    height: 12vw;
}
.cart_fixed{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 12vw;
    line-height: 12vw;
    font-size: 4vw;
    text-align: center;
    background: #fff;
}
.make_order{
    width: 36vw;
    color: #fff;
    background: #e9524a;
}
</style>

