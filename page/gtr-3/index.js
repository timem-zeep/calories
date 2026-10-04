// 从 i18n 模块导入多语言翻译函数
import { gettext } from "i18n";

// 从样式常量文件导入所有 UI 配置
// 这些常量定义了控件的位置、尺寸、颜色、对齐方式等
import {
  COMMON_TITLE_TEXT,        // 页面标题样式
  CALORIE_TEXT,             // 卡路里数字文本样式
  CALORIE_TEXT_SIZE,        // 卡路里数字字号
  UNIT_TEXT,                // 单位文本（如 "kcal"）样式
  UNIT_TEXT_SIZE,           // 单位文本字号
  TOTAL_CONSUME_TEXT,       // "总消耗"提示文本样式
  CONSUME_ICON,             // 消耗图标（火焰）配置
  CONSUME_ICON_WIDTH,       // 消耗图标宽度
  ALIGN_DESC_GROUP,         // 描述区域容器配置
  IMGAE_CALORIES_MARIN,     // 图标与数字之间的间距
  CALORIES_UNIT_MARIN,      // 数字与单位之间的间距
  EQUIVALENT_TO_BUTTON,     // "相当于"按钮样式
  EQUIVALENT_TO_FOOD_ICON,  // 食物图标样式
  DEVICE_WIDTH,             // 设备屏幕宽度
  EQUIVALENT_MORE_X,        // "更多"模式下食物图标的横坐标
  EQUIVALENT_MARGIN,        // 多个食物图标之间的间距
  EQUIVALENT_TO_FOOD_ICON_WIDTH, // 食物图标宽度
  EQUIVALENT_MORE_FOOD_ICON,     // "更多"箭头图标样式
  EQUIVALENT_MORE_FOOD_NUM,      // "更多"数量文本样式
} from "../../utils/styles";

// 从常量文件导入食物热量数据表
// 包含汉堡、巧克力、蛋糕等食物的名称、类型和每份热量值
import { FOOD_CALORIES } from "../../utils/constants";

// 创建日志记录器，标签为 "calories"
// 调试时可用 logger.log()、logger.error() 输出信息
const logger = DeviceRuntimeCore.HmLogger.getLogger("calories");

// 获取全局数据对象
// 用于读取用户在食物列表页选择的食物类型（如 "hamburger"）
const globalData = getApp()._options.globalData;

