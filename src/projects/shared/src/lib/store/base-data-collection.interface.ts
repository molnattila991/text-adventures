import { HashMap, SelectItem } from '@text-adventures/shared';
import { Observable } from 'rxjs';
export interface BaseDataCollection<T> {
    getHash(): Observable<HashMap<T>>
    getSelectList(propertyName: string): Observable<SelectItem[]>;
}