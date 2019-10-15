<template>
    <section class="profile">
        <!-- 头部 -->
        <header>
            <van-nav-bar title="我的">
            </van-nav-bar>
        </header>
        <section class="profile-number">
            <router-link :to="userInfo._id ? '/userinfo':'/login'" class="profile-link">
                <div class="profile_image">
                    <i class="profile_toux">
                        <van-icon name="manager" /></i>
                </div>
                <div class="user-info">
                    <p class="user-info-top" v-if="!userInfo.phone">{{userInfo.name|| '登录/注册'}}</p>
                    <p class="user-info-bottom">
                        <span class="user-icon">
                            <i class="iconfont icon-mobilefill"></i>
                        </span>
                        <span>{{userInfo._id || '暂无绑定手机号'}}</span>
                    </p>
                </div>
                <span class="arrow">
                    <van-icon name="arrow" />
                </span>
            </router-link>
        </section>
        <section>
            <van-button type="danger" size="large" @click="loginout" v-if="userInfo._id">退出登录</van-button>
            <van-button type="danger" size="large" v-else>退出登录</van-button>

        </section>
    </section>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import {
        Dialog
    } from 'vant';

    export default {
        data() {
            return {}
        },
        methods: {
            loginout() {
                Dialog.confirm({
                    title: '提示',
                    message: '确认退出吗？'
                }).then(() => {
                    // on confirm
                    //请求退出
                    this.$store.dispatch('loginOut')
                    this.$toast('登出成功'); 
                }).catch(() => {
                    // on cancel
                    console.log('点击了取消')
                })
            },
        },
        components: {
            [Dialog.Component.name]: Dialog.Component
        },
        computed: {
            ...mapState(['userInfo'])
        }
    }
</script>

<style lang="less">
    .profile {
        width: 100%;
        overflow: hidden;

        .profile-number {
            background-color: #1989fa;

            .profile-link {
                display: flex;

                .profile_image {
                    .profile_toux {
                        // display: inline-block;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 60px;
                        height: 60px;
                        margin: 10px 20px 0;
                        border-radius: 50%;
                        background-color: rgb(238, 216, 216);

                        .van-icon-manager {
                            font-size: 40px;
                            color: #9da3a8;
                            // color:#1989fa;
                        }
                    }

                    flex: 30%;
                }

                .user-info {
                    flex: 70%;
                    display: flex;
                    color: #fff;
                    flex-direction: column;

                    p {
                        margin: 10px 0 10px 0;
                    }

                    .user-info-bottom {
                        font-size: 12px;
                    }
                }

                .arrow {
                    display: flex;
                    align-items: center;
                    color: #fff;

                    .van-icon-arrow {}
                }
            }
        }
    }
</style>