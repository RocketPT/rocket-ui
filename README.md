<div align="center">
  <img alt="Logo" width="120" height="120" src="./public/logo.png">
  <h1>Rocket PT</h1>
  <h2>交流群:168814655</h2>
  <h3><span>前端 | <a href="https://github.com/PlexPt/rocket-pt">后端</a></span></h3>
</div>


基于 Vue3 的私有 BitTorrent 站点系统，可以提供高质量的简单易用的界面。

项目采用了前后端分离的架构，使用了现代化的技术和工具，如 Vue.js 和 axios 作为前端框架，与后端 Java 代码进行交互。这样，我们可以更好地利用前端框架的优势，提高用户体验和交互性，提高项目的稳定性和可扩展性。

这个项目非常适合那些寻求高质量种子资源和良好用户体验的用户。它提供了简单易用的界面，让用户可以轻松地搜索和下载种子。同时，这个项目还提供了丰富的社区功能，如论坛和评论，让用户可以与其他用户交互并贡献。

总之，Rocket PT 项目是一个卓越的选择，无论是在性能、用户体验还是社区互动方面都具有出色表现。

<a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-3.1.2-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vuejs/pinia">
    <img src="https://img.shields.io/badge/pinia-2.0.14-brightgreen.svg" alt="pinia">
  </a>
  <a href="https://github.com/plexpt/rocketpt-ui/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://github.com/plexpt/rocketpt-ui/releases">
    <img src="https://img.shields.io/github/release/plexpt/rocketpt-ui.svg" alt="GitHub release">
  </a>


基于 Vue3 + pinia + Element Plus 的PT系统前端解决方案。

[体验站点](https://pt.plexpt.com)

[English document](./README_EN.md)

## 赞助列表

| name | amount |
| :--: | :----: |
|  vv  |   2    |

## 支持作者

~~您好，我们非常感激您对此项目的关注和支持。 如果您觉得我们的项目对您有所帮助，请考虑捐赠支持我们。您的捐赠将帮助我们不断完善项目内容，为您提供更好的服务，并吸引更多的读者和使用者。谢谢您的支持！赞助者将会展示在本页面。~~

目前不接受捐赠

## 前言

基于 Vue3 + pinia + typescript，引用 Element Plus 组件库，方便开发。

## 功能

-   [x] Element Plus
-   [x] vite 3
-   [x] pinia
-   [x] typescript
-   [x] 登录/注销
-   [x] Dashboard
-   [x] 表格
-   [x] Tab 选项卡
-   [x] 表单
-   [x] 图表 :bar_chart:
-   [x] 富文本/markdown编辑器
-   [x] 图片拖拽/裁剪上传
-   [x] 权限管理
-   [x] 三级菜单
-   [x] 自定义图标


## 开发
> 因为使用vite3，node版本需要 14.18+

```shell
git clone https://github.com/plexpt/rocketpt-ui.git      
cd rocketpt-ui    # 进入目录
npm i         # 安装项目依赖，等待安装完成之后，安装失败可用 nrm 或 yarn

# 运行
npm run dev

# 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build
```

## 组件使用说明与演示

### 主题组件库

https://element-plus.org/zh-CN/

### 图标库

https://www.xicons.org/#/

## 项目截图

### 登录

## 伪静态规则

```nginx
location / {
try_files $uri $uri/ @router;
index  index.html;
}

location @router{
rewrite ^.*$ /index.html last;
}
```

### 首页

## License

[MIT](https://github.com/plexpt/rocketpt-ui/blob/master/LICENSE)
