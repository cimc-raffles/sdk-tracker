import { CustomTrackerOption } from "../types";

const config: CustomTrackerOption = { url: "" };

export default config;

export function saveConfig(option: CustomTrackerOption | undefined) {
  Object.assign(config, option || {});
}
