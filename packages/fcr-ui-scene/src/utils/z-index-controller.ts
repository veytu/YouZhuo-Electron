import { observable, action, computed } from 'mobx';
export class ZIndexController {
  private _zIndex = 1000;
  private _increment = 1;
  @observable
  private _zIndexMap = new Map<string, number>();

  get zIndex() {
    return this._zIndex;
  }
  @computed
  get zIndexMap() {
    return this._zIndexMap;
  }

  getTopZIndex() {
    this._zIndex += this._increment;
    return this.zIndex;
  }
  @action
  updateZIndex(id: string) {
    this._zIndexMap.set(id, this.getTopZIndex());
  }
}
