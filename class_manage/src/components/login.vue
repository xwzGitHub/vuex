<template>
   <el-row >
      <el-col :span="16" :offset="4">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="user">
                 <el-input type="user" v-model="ruleForm2.user" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                 <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                 <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
              </el-form-item>
          </el-form>
      </el-col>
   </el-row>
</template>
<script>
//加密
import {hex_md5} from '../utils/md5.js';
import axios from 'axios';
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入输入用户名'));
        } 
        else {
        //   if (this.ruleForm2.password !== '') {
        //       this.$refs.ruleForm2.validateField('password');
        //   }
           callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }  else {
          callback();
        }
      };
      return {
        ruleForm2: {
          user: '',
          password: '',
        },
        rules2: {
          user: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          //成功后的操作
          if (valid) {
            // alert('submit!');
            //获取账号密码
            let data = {};
            data.username = this.ruleForm2.user;
            data.password = this.ruleForm2.password;
            //  console.log(data)
            axios.post("http://127.0.0.1:9000/login",data)
            .then(res=>{
            //  console.log('res.....',res.data)
             if(res.data.code === 0){
                // this.$router.push('/homepage');
                this.$router.push({name:'homepage',params:{user:data.username}})

             }else{
               this.$alert(res.data.msg);
             }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style>
 .el-row {
    margin-bottom: 20px;
  }
 .el-row:last-child {
      margin-bottom: 0;
    }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

