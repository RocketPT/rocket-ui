<template>
  <div id="up-torrent">
    <el-card class="container">
      <el-form ref="torrent" :model="torrent" label-width="auto" class="ms-content"> 
          <ElFormItem label="种子文件">
            <ElUpload 
            ref="uploadRef"
            action=""
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
            >
              <el-button type="primary" class="ml-3">选择文件</el-button>
            </ElUpload>
          </ElFormItem>
          <el-form-item label="简称" prop="name">
            <el-input v-model="torrent.name" placeholder="种子名字" />
          </el-form-item>
          <el-form-item label="标题" prop="zone">
            <el-input v-model="torrent.title" placeholder="种子标题" />
          </el-form-item>
          <el-form-item label="副标题" prop="time">
            <el-input v-model="torrent.subheading" placeholder="种子副标题" />
          </el-form-item>
          <el-form-item label="封面" prop="time">
            <el-input v-model="torrent.cover" placeholder="封面" />
          </el-form-item>
          <el-form-item label="描述" prop="time">
            <el-input v-model="torrent.description" :rows="5" type="textarea" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="类别" prop="time">
            <el-input v-model="torrent.category" placeholder="封面" />
          </el-form-item>
          <el-form-item label="状态" prop="time">
           <el-checkbox-group v-model="torrent.status">
               <el-checkbox label="候选中" disabled />
               <el-checkbox label="已上传" disabled />
               <el-checkbox label="已下架"  disabled />
           </el-checkbox-group>
          </el-form-item>
          <el-form-item label="是否匿名" prop="time" >
            <el-input v-model="torrent.anonymous" placeholder="封面" />
          </el-form-item>
          <el-form-item label="备注" prop="time">
            <el-input v-model="torrent.remark" placeholder="封面" />
          </el-form-item>
      </el-form>
    </el-card>
  
  </div>
</template>

<script setup lang="ts" name="torrent">
import {reactive, ref} from 'vue';
import {ElFormItem, ElMessage, ElMessageBox, ElUpload, inputEmits,UploadInstance,UploadRawFile,UploadProps,genFileId} from 'element-plus';


interface torrentAddParam {
  name: string,
  title: string
  subheading: string
  cover: string
  description: string,
  category: number
  status: 0 | 1 | 2,
  anonymous: string,
  remark: string,
}

const uploadRef = ref<UploadInstance>()

const torrent = reactive<torrentAddParam>({
  name: '',
  title: '',
  subheading: '',
  cover: '',
  description: '',
  category: 0,
  status: 0,
  anonymous: '',
  remark: '',
});
const handleExceed: UploadProps['onExceed'] = (files) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}


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
