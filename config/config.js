
// 开发环境配置
var development = {
  debug: true,
  // 网站名称
  name: '小度鱼',
  description: '社群问答社区',
  // ip
  host: '192.168.31.210',
  // 端口
  port: 8181,
  // API 地址
  // API_URL: 'http://api.xiaoduyu.com',
  API_URL: 'http://192.168.31.210:3000',
  // 打包文件内用到的URL路径, 比如背景图等(可以设成http的地址, 比如: http://cdn.my.com)
  PUBLIC_PATH: 'http://192.168.31.210:8181',
  GA: '*'
};

// 开发环境配置
var production = {
  debug: false,
  name: '小度鱼',
  description: '社群问答社区',
  API_URL: 'http://api.xiaoduyu.com',
  // PUBLIC_PATH: 'http://www.xiaoduyu.com'
  PUBLIC_PATH: 'http://img.xiaoduyu.com',
  GA: '*'
};


module.exports = process.env.NODE_ENV == 'development' ? development : production;
