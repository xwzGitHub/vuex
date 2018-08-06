<template>
    <div>
       <!-- 管理员 -->
       <div v-if="showList">
      <el-table :data="list.slice((this.currentPage-1)*10, this.currentPage*10)" style="width: 100%" id="table">
        <el-table-column label="id" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出生日期" width="300">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>出生日期: {{ scope.row.birthday }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.birthday }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="电话" width="220">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.phone }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="地址" width="120">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.address }}</el-tag>
            </div>
          </template>
        </el-table-column> -->
         <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id, scope.row)">编辑角色</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="changePage" layout="prev, pager, next" :total="list.length">
      </el-pagination>
    </div>
    <div v-else>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username"  disabled></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address" disabled></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-input v-model="form.birthday" disabled></el-input>
          </el-form-item>
          <el-form-item label="已有权限">
            <el-tag closable v-for="(item, index) in myRoler" :key="index" @close="removeTag(item, index)">{{item.rolename}}</el-tag>
          </el-form-item>
          <el-form-item label="全部权限">
            <span v-for="(item, index) in allRoler" :key="index" @click="addTag(item)">
              <el-tag>{{item.rolename}}</el-tag>
            </span>
          </el-form-item>
           <el-row>
               <el-button type="primary" plain @click="Return">返回</el-button>
           </el-row>
        </el-form>
      </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return{
               list: [],   //用户数据列表
               showList: true, //是否显示列表
               currentPage: 1,   //页码
               form:{},   //单个列表数据
               userInfo: {},
               roleList: [],
               allRoler: [], //角色类型信息
               myRoler: []  //个人匹配的角色信息
            }
        },
        methods:{
            //页码数
            changePage(page){
                this.currentPage = page;
            },
            //编辑权限
            handleEdit(id,rows){
                 // 渲染页面数据
                 this.form = rows;
                //  console.log("from............",this.form);
                 axios.get("http://127.0.0.1:9000/rolerList?id="+id).then(res=>{
                        console.log(".......res",res.data)
                        if (res.data.code == 0) {
                            this.allRoler = res.data.allRoler;
                            this.myRoler = res.data.myRoler;
                            this.showList = false;
                        } else {
                            this.$alert(res.data.msg);
                           
                        }
                 })
            },
            //添加权限
            addTag(item){
                console.log(item)
                //判断是否有当前权限
                let ind = this.myRoler.findIndex(value => {
                      return value.rid == item.id;
                  });
                 //有则返回
                if (ind !== -1) {
                    this.$alert("你已有当前角色");
                    return;
                }
                //没有添加
                //uid  当前用户id
                //rid  添加的角色id
                axios.get("http://127.0.0.1:9000/addRoler?uid="+this.form.id+"&rid="+item.id)
                .then(res=>{
                    console.log(res.data);
                    if (res.data.code == 0) {
                      this.myRoler.push({
                        rid: item.id,
                        rolename: item.rolename
                      });
                    } else {
                      this.$alert(res.data.msg);
                    }
                })
            },
            //删除
            removeTag(item, index){
              axios.get(`http://127.0.0.1:9000/removeRouler?uid=${this.form.id}&rid=${item.rid}`)
                 .then(res=>{
                    if (res.data.code == 0) {
                      this.myRoler.splice(index,1)
                    } else {
                      this.$alert(res.data.msg);
                    }
                })
            },
            //返回
            Return(){
               this.showList = true;
            }
        },
        mounted() {
            axios.get("http://127.0.0.1:9000/userList")
            .then(res=>{
                // console.log("..........res",res)
                if(res.data.code==0){
                   this.list = res.data.data
                }else{
                    this.$alert(res.data.msg);
                }
                // console.log(this.list)
            })
        }
    }
</script>

<style scoped>
   .el-row{
     display: flex;
     justify-content: flex-end;
   }
   tbody{
     width: 100%;
   }
   .el-table__body{
     width: 100%;
   }
   .el-form {
      background: #fff;
      padding:20px 20px 40px;
      margin-top:66px;
   }

</style>