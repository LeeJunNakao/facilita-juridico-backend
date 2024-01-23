export const onlyDefinedAttr = <T extends object>(data: T) => {
  const entries = Object.entries(data).filter(
    ([_key, value]) => value !== undefined,
  );

  return Object.fromEntries(entries);
};
