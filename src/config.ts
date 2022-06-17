/** 需保持与package.json的config配置一致 */
import * as vscode from 'vscode';
import { extensionName } from './contants';
import type { Case } from '@juln/change-case';

let listener: vscode.Disposable;

export interface Config {
  debug?: boolean;
  filenameCase: Case;
}

export const config = {
  debug: false,
  filenameCase: 'kebab' as Case,
};

export const getConfig = () => {
  const minapp = vscode.workspace.getConfiguration(extensionName);
  config.debug = minapp.get('debug', false);
};

export function configActivate(): void {
  listener = vscode.workspace.onDidChangeConfiguration(getConfig);
  getConfig();
}

export function configDeactivate(): void {
  listener.dispose();
}
