<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{info.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家99%</div>
                </div>

                <div class="overview-right">
                    <div class="score-wrapper">
                        <van-rate v-model="info.serviceScore" allow-half :count="5" />
                        <span class="title">服务态度</span>
                        <span class="score">{{info.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <van-rate v-model="info.foodScore" allow-half :count="5" />
                        <span class="title">商品评分</span>
                        <span class="score">{{info.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{info.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>

            <div class="split"></div>

            <div class="ratingselect">
                <div class="rating-type">
                    <span class="block positive" :class="{active:selectType===2}" @click="setSelectType(2)">
                        全部<span class="count">{{ratings.length}}</span>
                    </span>
                    <span class="block positive" :class="{active:selectType===1}" @click="setSelectType(1)">
                        满意<span class="count">{{positiveSize}}</span>
                    </span> 
                    <span class="block positive"  :class="{active:selectType===0}" @click="setSelectType(0)">
                        不满意<span class="count">{{ratings.length - positiveSize}}</span>
                    </span>
                </div>
                <div class="switch" :class="{on: onlyShowText}" @click="toggleOnlyShowText">
                    <span class="icon"><van-icon name="checked" /></span>
                    <span class="text">只看有内容的评论</span>
                </div>
            </div>

            <div class="rating-wrapper">
                <ul>
                    <li class="rating-item" v-for="(rating,index) in filterRatings" :key="index">
                        <div class="avatar">
                            <img :src="rating.avatar" alt="">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <van-rate v-model="rating.score" allow-half :count="5" />
                                <span class="delivery">{{rating.score}}</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend">
                                <span><van-icon class="iconfont" :class="rating.rateType===0? 'icon-appreciate_fill_light':'icon-oppose_fill_light'" class-prefix="my-icon" name="cart" /></span>
                                <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                            </div>
                            <div class="time">{{rating.rateTime | dateFormat}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapGetters} from 'vuex'
    import BScroll from 'better-scroll'
    export default {
        data(){
            return {
                onlyShowText:true,  // 是否值显示有文本的
                selectType: 2, // 选择的评论类型：0 满意  1  不满意  2全部
            }
        },
        mounted(){
            this.$store.dispatch('shoptab',{name:'b'})
            this.$store.dispatch('getShopRatings',() => {
                this.$nextTick(()=>{
                    new BScroll(this.$refs.ratings,{
                        click:true
                    })
                })
            })
        },
        methods:{
            toggleOnlyShowText(){
                this.onlyShowText = !this.onlyShowText
            },
            setSelectType(selectType){
                this.selectType = selectType
            }
        },
        computed:{
            ...mapState(['info','ratings']),
            ...mapGetters(['positiveSize']),

            // 使用计算属性去控制 ratings的数组   因为有了条件使用filter方法
            filterRatings(){
                // 得到相关数据 进行过滤
                const {ratings,onlyShowText,selectType} = this
                // 产生一个过滤之后的数组
                /*
                    条件1     selectType   0/1/2     大分类的 满意/不满意/全部
                             rateType  0/1  评论的 满意/不满意
                             selectType===2 || slelectType ===rateType
                    条件2   onlyShowText: ture/false   只看内容的按钮
                            text: 有值/没值   
                            !onlyShowText || text.length>0
                */
               return ratings.filter(rating=>{
                   const {rateType,text}=rating
                   return (selectType===2 || selectType ===rateType) && (!onlyShowText || text.length>0)
               })
            },
        }
    }
</script>

<style lang="less">
    @import '../../../assets/css/shop.less';
    .ratings {
        position: absolute;
        top: 195px;
        bottom: 0;
        left: 0;
        width: 100%;
        // height: 400px;
        background: #fff;
        overflow: hidden;
        // z-index: -1;

        .overview {
            display: flex;
            padding: 18px 0;


            .overview-left {

                @media only screen and (max-width: 320px) {
                    flex: 0 0 120px;
                    width: 120px;
                }

                flex: 0 0 125px;
                padding: 6px 0;
                width: 125px;
                border-right: 1px solid rgba(7, 17, 27, 0.1);
                text-align: center;

                .score{
                    margin-bottom: 6px;
                    line-height: 28px;
                    font-size: 24px;
                    color: rgb(255, 153, 0);
                }
                .title{
                    margin-bottom: 8px;
                    line-height: 12px;
                    font-size: 12px;
                    color: rgb(7, 17, 27)
                }
                .rank{
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
            }

            .overview-right {
                flex: 1;
                padding: 6px 0 6px 10px;

                @media only screen and (max-width: 320px){
                    padding-left: 6px;
                }

                .score-wrapper{
                    margin-bottom: 8px;
                    .title{
                        display: inline-block;
                        font-size: 12px;
                        line-height: 18px;
                        vertical-align: top;
                        color: rgb(7, 17, 27);
                        margin-right: 3px;
                    }
                    .van-rate{
                       line-height: 18px;
                       vertical-align: top;
                       margin: 0 5px;
                    }
                    .van-rate__icon{
                        font-size: 14px;
                    }
                    .score{
                        display: inline-block;
                        line-height: 18px;
                        vertical-align: top;
                        font-size: 12px;
                    }
                }
                .delivery-wrapper{
                    .title{
                        line-height: 18px;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                    }
                    .delivery{
                        margin-left: 12px;
                        font-size: 12px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
        .split{
            width: 100%;
            height: 16px;
            border-top: 1px solid rgba(7, 17, 27, 0.1);
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            background: #f3f5f7;
        }
        .ratingselect{
            .rating-type{
                padding: 18px 0;
                margin: 0 18px;
                .block{
                    display: inline-block;
                    padding: 8px 12px;
                    line-height: 16px;
                    border-radius: 2px;
                    margin-right: 8px;
                    font-size: 12px;
                    background: rgba(77, 85, 93, 0.2);
                    &.active{
                        background: #1989fa;
                        color: #fff;
                    }
                    .count{
                        margin-left: 2px;
                        font-size: 10px;
                    }
                }
            }
            .switch{
                padding: 12px 18px;
                line-height: 24px;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                color: rgb(147, 153, 159);

                &.on{
                    .van-icon{
                        color: #1989fa;
                    }
                }
                .van-icon{
                    display: inline-block;
                    vertical-align: top;
                    margin-right: 4px;
                    font-size: 20px;
                    margin-top: 1px;
                }
                .text{
                    display: inline-block;
                    vertical-align: top;
                    font-size: 12px;
                }
            }
        }
        .rating-wrapper{
            padding: 0 18px;
            .rating-item{
                display: flex;
                padding: 15px 0;
                .bottom-border-1px(rgba(7, 17, 27, 0.2));
                .avatar{
                    flex: 0 0 28px;
                    width: 28px;
                    margin-right: 12px;
                    img{
                        width: 100%;
                        border-radius: 50%;
                    }
                }
                .content{
                    position: relative;
                    flex: 1;
                    .name{
                        margin-bottom: 4px;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(7, 17, 27);
                    }
                    .star-wrapper{
                        margin-bottom: 4px;
                        .van-rate__icon{
                            font-size: 12px;
                        }
                        .delivery{
                            display: inline-block;
                            vertical-align: middle;
                            line-height: 12px;
                            font-size: 10px;
                            margin-left: 3px;
                        }
                    }
                    .text{
                        margin-bottom: 5px;
                        line-height: 15px;
                        color: rgb(7, 17, 27);
                        font-size: 12px;
                    }
                    .recommend{
                        line-height: 16px;
                        .iconfont{
                            display: inline-block;
                            margin: 0 8px 4px 0;
                            font-size: 13px;
                        }
                        .icon-appreciate_fill_light{
                            color: rgb(255, 153, 0);
                        }
                        .icon-oppose_fill_light{
                            color: rgb(147, 153, 159);
                        }
                        .item{
                            padding: 0 6px;
                            border: 1px solid rgba(7, 17, 27, 0.1);
                            border-radius: 2px;
                            color: rgb(147, 153, 159);
                            background: #fff;
                            font-size:12px; 
                            margin-right: 3px;
                        }
                    }
                    .time{
                        position: absolute;
                        top: 0;
                        right: 0;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
    }
</style>