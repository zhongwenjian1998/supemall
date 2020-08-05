import Vue from 'vue'
import Vuex from 'vuex'


// import {ADD_COUNTER, ADD_TO_CART} from "./mutation-types";
import getters from "./getters";

//1安装插件
Vue.use(Vuex)

//2.创建Store对象
const store=new Vuex.Store({
  state: {
    cartList: [],
  },
  getters,
  mutations: {
    //mutations的唯一目的性就是修改state中状态
    //mutations中的每个方法尽可能完成事件比较单一一点
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      payload.checked=true
      state.cartList.push(payload)
    }
  },
actions:{
  addCart(context,payload) {
  return new Promise((resolve,reject)=>{
      //1.先查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      //2判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit('addCounter',oldProduct)
        resolve('当前商品数量+1')
      }else{
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart',payload)
        resolve('添加了新的商品')
      }
    })

  }
}
})

//3.挂载Vue实例上
export default  store
