let vueOptions = [
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
  }// ,
  // {
  //   type: 'confirm',
  //   name: 'router',
  //   message: '是否使用vue-router?',
  //   default: false
  // },
  // {
  //   type: 'confirm',
  //   name: 'store',
  //   message: '是否使用vuex?',
  //   default: false
  // }
];

module.exports = {
  vueOptions
};