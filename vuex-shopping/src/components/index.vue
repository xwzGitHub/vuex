<template>
    <div>
      <List></List>
      <div>
          <input type="checkbox" :checked="isSelectAll" @click="selectAll">全选
          <p>价格￥{{price}}</p>
      </div>
    </div>
</template>

<script>
import List from "./List";
import {mapState,mapActions} from 'vuex';

    export default {
        computed:{
           ...mapState({
               isSelectAll:state=>state.index.isSelectAll,
               price:state=>state.index.price
           })
        },
        components:{
            List
        },
        methods:{
            ...mapActions({
                selectAll:"selectAll",
                
            })
        },
        mounted() {
            this.$store.dispatch("getProductList")
        }
        
    }
</script>

<style scoped>

</style>