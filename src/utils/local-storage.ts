export const PREFIX = 'pathfinder-v1.'; // +v1.1.1

export const setItem = (
  key: string,
  value?: string,
  prefix: string = PREFIX,
) => {
  if (typeof localStorage === 'undefined') {
    return;
  }
  if (value === undefined) {
    localStorage.removeItem(`${prefix}-${key}`);
    return;
  }
  localStorage.setItem(`${prefix}-${key}`, value);
};

export const getItem = (key: string, prefix: string = PREFIX) => {
  if (typeof localStorage === 'undefined') {
    return;
  }
  return localStorage.getItem(`${prefix}-${key}`);
};
