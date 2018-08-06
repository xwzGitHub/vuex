<template>
    <el-main>
            <el-header class="head">
                <el-input placeholder="请输入内容" v-model="input10"  clearable></el-input>
                <el-date-picker style="width:50%" v-model="value1"  type="date" placeholder="选择日期"> </el-date-picker>
                <el-button style="height:38px" type="primary" @click="search">搜索</el-button>
            </el-header>
            <el-table :data="tableData.slice((this.currentPage-1)*10, this.currentPage*10)"  stripe style="width: 100%">
                <el-table-column prop="id"   label="id" width="180"> </el-table-column>
                <el-table-column   prop="username"    label="姓名"   width="180"></el-table-column>
                <el-table-column  prop="score" label="成绩"></el-table-column>
                <el-table-column  prop="date" label="日期"></el-table-column>
            </el-table>
            <el-pagination @current-change="changePage"
                    layout="prev, pager, next"
                    :total="tableData.length">
            </el-pagination>
    </el-main>    
</template>


<script>
import axios from 'axios';
  export default {
    data() {
      return {
        tableData:[],
        currentPage:1,
        input10: '',
        value1:''
      }
    },
    methods:{
         //页码数
            changePage(page){
                this.currentPage = page;
            },
        //搜索
        search(){
          console.log(this.input10)
          let user = this.input10;
          if(!user) return alert("请输入学生姓名");
          axios.get("http://127.0.0.1:9000/seeUser?user="+user).then(res=>{
               if(res.data.code == 0){
                this.tableData = res.data.msg
              }else{
                 this.$alert(res.data.msg);
               }
          })
        }
    },
    mounted() {
       axios.get("http://127.0.0.1:9000/seeList").then(res=>{
          console.log("see............",res);
          if(res.data.code == 0){
              this.tableData = res.data.msg
          }else{
             this.$alert(res.data.msg);
          }
       })
    }
    
  }
</script>

<style scoped>
.head{
  display:flex;
}
</style>