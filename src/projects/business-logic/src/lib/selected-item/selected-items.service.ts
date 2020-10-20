import { HashMap, IGenericCrudDataProvider } from '@text-adventures/shared';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface ISelectedItemsService<T> {
  select(id: string[]): void;
  getSelectedItemList(): Observable<T[]>;
  getSelectedItemsHash(): Observable<HashMap<T>>;
}

export class SelectedItemsService<T> implements ISelectedItemsService<T>{
  private selectedItem$: ReplaySubject<T[]> = new ReplaySubject();
  private select$: Subject<string[]> = new Subject();
  constructor(
    protected dataProvider: IGenericCrudDataProvider<T>
  ) {
    this.select$.pipe(switchMap(id => {
      if (id && id.length > 0)
        return this.dataProvider.getByIdList(id)
      else
        return of([]);
    })
    ).subscribe(this.selectedItem$);
  }
  select(id: string[]): void {
    this.select$.next(id);
  }
  getSelectedItemList(): Observable<T[]> {
    return this.selectedItem$.asObservable();
  }

  getSelectedItemsHash(): Observable<HashMap<T>> {
    return this.selectedItem$.pipe(
      map(list => {
        const hash: HashMap<T> = {};
        list.forEach(item => {
          hash[(<any>item).id] = item;
        });
        return hash;
      })
    )
  }
}