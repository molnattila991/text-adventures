import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { FirebaseMapHelperService } from './firestore-base/firebase-map-helper.service';
import { GenericCrudService, StoreKeyValue, HashMap, StoreFilter } from '@text-adventures/shared';

@Injectable()
export class FirestoreBaseService implements GenericCrudService {
  constructor(
    private db: AngularFirestore,
    private helper: FirebaseMapHelperService
  ) { }

  //#region generic service implementation

  //#region get, getHashMap

  get<T>(path: string): Observable<StoreKeyValue<T>[]> {
    return this.db
      .collection(path)
      .snapshotChanges()
      .pipe(map(a => this.helper.createArrayFromDocumentChangeAction(a)));
  }

  getById<T>(path: string, id: string): Observable<T> {
    return this.db.collection(path).doc(id).snapshotChanges().pipe(map(snapShot => <any>{
      ...<any>snapShot.payload.data(),
      id: snapShot.payload.id
    }));
  }

  getHashMap<T>(path: string): Observable<HashMap<T>> {
    return this.db
      .collection(path)
      .snapshotChanges()
      .pipe(
        map(value => this.helper.createHashFromDocumentChangeAction<T>(value))
      );
  }

  //#endregion

  //#region getFiltered, getFilteredHashMap

  getFiltered<T>(
    path: string,
    filter: StoreFilter
  ): Observable<StoreKeyValue<T>[]> {
    return this.helper
      .getShanpshotFiltered(this.db, path, filter)
      .pipe(map(a => this.helper.createArrayFromDocumentChangeAction(a)));
  }

  getHashMapFiltered<T>(
    path: string,
    filter: StoreFilter
  ): Observable<HashMap<T>> {
    return this.helper
      .getShanpshotFiltered(this.db, path, filter)
      .pipe(
        map(value => this.helper.createHashFromDocumentChangeAction<T>(value))
      );
  }

  //#endregion

  //#region add, update, delete

  async add<T>(path: string, model: T): Promise<any> {
    const result = (await this.db.collection(path).add(model));
    const addedItem = await this.db.collection(path).doc(result.id).get().toPromise();
    return { ...addedItem.data(), id: addedItem.id };
  }

  async update<T>(path: string, id: string, model: T): Promise<any> {
    await this.db.doc(path + '/' + id).update(model);
    const updatedItem = await this.db.collection(path).doc(id).get().toPromise();
    return { ...updatedItem.data(), id: id };
  }

  delete(path: string, id: string): Promise<void> {
    return this.db.doc(path + '/' + id).delete();
  }

  //#endregion

  //#endregion
}
