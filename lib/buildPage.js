
/*
 * @Description: 创建模板页面
 * @Author: yzw
 * @Date: 2021-02-25 16:33:29
 * @LastEditTime: 2021-08-24 11:58:14
 * @LastEditors: yzw
 * @Reference:
 */

const chalk = require('chalk')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')

const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

const Template = {
	base: require('./baseTemplate'),
	table: require('./tableTemplate'),
	add: require('./addDialog'),
	detail: require('./detailDialog'),
	api: require('./apiTemplate.js')
}
const basefileUrl = '../src/views'
let filePath = ''

const promptList = [
	{
		type: 'list',
		name: 'type',
		message: '创建的模板类型?',
		suffix: '(base)',
		default: 'base',
		choices: ['base', 'table']
	},
	{
		type: 'checkbox',
		name: 'dialog',
		message: '配套的页面?',
		suffix: '(detail)',
		default: ['detail'],
		choices: ['add', 'detail', 'no'],
		when: ans => {
			// 当ans.type 为 true 时 执行此问题
			return ans.type
		}
	},
	{
		type: 'input',
		message: '请输入文件夹名称: ',
		name: 'name',
		when: ans => {
			return ans.dialog
		},
		validate: ans => {
			if (!ans.match(/^[A-Za-z/]+$/g)) {
				return '请输入英文字母(/)'
			}
			filePath = resolve(basefileUrl, ans)
			if (fs.existsSync(filePath)) {
				return `文件夹已存在,请核对后重新输入`
			} else {
				return true
			}
		}
	},
	{
		type: 'input',
		message: '请输入文件简介: ',
		name: 'remark',
		when: ans => {
			return ans.name
		},
		validate: ans => {
			if (ans.match(/^[\u4E00-\u9FA5]+$/g)) {
				// 校验中文
				return true
			} else {
				return '请输入中文!'
			}
		}
	}
]

inquirer.prompt(promptList).then(answers => {
	const { type, dialog, name, remark } = answers
	log(`${type}, ${dialog}, ${name}, ${remark}`)

	log(`正在生成 file 目录 ${filePath}`)
	dotExistDirectoryCreate(filePath).then(res => {
		successLog(`file 目录 ${name} 生成成功:${res}`)
		const vueFile = resolve(filePath, 'index.vue')
		let fileName = name
		try {
			// 获取组件名
			if (fileName.includes('/')) {
				const inputArr = fileName.split('/')
				fileName = inputArr[inputArr.length - 1]
			}

			log(`正在生成 vue 文件 ${vueFile}`)

			const config = { name, remark, dialog, fileName }
			// 传入参数生成vue模板
			const vueTemplate = Template[type].template(config)

			generateFile(vueFile, vueTemplate).then(res => {
				successLog(`vue 文件 ${fileName} 生成成功:${res}`)
			})
			otherFileCreate(dialog, config)
			apiFileCreate(config)
		} catch (e) {
			errorLog(e.message)
		}
	})
})

// 生成配套文件
function otherFileCreate(list, config) {
	list.map(item => {
		if (item !== 'no') {
			var compomentPath = resolve(filePath, `${item}.vue`)
			log(`正在生成 vue 文件 ${compomentPath}`)
			const compomenTemplate = Template[item].template(config)
			generateFile(compomentPath, compomenTemplate).then(res => {
				successLog(`vue 文件 ${item} 生成成功:${res}`)
			})
		}
	})
}

// 生成api文件
function apiFileCreate(config) {
	var apiPath = resolve('../src/api', `${config.fileName}.js`)
	log(`正在生成 Api 文件 ${apiPath}`)
	const apiTemplate = Template.api.template(config)
	generateFile(apiPath, apiTemplate).then(res => {
		successLog(`Api 文件 ${apiPath} 生成成功:${res}`)
	})
}

// 生成目录
function dotExistDirectoryCreate(directory) {
	return new Promise((resolve) => {
		mkdirs(directory, function() {
			resolve(directory)
		})
	})
}

// 递归创建目录
function mkdirs(directory, callback) {
	var exists = fs.existsSync(directory)
	if (exists) {
		callback()
	} else {
		mkdirs(path.dirname(directory), function() {
			fs.mkdirSync(directory)
			callback()
		})
	}
}

// 生成文件
const generateFile = (path, data) => {
	if (fs.existsSync(path)) {
		errorLog(`${path}文件已存在`)
		return
	}
	return new Promise((resolve, reject) => {
		fs.writeFile(path, data, 'utf8', err => {
			if (err) {
				errorLog(err.message)
				reject(err)
			} else {
				resolve(path)
			}
		})
	})
}
