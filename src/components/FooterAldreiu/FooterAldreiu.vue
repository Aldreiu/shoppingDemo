<template>
    <div>
        <van-tabbar route>
            <van-tabbar-item replace icon="shopping-cart-o" to="/home">外卖</van-tabbar-item>
            <van-tabbar-item replace name="search" icon="search" to="/search">搜索</van-tabbar-item>
            <van-tabbar-item replace icon="orders-o" to="/order">订单</van-tabbar-item>
            <van-tabbar-item replace icon="user-o" to="/profile">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active:0,  
                tabbar:[
                    {
                        name:'',
                        path:'',

                    }
                ]             
            }
        },
    }
</script>

<style lang="less">
.van-tabbar--fixed{
    border-top: 1px solid rgb(231, 226, 226);
    .van-tabbar-item--active {
    color: #1989fa;
    font-weight: bold;
    }
}

</style>