<template>
    <div class="shop_container">
        <div class="shop_head">
            <p>
                <van-icon name="wap-nav wap-nav-l" />附近商家</p>
        </div>
        <ul class="shop_list" v-if="shops.length">
            <li class="shop_li" v-for="(shop,index) in shops" :key="index" @click="$router.push('/shop')">
                <a class="a_flex">
                    <div class="shop_left">
                        <!-- <img :src="baseImgUrl+shop.image_path" class="shop_img" alt=""> -->
                        <img src="./images/20180415122117_1031.jpg" class="shop_img" alt="">
                    </div>
                    <div class="shop_right">
                        <section class="shop_detail_header">
                            <h4 class="shop_title ellipsis">{{shop.name}}</h4>
                            <ul class="shop_detail_ul">
                                <li class="supports" v-for="(support,index) in shop.supports" :key="index">
                                    {{support.icon_name}}
                                </li>
                            </ul>
                        </section>
                        <section class="shop_rating_order">
                            <section class="shop_rating_order_left">
                                <div class="rating_section">
                                    <van-rate v-model="shop.rating" allow-half :count="6" /><i class="shop-r">{{shop.rating}}</i>
                                </div>
                                <div class="order_section">
                                    月售{{shop.recent_order_num}}单
                                </div>
                            </section>
                            <section class="shop_rating_order_right">
                                <span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>
                            </section>
                        </section>
                        <section class="shop_distance">
                            <p class="shop_delivery_msg">
                                <span>￥{{shop.float_minimum_order_amount}}起送/</span>
                                <span>配送费约￥{{shop.float_delivery_fee}}</span>
                            </p>
                        </section>
                    </div>
                </a>
            </li>
        </ul>
        <ul v-else>
            <li v-for="(item,index) in 6" :key="index">
                <img src="./images/shop_back.svg" alt="back">
            </li>
        </ul>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                baseImgUrl: 'http://cangdu.org:8001/img/',
            }
        },
        computed: {
            ...mapState(['shops'])
        }
    }
</script>

<style lang="less">
    @import '../../assets/css/clearFix.less';

    .shop_container {
        margin-bottom: 30px;

        .shop_head {
            margin: 15px 5px 7px 5px;
            font-size: 10px;

            .wap-nav-l {
                margin-right: 5px;
                vertical-align: middle;
            }
        }

        .shop_list {
            .shop_li {
                .a_flex {
                    display: flex;

                    .shop_left {
                        flex: 20%;

                        .shop_img {
                            width: 100%;
                        }
                    }

                    .shop_right {
                        flex: 80%;
                        margin-left: 5px;

                        .shop_detail_header {
                            .clearFix();
                            width: 100%;

                            .shop_title {
                                float: left;
                                width: 150px;
                                display: inline-block;
                                font-size: 14px;
                                line-height: 16px;
                                font-weight: 700;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                &::before {
                                    content: '品牌';
                                    display: inline-block;
                                    font-size: 11px;
                                    line-height: 11px;
                                    color: #333;
                                    background-color: #ffd930;
                                    padding: 2px 2px;
                                    border-radius: 2px;
                                    margin-right: 5px;
                                }
                            }

                            .shop_detail_ul {
                                float: right;
                                margin-top: 5px;
                                margin-right: 5px;
                                .supports {
                                    float: left;
                                    font-size: 10px;
                                    color: #999;
                                    border: 1px solid #f1f1f1;
                                    padding: 0 2px;
                                    border-radius: 2px;
                                }
                            }
                        }

                        .shop_rating_order {
                            display: flex;
                            margin: 7px 0;
                            .shop_rating_order_left {
                                // display: flex;
                                flex: 70%;
                                .rating_section {
                                    float: left;
                                    // font-size: 10px;
                                    // color: #ff6000;
                                    margin-left: 4px;
                                    margin-top: -5px;
                                    .van-rate{
                                        .van-rate__icon{
                                            font-size: 10px;
                                        }
                                    }
                                    .shop-r{
                                        font-size: 10px;
                                        margin-left: 3px;
                                        color: #666;
                                    }
                                }
                                .order_section {
                                    float: left;
                                    margin-left: 10px;
                                    font-size: 10px;
                                    color: #666;
                                    transform: scale(.8);
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    
                                }
                            }

                            .shop_rating_order_right {
                                flex: 20%;
                                .delivery_style {
                                    font-size: 12px;
                                    transform-origin: 35px 0;
                                    transform: scale(.7);
                                    display: inline-block;
                                    padding: 1px;
                                    border-radius: 2px;
                                    display: block;
                                }
                                .delivery_right{
                                    color: #1989fa;
                                    border: 1px solid #1989fa;
                                    text-align: center;
                                }
                            }

                        }

                        .shop_distance {
                            width: 100%;

                            .shop_delivery_msg {
                                transform-origin: 0;
                                transform: scale(.9);
                                color: #666;
                                font-size: 10px;
                                margin-bottom: 5px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>