// 定义页面
Page({
  /**
   * 构建页面顶部的卡路里展示区域
   * 布局：[火焰图标] [卡路里数字] [单位]
   * 整个区域水平居中显示
   * @param {number} calories - 当前消耗的卡路里数值
   */
  buildTopContent(calories) {
    // 测量卡路里数字文本的实际宽度（像素）
    // 例如 "512" 三个字符在 CALORIE_TEXT_SIZE 字号下的宽度
    const w1 = Math.round(
      DeviceRuntimeCore.HmUtils.measureTextWidth(
        "" + calories,        // 将数字转为字符串
        CALORIE_TEXT_SIZE     // 使用卡路里数字的字号
      )
    );

    // 测量单位文本的实际宽度（如 "kcal"）
    const w2 = Math.round(
      DeviceRuntimeCore.HmUtils.measureTextWidth(
        gettext("unit"),      // 获取翻译后的单位文本
        UNIT_TEXT_SIZE        // 使用单位文本的字号
      )
    );

    // 计算整个顶部内容区域的总宽度
    // 总宽度 = 图标宽 + 图标间距 + 数字宽 + 单位间距 + 单位宽
    const w =
      w1 + w2 + CONSUME_ICON_WIDTH + IMGAE_CALORIES_MARIN + CALORIES_UNIT_MARIN;

    // 计算水平居中的起始 x 坐标
    // (屏幕宽度 - 内容总宽度) / 2
    const x = Math.round((DEVICE_WIDTH - w) / 2);

    // 创建一个 GROUP 容器，用于包裹图标和两个文本控件
76  // 这样整个组可以作为一个整体水平居中
    const group = hmUI.createWidget(hmUI.widget.GROUP, {
      ...ALIGN_DESC_GROUP,
      x,
      w,
    });

    // 在容器内创建卡路里数字文本控件
    group.createWidget(hmUI.widget.TEXT, {
      ...CALORIE_TEXT,        // 展开数字文本的基础样式
      text: `${calories}`,    // 设置实际显示的卡路里数值
      x: CONSUME_ICON_WIDTH + IMGAE_CALORIES_MARIN, // 数字的 x 坐标：在图标右侧
      w: w1,                  // 宽度设为测量出的实际宽度
    });

    // 在容器内创建单位文本控件
    group.createWidget(hmUI.widget.TEXT, {
      ...UNIT_TEXT,           // 展开单位文本的基础样式
      x: w - w2,              // 单位的 x 坐标：紧贴容器右边缘
      w: w2,                  // 宽度设为测量出的实际宽度
    });

    // 在容器内创建消耗图标（火焰图标）
    // 图标位置由 CONSUME_ICON 中的 x、y 决定，相对于容器左上角
    group.createWidget(hmUI.widget.IMG, CONSUME_ICON);
  },

  /**
   * 页面构建入口函数
   * Zepp OS 会在页面加载时自动调用此方法
   */
  build() {
    // 创建卡路里传感器，获取当前消耗的卡路里数值
    // hmSensor.id.CALORIE 是 Zepp OS 内置的卡路里传感器 ID
    // current 属性返回实时累计值（单位：kcal）
    let calories = hmSensor.createSensor(hmSensor.id.CALORIE).current; // Math.floor(Math.random() * 1000)
    // 调试时可取消下面注释，用随机数模拟卡路里
    // Math.floor(Math.random() * 1000)

    // 从全局数据中读取用户当前选择的食物类型
    // 例如 "hamburger"、"chocolate" 等
    let currentFood = globalData.foodType;

    // 创建页面标题文本控件（如 "卡路里"）
    hmUI.createWidget(hmUI.widget.TEXT, COMMON_TITLE_TEXT);
    // 创建"总消耗"提示文本控件
    hmUI.createWidget(hmUI.widget.TEXT, TOTAL_CONSUME_TEXT);

    // 构建顶部卡路里展示区域（图标 + 数字 + 单位）
    this.buildTopContent(calories);

    // 在食物数据表中查找当前选中食物的索引
    // 如果 globalData.foodType 为 "hamburger"，则找到汉堡对应的条目
    let activeIndex = FOOD_CALORIES.findIndex(
      (item) => item.type === currentFood
    );

    // 计算并渲染"相当于多少份食物"
    // 例如消耗 1024 kcal，汉堡每份 512 kcal，则显示 2 个汉堡图标
    this.calculate(calories, FOOD_CALORIES[activeIndex]);

    // 创建"相当于"按钮
    // 点击后跳转到食物列表页，让用户更换食物类型
    hmUI.createWidget(hmUI.widget.BUTTON, {
      ...EQUIVALENT_TO_BUTTON,  // 展开按钮样式配置
      click_func: () => {       // 点击回调函数
        hmApp.gotoPage({
          file: "page/gtr-3/food-list", // 跳转到食物列表页
        });
      },
    });
  },

  /**
   * 计算卡路里相当于多少份食物，并渲染对应图标
   * 逻辑：
   *   - 如果份数 ≤ 3：横向排列对应数量的食物图标
   *   - 如果份数 > 3：显示 1 个食物图标 + "×N" 数量文本 + 箭头图标
   * @param {number} currentCalories - 当前消耗的卡路里
   * @param {object} foodData - 食物数据对象，包含 value（每份热量）和 type（食物类型）
   */
  calculate(currentCalories, foodData) {
    // 解构获取食物的每份热量值和类型标识
    let { value, type } = foodData;

    // 计算份数：总卡路里 ÷ 每份热量，向下取整
    // 例如 1024 ÷ 512 = 2
    let count = Math.floor(currentCalories / value);

    // 如果份数为 1、2 或 3，横向排列对应数量的食物图标
    if (count === 1 || count === 2 || count === 3) {
      // 计算第一个图标的起始 x 坐标，使整组图标水平居中
      // 总占用宽度 = 图标宽 × 数量 + 间距 × (数量 - 1)
      let x =
        (DEVICE_WIDTH -
          EQUIVALENT_TO_FOOD_ICON_WIDTH * count -
          EQUIVALENT_MARGIN * (count - 1)) /
        2;
      // 循环创建每个食物图标
      for (let index = 0; index < count; index++) {
        // 每个图标的 x 坐标 = 起始位置 + (间距 + 图标宽) × 索引
        this.drawFood(
          x + (EQUIVALENT_MARGIN + EQUIVALENT_TO_FOOD_ICON_WIDTH) * index,
          type
        ); // icon
      }
    } else {
      // 如果份数 > 3 或 = 0，采用紧凑模式
      // 只显示 1 个食物图标 + "×N" 数量 + 箭头图标

      // 绘制单个食物图标，位置在 EQUIVALENT_MORE_X
      this.drawFood(EQUIVALENT_MORE_X, type);

      // 创建"更多"箭头图标（如 "×" 或 ">"）
      hmUI.createWidget(hmUI.widget.IMG, EQUIVALENT_MORE_FOOD_ICON);

      // 创建数量文本，显示具体份数（如 "5"）
      hmUI.createWidget(hmUI.widget.TEXT, {
        ...EQUIVALENT_MORE_FOOD_NUM,  // 展开数量文本样式
        text: `${count}`,             // 设置实际份数
      });
    }
  },

  /**
   * 绘制单个食物图标
   * @param {number} x - 图标的横坐标（未经 px() 转换的原始值）
   * @param {string} type - 食物类型标识，如 "hamburger"、"chocolate"
   */
  drawFood(x, type) {
    // 创建图片控件，显示对应的食物图标
    hmUI.createWidget(hmUI.widget.IMG, {
      ...EQUIVALENT_TO_FOOD_ICON,   // 展开图标基础样式（y 坐标、默认 src 等）
      x: px(x),                     // 横坐标，用 px() 进行屏幕适配
      src: `food/${type}.png`,      // 动态设置图标路径，如 "food/hamburger.png"
    });
  },

  // 页面生命周期钩子

  /**
   * 页面首次渲染完成时触发
   * 此时所有控件已创建完毕，可以执行 DOM 操作
   */
  onReady() {},

  /**
   * 页面每次显示时触发（包括首次进入和从后台返回）
   * 可在此刷新数据或重新渲染
   */
  onShow() {},

  /**
   * 页面隐藏时触发（如跳转到其他页面）
   * 可在此暂停定时器或保存状态
   */
  onHide() {},

  /**
   * 页面销毁时触发
   * 可在此清理资源，如注销传感器、清除定时器
   */
  onDestroy() {},
});
