import changeCase from '@juln/change-case';
import * as ejs from 'ejs';
import * as glob from 'glob';
import * as fs from 'fs-extra';
import * as path from 'path';

export const gerenateDir = (
  cwd: string,
  tplDir: string,
  data?: ejs.Data,
  options?: ejs.Options
) => {
  cwd = path.resolve(cwd);
  tplDir = path.resolve(tplDir);

  return new Promise<void>((resolve, reject) => {
    glob('**', { nodir: true, cwd: tplDir }, function (err, files) {
      if (err) {
        reject(err);
        return;
      }

      const getOutPath = (filePath: string) => {
        let relativePath = filePath.slice(tplDir.length);
        if (relativePath.startsWith('/')) {
          relativePath = relativePath.slice(1);
        }
        return path.resolve(cwd, relativePath);
      };

      // @ts-ignore
      String.prototype.changeCase = function(_case) {
        return changeCase(`${this}`, _case);
      };
      Promise.all(
        files.map(filePath => path.resolve(tplDir, filePath))
          .map(tplFilePath => {
            return ejs.renderFile(tplFilePath, data, options).then(content => {
              const outFilePath = getOutPath(tplFilePath);
              fs.ensureFileSync(outFilePath);
              return fs.writeFile(outFilePath, content);
            });
        })
      ).then(() => {
        // @ts-ignore
        String.prototype.changeCase = undefined;
        resolve();
      }, reject);
    });
  });
};

export * from 'ejs';

export default {
  ...ejs,
  gerenateDir,
};
