<template>
<div class="rocket-nav-box">
    <div class="rocket-nav">
        <ElButton type="primary" plain style="border: 0px;">捐赠</ElButton>
        <div class="rocket-nav-right" style="">
            <p>BitTorrent客户端下载</p>
            <p>站内规则</p>
            <p>我的资源</p>
            <p>消息</p>
            <p>用户昵称▼</p>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';


</script>

<style scoped>
.rocket-nav-box {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    .rocket-nav {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .rocket-nav-right {
            display: flex;
            justify-content: right;
            align-items: center;
            width: 80%;
            p {
                color: #7d808a;
                height: 40px;
                padding: 0px 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
        }
    }
}
</style>