import cache from "../services/cache";
import { report } from "../services/report";
import onClick from "./click";

const send = () => {
  const body = cache.get();
  report({ type: "behavior" }, body, true);
  cache.clear();
};

export default function behavior() {
  onClick();

  window.addEventListener(
    "beforeunload",
    () => {
      send();
    },
    false,
  );

  if ("visibilityState" in document)
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") send();
    });
}
