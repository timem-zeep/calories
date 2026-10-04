* 目录结构 *

.
├── app-side // 伴生服务目录
│   └── index.js // 伴生服务逻辑，作为入口文件（路径可以在 app.json 中配置）
├── setting // 设置应用目录
│   ├── i18n // 设置应用多语言目录
│   │   └── en-US.po
│   └── index.js // 设置应用逻辑，作为入口文件（路径可以在 app.json 中配置）
├── app-widget // 快捷卡片目录
│   └── index.js // 快捷卡片逻辑，作为入口文件（路径可以在 app.json 中配置）
├── secondary-widget // 副屏应用目录
│   └── index.js // 副屏应用逻辑，作为入口文件（路径可以在 app.json 中配置）
├── app.js // 小程序逻辑
├── app.json // 小程序配置
├── assets // 资源文件存放目录，以不同屏幕类型进行区分，子目录以 app.json 中 targets 对象的键来命名
│   ├── gt.r
│   │   ├── icon.png
│   │   ├── fonts
│   │   │   └── custom.ttf
│   │   └── image
│   │       └── logo.png
│   └── gt.s
│       ├── icon.png
│       ├── fonts
│       │   └── custom.ttf
│       └── image
│           └── logo.png
├── page // 设备应用页面
│   ├── home // 设备应用 home 目录（推荐一个页面一个目录）
│   │   ├── index.page.js // 页面逻辑
│   │   └── index.layout.js // 页面样式
│   └── i18n // 设备应用多语言目录
│       └── en-US.po
└── utils // 工具函数目录
    ├── constants.js
    ├── fs.js
    └── index.js