function postUpdateTime(doc, next) {
  const now = Date.now();
  doc.updateTime = now;
  doc.save();
  next();
}

module.exports = postUpdateTime;
