export function removeFromArray(array: any[], func: (i) => boolean) {
  const index = array.findIndex(func);
  if (index === -1) return;
  array.splice(index, 1);
  return [...array];
}

export function clone<T>(object: T): T {
  return <T>JSON.parse(JSON.stringify(object));
}
