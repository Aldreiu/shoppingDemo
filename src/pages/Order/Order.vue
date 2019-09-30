<template>
    <section>
        <!-- 头部 -->
        <header>
            <van-nav-bar title="订单">
            </van-nav-bar>
        </header>
        <!-- 主体 -->
        <main>
            <div class="shop-warpper">
                <div class="shop">
                    <img src="../../assets/images/70008646170d1f654e926a2aaa3afpng.png" alt="">
                </div>
                <p class="desc">登录后查看订单</p>
                <p class="desc2"><van-button type="info">立即登录</van-button></p>
            </div>
        </main>
    </section>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    components:{
    }
}
</script>

<style lang="less">
    .shop-warpper{
        width: 100%;
        padding-top: 20px;

        .shop{
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            text-align: center;
            img{
                margin: 0 auto;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -10%);
            }
        }
        .desc{
            text-align: center;
            margin-top: 250px;
        }
        .desc2{
            text-align: center;
            margin-top: 10px;
        }
    }
</style>