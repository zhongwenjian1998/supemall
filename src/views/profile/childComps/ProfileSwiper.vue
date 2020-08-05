<template>
  <div>
    <div class="profile-nav">
      <img src="~assets/img/profile/profile.svg" alt="" class="mimg">
      <div class="zhongjian">
        <span @click="">登录</span>/<span @click="">注册</span>
        <div class="zhongjiantu">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span class="zhongjianspan">暂无绑定手机</span>
        </div>
      </div>
      <img src="~assets/img/profile/right.svg" alt="" class="imgg">
    </div>
  </div>
</template>

<script>
    export default {
        name: "ProfileSwiper"
    }
</script>

<style scoped>
.profile-nav{
  display: flex;
  background-color: var(--color-tint);
  height: 150px;
  width: 100%;
  margin-top: -1px;
  font-size: 20px;
  color: #fff;
}
  .mimg{
    width: 80px;
    border: 1px solid #ccc;
    border-radius: 50%;
    background-color: #fff;
    margin: 35px 20px;
  }
  .zhongjian{

    width: 100px;
    margin-top: 45px;;
  }
  .zhongjiantu{
    display: flex;
  }
  .zhongjian img{
    width: 28px;
    margin:10px 0 0 -5px;
  }
  .zhongjianspan{
    font-size: 12px;
    margin-top: 17px;
  }
  .imgg{
    width: 30px;
    margin-left: 70px;
   }
</style>
