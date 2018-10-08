import axios from 'axios';
const api='/api';
export const imgUrl='http://127.0.0.1:3636/upload/';
import Cookie from './cookie';
import router from '../router/index'

//发送拦截
axios.interceptors.request.use(
    config=>{
        let token=Cookie.getCookie('authorizon');
        if(token){
            config.headers.Authorization=token;
        }
        return config;
    },err=>{
        return Promise.reject(err);
    }
);
//接收拦截
axios.interceptors.response.use(
    response=>{
        if(response.data.status==4){
            Cookie.clearCookie('token');
            router.replace({
                path:"/login",
                query: {redirect: router.currentRoute.fullPath}
            })
        }
        return response;
    },
    error=>{
        if(error.response){
            if(error.response.data.status==4){
                Cookie.clearCookie('token');
                router.replace({
                    path:"/login",
                    query: {redirect: router.currentRoute.fullPath}
                })
            }
            switch(error.response.status){
                case 401:
                router.replace({
                    path:"/login",
                    query:{
                        redirect:router.currentRoute.fullpath
                    }
                })
            }
        }
        return Promise.reject(error.response.data)
    }
)

//获取首页
export const getHome=()=>{return axios.get(api+'/home').then(res=>res.data)};
//登录
export const postLogin=(params)=>{return axios.post(api+'/login',params).then(res=>res.data)};
//注册
export const postRegister=(params)=>{return axios.post(api+'/signup',params).then(res=>res.data)};
//获取问题列表
export const getQuestions=()=>{return axios.get(api+'/questions').then(res=>res.data)};
//获取商品列表
export const getProducts=(params)=>{return axios.get(api+'/products',params).then(res=>res.data)};
//获取商品详情
export const getProduct=(params)=>{return axios.get(api+'/product',params).then(res=>res.data)};
//收藏商品
export const collectShop=(params)=>{return axios.post(api+'/collect/shop',params).then(res=>res.data)};
//取消收藏商品
export const cancelShop=(params)=>{return axios.post(api+'/cancel/shop',params).then(res=>res.data)};
//加购物车
export const addCart=(params)=>{return axios.post(api+'/cart/add',params).then(res=>res.data)};
//购物车获取
export const getCarts=(params)=>{return axios.get(api+'/carts',params).then(res=>res.data)};
//购物车商品删除
export const delCart=(params)=>{return axios.post(api+'/cart/del',params).then(res=>res.data)};
//获取用户详情
export const getUser=(params)=>{return axios.get(api+'/user/info',params).then(res=>res.data)};
//获取用户收藏列表
export const getCollects=(params)=>{return axios.get(api+'/collects',params).then(res=>res.data)};
//获取用户地址列表
export const getAddressList=(params)=>{return axios.get(api+'/address/list',params).then(res=>res.data)};
//获取用户地址详情
export const getAddressDetail=(params)=>{return axios.get(api+'/address/detail',params).then(res=>res.data)};
//删除地址
export const delAddress=(params)=>{return axios.post(api+'/address/delete',params).then(res=>res.data)};
//添加地址
export const addAddress=(params)=>{return axios.post(api+'/address/add',params).then(res=>res.data)};
