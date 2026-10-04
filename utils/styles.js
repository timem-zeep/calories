// 从 i18n 模块导入 gettext 函数，用于根据手表系统语言返回多语言文本
import { gettext } from "i18n";

// 获取当前设备的屏幕宽度和高度
// hmSetting.getDeviceInfo() 会返回设备的真实分辨率，例如 GTR 3 Pro 为 480x480，GTR 3 为 454x454
// 通过解构赋值，把 width 和 height 分别导出为 DEVICE_WIDTH 和 DEVICE_HEIGHT
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } =
  hmSetting.getDeviceInfo();

// ==================== 页面标题区域 ====================

// 页面顶部标题的样式配置
// 通常用于 hmUI.createWidget(hmUI.widget.TEXT, COMMON_TITLE_TEXT)
export const COMMON_TITLE_TEXT = {
  text: gettext("calories"),         // 标题文本，通过 i18n 多语言翻译，例如显示 "卡路里"
  x: px(96),                         // 标题左上角横坐标
  y: px(40),                         // 标题左上角纵坐标
  w: px(288),                        // 标题区域宽度
  h: px(46),                         // 标题区域高度
  color: 0xffffff,                   // 标题文本颜色，白色
  text_size: px(36),                 // 标题文本大小
  align_h: hmUI.align.CENTER_H,      // 水平居中对齐
  align_v: hmUI.align.CENTER_V,      // 垂直居中对齐
  text_style: hmUI.text_style.WRAP,  // 文字超出宽度时自动换行
};

// ==================== 对齐描述区域 ====================

// 描述区域的外层容器配置
// x 和 w 设为 0，表示这个容器本身不绘制内容，只作为子控件的定位参考
export const ALIGN_DESC_GROUP = {
  x: 0,
  y: px(118),
  w: 0,
  h: px(100),
};

// 卡路里图标与容器之间的间距，当前为 0
export const IMGAE_CALORIES_MARIN = px(0);
// 卡路里单位文本与主数字之间的间距
export const CALORIES_UNIT_MARIN = px(8);

// ==================== 卡路里主数字区域 ====================

// 卡路里数字的字号
export const CALORIE_TEXT_SIZE = px(100);

// 卡路里数字文本控件的样式配置
// 实际显示的数字会通过 setText() 动态更新
export const CALORIE_TEXT = {
  text: "",                       // 初始文本为空，页面加载后根据数据填充
  x: px(0),                       // 横坐标
  y: px(0),                           // 纵坐标
  w: px(0),                           // 宽度为 0，表示自适应内容宽度
  h: px(100),                         // 高度，与字号一致
  color: 0xffffff,                    // 文字颜色：白色
  text_size: CALORIE_TEXT_SIZE,       // 引用上面定义的字号常量
  align_h: hmUI.align.LEFT,           // 水平左对齐
  align_v: hmUI.align.CENTER_V,       // 垂直居中对齐
};

// ==================== 单位文本区域 ====================

// 单位文本（如 "kcal"）的字号
export const UNIT_TEXT_SIZE = px(28);

// 单位文本控件的样式配置
export const UNIT_TEXT = {
  text: gettext("unit"),              // 单位文本，通过 i18n 翻译
  x: px(0),                           // 横坐标
  y: px(63),                          // 纵坐标，位于卡路里数字下方
  w: px(0),                           // 宽度自适应
  h: px(34),                          // 高度
  color: 0x999999,                    // 文字颜色：灰色
  text_size: UNIT_TEXT_SIZE,          // 引用上面定义的字号常量
  align_h: hmUI.align.LEFT,           // 水平左对齐
  align_v: hmUI.align.CENTER_V,       // 垂直居中对齐
};

// ==================== 总消耗提示文本 ====================

// 页面中部的"总消耗"提示文本样式
export const TOTAL_CONSUME_TEXT = {
  text: gettext("consumption"),       // 提示文本，通过 i18n 翻译
  x: px(40),                          // 横坐标
  y: px(218),                         // 纵坐标
  w: px(400),                         // 宽度
  h: px(38),                          // 高度
  color: 0x999999,                    // 文字颜色：灰色
  text_size: px(28),                  // 字号
  align_h: hmUI.align.CENTER_H,       // 水平居中
  align_v: hmUI.align.CENTER_V,       // 垂直居中
};

// ==================== "相当于"按钮区域 ====================

