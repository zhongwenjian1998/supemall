<template>
    <div class="goods">
      <goods-list-item v-for="item in goods" :goods-item="item"/>
    </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

    export default {
        name: "GoodsList",
      components:{
          GoodsListItem
      },
      props:{
          goods: {
            type:Array,
            default(){
              return[]
            }
          }
      }
    }
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;/*就是在一行显示，超过部分在下一行显示*/
  justify-content: space-around;/*同一行均等分平分宽度*/
  background-color: var(--color-background);
  padding: 2px;
}
</style>
