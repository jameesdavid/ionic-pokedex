import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageX: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.storageX = storage;
  }

  public set(key: string, value: any) {
    return this.storageX?.set(key, value);
  }

  public get(key: string) {
    return this.storageX.get(key);
  }

  public deleteAll() {
    return this.storageX.clear();
  }
}
