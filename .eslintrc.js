module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 在这里可以添加或覆盖规则，例如：
    'indent': ['error', 4], // 使用4个空格缩进
    'semi': ['error', 'never'] // 不允许分号
  }
};