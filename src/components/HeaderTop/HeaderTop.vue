<template>
    <div class="headerTop">
        <div class="left"><span>登录</span>|<span>注册</span></div>
        <div class="center">
            <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
            <label>123213</label>
            <div slot="action" @click="onSearch">搜索</div>
            </van-search>        
        </div>
        <div class="right"><van-icon name="plus" /></div>     
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
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
            span{
                width: 30px;
            }
            span:nth-child(1){
                    text-align: right;
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