import { Category } from "../services/constant";
import { report } from "../services/report";
import { TrackerErrorData } from "../types";

export default function onJsError() {
  window.onerror = (message, url, line, column, error) => {
    const data: TrackerErrorData = {
      category: Category.JsError,
      message: message.toString(),
      stack: error?.stack,
      column,
      line,
    };
    report({ type: "error" }, [data]);
  };
}
