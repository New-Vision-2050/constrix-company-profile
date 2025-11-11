import packageJson from "../package.json";

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  logo: string;
};

export const CONFIG: ConfigValue = {
  appName: "Constrix Profile",
  logo: "/assets/logos/base/image.png",
  appVersion: packageJson.version,
};
