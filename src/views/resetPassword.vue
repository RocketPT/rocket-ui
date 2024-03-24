<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title"><strong>Rocket PT</strong></div>
      <strong class="type-title">重置密码</strong>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="80px"
        class="ms-content"
      >
        <el-form-item prop="checkCode" label="checkcode">
          <el-input
            type="checkCode"
            v-model="param.checkCode"
            clearable
            placeholder="请输入发给您的验证码"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input
            type="password"
            clearable
            placeholder="newPassword"
            :prefix-icon="Lock"
            v-model="param.newPassword"
          >

          </el-input>
        </el-form-item>
             <el-form-item prop="newPassword2" label="重复密码" >
          <el-input
            type="password"
            clearable
            placeholder="newPassword2"
            :prefix-icon="Lock"
            v-model="param.newPassword2"
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

        <div class="login-btn">
          <el-button type="primary" @click="submitForm(login)">确认</el-button>
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
import { ResetPasswordParam, resetPassword } from "../api/forgotPassWord";
import { useBasicStore } from "../store/basic";
import { BASE_URI } from "../api/base";
import { getUUID } from "../utils/uuid";
import { useRoute, useRouter } from "vue-router";
import { Lock, User , Connection} from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();

const isInvitation = ref(!!route.query.invitationCode);

const param = reactive({
  checkCode: "",
  newPassword: "",
  newPassword2: "",
  code: "",
  uuid: "",
});

const rules: FormRules = {
  checkCode: [
    { required: true, message: "请输入邮箱验证码", trigger: "blur" },
  ],
  newPassword: [{ required: true, message: "请输入密码", trigger: "blur" }],
  newPassword2: [{ required: true,message: "请再次输入密码",trigger: "blur" }],
  code: [{ required: true, message: "请输入图形验证码", trigger: "blur" }],
};
let basicStore = useBasicStore();
const login = ref<FormInstance>();
const captchaPath = ref("");
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      resetPassword(param)
        .then((res) => {
          ElMessage.success("密码重置成功！");
          router.replace('/login')
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
