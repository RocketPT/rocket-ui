<template>
    <div class="bgc">
        <div class="login-box">
            <div class="login">
                <!-- 注册logo -->
                <h2 style="margin-bottom: 30px;">注册</h2>
                <!-- 邮箱输入框 -->
                <div class="login-input-box">
                    <p class="login-prefix">
                        邮箱登录
                    </p>
                    <div class="likebocai-input-box">
                        <input :disabled="registerData.isDisposed" class="likebocai-input" type="text"
                            v-model="registerData.emial" placeholder="请输入邮箱" />
                        <div class="login-suffix-box">

                        </div>
                    </div>

                </div>
                <!-- 邮箱验证码 -->
                <LikebocaiInput v-model="registerData.code" :type="'text'" :prefixTitle="'验证码'" :placeholder="'请输入验证码'">
                    <p @click="getCode" style="color: #bfbfbf;"
                        :style="{ color: registerData.emial.length <= 0 ? '#bfbfbf' : '#527fad', cursor: registerData.emial.length <= 0 || registerData.isDisposed ? 'not-allowed' : 'pointer' }">
                        {{ registerData.isDisposed ? `${registerData.time}s` : '获取手机验证码' }}
                    </p>
                </LikebocaiInput>
                <!-- 昵称 -->
                <LikebocaiInput v-model="registerData.nickName" :prefixTitle="'昵称'" :placeholder="'请输入昵称'" />
                <!-- 密码 -->
                <LikebocaiInput v-model="registerData.password" :type="!registerData.pwdLook ? 'text' : 'password'"
                    :prefixTitle="'密码'" :placeholder="'请输入密码'">
                    <div v-if="registerData.password.length > 0" @click="registerData.pwdLook = !registerData.pwdLook"
                        style="cursor: pointer;">
                        <ElIconView width="20" v-if="!registerData.pwdLook" />
                        <ElIconHide width="20" v-else />
                    </div>
                </LikebocaiInput>
                <!-- 再次输入密码 -->
                <LikebocaiInput v-model="registerData.checkPassword"
                    :type="!registerData.checkPwdLook ? 'text' : 'password'" :prefixTitle="'确认密码'"
                    :placeholder="'请输入再次输入密码'">
                    <div v-if="registerData.checkPassword.length > 0"
                        @click="registerData.checkPwdLook = !registerData.checkPwdLook" style="cursor: pointer;">
                        <ElIconView width="20" v-if="!registerData.checkPwdLook" />
                        <ElIconHide width="20" v-else />
                    </div>
                </LikebocaiInput>

                <ElButton :disabled="!registerData.isAgree" type="primary"
                    style="width: 200px;height: 50px;margin-top: 40px;border-radius: 25px;font-size: 18px;margin-bottom: 20px;">
                    注册
                </ElButton>
                <div style="height: 30px;display: flex;justify-content: center;align-items: center;">
                    <input type="checkbox" style="width: 14px;margin-right: 10px;" v-model="registerData.isAgree">
                    <p style="color: #999999;font-size: 14px;">
                        我会认真有阅读并遵守平台规则。我会积极参与平台内建设。我已满 13 周岁。
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElButton, ElMessage } from 'element-plus';
import { reactive } from 'vue';
import LikebocaiInput from '../components/likebocai/input.vue'

const registerData = reactive({
    emial: '',
    code: '',
    nickName: '',
    password: '',
    checkPassword: '',
    pwdLook: true,
    checkPwdLook: true,
    isAgree: false,
    isDisposed: false,
    time: 10
})
const getCode = () => {
    if (registerData.emial.length <= 0) {
        return;
    }
    registerData.isDisposed = true
    handleTime()
    ElMessage.success("验证码发送成功！")
}

const handleTime = () => {
    if (registerData.time <= 0) {
        registerData.isDisposed = false
        registerData.time = 10
    } else {
        setTimeout(() => {
            registerData.time--
            handleTime()
        }, 1000)
    }
}
</script>

<style scoped>
.bgc {
    background-color: #3265d2;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-box {
        width: 600px;
        background-color: #fff;
        border-radius: 15px;
        padding: 30px 20px;
        text-align: center;

        .login-input-box {
            height: 60px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 8px;

            .login-prefix {
                color: #a0a0a0;
                width: 100px;
                display: flex;
                align-items: center;
                justify-content: right;
                margin-right: 20px;
                font-size: 18px;
            }

            .likebocai-input-box {
                width: 360px;
                height: 50px;
                border-radius: 25px;
                background-color: #f0f0f0;
                display: flex;
                align-items: center;

                .likebocai-input {
                    width: 170px;
                    height: 30px;
                    border: 0px;
                    background-color: #f0f0f0;
                    outline: none;
                    font-size: 18px;
                    margin-left: 25px;
                }

                .likebocai-input::placeholder {
                    color: #bcbcbc;
                }

                .login-suffix-box {
                    width: 130px;
                    height: 40px;
                    margin-left: 10px;
                    display: flex;
                    justify-content: right;
                    align-items: center;
                }
            }
        }
    }
}
</style>