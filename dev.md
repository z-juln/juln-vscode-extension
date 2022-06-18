## src/config.ts
config默认配置要与package.json保持一致

## assets/template

> 存放模板的地方，模板采用ejs编写

ejs可以使用的外部方法:
- changeCase: 如`'aa-bb-cc'.changeCase('upper-camel-case') // 结果为AaBbCc` case参数具体看@juln/change-case这个npm包

## 调试
vscode侧边栏的调试面板直接调试

## 测试
`npm run build` 不要用yarn，不然会报错
生成的.vsix可以直接安装到vscode中进行使用

## 发布
略

## 未来
编写好支持远程下载模板、缓存更新的cli后，继承到该插件中
支持cicd
