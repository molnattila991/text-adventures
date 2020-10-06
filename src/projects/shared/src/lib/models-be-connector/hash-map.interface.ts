export interface HashMap<T> {
  [key: string]: T;
}

export function ArrayToHashMap<T>(array: T[], keyProperty: string) {
  return array.reduce(
    (acc, model) => {
      acc[model[keyProperty]] = model;
      return acc;
    },
    <HashMap<T>>{}
  );
}
