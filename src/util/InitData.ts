import Main from '../main';
import * as path from 'path';
import * as fs from 'fs';

export default class InitData {

  private _data = {};

  get initDataPath(): string {
    return path.join(Main.application.getPath('userData'), 'init.json');
  }

  get data(): any {
    return this._data;
  }

  load(): void {
    this._data = (fs.existsSync(this.initDataPath)) ? JSON.parse(fs.readFileSync(this.initDataPath, 'utf-8')) : {};
    console.log("InitData - load: ", this._data);
  }

  save(): void {
    fs.writeFileSync(this.initDataPath, JSON.stringify(this._data));
    console.log("InitData - save: ", this._data);
  }

}
