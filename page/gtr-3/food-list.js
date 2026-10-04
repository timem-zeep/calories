// 从样式常量文件导入 UI 配置
import {
  COMMON_TITLE_TEXT,          // 页面标题文本样式
  FOOD_LIST_Y,                // 列表区域的起始 y 坐标
  FOOD_LIST_ITEM_MARGIN,      // 列表项之间的垂直间距
  FOOD_LIST_ITEM_HEIGHT,      // 单个列表项的高度
  FOOD_LIST_RADIOGROUP,       // 单选组容器样式
  FOOD_LIST_RADIO_ITEM,       // 单选按钮样式
  FOOD_LIST_RADIO_ITEM_TEXT,  // 单选按钮文字样式
  DEVICE_WIDTH,               // 设备屏幕宽度
} from "../../utils/styles";

// 从常量文件导入食物热量数据表
// 包含汉堡、巧克力、蛋糕等食物的名称、类型和每份热量值
import { FOOD_CALORIES } from "../../utils/constants";

// 创建日志记录器，标签为 "calories"
// 调试时可用 logger.log() 输出信息
const logger = DeviceRuntimeCore.HmLogger.getLogger("calories");

// 获取全局数据对象
// 用于读取和保存用户选择的食物类型
const globalData = getApp()._options.globalData;

