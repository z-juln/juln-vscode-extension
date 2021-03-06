import { window, InputBoxOptions, Uri, workspace } from 'vscode';
import * as path from 'path';
import * as fs from 'fs-extra';
import changeCase from '@juln/change-case';
import * as superEjs from 'super-ejs';
import { config } from '../config';
import __root__ from '../utils/root';

const { workspaceFolders } = workspace;

const tplDirPath = path.resolve(__root__, 'assets/template/component');
const templateMainFile = './index.tsx';

const createComponent = async (folderPath?: Uri) => {
  const isOnlyWorkspace = workspaceFolders && workspaceFolders.length === 1;
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

  if (fromCmd && isOnlyWorkspace) { // 启用cmd
    const rootPath = workspaceFolders[0].uri.path;
    dirPath = await window.showInputBox({
      prompt: "请输入生成路径",
      placeHolder: "默认为'./src/components'",
      ignoreFocusOut: true,
      value: './src/components',
    });
    if (dirPath) {
      dirPath = path.resolve(rootPath, dirPath);
    }
  }

  if (!dirPath) return;

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
    { name: componentName, changeCase },
  );
};

export default createComponent;
