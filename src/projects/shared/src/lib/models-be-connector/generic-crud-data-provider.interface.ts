import { Observable } from "rxjs";
import { SelectItem } from '../interfaces/select-item.interface';
import { HashMap } from "./hash-map.interface";
import { StoreKeyValue } from "./store-key-value.interface";

export interface IGenericCrudDataProvider<T> {
  getHashMap(): Observable<HashMap<T>>;
  getHashFiltered(property: string, value: any, operation?: '<' | '<=' | '==' | '>' | '>=' | 'array-contains' | 'array-contains-any' | 'in'): Observable<HashMap<T>>;
  get(): Observable<StoreKeyValue<T>[]>;
  getById(id: string): Observable<T>;
  getByIdList(id: string[]): Observable<T[]>
  getFiltered(property: string, value: any, operation?: '<' | '<=' | '==' | '>' | '>=' | 'array-contains' | 'array-contains-any' | 'in'): Observable<StoreKeyValue<T>[]>;
  getSelectList(propertyName: string): Observable<SelectItem[]>;
  add(model: Partial<T>): Promise<T>;
  update(id: string, model: T): Promise<T>;
  delete(id: string): Promise<void>;
}
