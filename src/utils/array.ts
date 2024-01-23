type FindCallback<T> = (v: T, index?: number) => boolean;
type PopFindResult<T> = [T | undefined, T[]];

export const popFind = <T>(data: T[], cb: FindCallback<T>) => {
  return data.reduce(
    (result, curr) => {
      const [found, restArr] = result;

      if (found) {
        return [found, [...restArr, curr]] as PopFindResult<T>;
      }

      const isTrue = cb(curr);

      if (isTrue) {
        return [curr, [...restArr]] as PopFindResult<T>;
      }

      return [found, [...restArr, curr]] as PopFindResult<T>;
    },
    [undefined, []] as [T | undefined, T[]],
  );
};
