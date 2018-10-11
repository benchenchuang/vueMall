<template>
    <div class="wrap">
        <ul class="cart_box">
            <li class="cart_item flex_box" v-if="cart.status==1" v-for="(cart,index) in carts" :key="index">
                <div class="item_check">
                    <i class="fa fa-check-square" v-if="cart.checked" @click="getChecked(cart.id,false)"></i>
                    <i class="fa fa-square-o" v-else @click="getChecked(cart.id,true)"></i>
                </div>
                <div class="flex_item flex_box">
                    <img class="cart_img" :src="imgUrl+cart.banner_images[0]"/>
                    <div class="item_detail flex_item">
                        <h3 class="title">{{cart.name}}</h3>
                        <p>价格：<span class="price">￥{{cart.price}}</span></p>
                        <p class="controls">
                            <i class="fa fa-minus-square" @click="updateCartNum(cart.product_id,-1)" :class="cart.quantity<=1?'cancel':''"></i>
                            <input type="number" class="put" v-model="cart.quantity">
                            <i class="fa fa-plus-square" @click="updateCartNum(cart.product_id,1)" :class="cart.quantity>=cart.stock?'cancel':''"></i>
                            <i class="fa fa-trash-o fr" @click="deleteCart(cart.id)"></i>
                        </p>
                    </div>
                </div>
            </li>
        </ul>

        <ul class="cart_box cart_cancel">
            
            <li class="cart_item flex_box cancel" v-if="cart.status!=1" v-for="(cart,index) in carts" :key="index">
                <div class="flex_item flex_box">
                    <p class="cart_sort">已失效</p>
                    <img class="cart_img" :src="imgUrl+cart.banner_images[0]"/>
                    <div class="item_detail flex_item">
                        <h3 class="title">{{cart.name}}</h3>
                        <p>价格：<span class="price">￥{{cart.price}}</span></p>
                        <p class="controls">
                            <i class="fa fa-trash-o fr" @click="deleteCart(cart.id)"></i>
                        </p>
                    </div>
                </div>
            </li>
        </ul>

        <footer class="cart_footer">
            <div class="cart_fixed flex_box">
                <div class="check_all" v-if="!all_checked" @click="allChecked">
                    <i class="fa fa-square-o"></i>全选
                </div>
                <div class="check_all" v-else @click="allChecked">
                    <i class="fa fa-check-square"></i>取消全选
                </div>
                <p class="flex_item all_price">总价：<span class="price">￥{{total_price}}</span></p>
                <router-link :to="{name:'makeOrder',query:{item:checkArr}}" class="make_order">去结算</router-link>
            </div>
        </footer>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js';
export default {
    data(){
        return{
            imgUrl:Axios.imgUrl,
            carts:[],
            all_price:0,
            all_checked:false,
            checkArr:''
        }
    },
    created(){
        let token=this.Cookie.getCookie('authorizon');
        this.token=token;
        this.getCarts(token);
    },
    computed:{
        total_price(){
            let total=0;
            let checkArr=[];
            this.carts.forEach(item => {
                if(item.status==1 && item.checked){
                    total+=item.quantity*item.price;
                    checkArr.push({id:item.id,product_id:item.product_id,title:item.name,count:item.quantity,pic:item.banner_images[0],price:item.price})
                }
            });
            this.checkArr=JSON.stringify(checkArr);
            return total;
        }
    },
    methods:{
        getCarts(token){
            let that=this;
            Axios.getCarts({params:{token:token}}).then(res=>{
                if(res.status==2){
                    that.carts=res.data.carts;
                    that.isSelected();
                }
            })
        },
        updateCartNum(id,quantity){
            let that=this;
            Axios.addCart({id:id,quantity:quantity,token:this.token}).then(res=>{
                if(res.status==0){
                    this.$toast(res.data);
                }
                this.getCarts(this.token);
            })
        },
        updateCartStatus(id,checked){
            Axios.addCart({id:id,token:this.token,checked:checked}).then(res=>{
                this.getCarts(this.token);
            })
        },
        deleteCart(id){
            Axios.delCart({id:id}).then(res=>{
                this.$toast(res.data);
                this.getCarts(this.token);
            })
        },
        getChecked(id,status){
            let that=this;
            this.carts.forEach(item=>{
                if(item.id==id){
                    item.checked=status
                    that.isSelected();
                    that.updateCartStatus(item.product_id,status);
                }
            });
        },
        allChecked(){
            let that=this;
            let status=!this.all_checked;
            this.carts.forEach(item=>{
                if(item.status==1){
                    item.checked=status;
                    that.all_checked=status;
                    that.updateCartStatus(item.product_id,status);
                }
            })
        },
        isSelected(){
            let flag=true;
            if(this.carts.length){
                this.carts.forEach(item=>{
                    if(item.status==1 && !item.checked){
                        return flag=false;
                    }
                });
            }else{
                flag=false;
            }
            
            this.all_checked=flag==true?true:false;
        }
    }
}
</script>
<style scoped>
body{
    background: #f5f5f5;
}
.fr{
    float: right;
    color: #999;
}
.cart_box{
    margin: 4vw 0;
    padding: 0 4vw;
    background: #fff;
}
.cart_box .cart_item{
    padding: 4vw 0;
    border-bottom: 1px solid #e4e4e4;
}
.cart_box .cart_item:last-child{
    border-bottom: none;
}
.cart_item.cancel .title,
.cart_item.cancel .price{
    color: #999!important;
}
.cart_item .item_check{
    margin-right: 3vw;
    font-size: 5vw;
    color: #999;
}
.item_check .fa-check-square,
.fa-check-square{
    color:#e9524a; 
}
.cart_sort{
    padding-top: 3vw;
    font-size: 4vw;
    color: #999;
}
.cart_item .cart_img{
    width: 30vw;
    height: 24vw;
}
.cart_item .item_detail{
    margin-left: 4vw;
    font-size: 4vw;
    color: #999;
}
.item_detail .title{
    font-size: 4.5vw;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.item_detail .price{
    color:#e9524a; 
}
.item_detail .controls{
    margin-top: 3vw;
    font-size: 5vw;
    color: #333;
    line-height: 6vw;
}
.controls .fa{
    vertical-align: middle;
}
.controls .put{
    width: 14vw;
    height: 6vw;
    line-height: 6vw;
    text-align: center;
    border: 1px solid #e4e4e4;
    border-radius: 1vw;
}
.controls .cancel{
    color: #aaa;
}

.footer{
    width: 100%;
    height: 12vw;
}
.cart_fixed{
    position: fixed;
    left: 0;
    bottom: 12vw;
    width: 100%;
    height: 12vw;
    line-height: 12vw;
    font-size: 4vw;
    text-align: center;
    background: #fff;
}
.check_all{
    margin: 0 4vw;
    color: #666;
}
.check_all .fa{
    margin-right: 2vw;
}
.all_price{
    color: #e9524a;
}
.make_order{
    width: 36vw;
    color: #fff;
    background: #e9524a;
}
</style>

