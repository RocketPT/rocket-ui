<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title"><strong>Rocket PT</strong></div>
      <strong class="type-title">登录</strong>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input
            v-model="param.username"
            clearable
            :prefix-icon="User"
            placeholder="username / email"
          >

          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            clearable
            placeholder="password"
            :prefix-icon="Lock"
            v-model="param.password"
          >

          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="20">
            <el-col :span="14">
              <el-input
                v-model="param.code"
                placeholder="验证码"
                :prefix-icon="Connection"
                style="width: 100%"
                @keyup.enter="submitForm(login)"
              ></el-input>
            </el-col>
            <el-col :span="10" class="login-captcha">
              <img
                class="login-captcha-img"
                :src="captchaPath"
                @click="getCaptcha()"
                alt="验证码"
              />
            </el-col>
          </el-row>
        </el-form-item>

        <div class="login-btn">
          <el-button type="primary" @click="submitForm(login)">登录 </el-button>
        </div>
        <el-button
          link
          type="success"
          @click="() => router.replace('/register')"
          >注册</el-button
        >
        <el-divider direction="vertical" />
        <el-button link type="warning" @click="submitForm(login)"
          >忘记密码</el-button
        >
        <el-divider direction="vertical" />
        <el-button link type="danger" @click="submitForm(login)"
          >封禁记录</el-button
        >
        <p class="login-tips">
          Tips : 10 次连续登录失败将导致你的IP地址被禁用!
        </p>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useTagsStore } from "../store/tags";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { Lock, User , Connection} from "@element-plus/icons-vue";
import { login as reqLogin } from "../api/login";
import { useBasicStore } from "../store/basic";
import { BASE_URI } from "../api/base";
import { getUUID } from "../utils/uuid";

interface LoginInfo {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

const router = useRouter();
const param = reactive<LoginInfo>({
  username: "",
  code: "",
  uuid: "",
  password: "",
});

const rules: FormRules = {
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
let basicStore = useBasicStore();
const login = ref<FormInstance>();
const captchaPath = ref("");
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      reqLogin(param)
        .then((res) => {
          ElMessage.success("登录成功");
          localStorage.setItem("token", res.data.token);
          router.push("/");
          basicStore.setUserinfo(res.data);
        })
        .catch((reason) => {
          getCaptcha();
        });
    } else {
      ElMessage.error("登录失败");
      return false;
    }
  });
};

const tags = useTagsStore();
tags.clearTags();

// 获取验证码
const getCaptcha = () => {
  param.uuid = getUUID();
  captchaPath.value = BASE_URI + `/code.jpg?uuid=${param.uuid}`;
};
getCaptcha();
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.png);
  background-size: cover;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #4189fd;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 480px;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
}

.ms-content {
  padding: 30px;
}

.type-title {
  display: block;
  text-align: center;
  margin: 15px 0 0;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  margin-top: 15px;
  color: #ff921c;
}

.login-captcha {
  overflow: hidden;
}

.login-captcha-img {
  width: 100%;
  height: 32px;
  cursor: pointer;
}
</style>
