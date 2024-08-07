<template>
    <p class="icon-default-style" v-for="item in props.typeList" :style="{ color: style(item)[0],backgroundColor: style(item)[1]  }">{{ text(item) }}</p>
</template>

<script setup lang="ts">
const props = defineProps({
    typeList: Array as () => number[]
})

// 内容
const text = (textLet:number) => {
    switch(textLet){
        case 0:
        return 'free';
        case 1: 
        return 'H&R';
        case 2:
        return '热门'
    }
}

// 样式
const style = (textLet:number) => {
    switch(textLet){
        case 0:
        return ['#d8f9ff','#3b7ce2'];
        case 1: 
        return ['#ffffff','#14162c'];
        case 2:
        return ['#fffbf0','#d46250']
    }
}
</script>

<style scoped>
.icon-default-style {
    background-color: #3b7ce2;
    color: #d8f9ff;
    height: 20px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin: 0px 3px;
}
</style>