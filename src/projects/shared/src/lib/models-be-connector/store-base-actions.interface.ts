import { StoreKeyValue } from './store-key-value.interface';
import { StoreFilter } from './store-filter.query.interface';
import { Observable } from 'rxjs';

export interface StoreBaseActions<T> {
  getCollection(): Observable<StoreKeyValue<T>[]>;
  getFilteredCollection(filter: StoreFilter): Observable<StoreKeyValue<T>[]>;
  add(model: T): Promise<any>;
  update(id: string, model: T): Promise<void>;
  delete(id: string): Promise<void>;
}
