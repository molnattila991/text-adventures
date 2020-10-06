import { Observable } from "rxjs";
import { HashMap } from './hash-map.interface';
import { StoreFilter } from './store-filter.query.interface';
import { StoreKeyValue } from './store-key-value.interface';

export interface GenericCrudService {
  get<T>(path: string): Observable<StoreKeyValue<T>[]>;
  getById<T>(path: string, id: string): Observable<T>;
  getFiltered<T>(
    path: string,
    filter: StoreFilter
  ): Observable<StoreKeyValue<T>[]>;

  getHashMap<T>(path: string): Observable<HashMap<T>>;
  getHashMapFiltered<T>(path: string, filter: StoreFilter): Observable<HashMap<T>>;

  add<T>(path: string, model: Partial<T>): Promise<T>;
  update<T>(path: string, id: string, model: T): Promise<T>;
  delete(path: string, id: string): Promise<void>;
}