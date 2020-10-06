
import { map, share } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { StoreBaseActions, StoreKeyValue, StoreFilter } from '@text-adventures/shared';

export class FireStoreBaseFactory<T> implements StoreBaseActions<T> {
  constructor(
    protected collectionPath: string,
    protected db: AngularFirestore
  ) {}

  getCollection(): Observable<StoreKeyValue<T>[]> {
    return this.db
      .collection(this.collectionPath)
      .snapshotChanges()
      .pipe(
        share(),
        map(a => {
          return a
            .map(aa => {
              const data = aa.payload.doc.data();
              const id = aa.payload.doc.id;
              return { id: id, model: <T>{ ...<any>data } };
            })
            .sort();
        })
      );
  }
  getFilteredCollection(filter: StoreFilter): Observable<StoreKeyValue<T>[]> {
    return this.db
      .collection(this.collectionPath, item =>
        item.where(filter.fieldPath, filter.operationString, filter.value)
      )
      .snapshotChanges()
      .pipe(
        map(a => {
          return a
            .map(aa => {
              const data = aa.payload.doc.data();
              const id = aa.payload.doc.id;
              return { id: id, model: <T>{ ...<any>data } };
            })
            .sort();
        }, share())
      );
  }

  add(model: T): Promise<any> {
    return this.db.collection(this.collectionPath).add(model);
  }

  update(id: string, model: T): Promise<void> {
    return this.db.doc(this.collectionPath + '/' + id).update(model);
  }

  delete(id: string): Promise<void> {
    return this.db.doc(this.collectionPath + '/' + id).delete();
  }
}
