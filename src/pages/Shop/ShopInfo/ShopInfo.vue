<template>
    <div class="shop-info">
        <div class="info-content">
            <div class="section">
                <h3 class="section-title">配送信息</h3>
                <div class="delivery">
                    <div>
                        <span class="delivery-icon">{{info.description}}</span>
                        <span>由商家提供配送，约{{info.deliveryTime}}分钟送达，距离{{info.distance}}</span>
                    </div>
                </div>
                <div class="delivery-money">配送费￥{{info.deliveryPrice}}</div>
            </div>

            <div class="split"></div>

            <div class="section">
                <h3 class="section-title">活动于服务</h3>
                <div class="ractivity" ref="ractivity">
                    <div class="activity">
                        <div class="activity-item" v-for="(support,index) in info.supports" :key="index"
                            :class="supportClasses[support.type]">
                            <span class="content-tag">
                                <span class="mini-tag">{{support.name}}</span>
                            </span>
                            <span class="activity-content">{{support.content}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="split"></div>

            <div class="section">
                <h3 class="section-title">商家实景</h3>
                <div class="pic-wrapper">
                    <ul class="pic-list" ref="picul">
                        <li class="pic-item" v-for="(pic,index) in info.pics" :key="index">
                            <img :src="pic" width="120" height="90">
                        </li>
                    </ul>
                </div>
            </div>

            <div class="split"></div>

            <div class="section">
                <h3 class="section-title">商家信息</h3>
                <ul class="detail">
                    <li><span class="bold">品类</span><span>{{info.category}}</span></li>
                    <li><span class="bold">商家电话</span><span>{{info.phone}}</span></li>
                    <li><span class="bold">地址</span>{{info.address}}</li>
                    <li><span class="bold">营业时间</span>{{info.workTime}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import BScroll from 'better-scroll'
    export default {
        data() {
            return {
                supportClasses: ['activity-green', 'activity-red', 'activity-orange'],
            }
        },
        mounted() {
            this.$store.dispatch('shoptab', {
                name: 'c'
            })
            this._initactivity()
            this._initScroll()
            this._initpicwrapper()
        },
        computed: {
            ...mapState(['info'])
        },
        methods: {
            _initactivity() {
                new BScroll(this.$refs.ractivity, {
                    click: true,
                    stopPropagation: true
                })
            },
            _initScroll() {
                new BScroll('.shop-info')
            },
            _initpicwrapper(){
                // 先显示初始化  来了数据在去更新
                if(!this.info.pics){
                    return 
                }
                const ul = this.$refs.picul
                const liWidth = 120
                const space = 6
                // Error in render: "TypeError: Cannot read property 'length' of undefined"
                // 这个错误原因是js中使用错误  注意  因为第一次刷新 没有初始值 是undefined 所以直接length会这样
                // 这里的是mounted  dom渲染完
                const count = this.info.pics.length
                ul.style.width = (liWidth + space) * count-space + 'px'
                new BScroll('.pic-wrapper',{
                    scrollX: true,
                    
                })
            },
           
        },
        watch:{
            info(){
                this.$nextTick(() => {
                    this._initpicwrapper()
                })
            }
        }
    }
</script>

<style lang="less">
    @import '../../../assets/css/shop.less';
    .shop-info {
        position: absolute;
        top: 195px;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #fff;
        overflow: hidden;

        .section {
            // position: relative;
            padding: 16px 14px 15px;
            font-size: 16px;
            color: #666;
            background-color: #fff;
            border-bottom: 1px solid #eee;

            .section-title {
                color: #000;
                font-weight: 700;
                line-height: 16px;
            }

            .delivery {
                margin-top: 16px;
                font-size: 13px;
                line-height: 18px;

                .delivery-icon {
                    width: 55px;
                    font-size: 11px;
                    margin-right: 10px;
                    display: inline-block;
                    text-align: center;
                    color: #fff;
                    background-color: #0097ff;
                    border-radius: 4px;
                    padding: 1px 0;
                }
            }

            .delivery-money {
                margin-top: 5px;
            }
        }

        .split {
            width: 100%;
            height: 16px;
            border-top: 1px solid rgba(7, 17, 27, 0.1);
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            background: #f3f5f7;
        }

        .ractivity {
            position: relative;
            margin-top: 15px;
            height: 80px;
            overflow: hidden;
        }

        .activity {
            position: absolute;

            // margin-top: 15px;
            // height: 100px;
            // overflow: hidden;
            .activity-item {
                margin-bottom: 12px;
                display: flex;
                font-size: 13px;
                align-items: center;

                &.activity-green {
                    .content-tag {
                        background-color: rgb(112, 188, 70);
                    }
                }

                &.activity-red {
                    .content-tag {
                        background-color: rgb(240, 115, 115);
                    }
                }

                &.activity-orange {
                    .content-tag {
                        background-color: rgb(241, 136, 79);
                    }
                }

                .content-tag {
                    display: inline-block;
                    border-radius: 2px;
                    width: 36px;
                    height: 15px;
                    margin-right: 10px;
                    color: #fff;
                    font-style: normal;
                    position: relative;

                    .mini-tag {
                        position: absolute;
                        left: 0;
                        top: 0;
                        right: -100%;
                        bottom: -100%;
                        font-size: 20px;
                        transform: scale(.5);
                        transform-origin: 0 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }

        .pic-wrapper {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            margin-top: 16px;

            .pic-list {
                .pic-item {
                    display: inline-block;
                    margin-right: 6px;
                    width: 120px;
                    height: 90px;
                }
            }
        }

        .detail{
            // padding-bottom: 16px;
            margin-top: 12px;
            box-sizing: border-box;
            li{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .bottom-border-1px(#ddd);
                font-size: 13px;
                padding: 16px 12px 16px 0;
                
                .bold{
                    font-weight: 700;
                    color: #333;
                    
                }
                &:last-child{
                    .bottom-border-1px(transparent);
                }
            }
            
        }
    }
</style>