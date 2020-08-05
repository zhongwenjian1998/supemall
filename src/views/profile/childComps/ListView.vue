<template>
  <div id="list">
    <div class="listitem">
      <div class="listitemlist"><img src="~assets/img/profile/xinxi.svg" alt=""><span>我的消息</span></div>
      <div class="listitemlist"><img src="~assets/img/profile/jifen.svg" alt=""><span>积分商城</span></div>
      <div class="listitemlist"><img src="~assets/img/profile/vip.svg" alt=""><span>会员卡</span></div>
    </div>
    <div>
      <div class="listitems">
        <div class="listitemlist"><img src="~assets/img/profile/shopping.svg" alt=""><span>我的购物车</span></div>
        <div class="listitemlist"><img src="~assets/img/profile/xiazai.svg" alt=""><span>下载APP</span></div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListView",

  }
</script>

<style scoped>
  #list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }

  #list img{
    width: 25px;
    margin-left:20px;
  }
  .listitem {
  margin-top: 20px;
  }
  .listitems{
    border-top: 20px solid #eee;
  }
  .listitem div{
    border-top: 1px solid #eee;
    height: 40px;
  }
  .listitemlist{
    display: flex;
  }
  .listitemlist span{
    margin: 15px;
  }
</style>
