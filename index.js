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
program
    .version('0.1.0')
    .command('init [name] [type]')
    .action(function (name, type = "vue") {
      // log(logSysbols.success, chalk.red(name, type));

      if (!fs.existsSync(name)) { // 判断当前目录下有没有已经存在名为'name'的项目
        let option = null;
        if (type === 'vue') {
          option = options.vueOptions;
        }
        // 说明不存在，开始创建
        inrqirer.prompt(option)
            .then((answers) => {
              // log('结果为：', answers);
              const spinner = ora({
                text: '正在下载模板...',
                color: 'green'
              });
              spinner.start();
              download('github:xiaoyao9524/webpack-devtool', name, {
                clone: true
              }, function (err) {
                if (err) {
                  console.log(logSysbols.error, chalk.red('模板下载失败！'));
                }
                spinner.stop();
                console.log(logSysbols.success, chalk.green('模板下载成功！'));
                console.log(logSysbols.info, chalk.green(`请继续操作：`));
                console.log(logSysbols.info, chalk.green(`1、'cd ${name}'.`));
                console.log(logSysbols.info, chalk.green(`2、'npm install'或'yarn install'.`));
                console.log(logSysbols.info, chalk.green(`3、'npm run dev'或'yarn run dev'.`));
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
              })
            })
      } else {
        // 说明已经存在，抛出错误信息
        log(logSysbols.error, chalk.red('创建失败，项目已存在！'));
      }
    });

program.parse(process.argv);