// 底部"相当于 xxx 食物"按钮的样式配置
// 这个按钮点击后通常会跳转到食物列表页
export const EQUIVALENT_TO_BUTTON = {
  text: gettext("equivalent"),        // 按钮文本，通过 i18n 翻译
  press_color: 0x333333,              // 按下时的背景色：深灰
  normal_color: 0x1a1a1a,             // 正常状态的背景色：近黑色
  x: px(108),                         // 按钮左上角横坐标
  y: px(376),                         // 按钮左上角纵坐标
  w: px(264),                         // 按钮宽度
  h: px(56),                          // 按钮高度
  color: 0xffffff,                    // 按钮文字颜色：白色
  text_size: px(32),                  // 按钮文字字号
  radius: px(28),                     // 圆角半径，h/2 表示全圆角胶囊形状
};

// ==================== 消耗图标区域 ====================

// 消耗图标的宽度
export const CONSUME_ICON_WIDTH = px(48);

// 消耗图标（火焰图标）的样式配置
export const CONSUME_ICON = {
  src: "consume.png",                 // 图标资源路径
  x: px(0),                           // 横坐标
  y: px(53),                          // 纵坐标
};

// ==================== "相当于"食物展示区域 ====================

// 按钮与食物图标之间的间距
export const EQUIVALENT_MARGIN = 8;
// "更多"箭头的横坐标偏移量
export const EQUIVALENT_MORE_X = 155;
// 食物图标的宽度
export const EQUIVALENT_TO_FOOD_ICON_WIDTH = 80;
// 食物图标（如汉堡）的样式配置
export const EQUIVALENT_TO_FOOD_ICON = {
  src: "food/hamburger.png",          // 图标资源路径，位于 food 子目录
  x: px(0),                           // 横坐标
  y: px(288),                         // 纵坐标
};

// "更多"箭头图标的样式配置
// 点击后可能展开更多食物选项或跳转到列表页
export const EQUIVALENT_MORE_FOOD_ICON = {
  src: "multiply.png",                // 图标资源路径（可能是箭头或加号）
  x: px(243),                         // 横坐标
  y: px(304),                         // 纵坐标
};

// "更多"食物数量的文本样式
// 例如显示 "×3" 表示相当于 3 个汉堡
export const EQUIVALENT_MORE_FOOD_NUM = {
  text: "",                           // 初始文本为空，运行时动态设置
  x: px(299),                         // 横坐标
  y: px(294),                         // 纵坐标
  w: px(100),                         // 宽度
  h: px(60),                          // 高度
  color: 0xee801e,                    // 文字颜色：橙色，用于强调
  text_size: px(55),                  // 字号较大，突出显示
  align_h: hmUI.align.LEFT,           // 水平左对齐
  align_v: hmUI.align.CENTER_V,       // 垂直居中对齐
};

// ==================== 食物列表页区域 ====================

// 食物列表区域的起始纵坐标
export const FOOD_LIST_Y = 178;

// 列表项之间的间距
export const FOOD_LIST_ITEM_MARGIN = 64;

// 单个列表项的高度
export const FOOD_LIST_ITEM_HEIGHT = 64;

// 食物列表单选组的样式配置
// 用于 hmUI.createWidget(hmUI.widget.RADIO_GROUP, ...)
export const FOOD_LIST_RADIOGROUP = {
  select_src: "selected.png",         // 选中状态的图标
  unselect_src: "unselected.png",     // 未选中状态的图标
  x: px(44),                          // 单选组起始横坐标
  y: px(FOOD_LIST_Y),                 // 单选组起始纵坐标，引用上面的常量
  w: -1,                              // 宽度 -1 表示自适应
  h: -1,                              // 高度 -1 表示自适应
};

// 单选组中每个选项的容器样式
export const FOOD_LIST_RADIO_ITEM = {
  x: px(0),                           // 相对于单选组的横坐标偏移
  y: px(0),                           // 相对于单选组的纵坐标偏移
  w: px(FOOD_LIST_ITEM_HEIGHT),       // 选项宽度，与列表项高度一致
  h: px(FOOD_LIST_ITEM_HEIGHT),       // 选项高度
};

// 单选组中每个选项的文字样式
export const FOOD_LIST_RADIO_ITEM_TEXT = {
  x: px(120),                         // 文字相对于选项容器的横坐标偏移
  y: px(0),                           // 文字相对于选项容器的纵坐标偏移
  w: px(360),                         // 文字区域宽度
  h: px(64),                          // 文字区域高度
  color: 0xffffff,                    // 文字颜色：白色
  text_size: px(32),                  // 字号
  align_h: hmUI.align.LEFT,           // 水平左对齐
  align_v: hmUI.align.CENTER_V,       // 垂直居中对齐
};
