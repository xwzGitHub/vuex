<template>
    <div class="brand">
            <div class="car-brand">
                <div :id="item.title" v-for ="(item,index) in data" :key="index">
                    <p> {{item.title}}</p>
                    <ul >
                        <li v-for="(val,key) in item.list" :key="key" @click="getMasterList(val.MasterID)">
                            <img v-lazy="val.CoverPhoto" alt="">
                            <span>{{val.Name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        props:{
           data: {
               type: Array,
               default: []
           },
           getMasterList:{
              type:Function,
              default:()=>{}
           }
        }
    }
</script>

<style scoped >
   @import '../../scss/brand.css';
</style>