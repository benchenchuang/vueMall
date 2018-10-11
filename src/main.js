// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
import Cookie from './utils/cookie';
require('./components/toast/toast.css')
import Toast from './components/toast/toast';
import infiniteScroll from 'vue-infinite-scroll'

FastClick.attach(document.body)
Vue.prototype.Cookie=Cookie;
Vue.config.productionTip = false
Vue.use(VueLazyLoad,{
  preLoad: 1.3,
  error: '../static/error.jpg',
  // loading: '../static/loading.jpg',
  attempt: 1
})
Vue.use(Toast);
Vue.use(infiniteScroll);

router.beforeEach((to,from,next)=>{
  let token=Cookie.getCookie('authorizon') || '';
  if(!token){
    if(to.meta.certify){
      next();
    }else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      });
    }
  }else{
    if (to.name=='Login') {
      next({
        path: '/'
      });
    }else{
      next();
    }
  }

  if(to.meta.title){
    document.title=to.meta.title;
  }
  next();
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
