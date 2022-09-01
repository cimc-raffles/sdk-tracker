import { TrackerData } from "../types/index";

import clone from "clone";

const cache: TrackerData[] = [];

const get = () => {
  return clone(cache);
};

const add = (data: TrackerData) => {
  cache.push(data);
};

const clear = () => {
  cache.length = 0;
};

export default { get, add, clear };
