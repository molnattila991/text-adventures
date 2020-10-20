import { IGenericCrudDataProvider } from '@text-adventures/shared';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface ISelectedItemService<T> {
    select(id: string): void;
    getSelectedItem(): Observable<T>;
}

export class SelectedItemService<T> implements ISelectedItemService<T>{
    private selectedItem$: ReplaySubject<T> = new ReplaySubject();
    private select$: Subject<string> = new Subject();
    constructor(
        protected dataProvider: IGenericCrudDataProvider<T>
    ) {
        this.select$.pipe(switchMap(id => this.dataProvider.getById(id))).subscribe(this.selectedItem$);
    }
    select(id: string): void {
        this.select$.next(id);
    }
    getSelectedItem(): Observable<T> {
        return this.selectedItem$.asObservable();
    }
}