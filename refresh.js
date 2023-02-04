// 本js用于刷新cdn

let SDK = require('ali-cdn-sdk');

const CDN_CONFIG = {
  endpoint: 'https://cdn.aliyuncs.com',
  accessKeyId: 'LTAIlthlCMOGX7GD',
  appSecret: 'na490y7YTZW2My9OCyyj8LWARo0B48',
  apiVersion: '2014-11-11',
};

// 映射不同环境待刷新的cdn
const pathObj = {
  dev: 'http://img.readgood.cn/fe/distribution-cms/test2/index.html', // 测试
  dev2: 'http://img.readgood.cn/fe/distribution/dev2/index.html', // 测试
  dev3: 'http://img.readgood.cn/fe/distribution/dev3/index.html', // 测试
  dev4: 'http://img.readgood.cn/fe/distribution/dev4/index.html', // 测试
  mirror: 'http://img.readgood.cn/fe/distribution/mirror/index.html',
  mirror2: 'http://img.readgood.cn/fe/distribution/mirror2/index.html',
  production: 'http://img.readgood.cn/fe/distribution/production/index.html',
};

const arg = process.argv[2];
const path = pathObj[arg];

const sdk = new SDK(CDN_CONFIG);
const res = sdk.RefreshObjectCaches({
  ObjectPath: path,
});
console.log('刷新:' + path + ':' + res);
