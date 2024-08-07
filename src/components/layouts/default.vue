<template>
    <div class="default-body">
        <LikebocaiHeader />
        <div style="width: 100%;display: flex;justify-content: center;align-items: center;">
            <div style="width: 1400px;">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import LikebocaiHeader from './header.vue'
</script>

<style scoped>
.default-body {
    height: 100%;
    width: 100%;
    background-color: #fafbff;
    
}
</style>