// 从 i18n 模块导入 gettext 函数，用于多语言翻译
// 手表会根据系统语言自动返回对应的食物名称
import { gettext } from "i18n";

// 食物热量数组，每个元素代表一种食物
// value 的单位是 kcal（千卡），通常指"每份"或"每个"的热量
// 这个数组会用在食物列表页，让用户选择"消耗的热量相当于多少份该食物"
export const FOOD_CALORIES = [
  {
    name: gettext("hamburger"),   // 食物显示名称，通过 i18n 翻译，例如中文显示"汉堡"
    type: "hamburger",            // 食物类型标识，通常用于匹配图标路径，如 "food/hamburger.png"
    value: 512,                   // 每份热量值（kcal），一个汉堡约 512 千卡
  },
  {
    name: gettext("chocolate"),   // 巧克力
    type: "chocolate",            // 类型标识，对应图标 "food/chocolate.png"
    value: 71,                    // 每份热量，一块巧克力约 71 千卡
  },
  {
    name: gettext("cookie"),      // 曲奇饼干
    type: "cookies",              // 注意这里 type 是复数 "cookies"，图标文件名需与此一致
    value: 44,                    // 每块曲奇约 44 千卡
  },
  {
    name: gettext("cake"),        // 蛋糕
    type: "cake",                 // 类型标识
    value: 379,                   // 每份蛋糕约 379 千卡
  },
  {
    name: gettext("pizza"),       // 披萨
    type: "pizza",                // 类型标识
    value: 470,                   // 每份披萨约 470 千卡
  },
  {
    name: gettext("sausage"),     // 香肠
    type: "sausage",              // 类型标识
    value: 381,                   // 每根香肠约 381 千卡
  },
  {
    name: gettext("ham"),         // 火腿
    type: "ham",                  // 类型标识
    value: 99,                    // 每份火腿约 99 千卡
  },
  {
    name: gettext("iceCream"),    // 冰淇淋
    type: "ice cream",            // 注意 type 中有空格，图标文件名需为 "ice cream.png"
    value: 64,                    // 每份冰淇淋约 64 千卡
  },
  {
    name: gettext("coffee"),      // 咖啡
    type: "coffee",               // 类型标识
    value: 64,                    // 每杯咖啡约 64 千卡（可能指加糖/加奶的咖啡）
  },
  {
    name: gettext("beer"),        // 啤酒
    type: "beer",                 // 类型标识
    value: 64,                    // 每杯啤酒约 64 千卡
  },
];
