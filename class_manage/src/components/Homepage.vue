<template>
    <el-container>
        <el-header>
            <h1>1601N班管理系统</h1>
        </el-header>
        <el-container>
             <el-aside>
                <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;margin-top:20px;">
                    <el-radio-button :label="false">展开</el-radio-button>
                    <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-edit"></i>
                            <span slot="title">成绩单管理</span>
                        </template>
                        <el-menu-item index="1-1">
                            <router-link v-if="accessList.indexOf('see')!=-1" to="/homepage/see" tag="span">查看成绩单</router-link> 
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            <router-link v-if="accessList.indexOf('modify')!=-1" to="/homepage/modify" tag="span">修改成绩单</router-link> 
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">综合积分管理</span>
                        </template>
                        <el-menu-item index="2-1">
                            <router-link v-if="accessList.indexOf('Naming')!=-1"  to="/homepage/Naming" tag="span">点名</router-link> 
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            <router-link v-if="accessList.indexOf('integral')!=-1" to="/homepage/integral" tag="span">查看综合积分</router-link> 
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span slot="title">管理员</span>
                        </template>
                        <el-menu-item index="3-1">
                            <router-link v-if="accessList.indexOf('delete')!=-1" to="/homepage/delete" tag="span">编辑学生信息</router-link>
                        </el-menu-item>
                        <el-menu-item index="3-2">
                            <router-link v-if="accessList.indexOf('admin')!=-1" to="/homepage/admin" tag="span">分配权限</router-link>    
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <div v-if="show" @click="show = false">
                <div style="display: flex; margin-top: 20px; height: 100px;">
                    <transition name="el-fade-in-linear">
                        <div v-show="show" class="transition-box">欢迎{{user}}同学登录1601N班管理系统</div>
                    </transition>
                </div>
            </div>
            <el-main v-else>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>    
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      isCollapse: true,
      user:'',
      show:true,
      accessList: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
//    console.log(this.$route.params.user)   
   this.user = this.$route.params.user;
   axios.get(`http://127.0.0.1:9000/access?user=${this.user}`)
            .then(res=>{
              //  console.log('res.....',res.data)
              res.data.msg.forEach((item) => {
                this.accessList.push(item.accessname)
              });   
          })
   }
};
</script>

<style scoped>
.is-vertical{
   border:1px solid #ccc;
}
 .el-header{
      color:#fff;
      background: #409EFF;
  } 
  .el-menu{
    height:560px;
    background: rgb(231, 231, 231);
    border:1px solid rgb(223, 222, 222);
  }
  .el-main, .el-aside{
    background: rgb(240, 240, 240);
  }
 .el-submenu [class^=el-icon-]{
     color:#409EFF;
  }
  .el-submenu{
     background: rgb(243, 243, 243);
     color:#fff;
  }
  .el-menu-item{
    background: #fff;
  }
  .el-table__header{
    text-align: center;
  }
   .transition-box {
    margin-bottom: 10px;
    width: 1200px;
    height: 600px;
    font-size: 60px;
    border-radius: 4px;
    background-color: rgb(88, 169, 250);
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-left:20px;
    margin-right: 20px;
    text-align: center;
    line-height: 600px;
  }
</style>