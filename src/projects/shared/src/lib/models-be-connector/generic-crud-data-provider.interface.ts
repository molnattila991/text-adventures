import { Observable } from "rxjs";
import { SelectItem } from '../interfaces/select-item.interface';
import { HashMap } from "./hash-map.interface";
import { StoreKeyValue } from "./store-key-value.interface";

export interface IGenericCrudDataProvider<T> {
  getHashMap(): Observable<HashMap<T>>;
  getHashFiltered(property: string, value: any): Observable<HashMap<T>>;
  refreshHashMapFiltered(property: string, value: any);
  get(): Observable<StoreKeyValue<T>[]>;
  getById(id: string): Observable<T>;
  getFiltered(property: string, value: any): Observable<StoreKeyValue<T>[]>;
  getSelectList(propertyName: string): Observable<SelectItem[]>;
  refreshFiltered(property: string, value: any);
  add(model: Partial<T>): Promise<T>;
  update(id: string, model: T): Promise<T>;
  delete(id: string): Promise<void>;
}
