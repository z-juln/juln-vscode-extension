/** 需保持与package.json的config配置一致 */
export const extensionName = 'juln';

export const COMMANDS = {
  hello: `${extensionName}.hello`,
  createComponent: `${extensionName}.createComponent`,
};

export const CONTEXT_KEYS = {
  init: `${extensionName}:init`,
};
