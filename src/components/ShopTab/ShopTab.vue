<template>
    <div>
        <van-tabs v-model="shopsTab"  @click="onClick">
            <van-tab title="点餐" name="a" to="/shop/goods"  replace></van-tab>
            <van-tab title="评价" name="b" to="/shop/ratings" replace></van-tab>
            <van-tab title="商家" name="c" to="/shop/info" replace></van-tab>
        </van-tabs>
    </div>
</template>

<script>
// import {mapState} from 'vuex'
export default {
    data(){
        return {
            active: ''
        }
    },
    computed:{
        // ...mapState([]),
        shopsTab:{
            get(){
                return this.$store.state.shopsTab
            },
            set(shopsTab){  // 右侧shopsTab对应的是  上面双向绑定的数据 
                this.$store.state.shopsTab = shopsTab
            }
        }
    },
    methods:{
        onClick(name,title) {
            if(title==='点餐'){
                this.$store.dispatch('shoptab',{name})
                this.active = name
                console.log(this.active)
            } else if(title==='评价'){
                this.$store.dispatch('shoptab',{name})
                this.active = name
                console.log(this.active)
            }else{
                this.$store.dispatch('shoptab',{name})
                this.active = name
                console.log(this.active)
            }
    }
    }
}
</script>

<style lang="less">
    .van-tabs__line {
        background-color: #1989fa;
        z-index: 0;
    }

    .van-tab--active {
        color: #1989fa;
    }
</style>