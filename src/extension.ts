// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { config, configActivate, configDeactivate } from './config';
import { COMMANDS, extensionName } from './contants';
import createComponent from './commands/createComponent';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	configActivate();

	if (config.debug) {
		vscode.window.showInformationMessage(`debug from ${extensionName}!`);
	}

	context.subscriptions.push(
		vscode.commands.registerCommand(COMMANDS.hello, () => {
			vscode.window.showInformationMessage(`Hello from ${extensionName}!`);
		}),
		vscode.commands.registerCommand(COMMANDS.createComponent, createComponent),
	);
}

// this method is called when your extension is deactivated
export function deactivate() {
	configDeactivate();
}
