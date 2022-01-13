import { lazyReport } from "../services/report";

const eventName: string = "ontouchend" in window ? "touchend" : "click";

export default function onClick() {
  let timer: NodeJS.Timeout | null = null;
  window.addEventListener(
    eventName,
    async (event) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const target = event.target;
        let text = (target as HTMLElement).innerText;
        text = text ? text.trim() : text;
        lazyReport({ type: "behavior" }, { text });
      }, 500);
    },
    false,
  );
}
