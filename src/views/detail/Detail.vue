<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
          <detail-swiper :top-images="topImages"/>
          <detail-base-info :goods="goods"/>
          <detail-shop-info :shop="shop"/>
          <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
          <detail-param-info ref="params" :param-info="paramInfo"/>
          <detail-comment-info ref="comment" :comment-info="commentInfo"/>
          <goods-list ref="recommend" :goods="recommends"/>
        </scroll>
      <detail-bottom-bar @addCart="addToCart"/>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
      <toast :message="message" :show="show"/>
    </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import BackTop from "components/content/backTop/BackTop";

import Scroll from "components/common/sceoll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";

import Toast from "components/common/toast/Toast";
export default {
      name: "Detail",
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        Scroll,
        GoodsList,
        DetailBottomBar,
        BackTop,
        Toast,

      },
      data(){
          return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            currentIndex:0,
            isShowBackTop:false,
            message:'',
            show:false

          }
      },
      created() {
        //1.保存传入的iid
        this.iid = this.$route.params.iid

        //2.根据iid请求详情数据
        getDetail(this.iid).then(res => {

          // console.log(res);
          const data = res.result;
          //(1)获取顶部的图篇轮播数据
          this.topImages = data.itemInfo.topImages
          //(2）获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          //3创建店铺信息的对象
          this.shop = new Shop(data.shopInfo)
          //4保存商品详情数据
          this.detailInfo = data.detailInfo;
          //5. 获取参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          //6.取出评论信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }
          //1.值不对，this.$refs.params.$el压根没有渲染
          // this.themeTops=[]
          //
          // this.themeTops.push(0)
          // this.themeTops.push(this.$refs.params.$el.offsetTop)
          // this.themeTops.push(this.$refs.comment.$el.offsetTop)
          // this.themeTops.push(this.$refs.recommend.$el.offsetTop)
          // console.log(this.themeTops);

          // this.$nextTick(()=>{
          //   //2.值不对，图片没有计算在内
          //   //根据最新的数据，对应的DOM是已经被渲染出来了
          //   //但是图片还是没有加载完（目前获取到的offsetTop是不包含图片的）
          //   this.themeTops=[]
          //
          //   this.themeTops.push(0)
          //   this.themeTops.push(this.$refs.params.$el.offsetTop)
          //   this.themeTops.push(this.$refs.comment.$el.offsetTop)
          //   this.themeTops.push(this.$refs.recommend.$el.offsetTop)
          //   console.log(this.themeTops);
          // })
        })
        //3.请求推荐数据
        getRecommend().then(res => {
          this.recommends = res.data.list
        })


      },
  methods:{
  imageLoad(){
    this.$refs.scroll.refresh;

      this.themeTopYs=[];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);

  },
  titleClick(index){
    console.log(index);
    this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]+44,200)
  },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      //1.获取y值
      const  positionY = -position.y
      //2.positionY与主题中的值进行对比
      let length = this.themeTopYs.length
      for(let i=0;i<this.themeTopYs.length;i++){
       if(this.currentIndex !==i && ((i< length-1 && positionY >= this.themeTopYs[i]-44 && positionY <
         this.themeTopYs[i+1]-44) ||(i === length-1&&positionY>this.themeTopYs[i]-44))){
         this.currentIndex=i;
         this.$refs.nav.currentIndex = this.currentIndex
       }

      }
      //3.是否显示回到顶部
      this.isShowBackTop=(-position.y)>1000;
    },
    addToCart(){
    //1.获取购物车需要展示的商品信息
      const product = {
        image :this.topImages[0],
        title : this.goods.title,
        desc :this.goods.desc,
        price : this.goods.realPrice,
        iid :this.iid,
        count :1
    }
      // console.log(product);
      //2.将商品加入到购物车(1.Promise 2.mapActions)
      // this.$store.cartList.push(product)
      this.$store.dispatch('addCart',product).then(res=>{
       // this.show = true;
       // this.message = res;
       // setTimeout(()=>{
       //   this.show = false;
       //   this.message = ''
       // },1500)

        this.$toast.show(res,2000)
      })
  }
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
}
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc( 100% - 44px - 49px);
    overflow: hidden;
  }
</style>
