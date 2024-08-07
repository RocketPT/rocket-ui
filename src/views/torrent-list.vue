<template>
    <div class="torrent-list-body">
        <div class="search-box">
            <div style="width: 100%;display: flex;justify-content: center;">
                <img src="../assets/img/img.jpg" style="margin: 30px 0px;">
            </div>
            <div style="width: 100%;display: flex;justify-content: center;">
                <div class="search-look-box">
                    <p class="search-look-p">高级搜索</p>
                    <p style="padding: 0px 10px;font-size: 25px;color: #b8b8b8;margin-left: 85px;">|</p>
                    <input class="search" type="text" placeholder="请输入您想要查找的关键词">
                    <ElButton type="primary"
                        style="width:100px;height: 100%;position: absolute;right: 0px;border-radius: 0px 8px 8px 0px;font-size: 18px;">
                        搜索</ElButton>
                </div>
            </div>
        </div>
        <el-table :data="tableData" style="width: 100%;" :border="false">
            <el-table-column label="类型" width="80" sortable>
                <LikebocaiIcon />
            </el-table-column>
            <el-table-column label="标题" width="640" sortable #default="scope">
                <div style="height: 70px;display: flex;align-items: center;">
                    <div style="height: 50px;">
                        <!-- 上 -->
                        <div style="display: flex;">
                            <h3 style="font-size: 16px;margin-right: 10px;color: #2b2b2b;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 480px;">
                                <el-tooltip effect="light" :content="scope.row.title"
                                    placement="top-start">
                                    {{ scope.row.title }}
                                </el-tooltip>
                            </h3>
                            <LikebocaiIconInfo :typeList="scope.row.typeList" />
                        </div>
                        <!-- 下 -->
                        <div style="display: flex;margin-top: 10px;">
                            <p
                                style="width: 40px;height: 20px;background-color: transparent;color: #6174af;border: 2px solid #6174af;display: flex;justify-content: center;align-items: center;border-radius: 4px;margin-right: 10px;">
                                中字
                            </p>
                            <p style="color: #9b9b9b;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 240px;">
                                <el-tooltip effect="light" :content="scope.row.description"
                                    placement="top-start">
                                    {{ scope.row.description }}
                                </el-tooltip>
                            </p>
                        </div>
                    </div>
                </div>
            </el-table-column>
            <el-table-column prop="state" label="留言" width="80" sortable #default="scope">
                <p style="text-align: center;color: #868686;">{{ scope.row.state }}</p>
            </el-table-column>
            <el-table-column prop="city" label="上传时间" width="105" sortable #default="scope">
                <p style="font-size: 12px;color: #868686;">{{ scope.row.city }}</p>
            </el-table-column>
            <el-table-column prop="address" label="资源大小" width="105" sortable #default="scope">
                <p style="text-align: center;color: #868686;">{{ scope.row.address }}</p>
            </el-table-column>
            <el-table-column prop="zip" label="上传中" width="90" sortable #default="scope">
                <p style="text-align: center;color: #868686;">{{ scope.row.zip }}</p>
            </el-table-column>
            <el-table-column prop="zip1" label="下载中" width="90" sortable #default="scope">
                <p style="text-align: center;color: #868686;">{{ scope.row.zip1 }}</p>
            </el-table-column>
            <el-table-column prop="zip2" label="已完成" width="90" sortable #default="scope">
                <p style="text-align: center;color: #868686;">{{ scope.row.zip2 }}</p>
            </el-table-column>
            <el-table-column prop="nickName" label="发布者" width="120" sortable #default="scope">
                <p style="text-align: center;color: #868686;">{{ scope.row.nickName }}</p>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import { ref } from 'vue';
import LikebocaiIcon from '../components/likebocai/Icon.vue'
import LikebocaiIconInfo from '../components/likebocai/IconInfo.vue'
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        state: '0',
        city: '2月10日12:48',
        address: '4.91GB',
        zip: '180',
        zip1: '30',
        zip2: '60',
        nickName: 'likebocai',
        typeList: [0, 2],
        title: '坎贝尔骨科手术学第12版 中文全8卷',
        description: '坎贝尔骨科手术学第12版 中文全8卷'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: '0',
        city: '2月10日12:48',
        address: '4.91GB',
        zip: '180', zip1: '30', zip2: '61', nickName: 'likebocai', typeList: [0, 1, 2],
        title: '尼尔逊儿科学(原著第19版) 上下全册 中文翻译版 毛萌 桂永浩主译 世界图书出版社公司',
        description: '作者:罗伯特.克里格曼 毛萌 桂永浩主译'
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        state: '0',
        city: '2月10日12:48',
        address: '4.91GB',
        zip: '180',
        zip1: '30',
        zip2: '60',
        nickName: 'likebocai',
        typeList: [0, 2],
        title: '坎贝尔骨科手术学第12版 中文全8卷',
        description: '坎贝尔骨科手术学第12版 中文全8卷'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: '0',
        city: '2月10日12:48',
        address: '4.91GB',
        zip: '180', zip1: '30', zip2: '61', nickName: 'likebocai', typeList: [0, 1, 2],
        title: '尼尔逊儿科学(原著第19版) 上下全册 中文翻译版 毛萌 桂永浩主译 世界图书出版社公司',
        description: '作者:罗伯特.克里格曼 毛萌 桂永浩主译'
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        state: '0',
        city: '2月10日12:48',
        address: '4.91GB',
        zip: '180',
        zip1: '30',
        zip2: '60',
        nickName: 'likebocai',
        typeList: [0, 2],
        title: '坎贝尔骨科手术学第12版 中文全8卷',
        description: '坎贝尔骨科手术学第12版 中文全8卷'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: '0',
        city: '2月10日12:48',
        address: '4.91GB',
        zip: '180', zip1: '30', zip2: '61', nickName: 'likebocai', typeList: [0, 1, 2],
        title: '尼尔逊儿科学(原著第19版) 上下全册 中文翻译版 毛萌 桂永浩主译 世界图书出版社公司',
        description: '作者:罗伯特.克里格曼 毛萌 桂永浩主译'
    },
]
</script>

<style scoped>
.torrent-list-body {
    height: 100%;
    width: 100%;
    background-color: #fafbff;

    .search-box {
        height: 300px;

        .search-look-box {
            width: 800px;
            height: 50px;
            display: flex;
            align-items: center;
            border: 1px solid #d7d7d7;
            border-radius: 8px;
            position: relative;

            .search-look-p {
                height: 100%;
                width: 80px;
                color: #627ac7;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                left: 0px;
                margin-left: 15px;
            }

            .search {
                border: 0px;
                background-color: transparent;
                outline: none;
                font-size: 18px;
                width: 550px;
            }

            .search::placeholder {
                color: #bcbcbc;
            }
        }
    }

}
</style>