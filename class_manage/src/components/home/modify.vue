<template>
    <el-main>
            <el-table :data="tableData.slice((this.currentPage-1)*10, this.currentPage*10)"  stripe style="width: 100%">
                <el-table-column prop="id"   label="id" width="180"> </el-table-column>
                <el-table-column   prop="username"    label="姓名"   width="180"></el-table-column>
                <el-table-column  prop="score" label="成绩"></el-table-column>
                <el-table-column  prop="date" label="日期"></el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="warning" plain>修改成绩</el-button>
                </template>
                </el-table-column>
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
        currentPage:1
      }
    },
    methods:{
         //页码数
            changePage(page){
                this.currentPage = page;
            },
        //修改
        Modify(){
        //   axios.get("http://127.0.0.1:9000/Modify?id=).then(res=>{
        //        if(res.data.code == 0){
        //         
        //       }else{
        //          this.$alert(res.data.msg);
        //        }
        //   })
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

</style>