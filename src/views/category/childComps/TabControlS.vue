<template>
  <div>
    <div v-for="(item,index) in listItem"
         class="tabS" @click="tabclick(index)"
         :class="{tabA: index === tabIndex}"><span>{{item}}</span></div>
  </div>
</template>

<script>
    export default {
        name: "TabControlS",
        props:{
          listItem:{
            type:Array,
            default(){
              return []
            }
          }
        },
      data(){
          return{
            tabIndex:0
          }
      },
      methods:{
        tabclick(index){
          this.tabIndex=index;
          this.$emit('itemClick',index)
        }
      }
    }
</script>

<style scoped>
.tabS{
  width: 100px;
  height: 50px;
  line-height: 50px;
  background-color: #eee;
  text-align: center;
  overflow: hidden;
  /*margin: 28px 20px;*/

}
  .tabA{
    color: var(--color-tint);
    background-color: #fff;
    border-left: 2px solid var(--color-tint);
  }
  .tabA span{
    padding-left: 5px;


  }
</style>
