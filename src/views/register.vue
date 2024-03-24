<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title"><strong>Rocket PT</strong></div>
      <strong class="type-title">注册</strong>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="80px"
        class="ms-content"
      >
        <el-form-item prop="type" label="注册类型">
          <el-radio-group v-model="param.type" :disabled="isInvitation">
            <el-radio-button :label="1">开放注册</el-radio-button>
            <el-radio-button :label="2">受邀注册</el-radio-button>
            <el-radio-button :label="3">自助答题注册</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="nickname" label="昵称">
          <el-input v-model="param.nickname" clearable placeholder="请输入昵称">
          </el-input>
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input
            v-model="param.username"
            clearable
            placeholder="请输入用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input
            type="email"
            v-model="param.email"
            clearable
            placeholder="请输入邮箱地址"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            type="password"
            clearable
            placeholder="请输入密码"
            v-model="param.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码">
          <el-row :gutter="20">
            <el-col :span="14">
              <el-input
                v-model="param.code"
                placeholder="请输入验证码"
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
        <el-form-item
          v-if="param.type === 2"
          prop="invitationCode"
          label="邀请码"
        >
          <el-input
            :disabled="isInvitation"
            v-model="param.invitationCode"
            clearable
            placeholder="请输入邀请码"
          >
          </el-input>
        </el-form-item>
        <div v-else></div>
        <el-form-item prop="country" label="国家地区">
          <el-input
            clearable
            placeholder="请输入国家地区"
            v-model="param.country"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-radio-group v-model="param.sex">
            <el-radio-button :label="0">男</el-radio-button>
            <el-radio-button :label="1">女</el-radio-button>
            <el-radio-button :label="2">其他</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <div class="login-btn">
          <el-button type="primary" @click="submitForm(login)">注册 </el-button>
        </div>
        <p class="login-tips">
          Tips : 已有账号？
          <el-button
            link
            type="success"
            size="small"
            @click="() => router.replace('/login')"
            >去登录</el-button
          >
        </p>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useTagsStore } from "../store/tags";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { RegisterParams, register } from "../api/login";
import { useBasicStore } from "../store/basic";
import { BASE_URI } from "../api/base";
import { getUUID } from "../utils/uuid";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const isInvitation = ref(!!route.query.invitationCode);

const param = reactive<RegisterParams>({
  type: isInvitation ? 2 : 1,
  username: "",
  password: "",
  nickname: "",
  email: "",
  invitationCode: (route.query.invitationCode as string | undefined) || "",
  code: "",
  uuid: "",
  country: "",
  sex: 0,
});

const rules: FormRules = {
  type: [{ required: true, message: "请选择注册类型", trigger: "blur" }],
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      asyncValidator: (rule: any, value: string) => {
        if (
          value &&
          !/^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/.test(
            value
          )
        ) {
          return Promise.reject(Error("请输入正确的邮箱地址"));
        } else return Promise.resolve();
      },
    },
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
  invitationCode: [
    { required: true, message: "请输入邀请码", trigger: "blur" },
  ],
  country: [{ required: true, message: "请输入国家地区", trigger: "blur" }],
};
let basicStore = useBasicStore();
const login = ref<FormInstance>();
const captchaPath = ref("");
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      register(param)
        .then((res) => {
          ElMessage.success("注册成功，去登录");
          // basicStore.changeIsLoginPage();
        })
        .catch((reason) => {
          getCaptcha();
        });
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

.type-title {
  display: block;
  text-align: center;
  margin: 15px 0 0;
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
  display: flex;
  align-items: center;
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
