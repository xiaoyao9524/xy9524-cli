let baseOptions = [
  {
    type: 'confirm',
    name: 'yarn',
    message: '是否使用yarn?',
    default: true
  },
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
    name: 'autoInstall',
    message: '是否自动下载依赖?',
    default: true
  }
];

let vueOptions = [
    ...baseOptions,
  {
    type: 'confirm',
    name: 'router',
    message: '是否使用vue-router?',
    default: false
  }
];

module.exports = {
  vueOptions: vueOptions,
  ordinaryOptions: baseOptions
};
