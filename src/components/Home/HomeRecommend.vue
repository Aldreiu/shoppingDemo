<template>
    <div class="swiper-Recommend">
        <!-- Swiper -->
        <div class="title border-bottom">商品推荐</div>
        <div class="swiper-container swiper-rm">
            <div class="swiper-wrapper sw-wrapper">
                <div class="swiper-slide sw-slide">
                    <img src="../../assets/images/20180413093730_3138.jpg" alt="">
                    <p class="recommend_title">标题</p>
                    <p class="recommend_price">￥12</p>
                    <div class="bt_flex">
                        <div class="left">
                            <van-icon name="shopping-cart" />
                        </div>
                        <div class="right">查看详情</div>
                    </div>
                </div>
                <div class="swiper-slide sw-slide">
                    <img src="../../assets/images/20180413093730_3138.jpg" alt="">
                    <p class="recommend_title">标题2</p>
                    <p class="recommend_price">￥12</p>
                    <div class="bt_flex">
                        <div class="left">
                            <van-icon name="shopping-cart" />
                        </div>
                        <div class="right">查看详情</div>
                    </div>
                </div>
                <div class="swiper-slide sw-slide">
                    <img src="../../assets/images/20180413093730_3138.jpg" alt="">
                    <p class="recommend_title">标题3</p>
                    <p class="recommend_price">￥12</p>
                    <div class="bt_flex">
                        <div class="left">
                            <van-icon name="shopping-cart" />
                        </div>
                        <div class="right">查看详情</div>
                    </div>
                </div>
                <div class="swiper-slide sw-slide">
                    <img src="../../assets/images/20180413093730_3138.jpg" alt="">
                    <p class="recommend_title">标题4</p>
                    <p class="recommend_price">￥12</p>
                    <div class="bt_flex">
                        <div class="left">
                            <van-icon name="shopping-cart" />
                        </div>
                        <div class="right">查看详情</div>
                    </div>
                </div>
                
            </div>
            <!-- Add Pagination -->
            <!-- <div class="swiper-pagination"></div> -->
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    // import '../../../node_modules/swiper/css/swiper.min.css'
    export default {
        data() {
            return {

            }
        },
        // 回顾下钩子函数 mounted 在模板渲染成html后调用 通常指页面初始化完成后对 html的dom节点进行一些操作
        mounted() {
            new Swiper('.swiper-rm', {
                slidesPerView: 3,
                spaceBetween: 30,
                // pagination: {
                //     el: '.swiper-pagination',
                //     clickable: true,
                // },
            });
        },
    }
</script>

<style lang="less">
    .swiper-Recommend{
        .title{
            height: 30px;
            line-height: 30px;
            margin-left: 10px;
            font-size: 14px;
            font-weight: 400;
        }
        .swiper-rm{
            height: 100%;
        .sw-wrapper{
            width: 100%;
                .sw-slide{
                    img{
                        width: 100%;
                    }
                    .recommend_title{
                        width: 100%;
                        font-size: 11px;
                        padding: 0 0px 0 7.5px;
                    }
                    .recommend_price{
                        font-size: 10px;
                        padding: 5px 0px 0 7.5px;
                    }
                    .bt_flex{
                        display: flex;
                        padding: 0 7.5px 0 7.5px;
                        margin-top: 5px;
                        .left{
                            width: 30%;
                            background: #FECA3A;
                            border-radius: 5px 0 0 4px;
                            padding: 5px;
                            color: #fff;
                            box-sizing: border-box;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .right{
                            width: 70%;
                            font-size: 10px;
                            background: #ff4c38;
                            border-radius: 0 5px 5px 0;
                            padding: 5px;
                            color: #fff;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            box-sizing: border-box;
                        }
                    }
                }
            }
    }
    }
</style>