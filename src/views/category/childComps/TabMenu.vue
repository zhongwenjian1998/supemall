<template>
  <div class="taB">
    <tab-control-s
      :list-item="Menua"
      class="tabmenu"/>
    <h2>{{userID}}</h2>
  </div>
</template>

<script>
  import TabControlS from "./TabControlS";
  import TabRight from "./TabRight";
  import {getCategory,getSubCategory} from "network/Category"


  export default {
        name: "TabMenu",
      computed:{
      userID(){
        return this.$route.params.maitKey
      }
    },
      components:{
        TabControlS,
        TabRight
      },
      data(){
       return{
         Menua:[],
         categories:[],
         maitKeys:[],
         categoryDate:{
         },
         currentIndex: -1
       }
      },
      created() {
          //1.请求数据
        this.getCategory()
        // getSubCategory(this.maitKey).then(res =>{
        //   console.log(res);
        // })
        },
    methods:{
          getCategory(){
            getCategory().then(res =>{
              // console.log(res);
              //1.获取分类数据
              this.categories = res.data.category.list;
              // console.log(this.categories[0].maitKey);
              for(var one of res.data.category.list){
                this.Menua.push(one.title)
              }


            })
          },
      // cpnClick(index){
      //       console.log(cpnClick.index);
      //     }
    //   getSubcategories(index) {/
    //     this.currentIndex = index;
    //     const mailKey = this.categories[index].maitKey;
    //     getSubcategory(mailKey).then(res => {
    //       // this.categoryData[index].subcategories = res.data
    //       // this.categoryData = {...this.categoryData}
    //       console.log(res);
    //     })
    //
    //     }
    //
    },

    }
</script>

<style scoped>
  .taB{

  }

</style>
