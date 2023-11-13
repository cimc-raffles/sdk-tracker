import { TrackerData } from "../types/index";

import clone from "clone";

const cache: TrackerData[] = [];

const get = () => {
  return cache;
};

const add = (data: TrackerData) => {
  cache.push(clone(data));
};

const clear = () => {
  cache.length = 0;
};

export default { get, add, clear };
