import { BaseDataCollection, HashMap, IGenericCrudDataProvider, SelectItem } from '@text-adventures/shared';
import { Observable, ReplaySubject, Subscription } from 'rxjs';

export class BaseDataCollectionStore<T> implements BaseDataCollection<T> {
    subscriptions: Subscription = new Subscription();
    protected hash: ReplaySubject<HashMap<T>> = new ReplaySubject();
    protected selectList: ReplaySubject<SelectItem[]> = new ReplaySubject();

    public constructor(protected store: IGenericCrudDataProvider<T>, config: { selectProperty: string }) {
        this.subscriptions.add(this.store.getHashMap().subscribe(this.hash));
        this.subscriptions.add(this.store.getSelectList(config.selectProperty).subscribe(this.selectList));
    }

    getHash(): Observable<HashMap<T>> {
        return this.hash.asObservable();
    }
    getSelectList(): Observable<SelectItem[]> {
        return this.selectList.asObservable();
    }

}