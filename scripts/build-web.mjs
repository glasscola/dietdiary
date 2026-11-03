import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const web=path.join(root,'web');
const files=['index.html','app.mjs','engine.mjs','pixel.mjs','art.mjs','styles.css','icon.svg','icon-192.png','icon-512.png','privacy.html'];
for(const folder of ['dist','android/app/src/main/assets/www']){
  const target=path.join(root,folder);
  await fs.mkdir(target,{recursive:true});
  for(const name of files)await fs.copyFile(path.join(web,name),path.join(target,name));
}
await fs.writeFile(path.join(root,'dist/.nojekyll'),'');
console.log('Web and Android offline assets prepared.');
