#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const chalk = require('chalk');
const log = console.log;
const logSysbols = require('log-symbols');
const inrqirer = require('inquirer');
const download = require('download-git-repo');
const ora = require('ora');
const handlebars = require('handlebars');
const options = require('./option');
const cmd = require('node-cmd');

program
  .version('1.1.2')
  .command('init [name] [type]')
  .action(function (name, type = "ordinary") {
    if (!fs.existsSync(name)) { // 判断当前目录下有没有已经存在名为'name'的项目
      let option = null;
      if (type === 'vue') {
        option = options.vueOptions;
      } else if (type === 'ordinary') {
        option = options.ordinaryOptions;
      }
      // 说明不存在，开始创建
      inrqirer.prompt(option)
        .then((answers) => {
          // log('结果为：', answers);
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
          } else if (type === 'ordinary') {
            address = 'github:xiaoyao9524/webpack-devtool#ordinary';
          }
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
              function (err, data, stderr) {
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
          })
        })
    } else {
      // 说明已经存在，抛出错误信息
      log(logSysbols.error, chalk.red('创建失败，项目已存在！'));
    }
  });

program.parse(process.argv);

