<template>
    <div>
        <div class="user_address flex_box">
            <router-link :to="{path:'/address/list',query:{id:itemString}}" class="flex_item" v-if="address.id">
                <p class="txt">{{address.ship_name}}  {{address.ship_phone}}</p>
                <p class="txt">{{address.ship_address}}</p>
            </router-link>
            <router-link :to="{path:'/address/list',query:{id:itemString}}" class="flex_item" v-else>
                <p class="address_tip">请选择收货地址</p>
            </router-link>
            <i class="fa fa-angle-right"></i>
        </div>
    </div>
</template>
<script>
import * as Axios from '../utils/axios.js'
export default {
    data(){
        return{
            itemString:'',
            item:[],
            address:{},
        }
    },
    created(){
        let item=this.$route.params.item;
        this.item=JSON.parse(item);
        this.itemString=item;
        this.getUserAddress();
        
    },
    methods:{
        getUserAddress(){
            let that=this;
            Axios.getAddressList().then(res=>{
                let addressList=res.data.address
                if(addressList.length){
                    addressList.forEach(item => {
                        if(item.checked){
                            that.address=item;
                        }
                    });
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
</style>

