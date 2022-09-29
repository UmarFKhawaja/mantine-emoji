export const transform = (value: any) => {
  // If the value is a number, then we assume it’s a pixel value.
  if (!/\D/.test(value)) {
    return `${value}px`;
  }

  return value;
};
