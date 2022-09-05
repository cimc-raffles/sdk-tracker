import UAParser from "ua-parser-js";

export interface TrackerOption {
  path?: string;
  module?: string;
  version?: string;
  navigator?: Partial<UAParser.IResult>;
}

export interface CustomTrackerOption extends TrackerOption {
  url?: string | TrackerUrl;
  source?: string;
  size?: number;
  vue?: any;
  trigger?: string | Record<string, any>;
  getData?: (data: TrackerData) => Record<any, any>;
}

export interface TrackerData extends Record<string, any> {
  id?: string;
}

export interface TrackerErrorData extends TrackerData {
  category: string;
  message: string;
  stack?: string;
  line?: number;
  column?: number;
}

export interface TrackerUrl {
  behavior?: string;
  visitor?: string;
  error?: string;
  performance?: string;
}

interface TrackerUrlType {
  type: "behavior" | "visitor" | "error" | "performance";
}

interface BehaviorTrigger {
  type: "click" | "router";
}
