# 移动端web框架

## 前言

  本项目使用框架及文档地址:
  
  [vue](https://cn.vuejs.org/)

  [vuex](https://vuex.vuejs.org/zh-cn/)
  
  [mint-ui](http://mint-ui.github.io/#!/zh-cn/)

## 开发
```bash
    # 克隆项目
    git clone git@192.168.1.233:chenxy/mobile-app-frame.git

    # 安装依赖
    npm install
    
    # 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
    npm install --registry=https://registry.npm.taobao.org

    # 本地开发 开启服务
    npm run dev
```
浏览器访问 http://localhost:8888

## 发布
```bash
    # 发布
    npm run build
```

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── assets                 // 主题 字体 静态css js等
│   ├── components             // 全局公用组件
│   ├── router                 // 路由
│   ├── views                  // 业务页面
│   ├── service                // 全局事件管理
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

## 状态管理
```bash
  只有user和app配置相关状态使用vuex存在全局，其它数据都由每个业务页面自己管理。
```

