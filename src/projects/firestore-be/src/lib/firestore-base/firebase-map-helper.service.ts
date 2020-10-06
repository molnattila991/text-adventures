import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StoreFilter, HashMap, StoreKeyValue } from '@text-adventures/shared';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMapHelperService {
  constructor() {}

  public getShanpshotFiltered(
    db: AngularFirestore,
    path: string,
    filter: StoreFilter
  ) {
    return db
      .collection(path, item =>
        item.where(filter.fieldPath, filter.operationString, filter.value)
      )
      .snapshotChanges();
  }

  public createHashFromDocumentChangeAction<T>(array: any): HashMap<T> {
    if (array)
      return array.reduce(
        (acc: any, mappedValue: any) => {
          const id = mappedValue.payload.doc.id;
          const data = { ...mappedValue.payload.doc.data(), id: id };
          acc[id] = data;
          return acc;
        },
        <HashMap<T>>{}
      );
    return <HashMap<T>>{};
  }

  public createArrayFromDocumentChangeAction<T>(
    array: any
  ): StoreKeyValue<T>[] {
    if (array)
      return array
        .map(mappedValue => {
          const id = mappedValue.payload.doc.id;
          const data = { ...mappedValue.payload.doc.data(), id: id };
          return <StoreKeyValue<T>>{ id: id, model: <T>{ ...data } };
        })
        .sort();
    return [];
  }
}
