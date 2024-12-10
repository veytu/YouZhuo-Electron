import resolveConfig from "tailwindcss/resolveConfig";
import { TailwindConfig } from "tailwindcss/tailwind-config";
import get from "lodash/get";

let resolvedConfig: TailwindConfig | null = null;

export const setTailwindConfig = (tailwindConfig: Partial<TailwindConfig>) => {
  console.log("set tailwind config", tailwindConfig);
  resolvedConfig = resolveConfig(tailwindConfig as TailwindConfig);
};

export const themeVal = (key: string) => {
  if (!resolvedConfig) {
    throw new Error("you need to set tailwind config before use themeVal");
  }
  return get(resolvedConfig, `theme.${key}`) as unknown as Record<
    string,
    string
  >;
};
