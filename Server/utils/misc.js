const remove65279 = (s) => {
  return s.replace(String.fromCharCode(65279), ""); //removing 'ZERO WIDTH NO-BREAK SPACE' .TODO understand why it's there!!
};

module.exports = {
  remove65279,
};
