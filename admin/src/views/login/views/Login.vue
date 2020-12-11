<!--
 * @description     登录
 *
 * @author          涂重阳 | tuchongyang
 * @email           779311998@qq.com
 * -->

<template>
    <div class="login-container">
        <div class="wraper">
            <!-- LOGO -->
            <div class="logo"><h1>后台管理系统</h1></div>

            <!-- 登录文字显示 -->
            <div class="login-desc">登录</div>

            <el-form ref="form" :model="form" :rules="rules">
                <!-- 账户 | 邮箱 -->
                <el-form-item prop="username">
                    <i class="icon-before ico-login-username"></i>
                    <el-input class="txt-username" v-model="form.username" autofocus clearable :disabled="loading" :placeholder="'请输入用户名'"></el-input>
                </el-form-item>

                <!-- 密码 -->
                <el-form-item prop="password">
                    <i class="icon-before ico-login-password"></i>
                    <el-input class="txt-password" v-model="form.password" clearable :type="passwordType" :disabled="loading" placeholder="请输入密码"></el-input>

                    <!-- 显示 | 隐藏密码 -->
                    <a class="btn-show-password" :title="getPasswordTitle()" :class="{ active: passwordShow }" @click="passwordShow = !passwordShow">
                        <i class="icon-after ico-login-eye"></i>
                    </a>
                </el-form-item>


                <!-- 记住账户和租户域 -->
                <el-form-item class="item-remember">
                    <el-checkbox v-model="remember">记住账户</el-checkbox>
                </el-form-item>

                <el-form-item>
                    <!-- 登录按钮 -->
                    <el-button class="btn-login" v-if="!loading" @click="onSubmit">登 录</el-button>

                    <!-- 登录中 不可点击 -->
                    <el-button class="btn-login" :loading="loading" v-if="loading">登录中...</el-button>
                    <!-- <router-link to="/signup" class="linkto-signup">{{$t('common.applyAccount')}}</router-link> -->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
/**
 * @description             登录需要调用的接口
 *
 * @param                   login 登录
 * */
import systemApi from '@/views/system/api/';
/* Cookies */
import Cookies from 'js-cookie';

/* 密码加密 */
import bgLogo from '@/assets/images/logo.png';
	/* eslint-disable */
