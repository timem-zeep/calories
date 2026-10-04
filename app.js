// 导入之前编写的 LocalStorage 本地存储工具类
// 该类封装了 hmFS 的文件读写操作，用于把数据持久化到手表文件系统
import LocalStorage from "./utils/storage";

// 创建一个日志记录器，标签为 "calories-app"
// 日志会输出到 Zepp App 的开发者控制台，方便真机调试时查看运行状态
const logger = DeviceRuntimeCore.HmLogger.getLogger("calories-app");

// 定义持久化数据的文件名
// 这个文件会存储在手表的文件系统中，用于保存用户的卡路里相关数据
const fileName = "calorie_data.txt";

// 注册小程序，App() 是 Zepp OS 1.0 的应用构造函数
// 每个小程序必须调用一次 App()，传入包含生命周期方法和全局数据的对象
App({
  // 全局数据对象，所有页面都可以通过 getApp().globalData 访问
  globalData: {
    // 当前选中的食物类型，默认值为 "chocolate"（巧克力）
    // 页面可以根据这个值显示对应的卡路里信息
    foodType: "chocolate",
	// LocalStorage 实例，初始为 null
    // 在 onCreate 中初始化后，所有页面都可以通过 getApp().globalData.localStorage 读写文件
    localStorage: null,
  },
  
  // 应用创建生命周期，小程序启动时触发，全局只执行一次
  // 适合在这里做全局初始化，比如创建存储实例、加载持久化数据
  onCreate() {
    try {
	  // 创建 LocalStorage 实例，指定存储文件为 "calorie_data.txt"
      this.globalData.localStorage = new LocalStorage(fileName);
	  // 从文件中读取之前保存的数据
      // 使用解构赋值取出 foodType 字段，如果文件中没有该字段则回退到默认值 "chocolate"
      const { foodType = "chocolate" } = this.globalData.localStorage.get();
	  // 将读取到的 foodType 更新到全局数据中
      // 这样后续打开的页面就能拿到用户上次选择的食物类型
      this.globalData.foodType = foodType;
    } catch (e) {
	  // 如果读取或解析文件失败（比如文件损坏、格式错误），捕获异常并打印日志
      // 不会导致小程序崩溃，foodType 会保持默认值 "chocolate"
      logger.log("--->e:", e);
    }
  },

  // 应用销毁生命周期，小程序完全退出时触发
  // 适合在这里做全局清理和数据持久化
  onDestroy() {
    // 将当前全局的 foodType 写回文件，实现数据持久化
    // 这样用户下次打开小程序时，能恢复上次选择的食物类型
    // 注意：getApp()._options.globalData 是 Zepp OS 1.0 中获取最新 globalData 的一种方式
    // 等价于 this.globalData，但某些场景下 _options.globalData 更可靠
    this.globalData.localStorage.set({
      foodType: getApp()._options.globalData.foodType,
    });
  },
});
