<template>
    <!-- 邮箱验证码 -->
    <div class="login-input-box">
        <p class="login-prefix">
            {{ prefixTitle ? prefixTitle : '请设置:prefixTitle的值' }}
        </p>
        <div class="likebocai-input-box">
            <input class="likebocai-input" :type="type ? type : 'text'" :value="modelValue" @input="emit('update:model-value',(<HTMLInputElement>$event.target).value)" :placeholder="placeholder ? placeholder : '请输入内容'" />
            <div class="login-suffix-box">
                <slot />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
// 接收props
defineProps(['modelValue','placeholder','prefixTitle','type'])
// 声明事件
const emit = defineEmits(['update:model-value'])
</script>

<style scoped>
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
</style>