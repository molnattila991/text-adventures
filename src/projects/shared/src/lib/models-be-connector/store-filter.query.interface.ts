export interface StoreFilter {
  fieldPath: string;
  operationString: '<' | '<=' | '==' | '>' | '>=' | 'array-contains' | 'array-contains-any';
  value: any | any[];
}
