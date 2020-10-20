import { IGenericCrudDataProvider } from '@text-adventures/shared';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface ISelectedItemsService<T> {
  select(id: string[]): void;
  getSelectedItemList(): Observable<T[]>;
}

export class SelectedItemsService<T> implements ISelectedItemsService<T>{
  private selectedItem$: ReplaySubject<T[]> = new ReplaySubject();
  private select$: Subject<string[]> = new Subject();
  constructor(
    protected dataProvider: IGenericCrudDataProvider<T>
  ) {
    this.select$.pipe(switchMap(id => this.dataProvider.getByIdList(id))).subscribe(this.selectedItem$);
  }
  select(id: string[]): void {
    this.select$.next(id);
  }
  getSelectedItemList(): Observable<T[]> {
    return this.selectedItem$.asObservable();
  }
}