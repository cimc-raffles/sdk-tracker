import { Category } from "../services/constant";
import { report } from "../services/report";
import { TrackerErrorData } from "../types";

export default function onResourceError() {
  window.addEventListener(
    "error",
    (event) => {
      if (!event) return;
      const target: any = event.target || event.currentTarget;
      const isScriptOrImageElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLImageElement;
      const isLinkElementTarget = target instanceof HTMLLinkElement;

      if (!isScriptOrImageElementTarget && !isLinkElementTarget) {
        // return js error
        return;
      }

      let href;
      if (isScriptOrImageElementTarget) href = target.src;
      else if (isLinkElementTarget) href = target.href;
      if (!href) href = location.href;

      const data: TrackerErrorData = {
        category: Category.ResourceError,
        message: `${target.tagName} ResourceError: ${href}`,
      };

      report({ type: "error" }, [data]);
    },
    true,
  );
}
