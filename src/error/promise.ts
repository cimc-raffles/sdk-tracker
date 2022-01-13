import { Category } from "../services/constant";
import { report } from "../services/report";
import { TrackerErrorData } from "../types";

export default function onPromiseError() {
  window.addEventListener("unhandledrejection", (event) => {
    const data: TrackerErrorData = {
      category: Category.PromiseError,
      message: `${event?.reason?.message} : ${event?.reason?.config?.url}`,
      // stack: event?.reason?.stack,
      column: event?.reason?.columnNumber,
      line: event?.reason?.lineNumber,
    };
    report({ type: "error" }, [data]);
  });
}
