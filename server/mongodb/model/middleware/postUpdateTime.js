function postUpdateTime(doc, next) {
  const now = Date.now();
  doc.updateTime = now;
  doc.save();
  next();
}
// TODO: 解決 Story articleOrder在delete之後.post的後手會爆掉的問題  Uncaught TypeError: Cannot set property 'updateTime' of null
module.exports = postUpdateTime;
