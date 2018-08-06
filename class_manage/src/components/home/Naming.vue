<template>
     <el-container style="background:#fff">
            <el-header >
                <h1>1601N点名表</h1>
            </el-header>
             <el-main>
                  <div class="box">
                      <span>{{user}}</span>
                  </div>
                   <el-row class="btn">
                         <el-button  type="success" @click="Naming"><span ref="button" v-if="isStart">成功按钮</span><span v-else>停止按钮</span></el-button>
                   </el-row>
            </el-main>
     </el-container>
</template>

<script>
   import axios from 'axios';
    export default {
        data(){
            return {
                data:[],
                user:"开始点名",
                isStart:true,
                time:''

            }
        },
        methods:{
            Naming(){
                this.isStart = !this.isStart;
                let a = this.$refs.button;
                if(a){
                   this.time = setInterval(()=>{
                        let ind = Math.floor(Math.random()*this.data.length);
                        this.user = this.data[ind].username;
                     },100)
                }else{  
                   clearInterval(this.time);
                }    
            },
            init(){
                axios.get("http://127.0.0.1:9000/userName").then(res=>{
                    if(res.data.code==0){
                        this.data = res.data.msg;
                    }else{
                         this.$alert(res.data.msg);
                    }
                    
                })
            }
        },
        
        mounted() {
          this.init()   
        }
    }
</script>

<style scoped>
   .box{
       width: 500px;
       height: 500px;
       border:1px solid #ccc;
   }
   .btn{
       display: flex;
       justify-content: flex-end;
   }
   .box{
       display: flex;
       justify-content: center;
       align-items: center;
       background:skyblue;
   }
   .box>span{
       font-size:22px;
       color:#fff;
   } 
</style>