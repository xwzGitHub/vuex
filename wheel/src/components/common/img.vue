<template>
    <div class="car_img">
        <div class="tit">
             <p><router-link to="/color">颜色</router-link></p>
             <p class="p2"><router-link to="/type">车款 </router-link></p>
        </div>
        <div class="img_content">
           <ul v-for="(item,index) in imgData" :key="index">
             <li v-for="(value,key) in item.List" :key="key">
                 <img :style="'backgroundImage:url('+value.Url.replace(/\{0\}/,3)+')'">
                 <div v-if="key==0">
                    <p>{{item.Name}}</p>
                    <p>{{item.Count}}张></p>
                 </div>
             </li>
           </ul>
           <ul class="img_list">
                <li v-for="(item,index) in imgList" :key="index">
                   <img src="" alt="">
                </li>
           </ul>
        </div>
        
    </div>
</template>

<script>
    import {mapState,mapMutations,mapActions} from 'vuex';
    export default {
         computed:{
             ...mapState({
                 imgData:state=>state.imgData.imgData
             })
             
         },
         methods:{
             ...mapActions({
                  getImgAll: "getImgAll",
                  imgList: "imgList"
             })
         },
         mounted() {
             let id = this.$route.query.id;
             this.getImgAll(id)
             console.log("imgData",this.imgData)
         }
    }
</script>

<style scoped>
    @import "../../scss/img.css"; 
</style>