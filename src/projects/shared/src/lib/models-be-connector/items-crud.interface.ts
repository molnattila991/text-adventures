import { StoreKeyValue } from './store-key-value.interface';
import { ItemModel } from '../models-game/item-model';
import { Observable } from 'rxjs';
import { HashMap } from './hash-map.interface';

export interface ItemsCrudService {
  getItems(): Observable<StoreKeyValue<ItemModel>[]>;
  getItemsFiltered(property: string, value: any): Observable<StoreKeyValue<ItemModel>[]>;
  refreshItemsFiltered(property: string, value: any);

  getItemsHash(): Observable<HashMap<ItemModel>>;
  getItemsHashFiltered(): Observable<HashMap<ItemModel>>;
  refreshItemsHashMapFiltered(property: string, value: any);

  addItem(model: Partial<ItemModel>): Promise<void>;
  updateItem(id: string, model: ItemModel): Promise<void>;
  deleteItem(id: string): Promise<void>;
}