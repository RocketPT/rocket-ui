<template>
  <div id="up-torrent">
    <el-card class="container">
      <el-form 
      ref="torrentRef" 
      :model="torrent" 
      :rules="rule"
      label-width="auto" 
      class="ms-content" 
      > 
          <ElFormItem label="种子文件">
            <ElUpload 
            ref="uploadRef"
            action="#"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
            accept=".torrent"
            >
              <el-button type="primary" class="ml-3">选择文件</el-button>
            </ElUpload>
          </ElFormItem>
          <el-form-item label="简称">
            <el-input 
            v-model="torrent.name"
            clearable
            />
          </el-form-item>
          <el-form-item label="标题" >
            <el-input 
            v-model="torrent.title" 
            placeholder="种子标题"
            />

            <!-- TODO: 点击 规范 ，另开窗口跳转到规则页面 -->
            <el-text>(若不填将使用种子文件名。<b>要求<a href="/rule" target="_blank">规范</a>填写</b>，如：<i>Max Steel 2016 1080p BluRay x264 DTS-HD MA 5.1 2Audio-CHD</i>  不允许出现中文)</el-text>
          </el-form-item>
          <el-form-item label="副标题" prop="time">
            <el-input v-model="torrent.subheading" placeholder="种子副标题" />
            <el-text>(副标题必须包含影片中文译名，其它信息自行把握。  如：<i>血战钢锯岭/钢锯岭/钢铁英雄(台) [简体字幕][第89届奥斯卡金像奖六项提名]</i> )</el-text>
          </el-form-item>
          <el-form-item label="封面" prop="time">
            <el-input v-model="torrent.cover" placeholder="封面" />
            <el-text>(若不填将尝试获从豆瓣获取)</el-text>
          </el-form-item>
          <el-form-item label="描述" prop="time">
            <el-input v-model="torrent.description" :rows="5" type="textarea" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="类别" prop="time">
            <el-select v-model="torrent.category" placeholder="请选择" clearable filterable>
              <el-option v-for="(item) in category.arr"
                :label="item"
                :value="item">
              </el-option>
            </el-select>

            <!-- <el-input v-model="torrent.category" placeholder="类别" /> -->
          </el-form-item>
          <el-form-item label="状态" prop="time">
           <el-checkbox-group v-model="torrent.status">
               <el-checkbox label='候选中' value="0" disabled />
               <el-checkbox label="已上传" value="1" disabled />
               <el-checkbox label="已下架"  value="2" disabled />
           </el-checkbox-group>
          </el-form-item>
          <el-form-item label="是否匿名" prop="time" >
            <el-input v-model="torrent.anonymous" placeholder="是否匿名" />
          </el-form-item>
          <el-form-item label="备注" prop="time">
            <el-input v-model="torrent.remark" placeholder="备注" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="default" @click="submitUpload"></el-button>
            
          </el-form-item>
      </el-form>
    </el-card>
  
  </div>
</template>

<script setup lang="ts" name="torrent">
import {reactive, ref} from 'vue';
import {ElFormItem, ElMessage, ElMessageBox, ElUpload, inputEmits,UploadInstance,UploadRawFile,UploadProps,genFileId} from 'element-plus';
import type { FormInstance, FormRules } from "element-plus";
import { addTorrent } from '../api/torrent';
import { useBasicStore } from "../store/basic";
import { BASE_URI } from "../api/base";

let basicStore = useBasicStore();

interface torrentAddParam {
  name: string,
  title: string
  subheading: string
  cover: string
  description: string,
  category: number
  status: [],
  anonymous: string,
  remark: string,
}

const torrent = reactive<torrentAddParam>({
  name: '',
  title: '',
  subheading: '',
  cover: '',
  description: '',
  category: 0,
  status: ['0'],
  anonymous: '',
  remark: '',
});

const uploadRef = ref<UploadInstance>()
const  torrentRef= ref<FormInstance>();


const rules = reactive<FormRules<torrent>>({
  name: [ { required: true, message: 'Please input Activity name', trigger: 'blur' },]
})

const handleExceed: UploadProps['onExceed'] = (files) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}

const submitUpload = ()=> {
  addTorrent(torrent)
}

const category = reactive({
  arr: []
});

category.arr = [0,1,2,3,4];

</script>

<style scoped>

#up-torrent {
  height: 450px;
  overflow-y: auto;
}
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #F56C6C;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
