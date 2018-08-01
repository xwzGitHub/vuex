<template>
    <div>
        <input type="text" placeholder="todo..." ref="input">
        <button @click="save">保存</button>
    </div>
</template>

<script>
   import {mapState,mapMutations} from 'vuex';
    export default {
        methods:{
             ...mapMutations({
                 addList:'addList'
             }),
             save(){
                 let input = this.$refs.input.value;
                 this.addList(input)
             }
        },
        mounted() {
         
        }
    }
</script>

<style scoped>

</style>