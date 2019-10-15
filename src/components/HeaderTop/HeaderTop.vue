<template>
    <div class="headerTop">
        <router-link class="left" :to="userInfo._id ? '/userinfo':'/login'">
        <span class="n_login" v-if="!userInfo._id"><span>登录</span>|<span>注册</span></span>
        <span class="login_ss" v-else><van-icon name="manager" /></span>
        </router-link>
        <router-link class="center" to="/search">
            <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
            <label>123213</label>
            <div slot="action" @click="onSearch">搜索</div>
            </van-search>        
        </router-link>
        <div class="right"><van-icon name="plus" /></div>     
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                
            }
        },
        computed:{
            ...mapState(['userInfo'])
        }
    }
</script>

<style lang="less">
    .headerTop{
        display: flex;
        justify-content: center;
        .left{
            display: flex;
            align-items:center;
            font-size: 12px;
            color: #1989fa;
            padding-left: 4px;
            .login_ss{
                margin-right: 15px;
                font-size: 15px;
            }
        }
        .right{
            display: flex;
            
            align-items:center;
            font-size: 16px;
            padding-right: 4px;
        }
        .center{
            .van-search {
                padding-left: 1px;
            }
        }
    }
</style>