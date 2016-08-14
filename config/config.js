
var development = {
  name: 'React 开发学习',
  host: '192.168.31.210',
  port: 8080,
  WEBSITE_URL: 'http://localhost:8080',
  API_URL: 'http://192.168.31.210:3000',
  PUBLIC_PATH: 'http://192.168.31.210:8080/'
};

var production = {
  name: 'React 开发学习',
  WEBSITE_URL: 'http://cnseoul.com',
  API_URL: 'http://192.168.31.210:3000',
  PUBLIC_PATH: 'http://cnseoul.com'
};

module.exports = process.env.NODE_ENV == 'development' ? development : production;
