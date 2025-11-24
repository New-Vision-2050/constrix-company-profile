import colorString from "color-string";

export const getHex = (color: string): string => {
  const rgb = colorString.get.rgb(color);
  if (!rgb) {
    return color;
  }
  return colorString.to.hex(
    ...(rgb as any as [number, number, number])
  ) as string;
};
