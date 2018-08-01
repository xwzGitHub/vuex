<template>
    <div class="wrap" ref="wrap">
        <Brand :data="data" :getMasterList="getMasterList"/>
        <Letter :title="title" :changeLetter="changeLetter"/>
        <Master :masterCls="masterCls" :hideMaster="hideMaster" :masterList="masterList"/>
    </div>
</template>

<script>
     import axios from 'axios';
     import Brand from './common/brand.vue';
     import Letter from "./common/Letter.vue";
     import Master from "./common/MasterList.vue";
     import {debounce} from './utils/utils.js';
    export default {
        data(){
            return {
                data:[],//列表数据
                title:[],//列表首字母
                masterList: [],//车辆目录
                masterCls: ''  //是否显示此组件
            }
        },
        components:{
           Brand,
           Letter,
           Master
        },
        methods:{
            getBrand(){
               axios.get("https://www.easy-mock.com/mock/5b3cb3c1eaf38c457dee35c6/example/car")
                .then(res=>{
                    if(res.data.code == 1){
                                        //获取数据
                            let data = res.data.data;
                            // console.log(data);
                            let obj = {};
                            //处理数据
                            data.forEach(item => {
                                //提取首字母
                                if(this.title.indexOf(item.Spelling.slice(0,1)) === -1){
                                    this.title.push(item.Spelling.slice(0,1));
                                    //创建同首字母相同数量的空对象
                                    obj = {
                                        title:item.Spelling.slice(0,1),
                                        list:[]
                                    }
                                    this.data.push(obj);
                                }
                                //处理列表数据
                                if(obj.title===item.Spelling.slice(0,1)){
                                    obj.list.push(item)
                                }
                            });
                            //处理列表首字母
                            this.title.unshift("#")
                            // console.log(this.title)
                    }else{
                        console.warn(res.data.msg);
                    }
                })
            },
            getMasterList(id){
                fetch('https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID='+id)
                .then(res=>{
                    res.json().then(body=>{
                        //处理车辆目录数据
                        if(body.code==1){
                            this.masterList = body.data;
                            this.masterCls = 'active';
                            //  console.log(this.masterList)
                        }else{
                            console.warn(body.msg);
                        } 
                    })
                })
            },
            hideMaster(){
                this.masterCls = "";
            },
            changeLetter(letter){
                if(letter === "#"){
                    this.$refs.wrap.scrollTop = 0;
                }else{
                    //获取id到顶部的距离
                    let scrollTop = document.querySelector(`#${letter}`).offsetTop;
                    // console.log(scrollTop)
                    this.$refs.wrap.scrollTop = scrollTop;
                }
            }
        },
        mounted(){
           this.getBrand();
           let scroll = debounce(()=>{
                console.log("触发滚动事件")
             },500)
           this.$refs.wrap.onscroll=()=>{
               scroll()
           }
        }
        
     }
</script>

<style scoped>
    .wrap{
        height: 100%;
        overflow-y: scroll;
    }
</style>