export type BndAnalyticsEvent =
  | "brief_start"
  | "brief_step"
  | "brief_submit"
  | "brief_success"
  | "brief_error";

type AnalyticsValue = string | number | boolean;
type AnalyticsData = Record<string, AnalyticsValue>;
type VaArguments = ["event", { name: BndAnalyticsEvent; data?: AnalyticsData }];

declare global {
  interface Window {
    va?: (...args: VaArguments) => void;
    vaq?: VaArguments[];
  }
}

export function trackBndEvent(name: BndAnalyticsEvent, data?: AnalyticsData) {
  if (typeof window === "undefined") return;

  if (typeof window.va !== "function") {
    window.va = (...args: VaArguments) => {
      window.vaq = window.vaq ?? [];
      window.vaq.push(args);
    };
  }

  window.va("event", data ? { name, data } : { name });
}