// 定义页面
Page({
  // 页面状态对象，存储运行时数据
  state: {
    activeIndex: -1,          // 当前选中项的索引，-1 表示尚未确定
    isFinishInit: false,      // 单选组是否已完成初始化
    radioGroup: null,         // 单选组控件实例
    radioButtonsArray: [],    // 所有单选按钮控件的数组，用于后续设置选中状态
  },

  /**
   * 页面初始化钩子
   * Zepp OS 在页面创建时调用，早于 build()
   */
  onInit() {
    logger.log("onInit");
  },

  /**
   * 用户选中某项食物后的处理
   * 1. 保存选中索引
   * 2. 将食物类型写入全局数据
   * 3. 返回上一页（卡路里主页）
   * @param {number} index - 选中项在 FOOD_CALORIES 中的索引
   */
  setPrograms(index) {
    this.state.activeIndex = index;
    // 将选中食物的 type（如 "hamburger"）存入全局数据
    // 卡路里主页的 build() 会读取 globalData.foodType 来显示对应食物
    globalData.foodType = FOOD_CALORIES[index].type;
    // 返回上一页，触发卡路里主页的数据刷新
    hmApp.goBack();
  },

  /**
   * 构建页面标题
   * 在页面顶部显示标题文本（如 "选择食物"）
   */
  buildTitle() {
    hmUI.createWidget(hmUI.widget.TEXT, COMMON_TITLE_TEXT);
  },

  /**
   * 构建食物列表
   * 使用 RADIO_GROUP + STATE_BUTTON 实现单选列表
   * 遍历 FOOD_CALORIES，为每种食物创建一个单选按钮和对应的文本标签
   */
  buildFoodList() {
    // 默认选中索引，初始为 0
    let activeIndex = 0;

    // 创建单选组控件
    // 所有 STATE_BUTTON 必须添加到同一个 RADIO_GROUP 中才能实现互斥选中
    const radioGroup = hmUI.createWidget(hmUI.widget.RADIO_GROUP, {
      ...FOOD_LIST_RADIOGROUP,  // 展开单选组样式配置
      check_func: (group, index, checked) => {
        // 当某项被选中时触发
        // checked 为 true 表示该项被选中
        if (checked) {
          // 只有初始化完成后才执行跳转，避免初始化时误触发
          this.state.isFinishInit && this.setPrograms(index);
        }
      },
    });

    // 保存单选组实例到 state
    this.state.radioGroup = radioGroup;

    // 遍历所有食物数据，逐个创建列表项
    for (let index = 0; index < FOOD_CALORIES.length; index++) {
      // 创建单选按钮（圆形选中框）
      this.buildRadioButton(index);
      // 创建食物名称文本
      this.buildRadioText(index);
      // 判断当前食物是否是用户之前选中的
      // 如果是，记录其索引，用于后续高亮显示
      activeIndex =
        FOOD_CALORIES[index].type === globalData.foodType ? index : activeIndex;
    }

    // 保存最终选中的索引
    this.state.activeIndex = activeIndex;

    // 初始化单选组：设置默认选中项
    this.initRadioGroup();
  },

  /**
   * 构建页面所有元素
   * 1. 创建一个全屏透明填充矩形，用于撑开滚动区域的高度
   * 2. 构建标题
   * 3. 构建食物列表
   */
  buildElement() {
    // 创建填充矩形，作为可滚动区域的背景/占位
    // 高度 = 标题区域 + (食物数量 + 1) × (项高 + 间距)
    // "+1" 是为了留出底部额外空间，确保最后一项可完整显示
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: DEVICE_WIDTH,
      h: px(
        FOOD_LIST_Y +
          (FOOD_CALORIES.length + 1) *
            (FOOD_LIST_ITEM_HEIGHT + FOOD_LIST_ITEM_MARGIN)
      ),
    });
    // 构建标题
    this.buildTitle();
    // 构建食物列表
    this.buildFoodList();
  },

  /**
   * 构建单个单选按钮（圆形选中框）
   * 将按钮添加到单选组中，实现互斥选中
   * @param {number} index - 列表项索引
   */
  buildRadioButton(index) {
    // 在单选组内创建 STATE_BUTTON 控件
    // STATE_BUTTON 有两种状态：未选中 / 选中
    const radio = this.state.radioGroup.createWidget(hmUI.widget.STATE_BUTTON, {
      ...FOOD_LIST_RADIO_ITEM.styles,  // 展开单选按钮样式
      // 根据索引计算垂直位置，每项之间留有间距
      y: px(index * (FOOD_LIST_ITEM_HEIGHT + FOOD_LIST_ITEM_MARGIN)),
    });

    // 将按钮实例保存到数组中
    // 后续 initRadioGroup() 需要通过索引设置选中状态
    this.state.radioButtonsArray.push(radio);
  },

  /**
   * 构建单个食物名称文本
   * 文本位于单选按钮右侧，点击文本也会触发对应单选按钮选中
   * @param {number} index - 列表项索引
   */
  buildRadioText(index) {
    // 创建文本控件，显示食物名称
    const text = hmUI.createWidget(hmUI.widget.TEXT, {
      ...FOOD_LIST_RADIO_ITEM_TEXT,  // 展开文本样式
      // 文本的 y 坐标与对应单选按钮对齐
      y: px(
        FOOD_LIST_Y + index * (FOOD_LIST_ITEM_HEIGHT + FOOD_LIST_ITEM_MARGIN)
      ),
      // 格式化食物名称：首字母大写 + 剩余部分
      // 例如 "hamburger" → "Hamburger"，"iceCream" → "IceCream"
      text: `${FOOD_CALORIES[index].name[0].toUpperCase()}${FOOD_CALORIES[
        index
      ].name.slice(1)}`,
    });

    // 为文本添加点击事件监听
    // 点击文字时，手动将对应的单选按钮设为选中状态
    text.addEventListener(hmUI.event.SELECT, () => {
      this.state.radioGroup.setProperty(
        hmUI.prop.CHECKED,
        this.state.radioButtonsArray[index] // 设置该索引的按钮为选中
      );
    });
  },

  /**
   * 初始化单选组
   * 1. 设置单选组的初始选中项（默认为第 0 项）
   * 2. 根据之前保存的 activeIndex，高亮用户上次选择的食物
   * 3. 标记初始化完成，允许 check_func 中的跳转逻辑生效
   */
  initRadioGroup() {
    // 设置单选组的初始焦点/默认项为第 0 个按钮
    this.state.radioGroup.setProperty(
      hmUI.prop.INIT,
      this.state.radioButtonsArray[0]
    );
    // 根据 activeIndex 设置实际选中项
    // 如果用户之前在卡路里页选过食物，这里会高亮对应项
    this.state.radioGroup.setProperty(
      hmUI.prop.CHECKED,
      this.state.radioButtonsArray[this.state.activeIndex]
    );
    // 标记初始化完成
    // 此后用户手动点击选项时，check_func 才会执行 setPrograms() 跳转
    this.state.isFinishInit = true;
  },

  /**
   * 页面构建入口函数
   * Zepp OS 会在页面加载时自动调用此方法
   */
  build() {
    this.buildElement();
  },

  // 页面生命周期钩子

  /**
   * 页面首次渲染完成时触发
   */
  onReady() {},

  /**
   * 页面每次显示时触发
   * 可在此刷新列表状态
   */
  onShow() {},

  /**
   * 页面隐藏时触发
   */
  onHide() {},

  /**
   * 页面销毁时触发
   * 可在此清理资源
   */
  onDestroy() {},
});
