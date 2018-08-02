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
  }
];

let vueOptions = [
  {
    type: 'confirm',
    name: 'router',
    message: '是否使用vue-router?',
    default: false
  }
];

module.exports = {
  vueOptions: baseOptions.concat(vueOptions),
  ordinaryOptions: baseOptions
};