const questions = [
  {
    type: 'input',
    name: 'author',
    message: '请输入作者',
    default: ''
  },
  {
    type: 'input',
    name: 'description',
    message: '请输入项目描述',
    default: ''
  },
  {
    type: 'confirm',
    name: 'yarn',
    message: '是否使用yarn?',
    default: true
  },
  {
    type: 'confirm',
    name: 'ts',
    message: '是否使用typescript?',
    default: true
  },
  {
    type: 'confirm',
    name: 'autoInstall',
    message: '是否自动下载依赖?',
    default: true
  }
];

module.exports = questions;
