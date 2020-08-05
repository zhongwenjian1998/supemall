<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl1"
                    class="tab-control" v-show="isTabFixed"/>
      <scroll class="content"
              ref="scroll"
              :probe-type="3" @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMode">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
    <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="goods[currentType].list"/>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/sceoll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import  {debounce} from "common/utils";


  export default {
        name: "Home",
      components: {
          NavBar,
          HomeSwiper,
          RecommendView,
          FeatureView,
          TabControl,
          GoodsList,
          Scroll,
          BackTop
      },
    data(){
          return{
            banners:[],
            recommends:[],
            goods:{
              'pop':{page:0,list:[]},
              'new':{page:0,list:[]},
              'sell':{page:0,list:[]},
            },
            currentType:'pop',
            isShowBackTop:false,
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0
          }
      },
      created() {
          //1请求的数据
          this.getHomeMultidata()
        //2列表请求的数据
          this.getHomeGoods('pop'),
          this.getHomeGoods('new'),
          this.getHomeGoods('sell')
      },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      // this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.scrollTo(0,this.saveY,)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY=this.$refs.scroll.getScrollY()
    },
    mounted() {
      //1监听item中图片加载
      //bus->总线
      //Vue.prototype.$bus=new Vue()
      //this.$bus.$emit('事件名称'，参数)
      //this.$bus.on('事件名称'，回调函数（参数）)

      const refresh=debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on('itemimageLoad',()=>{
        refresh()
      })

    },
    methods:{
          // 事件监听相关方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
        }
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;

      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)//scrollTo第三个参数传入毫秒,这里因为已经设置了默认值所以可以不写
      },
      contentScroll(position){
        //1.判断BackTop是否显示
      this.isShowBackTop=(-position.y)>1000;
        //2. 决定tabControl是否吸顶（position：fixed）
        this.isTabFixed=(-position.y)>this.tabOffsetTop
      },
      loadMode(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop= this.$refs.tabControl2.$el.offsetTop;
        //获取tabControl的offsetTop ：元素顶边
        //所有组件都有一个属性$el:用于获取组件中的元素
      },
          // 网络请求相关的方法
          getHomeMultidata(){
            getHomeMultidata().then(res=>{
              this.banners=res.data.banner.list;
              this.recommends = res.data.recommend.list;
            })
          },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1

          //完成下拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top:44px;*/
    height: 100vh;
    position:relative;
    /*vh->viweport height 视图高度   100vh就是100%*/
  }
.home-nav{
  background-color: var(--color-tint);
  color:#fff;
/*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*top: 0;*/
  /*right: 0;*/
  /*z-index: 999;*/
}


  /*.tab-control{*/
  /*  position: sticky;!*粘贴定位，到顶部多少px就停在那，必须要有top属性就是下面哪个*/
  /*                    不过这个兼容性不好*!*/
  /*  top:44px;*/
  /*  z-index: 2;*/
  /*}*/


  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;

  }
  /*.content{*/
  /* height: calc(100% - 93px); !*动态计算高度*!*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/

</style>
