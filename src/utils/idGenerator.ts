export const idGenerator = (): string => {
  return Math.random().toString(36).slice(2, 10);
};
