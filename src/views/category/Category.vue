<template>
  <div id="category">
    <nav-bar class="categorybar"><div slot="center">商品分类</div></nav-bar>
    <scroll class="scro">
       <tab-menu class="tab-menu"/>
    </scroll>
  </div>

</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import TabMenu from "./childComps/TabMenu";
  import Scroll from "../../components/common/sceoll/Scroll";

  export default {
    name: "Category",

    components: {
      NavBar,
      TabMenu,
      Scroll
    }
  }
</script>

<style scoped>
.categorybar{
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;
}
#category{
  height: 100vh;
}
.scro{
height: calc(100% - 44px);
  /*overflow: hidden;*/
}
.tab-menu{
    padding-top: 40px;
    padding-bottom: 20px;

  }
</style>
