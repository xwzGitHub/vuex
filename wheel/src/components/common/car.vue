<template>
    <div class="car">
        <div class="content">
            <div class="img">
                <img v-lazy="carData.CoverPhoto" alt="">
                 <router-link :to="{path:'/img',query:{id:this.id}}"><span>{{carData.pic_group_count}}张照片</span></router-link>
            </div>
            <div class="info">
                 <div>
                    <p>{{carData.market_attribute?carData.market_attribute.dealer_price:"暂无报价"}}</p>
                    <p>指导价{{carData.market_attribute?carData.market_attribute.official_refer_price:"暂无报价"}}</p>
                 </div>
                <button>{{carData.BottomEntranceTitle}}</button>
            </div>
            <div>
                <div class="car_type">
                     <span v-for="(item,index) in yearList" :key="index" @click="carClick(index,item)" :class="index==cls?'active':null">{{item}}</span>
                </div>
                <div v-for="(item,index) in displayData" :key="index" class="car_list">
                   <p>{{item.exhaust_str}}/{{item.max_power_str}} {{item.inhale_type}}</p>
                   <ul>
                     <li>
                       <p>{{item.market_attribute.year}}款 {{item.car_name}}</p>
                       <p>{{item.horse_power}}马力{{item.gear_num}}档</p>
                       <p>
                           <span>指导价 {{item.market_attribute.official_refer_price}}</span>
                           <span>{{item.market_attribute.dealer_price_min}}</span>
                       </p>
                       <button>询问低价</button>
                     </li>
                   </ul>
                </div>
            </div>
        </div>
        <div class="bottom">
            <p>询问低价</p>
            <p>本地经销商为你报价</p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
           return {
               carData:[],   //详情页总数据
               yearList:["全部"], //年份列表
               carList:{"全部":[]},   //列表数据
               displayData:[],//需要显示的数据
               cls:0,
               id:''
           }
        },
        methods:{
           getCar_Data(){
            //  console.log(this.$route.query)
            this.id =this.$route.query.id;
            fetch("https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID="+this.id)
            .then(res=>{
                res.json().then(body=>{
                    if(body.code === 1){
                         //通过路由传入的id 获取数据
                         this.carData = body.data;
                        //   console.log(this.carData)
                         //处理列表数据
                         this.carData.list.forEach(item=>{
                            let year = item.market_attribute.year;
                            if(this.yearList.indexOf(year)==-1){
                                this.yearList.push(year);
                                this.carList[year] = [item];
                            }else{
                                this.carList[year].push(item);
                            }
                            this.carList["全部"].push(item)
                         })
                         //排序
                         //a-b  -1 正序
                         //b-a  1  倒序
                        let sortCar = (arr)=>{
                            return arr.sort((a, b)=>{
                                if (a.exhaust < b.exhaust){
                                    return -1;
                                }else if(a.exhaust > b.exhaust){
                                    return 1;
                                }else{
                                    if (a.max_power < b.max_power){
                                        return -1;
                                    }else if(a.max_power > b.max_power){
                                        return 1;
                                    }else{
                                        return b.inhale_type - a.inhale_type;
                                    }
                                }
                            })
                        }
                        for(let i in this.carList){
                            this.carList[i] = sortCar(this.carList[i]);
                        }
                        this.displayData = this.carList["全部"];
                    }else{
                         console.warn(body.msg)
                     }
                })
            })
           },
          carClick(index,item){
            //判断选中的class类名的添加
             this.cls = index;
             this.displayData =this.carList[item];
          }
        },
        mounted() {
            this.getCar_Data();
        }
    }
</script>

<style scoped>
   @import "../../scss/car.css";
</style>