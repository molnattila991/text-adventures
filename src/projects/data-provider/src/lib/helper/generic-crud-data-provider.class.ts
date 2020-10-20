
import { IGenericCrudDataProvider, StoreKeyValue, HashMap, GenericCrudService, StoreFilter, SelectItem } from '@text-adventures/shared';
import { Subscription, ReplaySubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class GenericCrudDataProvider<T> implements IGenericCrudDataProvider<T> {
  collection$: ReplaySubject<StoreKeyValue<T>[]> = new ReplaySubject();
  hashMap$: ReplaySubject<HashMap<T>> = new ReplaySubject();
  collectionSubscription: Subscription;
  hashMapSubscription: Subscription;
  selectList$: Observable<any>;

  constructor(
    protected crudService: GenericCrudService,
    protected path: string
  ) {
    this.collectionSubscription && this.collectionSubscription.unsubscribe();
    this.collectionSubscription = this.crudService
      .get<T>(this.path)
      .subscribe(this.collection$);

    this.selectList$ = this.collection$;

    this.hashMapSubscription && this.hashMapSubscription.unsubscribe();
    this.hashMapSubscription = this.crudService
      .getHashMap<T>(this.path)
      .subscribe(this.hashMap$);
  }

  getHashMap(): Observable<HashMap<T>> {
    return this.hashMap$.asObservable();
  }

  getHashFiltered(property: string, value: any, operation: '<' | '<=' | '==' | '>' | '>=' | 'array-contains' | 'array-contains-any' = "=="): Observable<HashMap<T>> {
    return this.crudService.getHashMapFiltered(this.path, <StoreFilter>{
      fieldPath: property,
      operationString: operation,
      value: value
    });
  }

  get(): Observable<StoreKeyValue<T>[]> {
    return this.collection$.asObservable();
  }

  getById(id: string): Observable<T> {
    return this.crudService.getById<T>(this.path, id);
  }

  getByIdList(id: string[]): Observable<T[]> {
    return this.crudService.getByIdList<T>(this.path, id);
  }

  getFiltered(property: string, value: any, operation: '<' | '<=' | '==' | '>' | '>=' | 'array-contains' | 'array-contains-any' = "=="): Observable<StoreKeyValue<T>[]> {
    return this.crudService.getFiltered(this.path, <StoreFilter>{
      fieldPath: property,
      operationString: operation,
      value: value
    });
  }

  add(model: Partial<T>): Promise<T> {
    return this.crudService.add<T>(this.path, model);
  }

  update(id: string, model: T): Promise<T> {
    return this.crudService.update<T>(this.path, id, model);
  }

  delete(id: string): Promise<void> {
    return this.crudService.delete(this.path, id);
  }

  getSelectList(propertyName = "name"): Observable<SelectItem[]> {
    return this.selectList$.pipe(
      map(items =>
        items.map(
          item =>
            <SelectItem>{
              id: item.id,
              text: (<any>item.model)[propertyName]
            }
        )
      ));
  }
}