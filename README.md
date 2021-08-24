
# vue-模板项目

- [项目结构](#xmjg)
- [启动项目](#qdxm)
- [打包](#db)
- [开发规范](#kfgf)
    - [axios请求](#axios)
	- [svg](#svg)
	- [form验证](#form)
	- [数组遍历](#kfgf3)
	- [使用对象代替switch case](#kfgf4)
	- [命名规范](#kfgf5)
		- [变量](#kfgf5-1)
		- [常量](#kfgf5-2)
		- [函数&方法](#kfgf5-3)
	- [注释规范](#kfgf6)
	- [赋值](#kfgf7)
	- [对象](#kfgf8)
	- [数组](#kfgf9)
	- [样式](#ys)
	- [引用](#yy)
	- [qjbl](#qjbl)


------

## <span id="xmjg">项目结构</span>
    ├─src 
    |  ├─views  页面
    |  ├─utils  通用方法
    |  ├─styles 样式表
    |  ├─store  vux状态管理器
    |  ├─router 路由
    |  ├─layout 页面布局
    |  ├─icons 图标文件
    |  ├─components 组件
    |  ├─config 数据配置文件
    |  ├─assets 资源文件
    |  ├─api 请求配置文件
    ├─public 
    ├─build 打包文件

------

## <span id="qdxm">启动项目</span>

```bash

cd recovery_management

npm install

npm run dev

启动nginx
```

------

## <span id="db">打包</span>

```bash
npm run build
```

------

## <span id="kfgf">开发规范</span>

<br>

### <span id="axios">axios请求</span>
    api需写在 api/xxx.js中
    写好url、method
    页面中引用 import { xxx,xxx } from '@/api/xxx'
    eg: 
        login({ username, password }).then(res => {
            ...todo
        }).catch(error => {
            ...todo
        })

### <span id="svg">新增/使用svg</span>

```bash
下载svg到 src/icons/svg 中

如果svg文件中有fill参数,记得删掉,不然无法控制颜色

<svg-icon icon-class="user" :style="{color:'#fff'}"/>
 ```


### <span id="form">form验证</span>

```bash
//表单引用
<el-form ref="loginParam" :model="loginParam" :rules="loginRules"></el-form>

data() {
    //验证方法
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入xxx'))
      } else {
        callback()
      }
    }
    return {
      //表单数据
      formData: {
        username: '',
      },
      //表单验证规则
      formRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      },
    }
},

handleLogin() {
    //点击按钮开始验证方法
    this.$refs.loginParam.validate(valid => {
        if (valid) {
            //...todo
        } else {
            //...todo
        }
    })
}
```


### <span id="kfgf3">数组遍历</span>
    for(j = 0,len=arr.length; j < len; j++) {
        console.log(j);
    }
    arr.map((n)=>{
        console.log(n);
    });

### <span id="kfgf4">使用对象替代switch case</span>
    renderStatusStamp(status) {
        switch (status) {
        case '-1':
            return xxx;
        case '0':
            return xxx;
        default:
            return null;
        }
    }

    renderStatusStamp(status) {
        const stampContainer = {
        '0': xxx,
        '1': xxx,
        };
        return stampContainer[status];
    }

### <span id="kfgf5">命名规范</span>

#### <span id="kfgf5-1">1.变量：</span>
        命名方法: 小驼峰式命名法
        命名规范：前缀为形容词 （函数前缀为动词, 以此来区分函数和变量）
#### <span id="kfgf5-2">2.常量：</span>
        命名方法：名词全部大写
        命名规范：使用大写字母和下划线来组合命名，下划线用来分割单词。
#### <span id="kfgf5-3">3.函数 & 方法</span>
        命名方法： 小驼峰式命名法
        命名规范： 前缀应该为动词
        命名建议：常用动词约定

        动词	含义
        can	    判断是否可执行某个动作
        has	    判断是否含义某个值
        is	    判断是否为某个值
        get	    获取某个值
        set	    设置某个值
        load	加载某些数据
        on      执行某个动作
        update  更新某个值

### <span id="kfgf6">注释规范</span>

    1.vscode 安装 koroFileHeader 自动生成页面注释
    2.页面头部注释需要书写 页面名称
    3.方法注释需要写明 方法名称  关键字 返回值    

### <span id="kfgf7">赋值</span>
    const { firstName, lastName } = obj; 优先用解构赋值
    函数的参数如果是对象的成员，优先使用解构赋值。
    function getFullName({ firstName, lastName }) {}

### <span id="kfgf8">对象</span>
    对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法

### <span id="kfgf9">数组</span>
    使用扩展运算符 ... 拷贝数组

### <span id="ys">样式</span>
    全局样式写在styles/variables.scss中
    页面上引用import variables from '@/styles/variables.scss'
    开发时需分辨是否为通用样式 若该ui图上样式为通用样式 则需要在样式表中增加 并写好注释

### <span id="yy">引用</span>
    引用组件或方法时  引用路径均以 @开头 
    eg: @/styles/xxx.scss

### <span id="qjbl">全局变量</span>
    全局变量放在config/common中
    引用时直接通过common.xxx
------------

## Browsers support

Modern browsers and Internet Explorer 10+.

| IE / Edge | Firefox | Chrome | Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions
