import { window, InputBoxOptions, Uri, workspace } from 'vscode';
import * as path from 'path';
import * as fs from 'fs-extra';
// import * as superEjs from 'super-ejs';
// 模块抽离貌似会导致String.prototype被重置???然后ejs模板中就没法使用changeCase
import superEjs from '../utils/superEjs';
import { config } from '../config';
import changeCase from '@juln/change-case';
import __root__ from '../utils/root';

const tplDirPath = path.resolve(__root__, 'assets/template/component');
const templateMainFile = './index.tsx';

const createComponent = async (folderPath?: Uri) => {
  const fromCmd = !folderPath;
  let dirPath = folderPath?.fsPath;

  const inputedName = await window.showInputBox({
    prompt: "请输入组件名",
    validateInput: validateName,
    placeHolder: "生成juln前端组件",
    ignoreFocusOut: true,
  });
  if (!inputedName) return;
  const componentName = changeCase(inputedName, config.filenameCase);

  if (fromCmd) {
    dirPath = await window.showInputBox({
      prompt: "请输入生成路径",
      placeHolder: "默认为'./src/components'",
      ignoreFocusOut: true,
      value: './src/components',
    });
  }
  if (!dirPath) return;
  dirPath = path.resolve(dirPath);

  if (fs.existsSync(path.resolve(dirPath, componentName))) {
    const isContinue = await window.showQuickPick(
      ["y", "n"],
      { title: "当前目录已存在，是否覆盖" },
    );
    if (isContinue === "n" || !isContinue) return;
  }

  try {
    await createFiles(dirPath, componentName);

    const openFile = path.resolve(dirPath, componentName, templateMainFile);
    workspace.openTextDocument(openFile).then(doc => {
      if (doc) {
        window.showTextDocument(doc);
      }
    });
  } catch (error) {
    window.showErrorMessage(`创建组件[${componentName}]失败(error: ${error})`);
  }
};

const validateName: InputBoxOptions['validateInput'] = (input) => {
  if (input.match(/^[a-zA-Z]+?[-|_|a-zA-Z0-9]*?$/) && !input.endsWith('-') && !input.endsWith('_')) return;
  return "组件名不对";
};

const createFiles = async (dirPath: string, componentName: string) => {
  return superEjs.gerenateDir(
    path.resolve(dirPath, componentName),
    tplDirPath,
    { name: componentName },
  );
};

export default createComponent;
