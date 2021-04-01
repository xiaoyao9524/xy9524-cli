const fs = require('fs');
const chalk = require('chalk');
const log = console.log;
const logSysbols = require('log-symbols');
const inrqirer = require('inquirer');
const download = require('download-git-repo');
const ora = require('ora');
const handlebars = require('handlebars');
const options = require('./option');
const cmd = require('node-cmd');


function action (name) {
  // 判断当前目录下有没有已经存在名为'name'的项目
  if (fs.existsSync(name)) {
    // 说明已经存在，抛出错误信息
    return log(logSysbols.error, chalk.red('创建失败，项目已存在！'));
  }

  const options = getProjectOptionResult();

  // let option = null;
  // if (type === 'vue') {
  //   option = options.vueOptions;
  // } else if (type === 'normal') {
  //   option = options.normalOptions;
  // }


  return;

  inrqirer.prompt(option)
    .then((answers) => {
      let address = '';
      let manner = answers.yarn ? 'yarn' : 'npm';
      if (type === 'vue') { // 说明是vue模板
        if (answers.router) {
          // vue-vue-router-template
          address = 'github:xiaoyao9524/webpack-devtool#vue-vue-router-template';
        } else {
          // vue-template
          address = 'github:xiaoyao9524/webpack-devtool#vue-template';
        }
      } else if (type === 'normal') {
        address = 'github:xiaoyao9524/webpack-devtool';
      }
      // 下载模板
      const spinner = ora({
        text: '正在下载模板...',
        color: 'green'
      });
      spinner.start();
      download(address, name, {
        clone: true
      }, function (err) {
        if (err) {
          log(logSysbols.error, chalk.red('模板下载失败！'));
          return;
        }
        // 修改package.json的相关选项
        const meta = {
          name,
          author: answers.author,
          description: answers.description
        };
        const fileName = `${name}/package.json`;
        const content = fs.readFileSync(fileName).toString();
        const result = handlebars.compile(content)(meta);
        fs.writeFileSync(fileName, result);
        spinner.stop();
        log(logSysbols.success, chalk.green('模板下载成功！'));
        // 安装依赖
        // 自动下载
        if (answers.autoInstall) {
          const spinner2 = ora({
            text: '正在安装依赖...',
            color: 'green'
          });
          spinner2.start();
          cmd.get(
            `
                  cd ${name}
                  ${manner} install
                  `,
            function (err) {
              if (!err) {
                spinner2.stop();
                log(logSysbols.success, chalk.green(`安装成功，请继续：`));
                log(logSysbols.info, chalk.green(`1、'cd ${name}'.`));
                log(logSysbols.info, chalk.green(`2、'${manner} run dev.`));
              } else {
                log('error', err)
              }
            }
          )
        } else {
          // 手动下载
          log(logSysbols.success, chalk.green(`请继续：`));
          log(logSysbols.info, chalk.green(`1、'cd ${name}'.`));
          log(logSysbols.info, chalk.green(`2、'${manner} install'.`));
          log(logSysbols.info, chalk.green(`3、'${manner} run dev'.`));
        }
      })
    })
}

function getProjectOptionResult (templateType) {
  return new Promise((res, rej) => {

  })
  let option = null;
  if (type === 'vue') {
    option = options.vueOptions;
  } else if (type === 'normal') {
    option = options.normalOptions;
  }
}


module.exports = {
  action
}
