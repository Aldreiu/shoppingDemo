<template>
    <section class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">外卖</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
                    <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form @submit.prevent="login">
                    <div :class="{on:loginWay}">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                            <button class="get_verification" :class="{right_phone:rightPhone}" :disabled="!rightPhone"
                                @click.prevent="getCode">{{computeTime>0 ? `已发送(${computeTime}s)`:'获取验证码'}}</button>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                        </section>
                        <section class="login_hint">
                            温馨提示“未注册外卖账号的手机号，登录是将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on:!loginWay}">
                        <section class="login_message">
                            <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                        </section>
                        <section class="login_verification">
                            <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                            <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                            <div class="switch_eye" @click="showPwd=!showPwd">
                                <!-- <span :class="showPwd?'on':'off'"> -->
                                <span>
                                    <van-icon :name="showPwd?'closed-eye':'eye-o '" />
                                </span>
                            </div>
                        </section>
                        <section class="login_message">
                            <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                            <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                                @click="getCaptcha" ref="captcha">
                        </section>
                    </div>
                    <van-button round type="info" size="large">登录</van-button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <a href="javascript:;" class="go_back" @click="$router.back()">
                <van-icon name="arrow-left" />
            </a>
        </div>
        <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"></AlertTip>
    </section>
</template>

<script>
    import AlertTip from '../../components/AlertTip/AlertTip'
    import {
        reqSendCode,
        reqSmsLogin,
        reqPwdLogin
    } from '../../api/index'
    export default {
        data() {
            return {
                loginWay: false, // ture代表短信登录，false代表密码
                name: '', // 用户名
                pwd: '',
                phone: '',
                code: '', // 短信验证码
                captcha: '', // 图形验证码
                showPwd: false, // 是否显示密码
                vanticonname: '',
                computeTime: 0,
                alertText: '', // 提示文本
                showAlert: false, // 是否显示警告框
            }
        },
        components: {
            AlertTip,
        },
        methods: {
            // 异步获取短信验证码
            async getCode() {
                // 启动倒计时
                if (!this.computeTime) {
                    this.computeTime = 30
                    this.intervalId = setInterval(() => {
                        this.computeTime--
                        if (this.computeTime <= 0) {
                            //停止计时
                            clearInterval(this.intervalId)
                        }
                    }, 1000);
                }
                // 发送ajax请求（向指定手机号发送验证码短信）
                const result = await reqSendCode(this.phone)
                if (result.code === 1) {
                    //显示提示
                    this.showAlerts(result.msg)
                    // 停止倒计时
                    if (this.computeTime) {
                        this.computeTime = 0
                        clearInterval(this.intervalId)
                        this.intervalId = 0
                    }
                }
            },
            // 异步登录
            showAlerts(alertText) {
                this.showAlert = true
                this.alertText = alertText
            },
            async login() {
                // 前台表单验证
                let result
                if (this.loginWay) { // 短信登录
                    const {
                        phone,
                        code
                    } = this
                    if (!this.rightPhone) {
                        // 手机号不正确
                        this.showAlerts('手机号不正确')
                        return
                    } else if (!/^\d{6}$/.test(code)) {
                        // 验证码必须是六位数字
                        this.showAlerts('验证必须是六位数字')
                        return
                    }
                    // 发送ajax请求短信登录
                    result = await reqSmsLogin(phone, code)


                } else { // 密码登录
                    const {
                        name,
                        pwd,
                        captcha
                    } = this
                    if (!this.name) {
                        // 用户名必须指定用户名
                        this.showAlerts('用户名必须指定用户名')
                        return
                    } else if (!this.pwd) {
                        // 密码必须指定
                        this.showAlerts('密码必须指定')
                        return
                    } else if (!this.captcha) {
                        // 验证码必须指定
                        this.showAlerts('验证码必须指定')
                        return
                    }
                    // 发送ajax请求用户密码登录
                    result = await reqPwdLogin({
                        name,
                        pwd,
                        captcha
                    })
                }
                // 停止倒计时
                if (this.computeTime) {
                    this.computeTime = 0
                    clearInterval(this.intervalId)
                    this.intervalId = 0
                }
                if (result.code === 0) {
                    const user = result.data
                    // 将user保存到vuex的state
                    this.$store.dispatch('recordUser', user)
                    // 去个人中心界面
                    this.$router.replace('/profile')
                } else {
                    const msg = result.msg
                    // 验证码错了 重新调用 会发现验证码发生改变
                    this.getCaptcha()
                    this.showAlerts(msg)
                }
            },
            closeTip() {
                this.showAlert = false
                this.alertText = ''
            },
            // 获取一个新的图片验证码
            getCaptcha() {
                this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
            }

        },
        computed: {
            // test() 方法用于检测一个字符串是否匹配某个模式.   test() 来检索字符串。
            rightPhone() {
                return /^1\d{10}$/.test(this.phone)
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/css/shop.less';
    .header();

    .loginContainer {
        width: 100%;
        height: 100%;
        background: #FFF;
        position: relative;

        input {
            width: 100%;
            height: 50px;
            border: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            -o-box-shadow: none;
            box-shadow: none;
            -webkit-border-radius: 0px;
            -moz-border-radius: 0px;
            -ms-border-radius: 0px;
            border-radius: 0px;
            -moz-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            -webkit-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
            transition: all 0.3s ease;

            &:focus {
                border-bottom: 1px solid rgba(0, 0, 0, 0.4);
            }
        }

        input::-webkit-input-placeholder {
            color: #D8D8D8;
            font-size: 15px;
        }

        .loginInner {
            padding-top: 60px;
            width: 80%;
            margin: 0 auto;

            .login_header {
                .login_logo {
                    font-size: 40px;
                    font-weight: bold;
                    text-align: center;
                    color: #1989fa;
                }

                .login_header_title {
                    padding-top: 40px;
                    text-align: center;

                    a {
                        color: #1989fa;
                        font-size: 14px;
                        padding-bottom: 5px;

                        &:first-child {
                            margin-right: 40px;
                        }

                        &.on {
                            color: #1989fa;
                            font-weight: 700;
                            border-bottom: 2px solid #1989fa;
                        }
                    }
                }

            }

            .login_content {
                margin-top: 30px;

                form {
                    div {
                        display: none;

                        &.on {
                            display: block;
                        }

                        .login_message {
                            position: relative;
                            font-size: 15px;

                            .get_verification {
                                position: absolute;
                                top: 50%;
                                right: 10px;
                                font-size: 14px;
                                transform: translateY(-50%);
                                color: #ccc;
                                border: 0;
                                background: transparent;

                                &.right_phone {
                                    color: black;
                                    // text-shadow: 0px 1px 2px #ccc;
                                }
                            }
                        }

                        .login_verification {
                            position: relative;
                            margin-bottom: 15px;
                            font-size: 12px;

                            // margin-top: 14px;
                            .switch_eye {
                                position: absolute;
                                display: block;
                                font-size: 18px;
                                color: #ccc;
                                top: 50%;
                                right: 5px;
                                transform: translateY(-50%);
                            }
                        }

                        .login_hint {
                            margin: 10px 0 12px 0;
                            font-size: 12px;
                            line-height: 20px;
                            color: #999;

                            a {
                                color: #02a774;
                            }
                        }
                    }

                    .van-button {
                        margin-top: 15px;
                    }
                }

                .about_us {
                    display: block;
                    font-size: 12px;
                    margin-top: 12px;
                    text-align: center;
                    color: #1989fa;
                }

            }
        }

        .go_back {
            position: absolute;
            top: 20px;
            left: 15px;
            color: #1989fa;
        }
    }
</style>