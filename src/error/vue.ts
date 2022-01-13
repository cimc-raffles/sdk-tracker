import { TrackerErrorData } from "../types";
import { Category } from "../services/constant";
import { report } from "../services/report";
import config from "../services/config";

export default function onVueError() {
  if (!config?.vue) return;
  config.vue.config.errorHandler = (error: Error, vm: any, info: string) => {
    const data: TrackerErrorData = {
      category: Category.VueError,
      message: error.toString() || info,
      stack: error.stack,
    };
    report({ type: "error" }, [data]);
    throw error;
  };
}
