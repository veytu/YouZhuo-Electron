import { EduClassroomStore } from 'agora-edu-core';
import { Logger } from 'agora-common-libs';
import { Getters } from './getters';

/**
 *
 */
/** @en
 *
 */
export abstract class EduUIStoreBase {
  protected _disposers: (() => void)[] = [];
  /**
   *
   */
  /** @en
   *
   */
  protected readonly logger!: Logger;
  /**
   *
   */
  /** @en
   *
   */
  protected readonly getters: Getters;
  /**
   * 当前 EduClassroomStore 实例
   */
  /** @en
   *
   */
  readonly classroomStore: EduClassroomStore;

  /**
   * 构造函数
   * @param store
   * @param shareUIStore
   */
  /** @en
   * 构造函数
   * @param store
   * @param shareUIStore
   */
  constructor(store: EduClassroomStore, getters: Getters) {
    this.classroomStore = store;
    this.getters = getters;
  }

  /**
   * UIStore 初始化
   */
  /** @en
   *
   */
  abstract onInstall(): void;

  /**
   * UIStore 销毁
   */
  /** @en
   *
   */
  abstract onDestroy(): void;
}
