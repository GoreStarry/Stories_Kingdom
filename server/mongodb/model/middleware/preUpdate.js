function updateTime(next) {
  const now = Date.now();
  this.update({
    updateTime: now
  })
  next();
}

module.exports = updateTime;
