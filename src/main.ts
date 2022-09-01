import { CustomTrackerOption, TrackerData, TrackerOption, TrackerUrlType } from "./types/index";
import { saveConfig } from "./services/config";
import { report, lazyReport } from "./services/report";

import error from "./error";
import behavior from "./behavior";

import UAParser from "ua-parser-js";

import merge from "deepmerge";

const getUa = () => {
  const thisua: UAParser.IResult = new UAParser().getResult();
  const { ua, ...rest } = thisua;
  return rest;
};

const defaultOption: TrackerOption = {
  module: "_c_trackerjs",
  version: "0.0.1",
  path: undefined,
  navigator: getUa(),
};

export default class Tracker {
  option: CustomTrackerOption | undefined;
  constructor(option: CustomTrackerOption) {
    this.setConfig(option);
    error();
    behavior();
  }
  setConfig(option: CustomTrackerOption) {
    this.option = option ? merge(defaultOption, option) : defaultOption;
    saveConfig(this.option);
  }
  report(type: TrackerUrlType, data: Record<any, any>[], immediate?: boolean) {
    report(type, data, immediate);
  }
  lazyReport(type: TrackerUrlType, data: TrackerData, timeout?: number) {
    lazyReport(type, data, timeout);
  }
}
