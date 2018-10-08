<template>
    <div>
        <div class="address">
            <ul v-if="addressBox.length">
                <li class="address_item flex_box" v-for="(address,index) in addressBox" :key="index">
                    <div class="item_check">
                        <i class="fa fa-check-square" v-if="address.checked" @click="checkStatus(false,address.id)"></i>
                        <i class="fa fa-square-o" v-else @click="checkStatus(true,address.id)"></i>
                    </div>
                    <div class="address_content flex_item">
                        <p>{{address.ship_name}} {{address.ship_phone}}</p>
                        <p>{{address.ship_address}}</p>
                        <div class="control">
                            <router-link :to='{name:"Address",params:{id:address.id}}'><i class="fa fa-edit"></i></router-link>
                            <i class="fa fa-trash-o" @click="delAddress(address.id)"></i>
                        </div>
                    </div>
                </li>
            </ul>
            <p v-else class="address_tip">暂无地址</p>
        </div>
        <footer class="cart_footer">
            <div class="cart_fixed flex_box">
                <router-link :to="{name:'Address',params:{id:0}}" class="flex_item make_order">添加地址</router-link>
            </div>
        </footer>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js'
export default {
    data(){
        return {
            userId:'',
            addressBox:[]
        }
    },
    created(){
        let userId=this.$route.query.userId;
        this.userId=userId;
        this.getAddressList();
    },
    methods:{
        getAddressList(){
            let that=this;
            Axios.getAddressList({params:{userId:this.userId}}).then(res=>{
                that.addressBox=res.data.address;
            })
        },
        delAddress(id){
            let that=this;
            Axios.delAddress({id:id}).then(res=>{
                this.$toast(res.data);
                if(res.status==2){
                    that.getAddressList();
                }
            })
        },
        checkStatus(status,id){
            Axios.addAddress({checked:status,id:id}).then(res=>{
                this.getAddressList();
            })
        }
    }
}
</script>
<style>
body{
    background: #f5f5f5;
}
.address{
    padding: 0 4vw;
    background: #fff;
}
.address_item{
    padding: 4vw 0;
    border-bottom: 1px solid #e4e4e4;
}
.address_item:last-child{
    border: none;
}
.item_check{
    width: 10vw;
    line-height: 12vw;
    text-align: center;
    font-size: 5vw;
}
.address_content{
    font-size: 4vw;
    color: #666;
}
.control{
    margin-top: 2vw;
}
.address_content .fa{
    margin-right: 5vw;
    color: #999;
}
.address_tip{
    text-align: center;
    font-size: 4vw;
    color: #999;
    line-height: 4;
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

