<template>
    <div ref="master" :class='"master "+masterCls'
      @touchstart.stop="touchStart"
      @touchmove.stop="touchMove"
      @touchend="touchEnd">
          
          <div v-for="(item,index) in masterList" :key="index">
             <p class="name">{{item.GroupName}}</p>
              <ul>
                <li v-for="(val,key) in item.GroupList" :key="key">
                    <router-link :to="{path:'/car',query:{'id':val.SerialID}}">
                            <img v-lazy="val.Picture" alt="">
                        <div>
                            <p>{{val.AliasName}}</p>
                            <p>{{val.DealerPrice}}</p>
                        </div>
                    </router-link>
                     
                </li>
              </ul>
          </div>
    </div>
</template>

<script>
    export default {
        // SerialID
        props:{
            masterList:{
                type:Array
            },
            masterCls:{
                type:String
            },
            hideMaster:{
                type:Function
            }
        },
        methods:{
              touchStart(e){
                  //跟踪的触摸操作的touch对象的数组
                  this.startTouch = e.touches[0];
              },
              touchMove(e){
                   let touch = e.touches[0];
                   let pageX = touch.pageX-this.startTouch.pageX;
                   this.pageX = pageX;
                //    if(pageX<0){
                //        //超出滑动范围
                //    }else{
                //        //移动目标在页面中的x坐标 - 按下目标在页面中的x坐标
                //       this.$refs.master.style=`transform: translate(${pageX}px, 0)`
                //     //   console.log(pageX)
                //    }
              },
              touchEnd(e){
                   //离开目标后，取消移动样式
                //    this.$refs.master.style = ``;
                   //判断手指离开的x坐标>100
                  if(this.pageX>100){
                      this.hideMaster()
                  }
              }
        }
    }
</script>

<style scoped>
  @import "../../scss/master.css";
</style>