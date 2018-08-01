<template>
     <div class="letter" id="letter"
        @touchstart="touchStart"
        @touchmove="touchMove">
        <span v-for="(item, index) in title" :key="index" :id="item">{{item}}</span>
    </div>
</template>

<script>
    export default {
         props:{
           title: {
               type: Array
           },
           changeLetter:{
               type:Function,
               default:()=>{}
           }
        },
        methods:{
            touchStart(){
                //获取1rem的大小*span的高度（.4rem)  = span的高度（px）
               this.height = window.innerWidth /750*100*0.4;
               //获取顶部的距离 = (页面高度-一个span的高度*span数量)/2
               this.offsetTop= (window.innerHeight - this.height*this.title.length)/2;
            },
            touchMove(e){
               let touch = e.touches[0];
               //下标 = （滑动y轴的距离 - 顶部的距离 ）/span的高度
               let ind = parseInt((touch.pageY-this.offsetTop)/20);
               if(ind<0){
                   ind= 0
               }else if(ind>=this.title.length){
                   ind = this.title.length-1;
               }
               this.changeLetter(this.title[ind]);
            }
        }
    }
</script>

<style scoped>
    @import "../../scss/letter.css";
</style>