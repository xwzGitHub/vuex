<template>
    <div>
       <ul>
         <li v-for="(item,index) in list" :key="index">
             <input type="checkbox" :checked="item.checked" @change="selectItem({ind:index})">
             <img :src="item.url">
             <div>
                <p>{{item.tit}}</p>
                <p>{{item.des}}</p>
                <p>￥{{item.prices}}</p>
                 <div>
                    <span @click="changeNum({ind:index, type:'-'})">-</span>
                    <span>{{item.count}}</span>
                    <span  @click="changeNum({ind:index, type:'+'})">+</span>
                </div>
             </div>
         </li>
       </ul>
    </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
    export default {
        //获取数据
        computed:{
            ...mapState({
                list:state=>{
                   return state.index.list
                }
            })
        },
        methods:{
            //更新数据
            ...mapActions({
                selectItem:'selectItem',
                changeNum:"changeNum"
            })
        }
        ,
        mounted() {
           
            //  console.log(this.list)
        }
    }
</script>

<style scoped>
   li{
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    img{
        width: 30%;
    }
</style>