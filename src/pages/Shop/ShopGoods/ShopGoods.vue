<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <li class="menu-item" v-for="(good,index) in goods" :key="index">
                    <span class="txt">
                        <img class="icon" :src="good.icon" v-if="good.icon">
                        {{good.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper">
            <ul>
                <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
                    <h1 class="title">{{good.name}}</h1>
                    <ul>
                        <li class="food-item" v-for="(food,index) in good.foods" :key="index">
                            <div class="icon">
                                <img width="57px" height="57px" :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                            <div class="cartcontrol-wrapper">
                                CartControl
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import '../../../mock/mockSerer'
    // current 标识滚动分类到当前   需要计算属性 currentIndex
    //                  scrollY  右侧滑动的坐标                 滑动过程时时改变
    //                  tops 所有右侧分类的  li的top值  数组       列表显示完成后 不在改变每个top分配好
    export default {
        mounted() {
            this.$store.dispatch('getShopGoods')
        },
        computed: {
            ...mapState(['goods'])
        }
    }
</script>

<style lang="less">
    @import '../../../assets/css/shop.less';

    .goods {
        display: flex;
        position: absolute; // 如果复习的话请看这里使用 是个很好例子
        top: 195px;
        bottom: 46px;
        width: 100%;
        background-color: #fff;
        overflow: hidden;

        .menu-wrapper {
            flex: 0 0 70px;
            width: 70px;
            background-color: #f3f5f7;

            .menu-item {
                // display: table;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 34px;
                // width: 64px;
                margin: 0 10px;
                border-bottom: 1px solid rgb(236, 230, 230);
                box-sizing: border-box;

                .txt {
                    font-size: 11px;
                    white-space: nowrap;
                    width: 56px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    // margin-top: 8px;

                    .icon {
                        display: inline-block;
                        vertical-align: top;
                        width: 12px;
                        height: 12px;
                        margin-right: 3px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;
                    }
                }

            }
        }

        .foods-wrapper {
            flex: 1;

            .title {
                height: 26px;
                line-height: 26px;
                background-color: #f3f5f7;
                margin-bottom: 10px;
                color: rgb(147, 153, 159);
                font-size: 12px;
                border-left: 2px solid rgb(221, 211, 211);
            }

            .food-item {
                display: flex;
                margin: 18px;
                padding-bottom: 5px;
                .bottom-border-1px(rgba(7, 17, 27, 0.1));

                .icon {
                    flex: 0 0 57px;
                }

                .content {
                    flex: 1;

                    .name {
                        font-size: 14px;
                        margin: 2px 0 5px 0;
                        height: 14px;
                        line-height: 14px;
                        color: rgb(10, 10, 10);
                    }

                    .desc,
                    .extra {
                        font-size: 10px;
                        line-height: 10px;
                    }

                    .desc {
                        line-height: 12px;
                        margin-bottom: 5px;
                    }

                    .extra {
                        margin-bottom: 5px;

                        .count {
                            margin-right: 12px;
                        }
                    }

                    .price {
                        font-weight: 700;
                        font-size: 13px;

                        .now {
                            margin-right: 8px;
                            font-size: 14px;
                            color: rgb(240, 20, 20);
                        }

                        .old {
                            text-decoration: line-through;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                    }
                }
                .cartcontrol-wrapper{
                        position: absolute;
                        right: 0;
                        bottom: 5px;
                    }
            }
        }
    }
</style>