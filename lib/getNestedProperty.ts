/* eslint-disable @typescript-eslint/no-explicit-any */
const getNestedProperty = (
  obj: any,
  path: string,
  format?: (value: any) => any
) => {
  const value = path.split(".").reduce((acc, part) => acc && acc[part], obj);
  return format ? format(value) : value;
};

export default getNestedProperty;
