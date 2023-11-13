import { originalOpen, originalSend } from "./xhr";
import cache from "./cache";
import config from "./config";

import { TrackerData, TrackerUrlType } from "../types";

const defaultMaxSize = 20;

const isSupportSendBeacon = () => {
  return !!window.navigator?.sendBeacon;
};

const reportWithXHR = (url: string, data: string) => {
  const xhr = new XMLHttpRequest();
  originalOpen.call(xhr, "post", url, true, null, null);
  originalSend.call(xhr, data);
};

const send = (url: string, data: string) => {
  if (isSupportSendBeacon()) window.navigator.sendBeacon(url, data);
  else reportWithXHR(url, data);
};

const convert = (data: Record<any, any>, isTransformable = true) => {
  if (!isTransformable) return { timestamp: Date.now(), ...data };
  const computedData = config?.getData ? config.getData(data) : data;
  return computedData ? { timestamp: Date.now(), ...computedData } : false;
};

// eslint-disable-next-line max-params
export const report = (type: TrackerUrlType, data: Record<any, any>[], immediate = false, isTransformable = true) => {
  const errorMessage = "TrackerError: have no request url";
  if (!config?.url) throw new Error(errorMessage);
  const url = typeof config.url === "string" ? config.url : config.url[type.type] || "";
  if (!url.length) throw new Error(errorMessage);
  if (!data.length) return;
  const navigator = config?.navigator;
  const computedData = data.map((x) => convert({ navigator, ...x }, isTransformable)).filter((x) => x);
  if (!computedData.length) return;
  const body = JSON.stringify(computedData);
  if (immediate) {
    send(url, body);
    return;
  }

  if (window.requestIdleCallback) {
    window.requestIdleCallback(
      () => {
        send(url, body);
      },
      { timeout: 3000 },
    );
  } else {
    setTimeout(() => {
      send(url, body);
    });
  }
};

// eslint-disable-next-line no-undef
let timer: NodeJS.Timeout | null = null;
// eslint-disable-next-line max-params
export const lazyReport = (type: TrackerUrlType, data: TrackerData, isTransformable = true, timeout = 3000) => {
  cache.add(data);
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    const body = cache.get();
    if (body.length > (config?.size || defaultMaxSize)) {
      report(type, body, false, isTransformable);
      cache.clear();
    }
  }, timeout);
};
