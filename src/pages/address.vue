<template>
    <div>
        <ul class="address_box">
            <li class="flex_box">
                <p>姓名</p>
                <div class="flex_item">
                    <input type="text" v-model="address.ship_name" placeholder="请输入姓名">
                </div>
            </li>
            <li class="flex_box">
                <p>电话</p>
                <div class="flex_item">
                    <input type="phone" v-model="address.ship_phone" placeholder="请输入电话">
                </div>
            </li>
            <li class="flex_box">
                <p>地址</p>
                <div class="flex_item">
                    <input type="text" v-model="address.ship_address" placeholder="请输入地址">
                </div>
            </li>
            <li class="flex_box">
                <div class="flex_item" v-if="address.checked" @click="checkStatus(false)">
                    <i class="fa fa-check-square"></i>取消默认
                </div>
                <div class="flex_item" v-else @click="checkStatus(true)">
                    <i class="fa fa-square-o"></i>默认
                </div>
            </li>
        </ul>
        <footer class="cart_footer">
            <div class="cart_fixed flex_box">
                <a href="javascript:void(0);" @click="addAddress" class="flex_item make_order">{{address.id?'更新':'添加'}}</a>
            </div>
        </footer>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js';
export default {
    data(){
        return{
            address:{
                id:'',
                ship_name:'',
                ship_phone:'',
                ship_address:'',
                checked:''
            }
        }
    },
    created(){
        let id=this.$route.params.id;
        this.address.id=id;
        if(id){
            this.getAddress(id);
        }
    },
    methods:{
        getAddress(id){
            let that=this;
            Axios.getAddressDetail({params:{id:id}}).then(res=>{
                this.address=res.data.detail;
            });
        },
        checkStatus(status){
            this.address.checked=status;
        },
        addAddress(){
            let address=this.address;
            if(!address.ship_name){
                return this.$toast('请填写收件人姓名')
            }
            if(!address.ship_phone){
                return this.$toast('请填写收件人电话')
            }
            if(!address.ship_address){
                return this.$toast('请填写收件地址')
            }
            Axios.addAddress(address).then(res=>{
                this.$toast(res.data)
                if(res.status==2){
                    this.$router.push({path:'/address/list'});
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
.address_box{
    background: #fff;
    padding: 0 4vw;
}
.address_box .flex_box{
    padding: 2vw 0;
    height: 10vw;
    line-height: 10vw;
    border-bottom: 1px solid #e4e4e4;
}
.address_box .flex_box .flex_item{
    margin-left: 3vw;
}
.flex_item input[type="text"],
.flex_item input[type="phone"]{
    width: 100%;
    display: block;
    height: 10vw;
}
.flex_item .fa{
    margin-right: 3vw;
    font-size:4.5vw;
    color: #999;
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

