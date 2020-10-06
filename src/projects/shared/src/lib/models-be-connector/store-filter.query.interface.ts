export interface StoreFilter {
  fieldPath: string;
  operationString: '<' | '<=' | '==' | '>' | '>=';
  value: any;
}