export default {
    components: { },
    data() {
		/* eslint-enable */
        var rules = {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 2, max: 50, message: "请输入用户名", trigger: 'blur' }
            ],
            password: [
                { required: true, message: "请输入密码", trigger: 'blur' },
                { min: 3, max: 18, message: "密码格式不正确", trigger: 'blur' }
            ],
            domain: [
                { required: true, message: "请输入租户域", trigger: 'blur' },
                { pattern: /^[0-9a-zA-Z_]{5,20}$/, message: '租户域必须为长度为5-20的数字、英文大小写', trigger: 'blur' }
            ],
           
        };
        return {
            /* 登录信息 */
            form: {
                username: '', // 账户 | 邮箱
                password: '', // 密码
            },
            /* 标识是否本地测试环境 */
            is_debug: process.env.NODE_ENV !== 'production',

            /* 校验规则 */
            rules: rules,

            loading: false, // 标识是否正在登录中
            passwordShow: false, // 切换 显示 | 隐藏密码
            remember: true, // 标识是否记住租户域

            logoUrl: Cookies.get('logoUrl') || bgLogo,
            codeRandom: Math.random(),
            timer: null,
			yers:'',
        };
    },

    computed: {
        passwordType() {
            return this.passwordShow ? 'text' : 'password';
        },
    },

    created() {
        // 初始化账户和租户域
        this.initStorage();

        this.$nextTick(() => {
            var _this = this;
            // TODO 绑定 enter 键，提交表单
            document.onkeydown = event => {
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if (e && e.keyCode === 13) {
                    _this.onSubmit();
                }
            };
        });
		// 获取当年年份
		var date = new Date()
		this.yers = date.getFullYear()
    },

    destroyed() {
        document.onkeydown = null;
         if(this.timer){window.clearTimeout(this.timer)}
    },

    methods: {
		
        /* 初始化账户和租户域 */
        initStorage() {
            let m_username = localStorage.getItem('m_username');
            if (m_username) {
                this.form.username = m_username;
            }
        },

        getPasswordTitle() {
            let passwordShow = this.passwordShow;
            return passwordShow ? "隐藏密码" : "显示密码";
        },
        refreshCode(){
            if(this.is_verifyCode){
                this.codeRandom = Math.random()
            }
        },
        /* 校验通过才能进行登录 */
        onSubmit() {
            
            this.$refs['form'].validate(valid => {
                if (!valid) {
                    this.refreshCode();
                    return false;
                }
                this.login();
                
            });
        },

        /* 登录 */
        login() {
            this.loading = true;

            systemApi.user.login(this.form).then((res) => {
                /* 设置记住账号和租户域后，存储到浏览器缓存 */
                if (this.remember) {
                    localStorage.setItem('m_username', this.form.username);
                } else {
                    localStorage.removeItem('m_username');
                }
                //登录后，全局缓存token
                localStorage.setItem('token',res.result)
                this.getUserInfo();
            })
            .catch(() => {
                this.refreshCode();
                this.loading = false;
            });
        },

        /* 获取登录的用户信息 */
        getUserInfo() {
            /* 登录之后调取用户信息接口 */
            this.$store.dispatch('GetUserInfo', true).then(() => {
                    // console.log(res)
                    this.loading = false;
                    this.$message['success']("登录成功");
                    let query = this.$route.query;
                    if (query && query.redirect && query.redirect !== '/login' && this.needRedirect) {
                        this.$router.replace({ path: query.redirect });
                        // this.$router.go(-1)
                        return;
                    }
                    this.$router.push('/');
                    // this.$router.go(-1)
                    // 查询用户身份
                }).catch(() => {
                    this.refreshCode();
                    this.loading = false;
                });
                
        },
        
        
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';


.login-desc {
    font-size: 20px;
    margin: 20px auto;
    text-align:center;
}

.login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: url(../../../assets/images/login-bg-1.jpg) center no-repeat #000;
    background-size: cover;
	overflow-y: auto;
	min-height: 700px;

    .wraper {
        width: 540px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        padding: 30px 80px;

        h1 {
            margin-bottom: 30px;
            text-align: center;
            font-weight: normal;
            font-size: 18px;
        }
        .logo {
            position: absolute;
            top: -100px;
            left: 0;
            right: 0;
            text-align: center;
            h1{
                font-size: 30px;
            }
        }
        .el-form {
            padding: 0 20px;

            .el-form-item {
                margin-bottom: 10px;
                &.code-item{
                    .img{
                        position: absolute;
                        right: 0;
                        bottom: 5px;
                        -webkit-filter: grayscale(100%);
                        -moz-filter: grayscale(100%);
                        -ms-filter: grayscale(100%);
                        -o-filter: grayscale(100%);
                        filter: grayscale(100%);
                        filter: gray;
                        opacity: 0.3;
                    }
                    /deep/{
                        .el-input__suffix{
                            right: 90px;
                        }
                    }
                }
            }

            /deep/ {
                .el-input {
                    &.is-disabled {
                        .el-input__inner {
                            background: rgba(255, 255, 255, 0.1);
                            border: 0;
                        }
                    }
                    .el-input__clear {
                        opacity: 0.8;

                        &:before {
                            content: '\e6db';
                        }
                    }
                    .el-input__inner {
                        border: 0;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
                        border-top: 1px solid transparent;
                    }
                }
                .el-input__inner {
                    padding-left: 40px;
                    color: #fff;
                    transition: none;
                    -webkit-transition: none;

                    &:not(.is-error) {
                        background: rgba(0, 0, 0, 0);
                        border-radius: 0;
                    }

                    &:focus {
                        border-top-color: transparent;
                        border-bottom-color: #a94678;
                    }

                    &:-webkit-autofill {
                        // -webkit-box-shadow: 0 0 0px 1000px #fcc inset !important;
                        transition: background-color 5000s ease-in-out 0s;
                        color: #fff;
                        background: rgba(0, 0, 0, 0) !important;
                    }

                    &:-internal-autofill-previewed,
                    &:-internal-autofill-selected {
                        color: #fff !important;
                        -webkit-text-fill-color: #ffffff !important;
                        background: none !important;
                    }

                    &[disabled] {
                        border-color: transparent;
                        &:-webkit-autofill {
                            transition: none;
                        }
                    }
                }
                .btn-login {
                    width: 100%;
                    display: block;
                    background-color: $red-select;
                    color: #fff;
                    border: 0;
                    line-height: 1;
                    margin-top: 30px;
                    padding-top: 11px;
                    padding-bottom: 11px;
                    font-size: 14px;
                    outline: none;

                    &.is-loading:before {
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                    }
                }
                .item-remember {
                    margin-left: 10px;
                    // margin-top: -10px;

                    .el-checkbox {
                        color: #ccc;
                        .el-checkbox__input {
                            &.is-checked + .el-checkbox__label {
                                // color: $red-select;
                                color: #ccc;
                            }
                            &.is-focus,
                            &:hover {
                                .el-checkbox__inner {
                                    border-color: #dcdfe6;
                                }
                            }
                        }
                        .el-checkbox__input.is-checked .el-checkbox__inner,
                        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                            background-color: $red-select;
                            border-color: $red-select;
                        }
                        .el-checkbox__label {
                            font-size: 14px;
                        }
                        .el-checkbox__inner {
                            background: rgba(0, 0, 0, 0);
                            width: 14px;
                            height: 14px;

                            &:after {
                                left: 3px;
                                top: 0;
                            }
                        }
                    }
                }
            }

            .txt-username {
            }

            .icon-before {
                position: absolute;
                left: 5px;
                top: 8px;
                z-index: 10;
                width: 1em;
                height: 1em;
                text-align: right;
                color: #ccc;
            }
            .icon-after {
                position: absolute;
                left: 100%;
                top: 8px;
                margin-left: 5px;
                z-index: 10;
            }
            .btn-show-password {
                cursor: pointer;
                &.active {
                    i {
                        background-position: 0 -2em;
                    }
                }
            }
        }
        .linkto-signup{
            color: #fff;
            float: right;
            text-decoration: none;
            font-size: 14px;
            opacity: .7;
        }
    }

    /* 底部版权样式 start */
    .foot {
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        text-align: center;
        color: #ccc;

        .lang {
            margin-left: 20px;
            color: #ccc;
        }
        a{
            color: #ccc;
            font-size: 14px;
        }
    }
    /* 底部版权样式 end */
}
.lang-select-login {
    position: absolute;
    right: 120px;
    top: 20px;
}
.role-select{
    .el-radio{
        color: #ccc;
    }
}
</style>
