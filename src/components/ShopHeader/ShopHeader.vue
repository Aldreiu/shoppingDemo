<template>
    <div class="shop-header">
        <nav class="shop-nav" :style="{backgroundImage:`url(${info.bgImg})`}">
            <a class="back" @click="$router.back()">
                <van-icon name="arrow-left" />
            </a>
        </nav>
        <div class="shop-content" @click="toggleShopShow">
            <img class="content-image" :src="info.avatar">
            <div class="header-content">
                <h2 class="content-title">
                    <span class="content-tag">
                        <span class="mix-tag1">品牌</span>
                    </span>
                    <span class="content-name">{{info.name}}</span>
                    <van-icon name="play" />
                </h2>
                <div class="shop-message">
                    <span class="shop-message-detail">{{info.score}}</span>
                    <span class="shop-message-detail">月售{{info.sellCount}}单</span>
                    <span class="shop-message-detail">{{info.description}}
                        <span>约{{info.deliveryTime}}分钟</span>
                    </span>
                    <span class="shop-message-detail">距离{{info.distance}}</span>
                </div>
            </div>
        </div>

        <div class="shop-header-discounts">
            <van-collapse v-model="activeNames">
                <van-collapse-item name="2">
                    <div slot="title" class="discounts-t clearfix" v-if="info.supports">
                        <div class="discounts-left">
                            <div class="activity" :class="supportClasses[info.supports[0].type]">
                                <span class="content-tag">
                                    <span class="mix-tag1">{{info.supports[0].name}}</span>
                                </span>
                                <span class="activity-content ellipsis">{{info.supports[0].content}}</span>
                            </div>
                        </div>
                        <div class="discounts-right">
                            {{info.supports.length}}个优惠
                        </div>
                    </div>
                    <div class="activity-sheet">
                        <div class="activity-sheet-content">
                            <h2 class="activity-sheet-title">优惠活动</h2>
                            <ul class="list">
                                <li class="activity-item" v-for="(support,index) in info.supports" :key="index"
                                    :class="supportClasses[support.type]">
                                    <span class="content-tag">
                                        <span class="mix-tag2">{{support.name}}</span>
                                    </span>
                                    <span class="activity-content">{{support.content}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>

        <transition name="fade">
            <div class="shop-brief-modal" v-show="shopShow">
                <div class="brief-modal-content">
                    <h2 class="content-title">
                        <span class="content-tag">
                            <span class="mix-tag1">品牌</span>
                        </span>
                        <span>{{info.name}}</span>
                    </h2>
                    <ul class="brief-modal-msg">
                        <li>
                            <h3>{{info.score}}</h3>
                            <p>评分</p>
                        </li>
                        <li>
                            <h3>{{info.sellCount}}单</h3>
                            <p>月售</p>
                        </li>
                        <li>
                            <h3>{{info.description}}</h3>
                            <p>约{{info.deliveryTime}}分钟</p>
                        </li>
                        <li>
                            <h3>{{info.deliveryPrice}}元</h3>
                            <p>配送费用</p>
                        </li>
                        <li>
                            <h3>{{info.distance}}</h3>
                            <p>距离</p>
                        </li>
                    </ul>
                    <h3 class="brief-modal-title">
                        <span>公告</span>
                    </h3>
                    <div class="brief-modal-notice">
                        {{info.bulletin}}
                    </div>
                    <div class="mask-footer" @click="toggleShopShow">
                        <van-icon name="close" />
                    </div>
                </div>
                <div class="brief-modal-cover"></div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    export default {
        data() {
            return {
                activeNames: ['1'],
                supportClasses: ['activity-green', 'activity-red', 'activity-orange'],
                shopShow: false,
            }
        },
        methods:{
            toggleShopShow(){
                this.shopShow = !this.shopShow;
            }
        },
        computed: {
            ...mapState(['info'])
        }
    }
</script>

<style lang="less">
    @import '../../assets/css/shopHeader.less';

    .shop-header {
        // z-index: 200;
        height: 100%;

        background: #fff;

        .shop-nav {
            background-size: cover;
            height: 40px;
            background-repeat: no-repeat;
            padding: 5px 10px;
            position: relative;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background-color: rgba(119, 103, 137, .3);
            }

            .back {
                .van-icon {
                    font-size: 20px;
                    color: #fff;
                    position: absolute;
                    top: 15px;
                    left: 3px;
                }
            }
        }

        .shop-content {
            position: relative;
            // display: flex;
            padding: 28px 20px 5px 20px;
            text-align: center;

            .content-image {
                box-shadow: 0 0 0.5px 0 rgba(0, 0, 0, .4);
                width: 58px;
                height: 58px;
                position: absolute;
                top: 0;
                left: 50%;
                margin-left: -29px;
                margin-top: -30px;
            }

            .header-content {

                // flex: 1;
                .content-title {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 18px;
                    font-weight: 700;
                    line-height: 32px;
                    white-space: nowrap;

                    .content-tag {
                        background-image: linear-gradient(90deg, #fff100, #ffe339);
                        border-radius: 3px;
                        width: 36px;
                        height: 18px;
                        position: relative;
                        margin-right: 10px;

                        .mix-tag1 {
                            .mix-tag()
                        }
                    }

                    .content-name {
                        text-align: left;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }

                .shop-message {
                    white-space: nowrap; // 规定段落中的文本不进行换行
                    height: 12px;
                    font-size: 10px;
                    font-weight: 400;
                    color: rgb(53, 50, 50);

                    .shop-message-detail {
                        margin-right: 5px;
                    }
                }
            }
        }

        .shop-header-discounts {
            position: relative;
            z-index: 38;
            .van-collapse {
                margin: 0 8px 0 8px;
                border: 0 solid rgb(134, 129, 129);

                .van-cell {
                    padding: 0 10px;
                }

                .van-collapse-item__content {
                    padding: 0;
                }

                .van-collapse-item__content {
                    color: #353232;
                    padding: 0 10px;
                }
            }

            .van-cell__title {
                display: flex;
                // justify-content: center;
                align-items: center;

                .discounts-t {

                    .discounts-left {
                        // flex: 1;
                        float: left;
                        margin-right: 5px;

                        .activity {
                            display: flex;
                            align-items: center;

                            .content-tag {
                                // flex: 1;
                                border-radius: 1px;
                                width: 25px;
                                height: 15px;
                                background-color: rgb(112, 188, 70);
                                // margin: 2px 0;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                color: #fff;
                                margin-right: 5px;

                                .mix-tag1 {

                                    font-size: 10px;
                                }
                            }

                            .activity-content {
                                white-space: nowrap;
                                font-size: 10px;
                                // text-align: left;
                                // text-overflow: ellipsis;
                                // overflow: hidden;
                            }
                        }
                    }

                    .discounts-right {
                        float: right;
                        margin-left: 5px;
                        font-size: 10px;
                    }
                }

                .clearfix {
                    .clearfix
                }
            }

            .activity-sheet {
                .activity-sheet-content {
                    .activity-sheet-title {
                        font-size: 12px;
                        font-weight: 600;
                        text-align: center;
                    }

                    .list {
                        .activity-item {
                            display: flex;
                            margin-bottom: 5px;

                            span {
                                display: inline-block;
                            }

                            .content-tag {
                                border-radius: 1px;
                                width: 25px;
                                height: 15px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                color: #fff;
                                margin-right: 5px;

                                .mix-tag2 {
                                    font-size: 10px;
                                }
                            }

                            .activity-content {
                                white-space: nowrap;
                                font-size: 10px;
                            }
                        }
                    }
                }
            }
        }

        .fade-enter-active,
        .fade-leave-active {
            transition: opacity .5s;
        }

        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }

        .shop-brief-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 55;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: #333;

            .brief-modal-cover {
                // 遮罩层
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1;
            }

            .brief-modal-content {
                // 内容
                padding: 25px 20px;
                position: relative;
                width: 80%;
                background: #fff;
                border-radius: 5px;
                z-index: 99;
                display: flex;
                flex-direction: column;

                .content-title {
                    font-size: 20px;
                    line-height: 24px;
                    font-weight: 700;
                    white-space: normal;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    span {
                        font-weight: 600;
                    }

                    .content-tag {
                        border-radius: 2px;
                        background-image: linear-gradient(90deg, #fff100, #ffe339);
                        width: 36px;
                        height: 18px;
                        position: relative;
                        margin-right: 10px;

                        .mix-tag1 {
                            font-size: 12px;
                            position: absolute;
                            top: -2px;
                            left: 5px;
                        }
                    }
                }

                .brief-modal-msg {
                    display: flex;
                    margin: 20px -10px 0;

                    li {
                        flex: 1;
                        text-align: center;

                        h3 {
                            font-size: 13px;
                            font-weight: 600;
                            color: #333;
                            margin-bottom: 8px;
                        }

                        p {
                            font-size: 12px;
                            color: #999;
                        }
                    }
                }

                .brief-modal-title {
                    text-align: center;
                    margin: 15px auto 15px;
                    width: 85px;
                    background-image: linear-gradient(90deg, #fff, #333 50%, #fff);
                    background-size: 100% 1px;
                    background-position: 50%;
                    background-repeat: no-repeat;
                    span{
                        font-size: 12px;
                        padding: 0 6px;
                        background-color: #fff;
                    }
                }
                .brief-modal-notice{
                        font-size: 12px;
                        line-height: 1.5;
                        overflow-y: auto; // 如果溢出框，则应该提供滚动机制。
                    }
                    .mask-footer{
                        position: absolute;
                        bottom: -40px;
                        left: 50%;
                        // padding: 6px;
                        margin-left: -8px;
                        .van-icon{
                            font-size: 30px;
                            color: rgb(231, 216, 216);
                        }
                    }
            }
        }
    }
    .van-collapse-item__content{
        height: 800px;
        border-radius: 4px;
        background-color: #fff;
    }
</style>