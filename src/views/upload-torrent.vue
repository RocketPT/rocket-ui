<template>
  <div id="up-torrent">
    <el-card class="container">
      <el-form 
      :model="torrent" 
      :rules="rules"
      ref="torrentRef" 
      label-width="auto" 
      class="ms-content" 
      > 
          <ElFormItem label="种子文件">
            <ElUpload 
            ref="uploadRef"
            :action="actionUrl"
            :data="uploadFileParam"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
            :on-success="uploadSuccess"
            :on-error="uploadErr"
            accept=".torrent"
            >
              <el-button type="primary" class="ml-3">选择文件</el-button>
            </ElUpload>
          </ElFormItem>
          <el-form-item label="简称" prop="name">
            <el-input 
            v-model="torrent.name"
            clearable
            />
          </el-form-item>
          <el-form-item label="标题" prop="title">
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
          <el-form-item label="封面" prop="cover">
            <el-input v-model="torrent.cover" placeholder="封面" />
            <el-text>(若不填将尝试获从豆瓣获取)</el-text>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="torrent.description" :rows="5" type="textarea" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="类别" prop="category">
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
            <el-button type="primary" size="default" @click="submitUpload">上传</el-button>
            
          </el-form-item>
      </el-form>
    </el-card>
  
  </div>
</template>

<script setup lang="ts" name="torrent">
import {reactive, ref} from 'vue';
import {ElFormItem, ElMessage, ElMessageBox, ElUpload, inputEmits,UploadInstance,UploadRawFile,UploadProps,genFileId} from 'element-plus';
import type { FormInstance, FormRules } from "element-plus";
import { addTorrent,upTorrentFileUri,AddTorrentParam } from '../api/torrent';
import { useBasicStore } from "../store/basic";
import { BASE_URI } from "../api/base";

let basicStore = useBasicStore();
let actionUrl = upTorrentFileUri


//接收表单参数
interface torrentAddParam {
  name: string,
  title: string
  subheading: string
  cover: string
  description: string,
  category: number
  status: string[],
  anonymous: number,
  remark: string,
}
const uploadFileParam = {
  id: 0
}
const uploadSuccess =()=>{
  ElMessage.success('上传成功！！！')
}
const uploadErr = (err, file, fileList)=>{
  ElMessage.error(JSON.parse(err.message).message)
}
const torrent = reactive<AddTorrentParam>({
  name: '',
  title: '',
  subheading: '',
  cover: '',
  description: '',
  category: 0,
  status: ['1','2'],
  anonymous: 2,
  remark: '',
});

const uploadRef = ref<UploadInstance>()
const  torrentRef= ref<FormInstance>();


const rules: FormRules = {
  name: [
    {
      required: true,
      message: "请输入种子简称",
      trigger: "blur",
    },
  ],
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  description: [{required: true, message: "请输入种子描述", trigger: "blur"}]
};

const handleExceed: UploadProps['onExceed'] = (files) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}

const submitUpload = ()=> {
  addTorrent(torrent)
  .then((res)=>{
      uploadFileParam.id = res.data
      uploadRef.value!.submit()
      ElMessage.success("种子添加成功！")
  })
  .catch((reason)=>{
    ElMessage.error('上传失败'+reason)
  })
};

const category = reactive({
  arr: [0]
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
