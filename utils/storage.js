// 将普通字符串转换为 ArrayBuffer
// Zepp OS 的 hmFS.write 写入时需要传入 ArrayBuffer，而 JSON.stringify 返回的是字符串，所以需要这个转换函数
function str2ab(str) {
  // 创建一个 ArrayBuffer，大小为字符串长度的 2 倍
  // 因为每个字符用 2 字节（16 位）存储，对应 UTF-16 编码
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  
  // 创建一个 Uint16Array 视图，用于向 ArrayBuffer 中写入 16 位无符号整数
  const bufView = new Uint16Array(buf);
  
  // 遍历字符串，把每个字符的 Unicode 编码（charCode）写入 Uint16Array
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  
  // 返回填充好的 ArrayBuffer，供 hmFS.write 使用
  return buf;
}

// 本地存储类，封装了文件的读写操作
// 用法类似浏览器的 localStorage，但数据持久化在手表的文件系统中
export default class LocalStorage {
  // 构造函数，接收一个文件名作为存储文件
  // 默认文件名为空字符串，使用时建议传入具体文件名，如 "user_data.json"
  constructor(fileName = "") {
    this.fileName = fileName;   // 保存文件路径
    this.contentObj = {};       // 缓存读取到的对象数据，初始为空对象
  }

  // 写入方法：将传入的对象序列化后写入文件
  // 每次写入都会覆盖原有内容
  set(obj) {
    // 以「读写 + 截断」模式打开文件
    // hmFS.O_RDWR 表示可读可写，hmFS.O_TRUNC 表示如果文件已存在则清空内容
    const file = hmFS.open(this.fileName, hmFS.O_RDWR | hmFS.O_TRUNC);
	
	// 先把对象转成 JSON 字符串，再转成 ArrayBuffer
    const contentBuffer = str2ab(JSON.stringify(obj));

    // 将 ArrayBuffer 写入文件
    // 参数：文件句柄、数据缓冲区、起始偏移量、写入字节数
    hmFS.write(file, contentBuffer, 0, contentBuffer.byteLength);
	
	// 写入完成后关闭文件，释放资源
    hmFS.close(file);
  }

  // 读取方法：从文件中读取数据并反序列化为对象
  get() {
    // 先查询文件状态，判断文件是否存在
    // hmFS.stat 返回 [stat对象, 错误码]，err === 0 表示文件存在且查询成功
    const [fsStat, err] = hmFS.stat(this.fileName);
	
    if (err === 0) {
	  // 获取文件大小，用于分配读取缓冲区
      const { size } = fsStat;
	  // 创建一个与文件大小相同的 Uint16Array 缓冲区，用于存放读取到的二进制数据
      const fileContentUnit = new Uint16Array(new ArrayBuffer(size));
	  // 以「只读 + 不存在则创建」模式打开文件
      const file = hmFS.open(this.fileName, hmFS.O_RDONLY | hmFS.O_CREAT);
	  // 将文件指针移动到文件开头，确保从头开始读取
      hmFS.seek(file, 0, hmFS.SEEK_SET);
	  // 从文件中读取数据到缓冲区
      // 参数：文件句柄、目标缓冲区、起始偏移量、读取字节数
      hmFS.read(file, fileContentUnit.buffer, 0, size);
	  // 读取完成后关闭文件
      hmFS.close(file);

      // 尝试将读取到的二进制数据还原为字符串，再解析为 JSON 对象
      try {
	    // String.fromCharCode.apply 将 Uint16Array 中的每个元素（Unicode 编码）转回字符，拼接成原始字符串
        const val = String.fromCharCode.apply(null, fileContentUnit);
		// 如果字符串非空，则解析为 JSON 对象；否则使用空对象
        this.contentObj = val ? JSON.parse(val) : {};
      } catch (error) {
	    // 如果解析失败（比如文件内容损坏、不是合法 JSON），则回退为空对象，避免报错崩溃
        this.contentObj = {};
      }
    }
    
	// 返回解析后的对象；如果文件不存在，返回初始的空对象
    return this.contentObj;
  }
}
